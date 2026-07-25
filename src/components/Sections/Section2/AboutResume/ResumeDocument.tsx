import { useEffect, useRef } from "react";
import { RESUME_REDACTION_ATTRIBUTE, IResumeDocument } from "../../../../hooks/useResumeDocument";

interface ResumeDocumentProps {
  document: IResumeDocument;
  onContactRequest: () => void;
}

// Styling for the redaction chips, plus the page overrides that make Google's print geometry
// (72pt margins, a fixed 468pt column) behave inside a modal.
const RESUME_DOCUMENT_STYLES = `
  .resume-document {
    max-width: 100%;
    padding: 1.5rem 1.25rem 3rem;
    margin: 0 auto;
    overflow-wrap: break-word;
    background: #ffffff;
  }

  @media (min-width: 768px) {
    .resume-document { padding: 2.5rem 3rem 4rem; max-width: 56rem; }
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

/**
 * Renders the resume inside a shadow root. Google's export ships a stylesheet that targets bare
 * `p`, `li` and `ul`, so it has to be isolated or it would repaint the rest of the site.
 */
export function ResumeDocument(props: Readonly<ResumeDocumentProps>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onContactRequestRef = useRef(props.onContactRequest);

  useEffect(() => {
    onContactRequestRef.current = props.onContactRequest;
  }, [props.onContactRequest]);

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

    const handleRedactionClick = () => onContactRequestRef.current();
    const redactions = Array.from(content.querySelectorAll<HTMLElement>(`[${RESUME_REDACTION_ATTRIBUTE}]`));
    for (const redaction of redactions) {
      redaction.addEventListener("click", handleRedactionClick);
    }

    return () => {
      for (const redaction of redactions) {
        redaction.removeEventListener("click", handleRedactionClick);
      }
    };
  }, [props.document]);

  return <div ref={hostRef} />;
}
