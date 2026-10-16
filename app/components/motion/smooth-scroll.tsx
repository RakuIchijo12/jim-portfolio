"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createStore } from "@/app/lib/store";

const lenisStore = createStore<Lenis | null>(null);

export function useLenis() {
  return useSyncExternalStore(lenisStore.subscribe, lenisStore.get, () => null);
}

const expoOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Scroll to an element, selector or offset, eased by Lenis when it is running. */
export function scrollToTarget(
  target: string | number | HTMLElement,
  { offset = 0, immediate = false }: { offset?: number; immediate?: boolean } = {},
) {
  const lenis = lenisStore.get();
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: 1.6, easing: expoOut, force: true });
    return;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = immediate || reduce ? "auto" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior });
}

/**
 * Inertial wheel scrolling. Lenis is ticked from Framer Motion's frame loop,
 * so the scroll position and every scroll-linked transform are written in the
 * same frame and parallax layers never shimmer against each other. Touch keeps
 * native scrolling, and reduced motion keeps the browser's own scroll.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, stopInertiaOnNavigate: true });
    const tick = (data: { timestamp: number }) => lenis.raf(data.timestamp);
    frame.update(tick, true);
    lenisStore.set(lenis);

    return () => {
      cancelFrame(tick);
      lenis.destroy();
      lenisStore.set(null);
    };
  }, []);

  // A new route has new content: remeasure, and start at the top unless the
  // URL points into the page.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const lenis = lenisStore.get();
    if (!lenis) return;
    lenis.resize();
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
