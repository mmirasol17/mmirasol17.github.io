import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query from JS, kept in sync as the viewport changes.
 *
 * Use this when a breakpoint has to change *what* renders rather than how it
 * looks - rendering both variants and hiding one with `hidden sm:block` leaves
 * the hidden copy in the DOM, which quietly breaks refs, click-outside checks
 * and scroll measurement.
 *
 * @param {string} query - A media query string, e.g. "(min-width: 640px)".
 * @returns {boolean} Whether the query currently matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    // Re-read on subscribe: the viewport can change between render and effect.
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}
