/**
 * The site's component library: electronics drawn as inline SVG, so they
 * take the palette from props or currentColor and cost nothing over the
 * wire. Bauhaus primitives, rewired: circles are LEDs and vias, squares are
 * chips, triangles are gates, lines are copper traces.
 *
 * Each part is lit like the real thing: its flat base colour, then a light
 * pass from the shared materials in material-defs.tsx (moulded epoxy,
 * tinned metal, domed lenses, glass) and a contact shadow where it sits on
 * the board. Schematic symbols stay flat line drawings, as on paper.
 */

type GlyphProps = {
  className?: string;
  style?: React.CSSProperties;
};

const svg = (viewBox: string, { className, style }: GlyphProps) => ({
  viewBox,
  className,
  style,
  "aria-hidden": true as const,
  focusable: "false" as const,
});

/* Tinned pins and the faint laser marking on epoxy. */
const PIN = "#CFC7B8";
const MARK = "rgba(240, 233, 220, 0.6)";

/* Shared light passes, by id in material-defs.tsx. */
const SHEEN = "url(#m-sheen)";
const SHEEN_V = "url(#m-sheen-v)";
const METAL_H = "url(#m-metal-h)";
const METAL_V = "url(#m-metal-v)";
const CYL = "url(#m-cyl)";
const DOME = "url(#m-dome)";
const DIMPLE = "url(#m-dimple)";
const GLASS = "url(#m-glass)";
const RECESS = "url(#m-recess)";

/** The soft dark a part leaves on the board under it. */
const SHADOW = { fill: "#000", opacity: 0.28 } as const;

/* ── Packages ─────────────────────────────────────────────────────────── */

/**
 * Dual in-line chip, standing upright: epoxy body, tinned pins on both long
 * sides, the moulded notch and the pin-one dimple. The drawing grows taller
 * with the pin count (14 units a pin), so set only its width and let the
 * height follow.
 */
export function Chip({
  pins = 4,
  body = "currentColor",
  pin = PIN,
  mark = MARK,
  label,
  ...rest
}: GlyphProps & { pins?: number; body?: string; pin?: string; mark?: string; label?: string }) {
  const h = pins * 14 + 16;
  const bh = h - 16;
  const legs = Array.from({ length: pins }, (_, i) => 11 + i * 14);
  const pinRects = (fill: string) =>
    legs.map((y) => (
      <g key={y} fill={fill}>
        <rect x="5" y={y} width="20" height="8" rx="1.6" />
        <rect x="75" y={y} width="20" height="8" rx="1.6" />
      </g>
    ));
  return (
    <svg {...svg(`0 0 100 ${h}`, rest)}>
      <rect x="22.5" y="11" width="60" height={bh} rx="5" {...SHADOW} />
      {pinRects(pin)}
      {pinRects(METAL_H)}
      {/* Where each leg enters the moulding, it sits in shade. */}
      <g fill="#000" opacity="0.32">
        {legs.map((y) => (
          <g key={y}>
            <rect x="17" y={y} width="4" height="8" />
            <rect x="79" y={y} width="4" height="8" />
          </g>
        ))}
      </g>
      <rect x="20" y="8" width="60" height={bh} rx="5" fill={body} />
      <rect x="20" y="8" width="60" height={bh} rx="5" fill={SHEEN} />
      {/* The moulded top, a step in from the parting line. */}
      <rect x="23" y="11" width="54" height={bh - 6} rx="3.4" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" />
      <path d="M42 8 a8 8 0 0 0 16 0 Z" fill="#000" opacity="0.3" />
      <path d="M42 8 a8 8 0 0 0 16 0 Z" fill={DIMPLE} />
      <circle cx="31" cy="21" r="3.6" fill="#000" opacity="0.22" />
      <circle cx="31" cy="21" r="3.6" fill={DIMPLE} />
      {label && (
        <text
          x="50"
          y={h / 2 + 3}
          transform={`rotate(-90 50 ${h / 2 + 3})`}
          textAnchor="middle"
          dominantBaseline="middle"
          className="glyph-label"
          fill={mark}
        >
          {label}
        </text>
      )}
    </svg>
  );
}

/**
 * Quad flat package, the processor look: gull-wing pins on all four sides
 * around a nickel heat spreader.
 */
export function Cpu({
  body = "currentColor",
  pin = PIN,
  die = "#D6AB52",
  mark = MARK,
  ...rest
}: GlyphProps & { body?: string; pin?: string; die?: string; mark?: string }) {
  const n = 7;
  const pitch = 56 / n;
  const ticks = Array.from({ length: n }, (_, i) => 22 + pitch * (i + 0.5) - 2.3);
  const vertical = (fill: string) =>
    ticks.map((t) => (
      <g key={t} fill={fill}>
        <rect x={t} y="5" width="4.6" height="16" rx="1" />
        <rect x={t} y="79" width="4.6" height="16" rx="1" />
      </g>
    ));
  const horizontal = (fill: string) =>
    ticks.map((t) => (
      <g key={t} fill={fill}>
        <rect x="5" y={t} width="16" height="4.6" rx="1" />
        <rect x="79" y={t} width="16" height="4.6" rx="1" />
      </g>
    ));
  return (
    <svg {...svg("0 0 100 100", rest)}>
      <rect x="20.5" y="21" width="64" height="64" rx="5" {...SHADOW} />
      {vertical(pin)}
      {vertical(METAL_V)}
      {horizontal(pin)}
      {horizontal(METAL_H)}
      <rect x="18" y="18" width="64" height="64" rx="5" fill={body} />
      <rect x="18" y="18" width="64" height="64" rx="5" fill={SHEEN} />
      <rect x="21" y="21" width="58" height="58" rx="3.4" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
      {/* Heat spreader: its own shadow, the plate, a bevel catching the light. */}
      <rect x="34" y="35" width="34" height="34" rx="2.5" fill="#000" opacity="0.3" />
      <rect x="33" y="33" width="34" height="34" rx="2.5" fill={die} />
      <rect x="33" y="33" width="34" height="34" rx="2.5" fill={SHEEN} />
      <rect x="33.6" y="33.6" width="32.8" height="32.8" rx="2" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.8" />
      <path d="M38 44 H62 M38 50 H62 M38 56 H62" stroke={body} strokeWidth="1.6" opacity="0.3" />
      <circle cx="26.5" cy="26.5" r="3" fill={mark} opacity="0.5" />
      <circle cx="26.5" cy="26.5" r="3" fill={DIMPLE} />
    </svg>
  );
}

/* ── Logic ────────────────────────────────────────────────────────────── */

export type GateKind = "and" | "nand" | "or" | "xor" | "not" | "buffer";

/** A logic gate as a moulded body with tinned leads; inputs on the left, output on the right. */
export function Gate({
  kind = "and",
  body = "currentColor",
  lead = "currentColor",
  hole = "var(--bg)",
  ...rest
}: GlyphProps & { kind?: GateKind; body?: string; lead?: string; hole?: string }) {
  const single = kind === "not" || kind === "buffer";
  const bubble = kind === "nand" || kind === "not";
  const shapes: Record<GateKind, string> = {
    and: "M30 8 H62 A32 32 0 0 1 62 72 H30 Z",
    nand: "M28 8 H58 A32 32 0 0 1 58 72 H28 Z",
    or: "M26 8 Q62 8 96 40 Q62 72 26 72 Q42 40 26 8 Z",
    xor: "M32 8 Q66 8 98 40 Q66 72 32 72 Q48 40 32 8 Z",
    not: "M30 10 L82 40 L30 70 Z",
    buffer: "M30 10 L86 40 L30 70 Z",
  };
  const outFrom = { and: 94, nand: 103, or: 96, xor: 98, not: 96, buffer: 86 }[kind];
  const leads = single
    ? "M4 40 H32"
    : kind === "or" || kind === "xor"
      ? "M4 24 H38 M4 56 H38"
      : "M4 24 H32 M4 56 H32";
  const out = `M${outFrom} 40 H116`;
  return (
    <svg {...svg("0 0 120 80", rest)}>
      <path d={shapes[kind]} transform="translate(2.5 3)" {...SHADOW} />
      <g stroke={lead} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d={leads} />
        <path d={out} />
        {kind === "xor" && <path d="M22 8 Q38 40 22 72" />}
      </g>
      {/* A glint along the top of each round lead. */}
      <g stroke="#fff" strokeOpacity="0.42" strokeWidth="1.3" strokeLinecap="round" fill="none" transform="translate(0 -1.2)">
        <path d={leads} />
        <path d={out} />
      </g>
      <path d={shapes[kind]} fill={body} />
      <path d={shapes[kind]} fill={SHEEN} />
      {bubble && (
        <>
          <circle cx={kind === "nand" ? 96 : 89} cy="40" r="6.5" fill={hole} stroke={body} strokeWidth="4.5" />
          <circle cx={kind === "nand" ? 96 : 89} cy="40" r="8.75" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

/* ── Passives, as schematic symbols ───────────────────────────────────── */

const sch = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function SchResistor(props: GlyphProps) {
  return (
    <svg {...svg("0 0 108 40", props)}>
      <path {...sch} strokeWidth="4" d="M2 20 H20 L26 7 L38 33 L50 7 L62 33 L74 7 L86 33 L90 20 H106" />
    </svg>
  );
}

export function SchCapacitor(props: GlyphProps) {
  return (
    <svg {...svg("0 0 108 40", props)}>
      <path {...sch} strokeWidth="4" d="M2 20 H46 M62 20 H106" />
      <path {...sch} strokeWidth="6" d="M46 4 V36 M62 4 V36" />
    </svg>
  );
}

export function SchDiode(props: GlyphProps) {
  return (
    <svg {...svg("0 0 108 40", props)}>
      <path {...sch} strokeWidth="4" d="M2 20 H40 M68 20 H106" />
      <path d="M40 5 L66 20 L40 35 Z" fill="currentColor" />
      <path {...sch} strokeWidth="5" d="M68 5 V35" />
    </svg>
  );
}

export function SchLed(props: GlyphProps) {
  return (
    <svg {...svg("0 -6 108 46", props)}>
      <path {...sch} strokeWidth="4" d="M2 24 H36 M64 24 H106" />
      <path d="M36 10 L62 24 L36 38 Z" fill="currentColor" />
      <path {...sch} strokeWidth="5" d="M64 10 V38" />
      <path {...sch} strokeWidth="3.4" d="M56 8 L66 -2 M62 -2 H66 V2 M66 12 L76 2 M72 2 H76 V6" />
    </svg>
  );
}

export function SchGround(props: GlyphProps) {
  return (
    <svg {...svg("0 0 40 40", props)}>
      <path {...sch} strokeWidth="4" d="M20 2 V17 M5 17 H35 M10.5 26 H29.5 M16 35 H24" />
    </svg>
  );
}

export function SchGate({ kind = "and", ...props }: GlyphProps & { kind?: GateKind }) {
  const body =
    kind === "not"
      ? "M28 8 L70 26 L28 44 Z"
      : kind === "or"
        ? "M24 6 Q54 6 80 26 Q54 46 24 46 Q36 26 24 6 Z"
        : "M28 6 H52 A20 20 0 0 1 52 46 H28 Z";
  return (
    <svg {...svg("0 0 108 52", props)}>
      <path {...sch} strokeWidth="4" d={kind === "not" ? "M2 26 H28" : "M2 16 H30 M2 36 H30"} />
      <path {...sch} strokeWidth="4" d={body} />
      {kind === "not" ? (
        <>
          <circle cx="77" cy="26" r="6" {...sch} strokeWidth="4" />
          <path {...sch} strokeWidth="4" d="M83 26 H106" />
        </>
      ) : (
        <path {...sch} strokeWidth="4" d={kind === "or" ? "M80 26 H106" : "M72 26 H106"} />
      )}
    </svg>
  );
}

/** IEC power symbol: the broken ring and the bar. */
export function PowerSymbol(props: GlyphProps) {
  return (
    <svg {...svg("0 0 100 100", props)}>
      <path {...sch} strokeWidth="8" d="M68.4 24.4 A34 34 0 1 1 31.6 24.4 M50 8 V48" />
    </svg>
  );
}

/** A whole little circuit: battery, resistor, LED and an open switch on one loop. */
export function SchCircuit({ led = "currentColor", ...props }: GlyphProps & { led?: string }) {
  return (
    <svg {...svg("0 -12 240 116", props)}>
      <g {...sch} strokeWidth="3.4">
        {/* Wires, broken where each part sits */}
        <path d="M20 46 V20 H70 M130 20 H150 M178 20 H220 V90 H142 M98 90 H20 V58" />
        {/* Battery: long and short plates */}
        <path strokeWidth="4.6" d="M6 46 H34 M13 58 H27" />
        {/* Resistor */}
        <path d="M70 20 L75 9 L85 31 L95 9 L105 31 L115 9 L125 31 L130 20" />
        {/* Switch, open; .sch-switch lets a hover close it */}
        <path className="sch-switch" d="M101 88 L136 72" />
      </g>
      <circle cx="98" cy="90" r="3.6" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="142" cy="90" r="3.6" fill="none" stroke="currentColor" strokeWidth="3" />
      {/* LED: diode body and its two light arrows */}
      <g className="sch-led">
        <path d="M150 7 L174 20 L150 33 Z" fill={led} />
        <path {...sch} stroke={led} strokeWidth="4.2" d="M176 7 V33" />
        <path {...sch} stroke={led} strokeWidth="2.8" d="M166 4 L174 -4 M170 -4 H174 V0 M174 8 L182 0 M178 0 H182 V4" />
      </g>
    </svg>
  );
}

/** A run of clock pulses, `periods` long, 20 units per period. */
export function squareWavePath(periods: number, top = 6, bottom = 30) {
  let d = `M0 ${bottom}`;
  for (let i = 0; i < periods; i++) {
    const x = i * 20;
    d += ` H${x + 5} V${top} H${x + 15} V${bottom}`;
  }
  return `${d} H${periods * 20}`;
}

export function SquareWave({ periods = 6, ...props }: GlyphProps & { periods?: number }) {
  return (
    <svg {...svg(`0 0 ${periods * 20} 36`, props)} preserveAspectRatio="none">
      <path {...sch} strokeWidth="3.4" d={squareWavePath(periods)} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Heartbeat trace, for the healthcare work: a scope line with one QRS complex. */
export function Ecg(props: GlyphProps) {
  return (
    <svg {...svg("0 0 120 60", props)}>
      <path
        {...sch}
        strokeWidth="4.5"
        pathLength={1}
        className="ecg-line"
        d="M2 34 H30 L36 28 L42 34 H50 L56 6 L64 56 L70 34 H80 L88 24 L96 34 H118"
      />
    </svg>
  );
}

/* ── Boards and machines ──────────────────────────────────────────────── */

/** GPS mast with signal arcs: the IoT tracker work. */
export function Antenna({ body = "currentColor", ...rest }: GlyphProps & { body?: string }) {
  return (
    <svg {...svg("0 0 100 100", rest)}>
      <path d="M50 34 L66 96 H34 Z" transform="translate(3 2)" {...SHADOW} />
      <path d="M50 34 L66 96 H34 Z" fill={body} />
      <path d="M50 34 L66 96 H34 Z" fill={CYL} />
      <path d="M41 70 H59 M44 54 H56" stroke="var(--glyph-hole, rgba(0,0,0,0.28))" strokeWidth="3" />
      <circle cx="50" cy="28" r="7" fill={body} />
      <circle cx="50" cy="28" r="7" fill={DOME} />
      <g {...sch} stroke={body} strokeWidth="6">
        <path d="M34 14 A22 22 0 0 0 34 42 M66 14 A22 22 0 0 1 66 42" />
        <path d="M22 4 A36 36 0 0 0 22 52 M78 4 A36 36 0 0 1 78 52" />
      </g>
    </svg>
  );
}

/** RFID keycard: the card, its gold contact chip and the antenna coil. */
export function Keycard({
  body = "currentColor",
  chip = "#D6AB52",
  coil = "var(--glyph-hole, rgba(0,0,0,0.3))",
  ...rest
}: GlyphProps & { body?: string; chip?: string; coil?: string }) {
  return (
    <svg {...svg("0 0 100 100", rest)}>
      <rect x="7" y="21" width="92" height="64" rx="9" {...SHADOW} />
      <rect x="4" y="18" width="92" height="64" rx="9" fill={body} />
      <rect x="4" y="18" width="92" height="64" rx="9" fill={SHEEN} />
      <rect x="4.6" y="18.6" width="90.8" height="62.8" rx="8.4" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.9" />
      {/* Contact plate: six gold pads parted by fine gaps. */}
      <rect x="14" y="36" width="22" height="18" rx="3.5" fill={chip} />
      <rect x="14" y="36" width="22" height="18" rx="3.5" fill={METAL_H} />
      <path d="M14 42 H22 M28 42 H36 M14 48 H22 M28 48 H36 M22 36 V54 M28 36 V54" stroke="#000" strokeOpacity="0.32" strokeWidth="1.1" />
      <g fill="none" stroke={coil} strokeWidth="3">
        <rect x="46" y="28" width="40" height="44" rx="6" />
        <rect x="52" y="34" width="28" height="32" rx="4" />
        <rect x="58" y="40" width="16" height="20" rx="2.5" />
      </g>
    </svg>
  );
}

/** Server rack: four recessed units with lit status LEDs and vents. */
export function ServerRack({
  body = "currentColor",
  unit = "var(--glyph-hole, rgba(0,0,0,0.28))",
  led = "#D0714D",
  ...rest
}: GlyphProps & { body?: string; unit?: string; led?: string }) {
  return (
    <svg {...svg("0 0 100 100", rest)}>
      <rect x="19" y="7" width="68" height="92" rx="6" {...SHADOW} />
      <rect x="16" y="4" width="68" height="92" rx="6" fill={body} />
      <rect x="16" y="4" width="68" height="92" rx="6" fill={SHEEN} />
      <rect x="16.6" y="4.6" width="66.8" height="90.8" rx="5.4" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="0.9" />
      {[10, 31, 52, 73].map((y, i) => {
        const lit = i === 1 ? "#D6AB52" : led;
        return (
          <g key={y}>
            <rect x="23" y={y} width="54" height="16" rx="2.5" fill={unit} />
            <rect x="23" y={y} width="54" height="16" rx="2.5" fill={RECESS} />
            <circle cx="31" cy={y + 8} r="5.6" fill={lit} opacity="0.3" />
            <circle cx="31" cy={y + 8} r="3" fill={lit} />
            <circle cx="31" cy={y + 8} r="3" fill={DOME} />
            <circle cx="40" cy={y + 8} r="3" fill={body} />
            <circle cx="40" cy={y + 8} r="3" fill={DOME} />
            <path d={`M54 ${y + 5} H71 M54 ${y + 8} H71 M54 ${y + 11} H71`} stroke={body} strokeWidth="1.6" />
          </g>
        );
      })}
    </svg>
  );
}

/** Memory module: DRAM packages and passives on a board with gold fingers. */
export function DramStick({
  board = "currentColor",
  chip = "#14120F",
  gold = "#D6AB52",
  ...rest
}: GlyphProps & { board?: string; chip?: string; gold?: string }) {
  const outline = "M4 8 H196 V62 H128 V56 H118 V62 H4 Z";
  const packages = [16, 58, 132, 166];
  const fingers = Array.from({ length: 30 }, (_, i) => 10 + i * 6.2).filter((x) => x < 114 || x > 130);
  const fingerRects = (fill: string) => (
    <g fill={fill}>
      {fingers.map((x) => (
        <rect key={x} x={x} y="63" width="4" height="13" rx="0.8" />
      ))}
    </g>
  );
  return (
    <svg {...svg("0 0 200 80", rest)}>
      <path d={outline} transform="translate(2.5 3)" {...SHADOW} />
      <path d={outline} fill={board} />
      <path d={outline} fill={SHEEN_V} />
      {/* Silkscreen keep-out line and two decoupling capacitors. */}
      <path d="M10 13 H190" stroke={chip} strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 2" />
      {[100, 108].map((x) => (
        <g key={x}>
          <rect x={x} y="30" width="5" height="9" rx="0.6" fill="#B07A4E" />
          <rect x={x} y="30" width="5" height="2" fill={PIN} />
          <rect x={x} y="37" width="5" height="2" fill={PIN} />
        </g>
      ))}
      {packages.map((x) => (
        <g key={x}>
          {/* Leads along the top and bottom edges of each package. */}
          <g fill={PIN}>
            {Array.from({ length: 6 }, (_, i) => (
              <g key={i}>
                <rect x={x + 3 + i * 4.2} y="14" width="1.8" height="3" />
                <rect x={x + 3 + i * 4.2} y="49" width="1.8" height="3" />
              </g>
            ))}
          </g>
          <rect x={x + 1.2} y="17.6" width="28" height="34" rx="2" {...SHADOW} />
          <rect x={x} y="16" width="28" height="34" rx="2" fill={chip} />
          <rect x={x} y="16" width="28" height="34" rx="2" fill={SHEEN} />
          <circle cx={x + 5} cy="21" r="1.6" fill={DIMPLE} />
          <path d={`M${x + 7} 34 H${x + 21} M${x + 9} 38 H${x + 19}`} stroke="#fff" strokeOpacity="0.22" strokeWidth="1.1" />
        </g>
      ))}
      {fingerRects(gold)}
      {fingerRects(METAL_V)}
    </svg>
  );
}

/** A small neural network: input, hidden and output layers, fully connected. */
export function NeuralNet({
  node = "currentColor",
  edge = "currentColor",
  ...rest
}: GlyphProps & { node?: string; edge?: string }) {
  const layers = [
    [26, 50, 74],
    [16, 38, 62, 84],
    [36, 64],
  ];
  const xs = [16, 50, 84];
  const lines: string[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const a of layers[l]) for (const b of layers[l + 1]) lines.push(`M${xs[l]} ${a} L${xs[l + 1]} ${b}`);
  }
  return (
    <svg {...svg("0 0 100 100", rest)}>
      <path d={lines.join(" ")} stroke={edge} strokeWidth="2" opacity="0.55" fill="none" />
      {layers.map((ys, l) =>
        ys.map((y) => (
          <g key={`${l}-${y}`}>
            <circle cx={xs[l] + 1.2} cy={y + 1.6} r="7.5" {...SHADOW} />
            <circle cx={xs[l]} cy={y} r="7.5" fill={node} />
            <circle cx={xs[l]} cy={y} r="7.5" fill={DOME} />
            <circle cx={xs[l]} cy={y} r="2.6" fill="var(--glyph-hole, rgba(0,0,0,0.3))" />
          </g>
        )),
      )}
    </svg>
  );
}

/**
 * A 16 x 2 character LCD module, the first display everyone wires up: the
 * board with its plated header pads, the bezel, and an amber backlit screen
 * under glass whose unlit character cells still show. The second line ends
 * in a blinking cursor.
 */
export function LcdModule({
  board = "#21423F",
  screen = "#D6AB52",
  ink = "#14120F",
  pad = "#D6AB52",
  lines = ["HELLO, WORLD!", "> UI READY"],
  ...rest
}: GlyphProps & { board?: string; screen?: string; ink?: string; pad?: string; lines?: [string, string] }) {
  const cells = Array.from({ length: 16 }, (_, i) => 28 + i * 9.5);
  return (
    <svg {...svg("0 0 200 96", rest)}>
      <rect x="2" y="2" width="196" height="92" rx="5" fill={board} />
      <rect x="2" y="2" width="196" height="92" rx="5" fill={SHEEN} />
      {[
        [10, 10],
        [190, 10],
        [10, 86],
        [190, 86],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5.4" fill={pad} />
          <circle cx={x} cy={y} r="5.4" fill={DOME} />
          <circle cx={x} cy={y} r="3.4" fill="var(--glyph-hole, rgba(0,0,0,0.3))" />
        </g>
      ))}
      {cells.map((x) => (
        <g key={x}>
          <circle cx={x + 7} cy="10" r="2.6" fill={pad} />
          <circle cx={x + 7} cy="10" r="2.6" fill={DOME} />
          <circle cx={x + 7} cy="10" r="0.9" fill={ink} opacity="0.7" />
        </g>
      ))}
      {/* Bezel, with the light catching its top edge. */}
      <rect x="13.5" y="22" width="176" height="64" rx="3" {...SHADOW} />
      <rect x="12" y="20" width="176" height="64" rx="3" fill={ink} />
      <rect x="12" y="20" width="176" height="64" rx="3" fill={SHEEN_V} />
      <rect x="20" y="28" width="160" height="48" rx="1.5" fill={screen} />
      <rect x="20" y="28" width="160" height="48" rx="1.5" fill={RECESS} />
      {[34, 55].map((y) =>
        cells.map((x) => <rect key={`${x}-${y}`} x={x - 4} y={y} width="8" height="15" fill={ink} opacity="0.08" />),
      )}
      <g className="lcd-text" fill={ink} textAnchor="middle">
        {lines.map((line, row) =>
          Array.from(line).map((ch, i) => (
            <text key={`${row}-${i}`} x={cells[i]} y={row ? 67 : 46}>
              {ch}
            </text>
          )),
        )}
        <text className="lcd-cursor" x={cells[Math.min(15, lines[1].length)]} y="67">
          _
        </text>
      </g>
      <rect x="20" y="28" width="160" height="48" rx="1.5" fill={GLASS} />
    </svg>
  );
}

/* A case fan's square frame with the round throat cut through it. */
const FAN_FRAME =
  "M18 4 H82 A14 14 0 0 1 96 18 V82 A14 14 0 0 1 82 96 H18 A14 14 0 0 1 4 82 V18 A14 14 0 0 1 18 4 Z " +
  "M50 9 A41 41 0 1 0 50.01 9 Z";

/** Case fan frame: the moulded housing, its screw holes and the shroud lip. */
export function FanFrame({ body = "currentColor", ...rest }: GlyphProps & { body?: string }) {
  const screws = [
    [14, 14],
    [86, 14],
    [14, 86],
    [86, 86],
  ];
  return (
    <svg {...svg("0 0 100 100", rest)}>
      <path d={FAN_FRAME} fillRule="evenodd" fill={body} />
      <path d={FAN_FRAME} fillRule="evenodd" fill={SHEEN} />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="38.5" fill="none" stroke={body} strokeWidth="1.4" opacity="0.5" />
      {screws.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="4.6" fill="var(--glyph-hole, #F0E9DC)" />
          <circle cx={x} cy={y} r="4.6" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

/** Seven fan blades and the hub with its label, drawn on their own so they can spin. */
export function FanBlades({
  body = "currentColor",
  hub = "#BB613F",
  ...rest
}: GlyphProps & { body?: string; hub?: string }) {
  return (
    <svg {...svg("0 0 100 100", rest)}>
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} transform={`rotate(${(360 / 7) * i} 50 50)`}>
          <path d="M50 50 C52 34 60 22 74 20 C74 33 66 44 50 50 Z" fill={body} />
          <path d="M50 50 C52 34 60 22 74 20 C74 33 66 44 50 50 Z" fill={SHEEN} />
        </g>
      ))}
      <circle cx="50" cy="50" r="11" fill={body} />
      <circle cx="50" cy="50" r="7.6" fill={hub} />
      <circle cx="50" cy="50" r="11" fill={DOME} />
      <circle cx="50" cy="50" r="2" fill="var(--glyph-hole, rgba(0,0,0,0.3))" />
    </svg>
  );
}

/* ── Seven-segment digit ──────────────────────────────────────────────── */

export const SEGMENTS = {
  a: "M15 5 H45 L50 10 L45 15 H15 L10 10 Z",
  b: "M51 13 L56 18 V44 L51 49 L46 44 V18 Z",
  c: "M51 53 L56 58 V84 L51 89 L46 84 V58 Z",
  d: "M15 87 H45 L50 92 L45 97 H15 L10 92 Z",
  e: "M9 53 L14 58 V84 L9 89 L4 84 V58 Z",
  f: "M9 13 L14 18 V44 L9 49 L4 44 V18 Z",
  g: "M15 46 H45 L50 51 L45 56 H15 L10 51 Z",
} as const;

export type Segment = keyof typeof SEGMENTS;

/** Which segments light for each digit. */
export const DIGIT_SEGMENTS: Record<number, Segment[]> = {
  0: ["a", "b", "c", "d", "e", "f"],
  1: ["b", "c"],
  2: ["a", "b", "g", "e", "d"],
  3: ["a", "b", "g", "c", "d"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "g", "e", "d", "c"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

/* ── LED, as a styled element ─────────────────────────────────────────── */

/**
 * A round LED: a domed lens with a hot core, a dark rim, a glint and a soft
 * glow, drawn in CSS so it can sit inline with type. `--led` sets the
 * colour. Off LEDs keep the tinted lens and the glint, and lose the light.
 */
export function Led({
  color,
  off = false,
  blink = false,
  className = "",
  style,
}: GlyphProps & { color?: string; off?: boolean; blink?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`led${off ? " led--off" : ""}${blink ? " led--blink" : ""} ${className}`}
      style={color ? ({ ...style, "--led": color } as React.CSSProperties) : style}
    />
  );
}
