"use client";

import { m } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { introStore } from "./intro";
import { useLenis } from "./smooth-scroll";

const lift = [0.76, 0, 0.24, 1] as const;
const COLS = [0, 1, 2, 3, 4];
const COUNT_MS = 1300;

const noop = () => () => {};
const seenOnClient = () => document.documentElement.classList.contains("intro-seen");
const pop = { type: "spring", stiffness: 260, damping: 17 } as const;

/**
 * First visit of the session: a counter runs to 100 while three Bauhaus
 * primitives pop in, then an ink layer and a terracotta layer lift away in
 * staggered columns to uncover the hero. The boot script in the layout hides
 * this before hydration when it has already played, or when the visitor asks
 * for reduced motion.
 */
export default function Preloader() {
  const seen = useSyncExternalStore(noop, seenOnClient, () => false);
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");
  const countRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    // Read the class, not `seen`: during hydration `seen` still holds the
    // server value, and acting on it would lock the page under a hidden intro.
    const root = document.documentElement;
    if (root.classList.contains("intro-seen")) {
      introStore.set(true);
      return;
    }

    root.classList.add("is-intro");

    let counted = false;
    let fontsReady = false;
    let raf = 0;
    const start = performance.now();

    const tryExit = () => {
      if (!counted || !fontsReady) return;
      setPhase("exit");
      introStore.set(true);
    };

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      fontsReady = true;
      tryExit();
    });
    const failsafe = window.setTimeout(() => {
      fontsReady = true;
      tryExit();
    }, 2600);

    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      }
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        counted = true;
        tryExit();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      root.classList.remove("is-intro");
    };
  }, []);

  // Hold the page still while the intro owns the screen.
  useEffect(() => {
    if (!lenis || phase === "done") return;
    if (document.documentElement.classList.contains("intro-seen")) return;
    lenis.stop();
  }, [lenis, phase]);

  const finish = () => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* private mode: the intro simply plays again next time */
    }
    const root = document.documentElement;
    root.classList.remove("is-intro");
    root.classList.add("intro-seen");
    lenis?.start();
    setPhase("done");
  };

  if (seen || phase === "done") return null;

  const exiting = phase === "exit";

  return (
    <div className="preloader" aria-hidden="true">
      {/* Under layer: terracotta, lifts second. */}
      <div className="preloader__cols">
        {COLS.map((i) => (
          <m.span
            key={i}
            className="preloader__col preloader__col--terra"
            style={{ transformOrigin: "50% 0%" }}
            initial={false}
            animate={{ scaleY: exiting ? 0 : 1 }}
            transition={{ duration: 0.85, ease: lift, delay: exiting ? 0.2 + i * 0.06 : 0 }}
            onAnimationComplete={exiting && i === COLS.length - 1 ? finish : undefined}
          />
        ))}
      </div>

      {/* Top layer: ink, lifts first. */}
      <div className="preloader__cols">
        {COLS.map((i) => (
          <m.span
            key={i}
            className="preloader__col preloader__col--ink"
            style={{ transformOrigin: "50% 0%" }}
            initial={false}
            animate={{ scaleY: exiting ? 0 : 1 }}
            transition={{ duration: 0.75, ease: lift, delay: exiting ? i * 0.06 : 0 }}
          />
        ))}
      </div>

      <m.div
        className="preloader__content"
        initial={false}
        animate={exiting ? { opacity: 0, y: -28 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: lift }}
      >
        <div className="t-label flex items-start justify-between gap-6">
          <span>Jimuel Dave Rodado</span>
          <span>Portfolio &copy;2026</span>
        </div>

        <div className="preloader__shapes">
          <m.span
            className="sh sh-circle"
            style={{ background: "var(--brand-terra)" }}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.1 }}
          />
          <m.span
            className="sh"
            style={{ background: "#D6AB52" }}
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.28 }}
          />
          <m.span
            className="sh sh-tri"
            style={{ background: "#A3936A" }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.46 }}
          />
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="t-label max-w-[15rem] opacity-70">
            Software engineer, Davao City. Building calm software for busy institutions.
          </p>
          <span ref={countRef} className="preloader__count">
            000
          </span>
        </div>
      </m.div>
    </div>
  );
}
