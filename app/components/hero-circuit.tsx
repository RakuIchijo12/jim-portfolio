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
  { id: "l2", pts: [[-39, 62], [-27, 62], [-21, 56], [3, 56]] },
  { id: "b1", pts: [[-9, 38], [3, 38]] },
  { id: "b2", pts: [[-9, 41.5], [3, 41.5]] },
  { id: "b3", pts: [[-9, 45], [3, 45]] },
  { id: "y1", pts: [[-16, 81], [-9, 81], [-5, 77], [3, 77]] },
  { id: "r1", pts: [[113, 11], [106, 18], [93, 18]] },
  { id: "r2", pts: [[115, 46], [97, 46]] },
];

/* Where traces start on the board: a plated via at the outer end. */
const VIAS: Pt[] = [[-38, 18], [-39, 62], [113, 11], [115, 46], [-16, 81]];

/* Mounting holes in the board's corners. */
const HOLES: Pt[] = [[-38.5, -3.5], [114, -3.5], [-38.5, 104.5], [114, 104.5]];

/* The ball grid under the memory, wired to the frame by a three-line bus. */
const BGA: Pt[] = [];
for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) BGA.push([-34 + c * 4.5, 34 + r * 4]);

const toPath = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${(y * Y).toFixed(2)}`).join(" ");

/* Board outline in SVG units: a rounded panel the whole poster sits on. */
const BOARD = { x: -43, y: -9 * Y, w: 162, h: 120 * Y, r: 4 };

/** Gold plating: the base colour, a lit top edge and the shade beside it. */
const GOLD = "var(--ochre)";
const GOLD_HI = "#F6DE9C";
const SHADE = "rgba(0, 0, 0, 0.38)";

/** A tinned end cap on an SMD part. */
function Cap({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill="#CFC7B8" />
      <rect x={x} y={y} width={w} height={h} fill="url(#m-metal-h)" />
    </>
  );
}

export default function HeroCircuit({ play, progress }: { play: boolean; progress: MotionValue<number> }) {
  /* Leaving the hero, the board rides up with the frame and the chip slides off. */
  const boardY = useTransform(progress, [0, 1], ["0%", "-9%"]);
  const chipX = useTransform(progress, [0, 1], ["0%", "80%"]);

  const on = (target: Record<string, number | string | number[]>) => (play ? target : undefined);
  const draw = (i: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: on({ pathLength: 1, opacity: 1 }),
    transition: { duration: 0.9, ease, delay: 1 + i * 0.07 },
  });

  return (
    <m.div className="pcb" data-live={play} aria-hidden="true" style={{ y: boardY }}>
      <svg className="pcb__board" viewBox="-44 -18 164 195.4">
        {/* The substrate: solder mask over FR-4, a bevelled edge, silkscreen. */}
        <m.g initial={{ opacity: 0 }} animate={on({ opacity: 1 })} transition={{ duration: 1.2, ease, delay: 0.5 }}>
          <rect
            x={BOARD.x + 1.2}
            y={BOARD.y + 1.8}
            width={BOARD.w}
            height={BOARD.h}
            rx={BOARD.r}
            fill="#000"
            opacity="0.3"
          />
          <rect x={BOARD.x} y={BOARD.y} width={BOARD.w} height={BOARD.h} rx={BOARD.r} className="pcb__mask" />
          <rect x={BOARD.x} y={BOARD.y} width={BOARD.w} height={BOARD.h} rx={BOARD.r} fill="url(#m-sheen)" opacity="0.5" />
          <rect
            x={BOARD.x + 0.3}
            y={BOARD.y + 0.3}
            width={BOARD.w - 0.6}
            height={BOARD.h - 0.6}
            rx={BOARD.r - 0.3}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.14"
            strokeWidth="0.5"
          />
          <rect
            x={BOARD.x + 3.2}
            y={BOARD.y + 3.2}
            width={BOARD.w - 6.4}
            height={BOARD.h - 6.4}
            rx={BOARD.r - 1.5}
            fill="none"
            className="pcb__keepout"
          />
          {HOLES.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y * Y} r="3" fill={GOLD} />
              <circle cx={x} cy={y * Y} r="3" fill="url(#m-dome)" />
              <circle cx={x} cy={y * Y} r="1.7" className="pcb__drill" />
            </g>
          ))}
          <text x="109" y={(104.5 * Y + 0.9).toFixed(2)} className="pcb__silk" textAnchor="end">
            JDR-01 REV 2026
          </text>
        </m.g>

        {TRACES.map((t, i) => {
          const d = toPath(t.pts);
          return (
            <g key={t.id} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <m.path d={d} stroke={SHADE} strokeWidth="1.25" transform="translate(0.25 0.35)" {...draw(i)} />
              <m.path d={d} stroke={GOLD} strokeWidth="1.1" {...draw(i)} />
              <m.path d={d} stroke={GOLD_HI} strokeWidth="0.32" strokeOpacity="0.75" transform="translate(0 -0.28)" {...draw(i)} />
            </g>
          );
        })}

        {/* SMD parts on the traces: a 0805 resistor, a ceramic capacitor and
            a 25 MHz crystal in its metal can. */}
        <m.g initial={{ opacity: 0 }} animate={on({ opacity: 1 })} transition={{ duration: 0.6, delay: 1.7 }}>
          <rect x="-33" y={18 * Y - 1.2} width="6" height="3.2" rx="0.5" fill="#000" opacity="0.35" />
          <rect x="-33.5" y={18 * Y - 1.6} width="6" height="3.2" rx="0.5" fill="#1A1714" />
          <rect x="-33.5" y={18 * Y - 1.6} width="6" height="3.2" rx="0.5" fill="url(#m-sheen)" />
          <Cap x={-33.5} y={18 * Y - 1.6} w={1.3} h={3.2} />
          <Cap x={-28.8} y={18 * Y - 1.6} w={1.3} h={3.2} />
          <text x="-30.5" y={18 * Y + 0.65} className="pcb__code" textAnchor="middle">103</text>

          <rect x="-35.5" y={62 * Y - 1.2} width="5.2" height="3.4" rx="0.6" fill="#000" opacity="0.35" />
          <rect x="-36" y={62 * Y - 1.7} width="5.2" height="3.4" rx="0.6" fill="#B07A4E" />
          <rect x="-36" y={62 * Y - 1.7} width="5.2" height="3.4" rx="0.6" fill="url(#m-sheen)" />
          <Cap x={-36} y={62 * Y - 1.7} w={1.2} h={3.4} />
          <Cap x={-32} y={62 * Y - 1.7} w={1.2} h={3.4} />

          <rect x="-29.3" y={81 * Y - 2.4} width="11" height="5" rx="2.4" fill="#000" opacity="0.35" />
          <rect x="-30" y={81 * Y - 3} width="11" height="5" rx="2.4" fill="#C9C2B4" />
          <rect x="-30" y={81 * Y - 3} width="11" height="5" rx="2.4" fill="url(#m-metal-h)" />
          <rect x="-29.2" y={81 * Y - 2.2} width="9.4" height="3.4" rx="1.7" fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="0.3" />
          <path d={`M-19 ${(81 * Y).toFixed(2)} H-16`} stroke={GOLD} strokeWidth="1.1" strokeLinecap="round" />

          <text x="-33.5" y={18 * Y - 3.2} className="pcb__silk">R1</text>
          <text x="-36" y={62 * Y - 3.4} className="pcb__silk">C1</text>
          <text x="-30" y={81 * Y - 4.6} className="pcb__silk">Y1 / 25MHz</text>
          <text x="-34" y={34 * Y - 3.4} className="pcb__silk">J1 / MEM</text>
        </m.g>

        {VIAS.map(([x, y], i) => (
          <m.g
            key={`${x}-${y}`}
            initial={{ scale: 0 }}
            animate={on({ scale: 1 })}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 1.5 + i * 0.08 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={x} cy={y * Y} r="2.2" fill={GOLD} />
            <circle cx={x} cy={y * Y} r="2.2" fill="url(#m-dome)" />
            <circle cx={x} cy={y * Y} r="1" className="pcb__drill" />
          </m.g>
        ))}

        {/* Gold BGA landing pads, each a tiny lit dome. */}
        <g>
          {BGA.map(([x, y], i) => (
            <m.g
              key={`${x}-${y}`}
              initial={{ opacity: 0 }}
              animate={on({ opacity: 1 })}
              transition={{ duration: 0.4, delay: 1.4 + (i % 6) * 0.04 + Math.floor(i / 6) * 0.06 }}
            >
              <circle cx={x} cy={y * Y} r="1.45" fill={GOLD} />
              <circle cx={x} cy={y * Y} r="1.45" fill="url(#m-dome)" />
            </m.g>
          ))}
        </g>
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
          <Chip pins={8} body="#1A1714" pin="#CFC7B8" mark="rgba(240, 233, 220, 0.55)" label="JDR-2026" />
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
