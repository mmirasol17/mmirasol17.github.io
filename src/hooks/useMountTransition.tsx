import { useEffect, useState } from "react";

/**
 * Keeps an element mounted while its exit animation plays.
 *
 * Overlays that render with `{isOpen && <.../>}` disappear instantly on close,
 * so only the enter animation can ever run. This defers the unmount by
 * `exitDuration` so a closing animation has time to finish.
 *
 * @param {boolean} isOpen - Whether the element should be open.
 * @param {number} exitDuration - How long the exit animation runs, in ms.
 * @returns {boolean} Whether the element should still be rendered.
 */
export function useMountTransition(isOpen: boolean, exitDuration = 260): boolean {
  const [isMounted, setIsMounted] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      return;
    }

    const timeout = window.setTimeout(() => setIsMounted(false), exitDuration);
    return () => window.clearTimeout(timeout);
  }, [isOpen, exitDuration]);

  return isMounted;
}
