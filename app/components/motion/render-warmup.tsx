"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useIntroDone } from "./intro";

/** Frames each block stays rendered while it is measured. */
const FRAMES = 4;

/** Run `cb` when the main thread is free; returns a cancel function. */
function whenIdle(cb: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(cb, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(cb, 150);
  return () => window.clearTimeout(id);
}

/**
 * `.defer-render` blocks skip rendering while they are far from the screen,
 * and until one has rendered once its height is only a stand-in. Once the
 * page settles, this renders each block for a few frames, one block per
 * idle slot, so the browser remembers its real height: the scrollbar and
 * in-page jumps are then exact, and the page is never laid out all at once.
 * It runs again when the route or the viewport width changes.
 */
export default function RenderWarmup() {
  const pathname = usePathname();
  const introDone = useIntroDone();

  useEffect(() => {
    if (!introDone) return;

    let cancelIdle = () => {};
    let raf = 0;
    let resizeTimer = 0;
    let width = window.innerWidth;

    const run = () => {
      cancelIdle();
      cancelAnimationFrame(raf);
      const queue = Array.from(document.querySelectorAll<HTMLElement>(".defer-render"));

      const step = () => {
        const el = queue.shift();
        if (!el) return;
        el.style.contentVisibility = "visible";
        // Keep it rendered for a few frames, long enough for anything that
        // sizes itself once it can measure (the fitted cover names) to
        // settle, so the size the browser records is the final one.
        let frames = FRAMES;
        const hold = () => {
          if (--frames > 0) {
            raf = requestAnimationFrame(hold);
            return;
          }
          el.style.contentVisibility = "";
          cancelIdle = whenIdle(step);
        };
        raf = requestAnimationFrame(hold);
      };

      cancelIdle = whenIdle(step);
    };

    // Width changes reflow text; height-only changes (mobile toolbars) do not.
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(run, 400);
    };

    run();
    window.addEventListener("resize", onResize);

    return () => {
      cancelIdle();
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.querySelectorAll<HTMLElement>(".defer-render").forEach((el) => {
        el.style.contentVisibility = "";
      });
    };
  }, [pathname, introDone]);

  return null;
}
