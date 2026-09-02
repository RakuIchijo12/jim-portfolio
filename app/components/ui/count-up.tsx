"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Counts from 0 to `value` when it scrolls into view.
 *
 * The final number is what renders on the server, so crawlers and no-JS
 * visitors see the real figure; the client rewrites `textContent` during the
 * animation rather than holding the tween in React state.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1400,
  className = "",
  style,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView) return;
    const el = numRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast out of the gate, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = String(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.textContent = String(value); };
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      <span ref={numRef}>{value}</span>
      {suffix}
    </span>
  );
}
