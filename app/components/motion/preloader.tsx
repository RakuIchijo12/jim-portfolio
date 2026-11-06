"use client";

import { m } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { introStore } from "./intro";
import { useLenis } from "./smooth-scroll";
import { projects, totalTechnologies } from "@/app/lib/data";
import { LogoMark } from "@/app/components/ui/glyphs";

/* Power-on self test, one line per stage. They print on a CSS delay. */
const POST = [
  "CPU: full-stack engineer, 2+ years",
  `Memory: ${totalTechnologies} technologies loaded`,
  `Mounted /projects (${projects.length} shipped)`,
  "Started portfolio.service",
];

const lift = [0.76, 0, 0.24, 1] as const;
const COUNT_MS = 1050;

const noop = () => () => {};
const seenOnClient = () => document.documentElement.classList.contains("intro-seen");

/**
 * First visit of the session, as a boot screen: the self test prints, a
 * progress bar runs to 100 and the screen slides away to reveal the hero.
 * The boot script in the layout hides this before hydration when it has
 * already played this session, or when the visitor asks for reduced motion.
 */
export default function Preloader() {
  const seen = useSyncExternalStore(noop, seenOnClient, () => false);
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
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
    }, 2400);

    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) countRef.current.textContent = `${Math.round(eased * 100)}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
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
    <m.div
      className="boot"
      aria-hidden="true"
      initial={false}
      animate={{ y: exiting ? "-100%" : "0%" }}
      transition={{ duration: 0.75, ease: lift, delay: exiting ? 0.12 : 0 }}
      onAnimationComplete={exiting ? finish : undefined}
    >
      <m.div
        className="boot__screen"
        initial={false}
        animate={exiting ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: lift }}
      >
        <div className="boot__head">
          <LogoMark className="boot__mark" />
          <span>
            JDR-BIOS v26.11
            <span className="hidden sm:inline"> / Jimuel Dave Rodado</span>
          </span>
          <span className="boot__right">Davao City, PH</span>
        </div>

        <ol className="boot__log">
          {POST.map((line, i) => (
            <li key={line} style={{ "--i": i } as React.CSSProperties}>
              <span className="boot__ok">[ OK ]</span> {line}
            </li>
          ))}
        </ol>

        <div className="boot__foot">
          <span className="boot__bar">
            <span ref={barRef} className="boot__fill" />
          </span>
          <span ref={countRef} className="boot__count">
            0%
          </span>
        </div>
      </m.div>
    </m.div>
  );
}
