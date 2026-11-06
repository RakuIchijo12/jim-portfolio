"use client";

import { useRef } from "react";
import { useOffscreenPause } from "@/app/components/ui/use-offscreen";

/* A UART capture, computed once at build time. TX sends a greeting, RX
   answers, and the clock ticks under both: each frame is a start bit, eight
   data bits (least significant first) and a stop bit, idling high. */
const TX_TEXT = "HELLO WORLD";
const RX_TEXT = "200 OK";
const LEAD = 2;
const RX_AT = 48;
const UNITS = LEAD + TX_TEXT.length * 10 + 2;
const U = 10;
const HI = 3;
const LO = 17;

function frameBits(ch: string) {
  const code = ch.charCodeAt(0);
  return [0, ...Array.from({ length: 8 }, (_, b) => (code >> b) & 1), 1];
}

function uart(text: string, at: number) {
  const levels = Array<number>(UNITS).fill(1);
  Array.from(text).forEach((ch, k) => {
    frameBits(ch).forEach((bit, j) => {
      const i = at + k * 10 + j;
      if (i < UNITS) levels[i] = bit;
    });
  });
  return levels;
}

/** Levels to a stepped path: horizontal runs joined by vertical edges. */
function stepPath(levels: number[], unit: number) {
  let d = `M0 ${levels[0] ? HI : LO}`;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] !== levels[i - 1]) d += ` H${i * unit} V${levels[i] ? HI : LO}`;
  }
  return `${d} H${levels.length * unit}`;
}

const CLK = stepPath(
  Array.from({ length: UNITS * 2 }, (_, i) => (i % 2 === 0 ? 1 : 0)),
  U / 2,
);
const TX = stepPath(uart(TX_TEXT, LEAD), U);
const RX = stepPath(uart(RX_TEXT, RX_AT), U);

type Frame = { ch: string; left: number; width: number };

const frames = (text: string, at: number): Frame[] =>
  Array.from(text).map((ch, k) => ({
    ch,
    left: ((at + k * 10) / UNITS) * 100,
    width: (10 / UNITS) * 100,
  }));

const TX_FRAMES = frames(TX_TEXT, LEAD);
const RX_FRAMES = frames(RX_TEXT, RX_AT);

const hex = (ch: string) => `0x${ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")}`;

function Trace({ d, tone }: { d: string; tone: "clk" | "tx" | "rx" }) {
  return (
    <svg className={`logic__wave logic__wave--${tone}`} viewBox={`0 0 ${UNITS * U} 20`} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Decode({ items }: { items: Frame[] }) {
  return (
    <div className="logic__decode" aria-hidden="true">
      {items.map((f, i) => (
        <span key={i} className="logic__frame" style={{ left: `${f.left}%`, width: `${f.width}%` }}>
          <b>{f.ch === " " ? "SP" : f.ch}</b>
          <i>{hex(f.ch)}</i>
        </span>
      ))}
    </div>
  );
}

/**
 * A logic analyzer between the hero and the about section: three channels
 * of a real UART exchange, decoded underneath, with a cursor sweeping the
 * capture. Static SVG; the only motion is one transform on the cursor, and
 * it rests while the band is off screen.
 */
export default function Frieze() {
  const ref = useRef<HTMLElement>(null);
  useOffscreenPause(ref);

  return (
    <section
      ref={ref}
      className="logic"
      aria-label={`Logic analyzer capture: TX sends "${TX_TEXT}", RX answers "${RX_TEXT}"`}
    >
      <div className="wrap">
        <div className="logic__panel">
          <div className="logic__head">
            <span className="logic__title">
              <span aria-hidden="true" className="pulse-dot" /> Logic analyzer
            </span>
            <span className="hidden sm:inline">3 ch / UART 9600 8N1</span>
            <span className="logic__msg">
              TX <b>&quot;{TX_TEXT}&quot;</b>
              <span className="hidden md:inline">
                {" "}
                / RX <b>&quot;{RX_TEXT}&quot;</b>
              </span>
            </span>
          </div>

          <div className="logic__body" aria-hidden="true">
            <div className="logic__labels">
              <span>CLK</span>
              <span>TX</span>
              <span className="logic__label--dim">dec</span>
              <span>RX</span>
              <span className="logic__label--dim">dec</span>
            </div>
            <div className="logic__traces">
              <Trace d={CLK} tone="clk" />
              <Trace d={TX} tone="tx" />
              <Decode items={TX_FRAMES} />
              <Trace d={RX} tone="rx" />
              <Decode items={RX_FRAMES} />
              <span className="logic__cursor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
