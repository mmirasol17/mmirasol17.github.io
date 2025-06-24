import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to observe the intersection of an element with the viewport.
 *
 * @param {IntersectionObserverInit} options - Options for the IntersectionObserver.
 * @returns {Array} - An array containing a ref to the target element and a boolean indicating if it is intersecting.
 */
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return [targetRef, isIntersecting] as const;
}
