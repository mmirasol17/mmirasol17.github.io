import React, { useState, useEffect, useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * AnimatedSection component that fades in from black when it comes into view.
 * Only animates once, then stays visible.
 * @param {AnimatedSectionProps} props - The properties for the AnimatedSection component.
 * @return {JSX.Element} The rendered AnimatedSection component.
 */
export function AnimatedSection(props: AnimatedSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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
      className={`transition-opacity duration-1000 ${hasAnimated ? "opacity-100" : "opacity-0 bg-black"} ${props.className}`}
    >
      {props.children}
    </section>
  );
}
