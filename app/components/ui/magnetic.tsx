"use client";

import { useCallback, useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

/**
 * Pulls its child a little toward the pointer, then springs back.
 * Fine-pointer only — on touch it is an inert wrapper.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 240, damping: 20, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (event.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <m.span
      ref={ref}
      className={`inline-flex ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x: sx, y: sy }}
    >
      {children}
    </m.span>
  );
}
