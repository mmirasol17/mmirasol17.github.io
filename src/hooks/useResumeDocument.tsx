import { useEffect, useState } from "react";

export type ResumeRedactionKind = "email" | "phone";

/** Marks the placeholder elements swapped in for contact details, so the renderer can wire them up. */
export const RESUME_REDACTION_ATTRIBUTE = "data-resume-redaction";

export interface IResumeDocument {
  /** Classes Google puts on <body> - they carry the page geometry, so they move to the wrapper. */
  bodyClassName: string;
  bodyHtml: string;
  /** The document's own stylesheet, injected into a shadow root so it can't leak into the site. */
  styleText: string;
}

type ResumeDocumentStatus = "loading" | "ready" | "error";

interface UseResumeDocumentResult {
  status: ResumeDocumentStatus;
  document: IResumeDocument | null;
}

const EMAIL_PATTERN = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
// Optional country code, then the usual 3-3-4 grouping with any of the common separators.
const PHONE_PATTERN = /(?:\+?\d{1,2}[\s. -]*)?\(?\d{3}\)?[\s. -]*\d{3}[\s. -]*\d{4}(?!\d)/g;

// The published Doc is normally already redacted upstream by the Apps Script mirror, so the details
// arrive as bullet runs rather than real values. Those still need to become chips. A run of bullets
// joined by the usual contact punctuation; a literal space is allowed (for "(•••) •••-••••") but
// non-breaking spaces are not, so the "|"-and-nbsp separated header fields can't merge into one chip.
const MASKED_CONTACT_PATTERN = /•(?:[•@.\-()+_% ]*•)?/g;
const MINIMUM_MASK_BULLETS = 3;

// List markers in the export are CSS ::before content (U+25CF), never text, so they cannot collide.
function resolveMaskKind(value: string): ResumeRedactionKind | null {
  const bullets = value.match(/•/g)?.length ?? 0;
  if (bullets < MINIMUM_MASK_BULLETS) return null;
  return value.includes("@") ? "email" : "phone";
}

// Anything that could execute or phone home. The document is Marin's own, but it is still
// third-party-served HTML going through innerHTML, so it gets stripped either way.
const FORBIDDEN_TAGS = ["script", "iframe", "object", "embed", "link", "meta", "base", "form", "input", "style"];

const GOOGLE_REDIRECT_PREFIX = "https://www.google.com/url?";

// Reopening the viewer shouldn't refetch - the document only changes when Marin edits it.
const documentCache = new Map<string, IResumeDocument>();

/** Replaces every letter and digit with a bullet, keeping separators so the shape still reads as a phone/email. */
function maskValue(value: string): string {
  return value.replace(/[A-Za-z0-9]/g, "•");
}

function createRedactionElement(ownerDocument: Document, kind: ResumeRedactionKind, value: string): HTMLElement {
  const button = ownerDocument.createElement("button");
  button.type = "button";
  button.className = "resume-redaction";
  button.setAttribute(RESUME_REDACTION_ATTRIBUTE, kind);
  // Deliberately does not include the real value - screen readers shouldn't leak what the mask hides.
  button.setAttribute("aria-label", `${kind === "email" ? "Email address" : "Phone number"} hidden - go to the contact section`);

  const mask = ownerDocument.createElement("span");
  mask.className = "resume-redaction__mask";
  mask.textContent = maskValue(value);

  const prompt = ownerDocument.createElement("span");
  prompt.className = "resume-redaction__prompt";
  prompt.setAttribute("aria-hidden", "true");
  prompt.textContent = "Contact me →";

  button.append(mask, prompt);
  return button;
}

interface RedactionMatch {
  index: number;
  length: number;
  kind: ResumeRedactionKind;
  value: string;
}

function findRedactions(text: string): RedactionMatch[] {
  const matches: RedactionMatch[] = [];

  const collect = (pattern: RegExp, resolveKind: (value: string) => ResumeRedactionKind | null) => {
    pattern.lastIndex = 0;
    let match = pattern.exec(text);
    while (match !== null) {
      // Guard the left edge without a lookbehind - Safari below 16.4 throws on those at parse time.
      const precededByDigit = match.index > 0 && /\d/.test(text[match.index - 1]);
      const kind = resolveKind(match[0]);
      if (!precededByDigit && kind) {
        matches.push({ index: match.index, length: match[0].length, kind, value: match[0] });
      }
      match = pattern.exec(text);
    }
  };

  collect(EMAIL_PATTERN, () => "email");
  collect(PHONE_PATTERN, () => "phone");
  collect(MASKED_CONTACT_PATTERN, resolveMaskKind);

  // Emails contain digit runs that the phone pattern can also claim; earlier match wins, overlaps are dropped.
  matches.sort((a, b) => a.index - b.index);
  return matches.filter((match, i) => i === 0 || match.index >= matches[i - 1].index + matches[i - 1].length);
}

/** Walks the text nodes and swaps any contact detail for a placeholder element. */
function redactContactDetails(root: HTMLElement, ownerDocument: Document) {
  const walker = ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  for (const textNode of textNodes) {
    const text = textNode.textContent ?? "";
    const matches = findRedactions(text);
    if (matches.length === 0) continue;

    const fragment = ownerDocument.createDocumentFragment();
    let cursor = 0;
    for (const match of matches) {
      if (match.index > cursor) {
        fragment.appendChild(ownerDocument.createTextNode(text.slice(cursor, match.index)));
      }
      fragment.appendChild(createRedactionElement(ownerDocument, match.kind, match.value));
      cursor = match.index + match.length;
    }
    if (cursor < text.length) {
      fragment.appendChild(ownerDocument.createTextNode(text.slice(cursor)));
    }

    textNode.parentNode?.replaceChild(fragment, textNode);
  }
}

function sanitize(root: HTMLElement) {
  for (const element of Array.from(root.querySelectorAll(FORBIDDEN_TAGS.join(",")))) {
    element.remove();
  }

  for (const element of Array.from(root.querySelectorAll("*"))) {
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      if (name.startsWith("on")) {
        element.removeAttribute(attribute.name);
      } else if ((name === "href" || name === "src") && /^javascript:/i.test(value)) {
        element.removeAttribute(attribute.name);
      }
    }
  }
}

/** Google rewrites every link as a /url?q= redirect; point them back at the real destination. */
function unwrapRedirects(root: HTMLElement) {
  for (const anchor of Array.from(root.querySelectorAll("a[href]"))) {
    const href = anchor.getAttribute("href") ?? "";
    if (href.startsWith(GOOGLE_REDIRECT_PREFIX)) {
      const target = new URL(href).searchParams.get("q");
      if (target) anchor.setAttribute("href", target);
    }
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
  }
}

// Class names that draw a visible bottom rule, read from the Doc's own exported stylesheet.
// Google renumbers these classes on every edit, so they're derived per-fetch rather than hardcoded.
function collectBottomRuleClasses(styleText: string): Set<string> {
  const classes = new Set<string>();
  const blockPattern = /\.([A-Za-z0-9_-]+)\s*\{([^}]*)\}/g;
  let block: RegExpExecArray | null;
  while ((block = blockPattern.exec(styleText)) !== null) {
    const [, name, body] = block;
    const styled = /border-bottom-style\s*:\s*(?:solid|double|dashed|dotted|groove|ridge|inset|outset)/i.test(body);
    const width = body.match(/border-bottom-width\s*:\s*([\d.]+)/i);
    const hasWidth = width ? Number.parseFloat(width[1]) > 0 : false;
    // Also catch the shorthand form (`border-bottom: 0.8pt solid #000`).
    const shorthand = /border-bottom\s*:\s*[^;]*\b(?:solid|double|dashed|dotted)\b/i.test(body);
    if ((styled && hasWidth) || shorthand) classes.add(name);
  }
  return classes;
}

// A section heading with a bottom border (e.g. "EDUCATION") is followed in the export by an empty
// paragraph that inherited the same border, so the divider renders as two lines instead of one.
// Drop the border from the empty trailing paragraph so the rule matches the Doc (and the other
// sections, which have no such trailing paragraph). Border comes from a class, so an inline
// `border-bottom:none` is the surgical override; it survives sanitize() (inline styles are kept).
function collapseDuplicateRules(root: HTMLElement, ruleClasses: Set<string>) {
  const drawsRule = (el: Element | null) => !!el && Array.from(el.classList).some((c) => ruleClasses.has(c));
  for (const paragraph of Array.from(root.querySelectorAll("p"))) {
    if ((paragraph.textContent ?? "").trim() !== "") continue;
    if (!drawsRule(paragraph) || !drawsRule(paragraph.previousElementSibling)) continue;
    const existing = paragraph.getAttribute("style")?.trim().replace(/;$/, "");
    paragraph.setAttribute("style", existing ? `${existing};border-bottom:none` : "border-bottom:none");
  }
}

// Dates sit at the right margin in the Doc because a right tab stop pushes them there. The HTML
// export has no concept of a tab stop, so it emits the tab as a lone span of non-breaking spaces -
// the date lands a few characters after the title instead of at the margin, and the gap changes
// width with the title. Rebuild the row as a flex line: everything before the run stays left,
// everything after it is pushed right. Matching on the run (rather than Google's class names) keeps
// this working through edits, since Google renumbers those on every save.
const MINIMUM_TAB_SPACES = 3;

function isTabRemnant(node: Node): boolean {
  const text = node.textContent ?? "";
  if (!/^[\s ]*$/.test(text)) return false;
  return (text.match(/ /g)?.length ?? 0) >= MINIMUM_TAB_SPACES;
}

function edgeTextNode(root: Node, edge: "first" | "last"): Text | null {
  if (root.nodeType === Node.TEXT_NODE) return root as Text;
  const children = Array.from(root.childNodes);
  if (edge === "last") children.reverse();
  for (const child of children) {
    const found = edgeTextNode(child, edge);
    if (found) return found;
  }
  return null;
}

function restoreTabStops(root: HTMLElement, ownerDocument: Document) {
  for (const paragraph of Array.from(root.querySelectorAll("p"))) {
    const children = Array.from(paragraph.childNodes);
    const separator = children.findIndex(isTabRemnant);
    if (separator === -1) continue;

    const leftNodes = children.slice(0, separator);
    const rightNodes = children.slice(separator + 1);
    const hasText = (nodes: Node[]) => nodes.some((node) => (node.textContent ?? "").trim() !== "");

    paragraph.removeChild(children[separator]);
    // A tab with nothing after it is stray spacing, not a two-column row - dropping it is the fix.
    if (!hasText(leftNodes) || !hasText(rightNodes)) continue;

    const left = ownerDocument.createElement("span");
    left.className = "resume-row__left";
    left.append(...leftNodes);

    const right = ownerDocument.createElement("span");
    right.className = "resume-row__right";
    right.append(...rightNodes);

    // Some rows pad the title with their own trailing spaces before the tab; the flex gap replaces them.
    const leftEdge = edgeTextNode(left, "last");
    if (leftEdge) leftEdge.textContent = (leftEdge.textContent ?? "").replace(/[\s ]+$/, "");

    paragraph.append(left, right);
    paragraph.classList.add("resume-row");
  }
}

function parseResumeDocument(html: string): IResumeDocument {
  // DOMParser output is inert: nothing loads or runs while we clean it up.
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const body = parsed.body;

  const styleText = Array.from(parsed.querySelectorAll("style"))
    .map((style) => style.textContent ?? "")
    .join("\n");

  sanitize(body);
  unwrapRedirects(body);
  collapseDuplicateRules(body, collectBottomRuleClasses(styleText));
  restoreTabStops(body, parsed);
  redactContactDetails(body, parsed);

  return {
    bodyClassName: body.className,
    bodyHtml: body.innerHTML,
    styleText,
  };
}

/**
 * Fetches the resume straight from its Google Doc and returns it as sanitized, redacted markup.
 * Content stays sourced from the Doc - editing it there is all that's needed to update the site.
 */
export function useResumeDocument(documentId: string): UseResumeDocumentResult {
  const cached = documentCache.get(documentId) ?? null;
  const [status, setStatus] = useState<ResumeDocumentStatus>(cached ? "ready" : "loading");
  const [document, setDocument] = useState<IResumeDocument | null>(cached);

  useEffect(() => {
    if (!documentId) {
      setStatus("error");
      return;
    }

    const alreadyFetched = documentCache.get(documentId);
    if (alreadyFetched) {
      setDocument(alreadyFetched);
      setStatus("ready");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    setDocument(null);

    (async () => {
      try {
        const response = await fetch(`https://docs.google.com/document/d/${documentId}/export?format=html`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Resume export responded with ${response.status}`);

        const parsedDocument = parseResumeDocument(await response.text());
        documentCache.set(documentId, parsedDocument);
        setDocument(parsedDocument);
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to load resume document:", error);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [documentId]);

  return { status, document };
}
