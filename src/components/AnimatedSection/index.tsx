import React from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * AnimatedSection component that fades in when it comes into view.
 * @param {AnimatedSectionProps} props - The properties for the AnimatedSection component.
 * @return {JSX.Element} The rendered AnimatedSection component.
 */
export function AnimatedSection(props: AnimatedSectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id={props.id}
      className={`transition-opacity duration-1000 ${isIntersecting ? "opacity-100" : "opacity-0"} ${props.className}`}
    >
      {props.children}
    </section>
  );
}
