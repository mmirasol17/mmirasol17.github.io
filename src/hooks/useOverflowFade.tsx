import { useEffect, useState } from "react";

/** How far the edge fade extends once it is shown. */
const FADE_SIZE = "1.25rem";

/**
 * Drives the `.scroll-fade-y` edge fade from the element's real scroll state.
 *
 * The fade is applied only to an edge that actually has more content past it,
 * so a short menu that doesn't overflow is never clipped, and a scrolled-to-
 * bottom list doesn't keep a misleading fade at its end.
 *
 * @returns {Function} A callback ref to attach to the scrollable element.
 */
export function useOverflowFade<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;

    const update = () => {
      // 1px tolerance absorbs sub-pixel rounding at the scroll extremes.
      const canScrollUp = node.scrollTop > 1;
      const canScrollDown = node.scrollTop + node.clientHeight < node.scrollHeight - 1;

      node.style.setProperty("--fade-top", canScrollUp ? FADE_SIZE : "0px");
      node.style.setProperty("--fade-bottom", canScrollDown ? FADE_SIZE : "0px");
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Re-measure when the element or its contents change size (filters being
    // toggled, a section expanding, fonts loading).
    const observer = new ResizeObserver(update);
    observer.observe(node);
    for (const child of Array.from(node.children)) {
      observer.observe(child);
    }

    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [node]);

  return setNode;
}
