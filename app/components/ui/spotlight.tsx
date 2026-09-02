"use client";

import { useCallback, useRef } from "react";

/**
 * Publishes the pointer's position inside an element as `--mx` / `--my`,
 * which `.spotlight` in globals.css reads to place its wash and edge light.
 * Spread the result onto any element that also carries the `spotlight` class.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}

/** #rrggbb → rgba(), so a per-item accent can drive the spotlight tint. */
export function alpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** A div that lights up under the pointer. `tint` overrides the gold default. */
export default function SpotlightCard({
  children,
  className = "",
  tint,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  tint?: string;
  style?: React.CSSProperties;
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight ${className}`}
      style={
        tint
          ? ({
              ...style,
              "--spot-soft": alpha(tint, 0.16),
              "--spot-line": alpha(tint, 0.85),
            } as React.CSSProperties)
          : style
      }
    >
      {children}
    </div>
  );
}
