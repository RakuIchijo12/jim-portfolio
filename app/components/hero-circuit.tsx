"use client";

import { m, useTransform, type MotionValue } from "framer-motion";
import { Chip, Led } from "@/app/components/ui/circuit";
import { ease } from "@/app/components/ui/reveal";

/*
 * The hero portrait as the processor on a board. Coordinates are in percent
 * of the photo frame (x of its width, y of its height); the SVG below maps
 * them to uniform units with Y = 1.5031 (the frame's height over its width),
 * so strokes and vias stay round.
 */
const Y = 1.5031;
type Pt = [number, number];

const TRACES: { id: string; pts: Pt[] }[] = [
  { id: "l1", pts: [[-38, 18], [-24, 18], [-18, 24], [3, 24]] },
  { id: "l2", pts: [[-41, 62], [-27, 62], [-21, 56], [3, 56]] },
  { id: "b1", pts: [[-9, 38], [3, 38]] },
  { id: "b2", pts: [[-9, 41.5], [3, 41.5]] },
  { id: "b3", pts: [[-9, 45], [3, 45]] },
  { id: "r1", pts: [[113, 11], [106, 18], [93, 18]] },
  { id: "r2", pts: [[117, 46], [97, 46]] },
];

/* Where traces start on the board: a via at the outer end. */
const VIAS: Pt[] = [[-38, 18], [-41, 62], [113, 11], [117, 46]];

/* The ball grid under the memory, wired to the frame by a three-line bus. */
const BGA: Pt[] = [];
for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) BGA.push([-34 + c * 4.5, 34 + r * 4]);

const toPath = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${(y * Y).toFixed(2)}`).join(" ");

/** Copper, gold on ink and on paper alike. */
const COPPER = "var(--ochre)";

export default function HeroCircuit({ play, progress }: { play: boolean; progress: MotionValue<number> }) {
  /* Leaving the hero, the board rides up with the frame and the chip slides off. */
  const boardY = useTransform(progress, [0, 1], ["0%", "-9%"]);
  const chipX = useTransform(progress, [0, 1], ["0%", "80%"]);
  const gridY = useTransform(progress, [0, 1], ["0%", "-45%"]);

  const on = (target: Record<string, number | string | number[]>) => (play ? target : undefined);

  return (
    <m.div className="pcb" data-live={play} aria-hidden="true" style={{ y: boardY }}>
      <svg className="pcb__board" viewBox="-44 -18 164 195.4">
        <g fill="none" stroke={COPPER} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((t, i) => (
            <m.path
              key={t.id}
              d={toPath(t.pts)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={on({ pathLength: 1, opacity: 1 })}
              transition={{ duration: 0.9, ease, delay: 1 + i * 0.07 }}
            />
          ))}
        </g>

        {/* SMD parts sitting on the left traces: a resistor and a capacitor */}
        <m.g
          initial={{ opacity: 0 }}
          animate={on({ opacity: 1 })}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          <rect x="-33.5" y={18 * Y - 1.6} width="6" height="3.2" rx="0.5" fill="var(--fg)" />
          <rect x="-33.5" y={18 * Y - 1.6} width="1.4" height="3.2" fill="#CFC7B8" />
          <rect x="-28.9" y={18 * Y - 1.6} width="1.4" height="3.2" fill="#CFC7B8" />
          <rect x="-36" y={62 * Y - 1.7} width="5.2" height="3.4" rx="0.6" fill="#B07A4E" />
          <rect x="-36" y={62 * Y - 1.7} width="1.3" height="3.4" fill="#CFC7B8" />
          <rect x="-32.1" y={62 * Y - 1.7} width="1.3" height="3.4" fill="#CFC7B8" />
          <text x="-33.5" y={18 * Y - 3.2} className="pcb__silk">R1</text>
          <text x="-36" y={62 * Y - 3.4} className="pcb__silk">C1</text>
          <text x="-34" y={34 * Y - 3.4} className="pcb__silk">J1 / MEM</text>
        </m.g>

        {VIAS.map(([x, y], i) => (
          <m.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y * Y}
            r="1.9"
            fill="var(--bg)"
            stroke={COPPER}
            strokeWidth="0.95"
            initial={{ scale: 0 }}
            animate={on({ scale: 1 })}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 1.5 + i * 0.08 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}

        <m.g style={{ y: gridY }}>
          {BGA.map(([x, y], i) => (
            <m.circle
              key={`${x}-${y}`}
              cx={x}
              cy={y * Y}
              r="1.35"
              fill="none"
              stroke={COPPER}
              strokeWidth="0.7"
              initial={{ opacity: 0 }}
              animate={on({ opacity: 0.85 })}
              transition={{ duration: 0.4, delay: 1.4 + (i % 6) * 0.04 + Math.floor(i / 6) * 0.06 }}
            />
          ))}
        </m.g>
      </svg>

      {/* Signal pulses running along the copper into the frame */}
      <span className="pcb__pulse pcb__pulse--l1" />
      <span className="pcb__pulse pcb__pulse--l2" />
      <span className="pcb__pulse pcb__pulse--r2" />

      {/* U1, wired to the frame's right edge, with its power LED */}
      <m.div className="pcb__chip" style={{ x: chipX }}>
        <m.div
          initial={{ opacity: 0, x: "60%" }}
          animate={on({ opacity: 1, x: "0%" })}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 1.1 }}
        >
          <Chip pins={8} body="var(--fg)" pin="var(--subtle)" mark="var(--bg)" label="JDR-2026" />
          <span className="pcb__silk-html pcb__silk-html--u1">U1</span>
        </m.div>
      </m.div>

      <m.div
        className="pcb__led"
        initial={{ opacity: 0 }}
        animate={on({ opacity: [0, 1, 0.2, 1, 0.5, 1] })}
        transition={{ duration: 1.1, delay: 1.9, times: [0, 0.2, 0.35, 0.55, 0.7, 1] }}
      >
        <Led color="#D0714D" blink />
        <span className="pcb__silk-html">PWR</span>
      </m.div>
    </m.div>
  );
}
