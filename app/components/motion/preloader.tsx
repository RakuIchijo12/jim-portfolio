"use client";

import { m } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { introStore } from "./intro";
import { useLenis } from "./smooth-scroll";
import { Chip, Gate } from "@/app/components/ui/circuit";

/* Power-on self test: the line under the counter as the boot runs. */
const POST = ["Checking memory", "Loading modules", "Booting portfolio"];

const lift = [0.76, 0, 0.24, 1] as const;
const COLS = [0, 1, 2, 3, 4];
const COUNT_MS = 1300;

const noop = () => () => {};
const seenOnClient = () => document.documentElement.classList.contains("intro-seen");
const pop = { type: "spring", stiffness: 260, damping: 17 } as const;

/**
 * First visit of the session, as a boot screen: a counter runs to 100 while
 * an LED, a chip and a gate pop in and the power-on self test reads out,
 * then an ink layer and a terracotta layer lift away in staggered columns to
 * uncover the hero. The boot script in the layout hides
 * this before hydration when it has already played, or when the visitor asks
 * for reduced motion.
 */
export default function Preloader() {
  const seen = useSyncExternalStore(noop, seenOnClient, () => false);
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");
  const countRef = useRef<HTMLSpanElement>(null);
  const postRef = useRef<HTMLSpanElement>(null);
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
      if (postRef.current) {
        postRef.current.textContent = POST[Math.min(POST.length - 1, Math.floor(eased * POST.length))];
      }
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
          <span>
            JDR-BIOS v26.10<span className="hidden sm:inline"> / Jimuel Dave Rodado</span>
          </span>
          <span>Portfolio &copy;2026</span>
        </div>

        {/* The three primitives, wired up: an LED, a chip and a gate */}
        <div className="preloader__shapes">
          <m.span
            className="preloader__part"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.1 }}
          >
            <span className="led led--blink preloader__led" style={{ "--led": "#D0714D" } as React.CSSProperties} />
          </m.span>
          <m.span
            className="preloader__part"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.28 }}
          >
            <Chip pins={5} body="#D6AB52" pin="#F0E9DC" mark="rgba(20, 18, 15, 0.5)" label="JDR" />
          </m.span>
          <m.span
            className="preloader__part"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.46 }}
          >
            <Gate kind="not" body="#A3936A" lead="#A3936A" hole="#11100E" />
          </m.span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="t-label max-w-[15rem]">
            <span className="opacity-70">POST /</span> <span ref={postRef}>{POST[0]}</span>
            <span className="preloader__caret" aria-hidden="true" />
          </p>
          <span ref={countRef} className="preloader__count">
            000
          </span>
        </div>
      </m.div>
    </div>
  );
}
