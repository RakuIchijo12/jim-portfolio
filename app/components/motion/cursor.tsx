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

/* Side of the bracket frame around the hotspot, per mode. */
const SIZE = { hidden: 12, idle: 20, link: 34, label: 26, text: 12 } as const;

/* The glyph after each tag's verb, like a hint in a command line. */
const GLYPH: Record<string, string> = { open: "↗", view: "↗", zoom: "+", next: "→", prev: "←" };

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
  /* Viewfinder brackets around the hotspot: quiet at rest, opened out and
     amber over a link, tight over media while the tag names the action,
     gone over text fields where the I-beam takes over. */
  const framed = mode.kind === "idle" || mode.kind === "link" || isLabel;
  const verb = (mode.label ?? "").toLowerCase();
  const tagStyle = {
    ...(mode.bg ? { "--tag-bg": mode.bg } : {}),
    ...(mode.fg ? { "--tag-fg": mode.fg } : {}),
  } as React.CSSProperties;

  return (
    <m.div
      className="cursor"
      data-mode={mode.kind}
      style={{ x: sx, y: sy }}
      animate={{ scale: pressed ? 0.8 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      aria-hidden="true"
    >
      <m.div
        className="cursor__frame"
        initial={false}
        animate={{ width: size, height: size, opacity: framed ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.5 }}
      />
      {/* Over media the native pointer is hidden, so a pixel marks the spot. */}
      <span className="cursor__dot" />
      <AnimatePresence>
        {isLabel && (
          <m.span
            key={verb}
            className="cursor__tag"
            style={tagStyle}
            initial={{ opacity: 0, x: -6, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="cursor__prompt">$</span>
            {verb}
            {GLYPH[verb] && <span className="cursor__glyph">{GLYPH[verb]}</span>}
          </m.span>
        )}
      </AnimatePresence>
    </m.div>
  );
}
