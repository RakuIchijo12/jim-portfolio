"use client";

import { useRef } from "react";
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/**
 * An endless band that speeds up with scroll velocity and turns around when
 * the page scrolls back up. One transform on one track per frame, and the
 * loop idles while the band is off screen.
 */
export default function Marquee({
  children,
  duration = 30,
  direction = 1,
  copies = 3,
  className = "",
}: {
  children: React.ReactNode;
  /** Seconds for one copy of the content to pass at rest. */
  duration?: number;
  /** 1 travels left, -1 travels right. */
  direction?: 1 | -1;
  copies?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px 0px" });
  const reduce = useReducedMotion();

  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [-2400, 0, 2400], [-5, 0, 5], { clamp: false });
  const heading = useRef(1);

  const span = 100 / copies;
  const x = useTransform(base, (v) => `${wrap(-span, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return;
    const dt = Math.min(delta, 64) / 1000;
    const b = boost.get();
    if (b < -0.05) heading.current = -1;
    else if (b > 0.05) heading.current = 1;
    const step = direction * heading.current * (span / duration) * dt * (1 + Math.abs(b));
    base.set(base.get() - step);
  });

  return (
    <div ref={ref} className={`marquee ${className}`}>
      <m.div className="marquee__track" style={{ x }}>
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="marquee__group" aria-hidden={i > 0 ? true : undefined}>
            {children}
          </div>
        ))}
      </m.div>
    </div>
  );
}
