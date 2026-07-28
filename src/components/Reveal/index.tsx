import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
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
 * Reveals a single item the first time it scrolls into view: it swipes in from
 * off-screen (alternating left / right down the list), cascading by `index`.
 * Mirrors the section-level `.reveal` pattern but per element, so lists of cards
 * stagger in as you scroll. After the animation it drops its transform
 * (`.is-settled`) so it never lingers as a containing block over its children.
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

  const stagger = Math.min(index, STAGGER_CAP) * STAGGER_MS;

  useEffect(() => {
    if (!visible) return;
    // Outlast the slide itself (0.8s) plus this card's stagger slot, so dropping
    // the transform never snaps a card that is still travelling.
    const timeout = window.setTimeout(() => setSettled(true), 950 + stagger);
    return () => window.clearTimeout(timeout);
  }, [visible, stagger]);

  return (
    // Two elements on purpose: the outer one is what the observer watches and it
    // NEVER moves. The slide parks a card entirely off-screen, and an observer
    // measures the transformed box - so watching the sliding element itself
    // meant it could never intersect the viewport and never revealed.
    <div
      ref={ref}
      className={cn("reveal-item", className)}
      style={
        {
          // Kept past `settled` on purpose: content cascades inside the card read
          // it (--reveal-stagger) to line up behind this card's entrance, and
          // changing it mid-animation would jolt them.
          "--reveal-stagger": `${stagger}ms`,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "reveal-slide",
          // Alternate the entrance direction so cards swipe in left, right, left...
          index % 2 === 0 ? "reveal-slide--from-left" : "reveal-slide--from-right",
          visible && "is-visible",
          settled && "is-settled"
        )}
        style={!settled ? { transitionDelay: `${stagger}ms` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
