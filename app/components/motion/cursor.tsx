"use client";

import { AnimatePresence, m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Mode = {
  kind: "hidden" | "idle" | "link" | "label" | "text";
  label?: string;
  /** Optional disc and text colours, for labels over strong colour fields. */
  bg?: string;
  fg?: string;
};

const LABEL_BG = "rgba(187, 97, 63, 1)";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

const INTERACTIVE = "[data-cursor], a, button, [role='button'], label, input, textarea, select, summary";

function resolve(target: EventTarget | null): Mode {
  const el = target instanceof Element ? target.closest<HTMLElement>(INTERACTIVE) : null;
  if (!el) return { kind: "idle" };
  const tag = el.getAttribute("data-cursor");
  if (tag === "none") return { kind: "hidden" };
  if (tag) {
    return {
      kind: "label",
      label: tag,
      bg: el.getAttribute("data-cursor-bg") ?? undefined,
      fg: el.getAttribute("data-cursor-fg") ?? undefined,
    };
  }
  if (el.matches("input, textarea, select")) return { kind: "text" };
  return { kind: "link" };
}

const SIZE = { hidden: 0, idle: 30, link: 62, label: 96, text: 8 } as const;

/** Mouse-only follower. Touch devices and reduced motion never mount it. */
export default function Cursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);
  return enabled ? <Follower /> : null;
}

function Follower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 650, damping: 45, mass: 0.35 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const [mode, setMode] = useState<Mode>({ kind: "hidden" });
  const [pressed, setPressed] = useState(false);
  const key = useRef("hidden");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const apply = (next: Mode) => {
      const nextKey = next.kind + (next.label ?? "") + (next.bg ?? "") + (next.fg ?? "");
      if (nextKey === key.current) return;
      key.current = nextKey;
      setMode(next);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (key.current === "hidden") {
        // First sighting: appear under the pointer instead of flying in.
        sx.jump(event.clientX);
        sy.jump(event.clientY);
        apply(resolve(event.target));
      }
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse") apply(resolve(event.target));
    };
    const onLeave = () => apply({ kind: "hidden" });
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y, sx, sy]);

  const isLabel = mode.kind === "label";
  const size = SIZE[mode.kind];

  return (
    <m.div
      className="cursor"
      data-blend={!isLabel}
      style={{ x: sx, y: sy }}
      animate={{ scale: pressed ? 0.82 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      aria-hidden="true"
    >
      <m.div
        className="cursor__blob"
        initial={false}
        animate={{
          width: size,
          height: size,
          opacity: mode.kind === "hidden" ? 0 : 1,
          backgroundColor: isLabel
            ? (mode.bg ?? LABEL_BG)
            : mode.kind === "link" || mode.kind === "text"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 255, 255, 0)",
          boxShadow: isLabel
            ? "inset 0 0 0 0px rgba(255, 255, 255, 0)"
            : "inset 0 0 0 1.5px rgba(255, 255, 255, 1)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.6 }}
      >
        <AnimatePresence>
          {isLabel && (
            <m.span
              key={mode.label}
              className="cursor__label"
              style={mode.fg ? { color: mode.fg } : undefined}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              {mode.label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}
