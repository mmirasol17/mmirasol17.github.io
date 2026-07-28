import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

interface RevealProps {
  children: ReactNode;
  /** Stagger index - items entering together cascade by this. */
  index?: number;
  className?: string;
}

const STAGGER_MS = 70;
const STAGGER_CAP = 4;

/**
 * Reveals a single item with a gentle fade + rise the first time it scrolls
 * into view, cascading by `index`. Mirrors the section-level `.reveal` pattern
 * but per element, so grids/lists of cards stagger in as you scroll. After the
 * animation it drops its transform (`.is-settled`) so it never lingers as a
 * containing block over its children.
 */
export function Reveal(props: Readonly<RevealProps>) {
  const { children, index = 0, className } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fall back to visible if the API is unavailable, so content is never stuck hidden.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const delay = Math.min(index, STAGGER_CAP) * STAGGER_MS;
    const timeout = window.setTimeout(() => setSettled(true), 700 + delay);
    return () => window.clearTimeout(timeout);
  }, [visible, index]);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-item",
        // Alternate the entrance direction so cards swipe in left, right, left...
        index % 2 === 0 ? "reveal-item--from-left" : "reveal-item--from-right",
        visible && "is-visible",
        settled && "is-settled",
        className
      )}
      style={!settled ? { transitionDelay: `${Math.min(index, STAGGER_CAP) * STAGGER_MS}ms` } : undefined}
    >
      {children}
    </div>
  );
}
