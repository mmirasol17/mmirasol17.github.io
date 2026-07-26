import { useEffect, useRef, useState } from "react";
import { RESUME_REDACTION_ATTRIBUTE, IResumeDocument } from "../../../../hooks/useResumeDocument";

interface ResumeDocumentProps {
  document: IResumeDocument;
  onContactRequest: () => void;
  /** null means auto: 100% wherever the page fits, shrink-to-fit where it doesn't. */
  zoom: number | null;
  /** Reports the scale actually in effect, so the toolbar can label its zoom control. */
  onScaleChange?: (scale: number) => void;
}

/** US Letter at 96dpi. Only used if the export ever ships without a page width of its own. */
const FALLBACK_PAGE_WIDTH_PX = 816;

// The chips for the redacted contact details, plus the page shell. Deliberately absent: anything
// that touches the text column's width, padding or font — the export's own stylesheet owns those,
// and overriding them is what makes the line breaks drift away from the real document.
const RESUME_DOCUMENT_STYLES = `
  :host { display: block; }

  /* The Doc asks for Times New Roman by name and nothing else. Platforms that don't ship it fall
     back to a default serif with different metrics, which rewraps every line. These aliases point
     the name at the metric-compatible clones instead; all four faces are declared so bold and
     italic resolve to real faces rather than synthesised ones. */
  @font-face {
    font-family: "Times New Roman";
    font-weight: 400;
    font-style: normal;
    src: local("Times New Roman"), local("TimesNewRomanPSMT"), local("Tinos"), local("Liberation Serif"), local("Nimbus Roman");
  }
  @font-face {
    font-family: "Times New Roman";
    font-weight: 700;
    font-style: normal;
    src: local("Times New Roman Bold"), local("TimesNewRomanPS-BoldMT"), local("Tinos Bold"), local("Liberation Serif Bold"), local("Nimbus Roman Bold");
  }
  @font-face {
    font-family: "Times New Roman";
    font-weight: 400;
    font-style: italic;
    src: local("Times New Roman Italic"), local("TimesNewRomanPS-ItalicMT"), local("Tinos Italic"), local("Liberation Serif Italic"), local("Nimbus Roman Italic");
  }
  @font-face {
    font-family: "Times New Roman";
    font-weight: 700;
    font-style: italic;
    src: local("Times New Roman Bold Italic"), local("TimesNewRomanPS-BoldItalicMT"), local("Tinos Bold Italic"), local("Liberation Serif Bold Italic"), local("Nimbus Roman Bold Italic");
  }

  /* content-box so the export's own max-width keeps meaning "text column", not "column + margins". */
  .resume-document {
    box-sizing: content-box;
    margin: 0;
    background: #ffffff;
    /* Only bites on a word too long for the column, which is what Docs does too. */
    overflow-wrap: break-word;
  }

  .resume-document a { color: #2563eb; }

  .resume-redaction {
    display: inline-grid;
    align-items: center;
    justify-items: center;
    vertical-align: baseline;
    font: inherit;
    color: #1d4ed8;
    border: 0;
    margin: 0;
    padding: 0 0.3em;
    cursor: pointer;
    border-radius: 0.35em;
    background: rgba(96, 165, 250, 0.16);
    box-shadow: inset 0 0 0 1px rgba(96, 165, 250, 0.55);
    transition: background-color 150ms ease, box-shadow 150ms ease;
  }

  /* Both labels share one grid cell, so the chip is sized to the wider of the two and
     swapping them on hover never reflows the surrounding line. */
  .resume-redaction > * {
    grid-area: 1 / 1;
    white-space: nowrap;
    transition: opacity 150ms ease;
  }

  .resume-redaction__mask { letter-spacing: 0.04em; }
  .resume-redaction__prompt { opacity: 0; font-weight: 700; }

  .resume-redaction:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  .resume-redaction:focus-visible .resume-redaction__mask { opacity: 0; }
  .resume-redaction:focus-visible .resume-redaction__prompt { opacity: 1; }

  /* Hover swap only where hovering is real; touch devices keep the mask and rely on tap. */
  @media (hover: hover) {
    .resume-redaction:hover {
      background: rgba(96, 165, 250, 0.3);
      box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.8);
    }
    .resume-redaction:hover .resume-redaction__mask { opacity: 0; }
    .resume-redaction:hover .resume-redaction__prompt { opacity: 1; }
  }
`;

interface PageSize {
  width: number;
  height: number;
}

/**
 * Renders the resume inside a shadow root. Google's export ships a stylesheet that targets bare
 * `p`, `li` and `ul`, so it has to be isolated or it would repaint the rest of the site.
 *
 * The page is laid out at the fixed width the Doc was written at and then scaled with a transform
 * to fit the viewer. Reflowing it to the modal instead — which is what this used to do — rewraps
 * every paragraph, so the preview stops matching what the document looks like in Google Docs.
 */
export function ResumeDocument(props: Readonly<ResumeDocumentProps>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [pageSize, setPageSize] = useState<PageSize | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const onContactRequestRef = useRef(props.onContactRequest);
  const onScaleChangeRef = useRef(props.onScaleChange);

  useEffect(() => {
    onContactRequestRef.current = props.onContactRequest;
    onScaleChangeRef.current = props.onScaleChange;
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // StrictMode runs this effect twice; attachShadow throws on the second pass.
    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    shadowRoot.replaceChildren();

    const style = document.createElement("style");
    // The document's own styles first, so the overrides above can win at equal specificity.
    style.textContent = `${props.document.styleText}\n${RESUME_DOCUMENT_STYLES}`;

    const content = document.createElement("div");
    content.className = `${props.document.bodyClassName} resume-document`.trim();
    content.innerHTML = props.document.bodyHtml;

    shadowRoot.append(style, content);

    // Read the page setup back out of the export rather than hardcoding Letter: whatever page size
    // and margins the Doc is configured with land here as a resolved max-width plus padding.
    const computed = getComputedStyle(content);
    const declaredColumn = parseFloat(computed.maxWidth);
    const paddingX = parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight);
    const column = Number.isFinite(declaredColumn) ? declaredColumn : FALLBACK_PAGE_WIDTH_PX - paddingX;

    // Pinning the width stops the column from collapsing once the host is scaled below page size.
    content.style.width = `${column}px`;

    const measure = () => setPageSize({ width: column + paddingX, height: content.offsetHeight });
    measure();

    // Height moves after the fact when the serif finishes resolving, so keep watching it.
    const observer = new ResizeObserver(measure);
    observer.observe(content);

    const handleRedactionClick = () => onContactRequestRef.current();
    const redactions = Array.from(content.querySelectorAll<HTMLElement>(`[${RESUME_REDACTION_ATTRIBUTE}]`));
    for (const redaction of redactions) {
      redaction.addEventListener("click", handleRedactionClick);
    }

    return () => {
      observer.disconnect();
      for (const redaction of redactions) {
        redaction.removeEventListener("click", handleRedactionClick);
      }
    };
  }, [props.document]);

  // Width available to the page, excluding the gutter — the observer fires once on observe, so
  // there is no separate initial read.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(([entry]) => setViewportWidth(entry.contentRect.width));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const fitScale = pageSize && viewportWidth > 0 ? viewportWidth / pageSize.width : 1;
  // Auto stops at 100%: a Doc is never shown larger than its page unless the reader asks.
  const scale = Math.max(0.1, props.zoom ?? Math.min(1, fitScale));

  useEffect(() => {
    onScaleChangeRef.current?.(scale);
  }, [scale]);

  return (
    <div
      ref={viewportRef}
      className='w-full px-3 py-4 sm:px-6 md:py-8'
    >
      <div
        className='mx-auto bg-white'
        style={{
          width: pageSize ? pageSize.width * scale : undefined,
          height: pageSize ? pageSize.height * scale : undefined,
          boxShadow: "0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)",
        }}
      >
        <div
          ref={hostRef}
          style={{
            width: pageSize?.width,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}
