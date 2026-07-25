import React, { useState, useEffect, useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * AnimatedSection reveals its content with a gentle fade + rise as it
 * scrolls into view. Crucially, the <section> background is painted at
 * all times — only the inner content animates — so the reveal never
 * flashes the (previously white) page background. Animates once.
 * @param {AnimatedSectionProps} props - The properties for the AnimatedSection component.
 * @return {JSX.Element} The rendered AnimatedSection component.
 */
export function AnimatedSection(props: AnimatedSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Once the reveal is done, drop the transform/will-change. While either is
  // present the wrapper is a containing block, which makes it the
  // offsetParent of everything inside and traps `position: fixed`
  // descendants (e.g. the filters modal) inside the section.
  useEffect(() => {
    if (!hasAnimated) return;

    const timeout = window.setTimeout(() => setHasSettled(true), 1000);
    return () => window.clearTimeout(timeout);
  }, [hasAnimated]);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef || hasAnimated) return;

    // Fall back to visible content if the API is unavailable, so a section can
    // never get stuck at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      setHasAnimated(true);
      return;
    }

    // threshold must stay 0: a percentage threshold can never be met by a
    // section taller than the viewport (e.g. the projects list on mobile),
    // which would leave it permanently hidden. rootMargin gives the small
    // "scrolled into view" delay instead.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id={props.id}
      className={props.className}
    >
      <div className={`reveal ${hasAnimated ? "is-visible" : ""} ${hasSettled ? "is-settled" : ""}`}>{props.children}</div>
    </section>
  );
}
