"use client";

import { useEffect, type RefObject } from "react";

/**
 * Marks an element `is-offscreen` while it is out of view, so its CSS loops
 * (orbits, rotating badges) pause instead of spinning unseen.
 */
export function useOffscreenPause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-offscreen", !entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
