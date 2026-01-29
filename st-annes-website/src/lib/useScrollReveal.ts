import { useEffect, useRef } from "react";

/**
 * Observes all .reveal-on-scroll elements inside the ref and adds .is-visible when they enter the viewport.
 * Use with class "reveal-on-scroll" for CSS-driven fade-in-up.
 */
export function useObserveReveal(options?: { rootMargin?: string; threshold?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rootMargin = "0px 0px -6% 0px", threshold = 0 } = options ?? {};

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = container.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { rootMargin, threshold }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return containerRef;
}
