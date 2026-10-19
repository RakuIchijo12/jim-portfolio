"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Chip,
  DIGIT_SEGMENTS,
  FanBlades,
  FanFrame,
  Gate,
  SEGMENTS,
  squareWavePath,
  type Segment,
} from "@/app/components/ui/circuit";

type P = { p: MotionValue<number> };

/** An LED that a motion value switches: a dim lens with a lit overlay. */
function SwitchedLed({ lit, color }: { lit: MotionValue<number>; color: string }) {
  return (
    <span className="led led--off" style={{ "--led": color } as React.CSSProperties}>
      <m.span className="led__lit" style={{ opacity: lit }} />
    </span>
  );
}

/* 1. Eight LEDs counting the scroll in binary, with a hex readout. */
function CounterLed({ value, bit }: { value: MotionValue<number>; bit: number }) {
  const lit = useTransform(value, (n): number => ((n >> bit) & 1 ? 1 : 0));
  return <SwitchedLed lit={lit} color="#D6AB52" />;
}

function BinaryCounter({ p }: P) {
  const value = useTransform(p, (v) => Math.min(255, Math.max(0, Math.floor(v * 256))));
  const hex = useTransform(value, (n) => `0x${n.toString(16).toUpperCase().padStart(2, "0")}`);
  return (
    <>
      <div className="spec-counter">
        {Array.from({ length: 8 }, (_, i) => (
          <CounterLed key={i} value={value} bit={7 - i} />
        ))}
      </div>
      <m.span className="spec-readout">{hex}</m.span>
      <span className="frieze__tag">D1:D8 / Binary</span>
    </>
  );
}

/* 2. A two-digit seven-segment display counting 00 to 99. */
function Seg({ value, place, seg, x }: { value: MotionValue<number>; place: number; seg: Segment; x: number }) {
  const opacity = useTransform(value, (n) => {
    const digit = Math.floor(n / place) % 10;
    return DIGIT_SEGMENTS[digit].includes(seg) ? 1 : 0.1;
  });
  return <m.path d={SEGMENTS[seg]} transform={`translate(${x} 0)`} style={{ opacity }} />;
}

function SevenSeg({ p }: P) {
  const value = useTransform(p, (v) => Math.min(99, Math.max(0, Math.floor(v * 100))));
  const segs = Object.keys(SEGMENTS) as Segment[];
  return (
    <>
      <svg className="spec-seg" viewBox="0 0 126 100" aria-hidden="true">
        {segs.map((s) => (
          <Seg key={`t-${s}`} value={value} place={10} seg={s} x={2} />
        ))}
        {segs.map((s) => (
          <Seg key={`o-${s}`} value={value} place={1} seg={s} x={66} />
        ))}
      </svg>
      <span className="frieze__tag">DS1 / 7-segment</span>
    </>
  );
}

/* 3. An AND gate stepping through its truth table: A, B in, Q out. */
function AndGate({ p }: P) {
  const step = useTransform(p, (v) => Math.min(7, Math.max(0, Math.floor(v * 8))) % 4);
  const a = useTransform(step, (s): number => (s & 1 ? 1 : 0));
  const b = useTransform(step, (s): number => (s & 2 ? 1 : 0));
  const q = useTransform(step, (s): number => (s === 3 ? 1 : 0));
  return (
    <>
      <div className="spec-gate">
        <Gate kind="and" body="var(--ink)" lead="var(--ink)" />
        <span className="spec-gate__in spec-gate__in--a">
          <SwitchedLed lit={a} color="#D0714D" />
        </span>
        <span className="spec-gate__in spec-gate__in--b">
          <SwitchedLed lit={b} color="#D0714D" />
        </span>
        <span className="spec-gate__out">
          <SwitchedLed lit={q} color="#F0E9DC" />
        </span>
      </div>
      <span className="frieze__tag">U2A / A AND B</span>
    </>
  );
}

/* 4. An oscilloscope trace: a clock signal sliding across a graticule. */
function Scope({ p }: P) {
  const x = useTransform(p, [0, 1], ["0%", "-50%"]);
  const wave = squareWavePath(8);
  return (
    <>
      <div className="spec-scope">
        <m.svg className="spec-scope__wave" viewBox="0 0 160 36" preserveAspectRatio="none" style={{ x }} aria-hidden="true">
          {/* Phosphor bloom under the trace */}
          <path d={wave} fill="none" stroke="currentColor" strokeWidth="9" strokeOpacity="0.16" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          <path d={wave} fill="none" stroke="currentColor" strokeWidth="2.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </m.svg>
      </div>
      <span className="frieze__tag">CH1 / Clock</span>
    </>
  );
}

/* 5. The quad AND chip that holds the gate above, turning as you pass. */
function DipChip({ p }: P) {
  const rotate = useTransform(p, [0, 1], [-28, 28]);
  const y = useTransform(p, [0, 1], ["8%", "-8%"]);
  return (
    <>
      <m.div className="spec-chip" style={{ rotate, y }}>
        <Chip pins={7} body="var(--ink)" label="74HC08" />
      </m.div>
      <span className="frieze__tag">U3 / 74HC08</span>
    </>
  );
}

/* 6. A capacitor charging as the band passes, with its voltage. */
function Capacitor({ p }: P) {
  const charge = useTransform(p, [0.1, 0.8], [0, 1], { clamp: true });
  const volts = useTransform(charge, (c) => `${(c * 5).toFixed(1)}V`);
  return (
    <>
      <div className="spec-cap">
        <span className="spec-cap__body">
          <m.span className="spec-cap__charge" style={{ scaleY: charge }} />
          <span className="spec-cap__stripe" />
        </span>
        <span className="spec-cap__legs" />
      </div>
      <m.span className="spec-readout">{volts}</m.span>
      <span className="frieze__tag">
        C3 / 470<span className="normal-case">&micro;</span>F
      </span>
    </>
  );
}

/* 7. A case fan spinning up with the scroll. */
function CaseFan({ p }: P) {
  const rotate = useTransform(p, [0, 1], [0, 1080]);
  return (
    <>
      <div className="spec-fan">
        <FanFrame />
        <m.div className="spec-fan__blades" style={{ rotate }}>
          <FanBlades />
        </m.div>
      </div>
      <span className="frieze__tag">FAN1 / 12V</span>
    </>
  );
}

/* 8. A signal pulse travelling a routed net from via to via. */
const NET: [number, number][] = [
  [14, 76],
  [42, 76],
  [58, 60],
  [58, 34],
  [86, 34],
];

function Net({ p }: P) {
  const stops = [0, 0.3, 0.45, 0.62, 0.9];
  const x = useTransform(p, stops, NET.map(([px]) => `${px}cqw`));
  const y = useTransform(p, stops, NET.map(([, py]) => `${py}cqh`));
  const d = NET.map(([px, py], i) => `${i ? "L" : "M"}${px} ${py}`).join(" ");
  return (
    <>
      <svg className="spec-net" viewBox="0 0 100 100" aria-hidden="true">
        <path d={d} fill="none" stroke="#D6AB52" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
        {[NET[0], NET[NET.length - 1]].map(([px, py]) => (
          <circle key={px} cx={px} cy={py} r="5.2" fill="var(--ink)" stroke="#D6AB52" strokeWidth="2.6" />
        ))}
      </svg>
      <m.span className="spec-net__pulse led" style={{ x, y }} />
      <span className="frieze__tag">NET 01 / Signal</span>
    </>
  );
}

/**
 * Computer engineering in eight parts, between the sections: every part is
 * driven by one scroll value, so the band counts, switches, charges and
 * spins together as it passes through the screen. Poster colours, fixed in
 * both themes.
 */
export default function Frieze() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="frieze" aria-hidden="true">
      <div className="frieze__cell frieze__cell--teal"><BinaryCounter p={p} /></div>
      <div className="frieze__cell frieze__cell--ink"><SevenSeg p={p} /></div>
      <div className="frieze__cell frieze__cell--ochre"><AndGate p={p} /></div>
      <div className="frieze__cell frieze__cell--scope"><Scope p={p} /></div>
      <div className="frieze__cell frieze__cell--terra"><DipChip p={p} /></div>
      <div className="frieze__cell frieze__cell--olive"><Capacitor p={p} /></div>
      <div className="frieze__cell frieze__cell--paper"><CaseFan p={p} /></div>
      <div className="frieze__cell frieze__cell--ink"><Net p={p} /></div>
    </div>
  );
}
