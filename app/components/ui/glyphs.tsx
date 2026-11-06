/**
 * Hardware and system glyphs for the engineer theme: the seven-segment logo
 * mark, a line icon per stack layer, a small IC, a smart-card contact chip
 * and a barcode. Flat line work in currentColor, so each one follows the
 * theme and costs a few hundred bytes.
 */

/* Seven-segment "J." on a dark tile, the same mark as the favicon. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`mark ${className}`} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0E0F12" />
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" />
      <g transform="translate(6.35 0) skewX(-8)">
        <g fill="#ECEEF1" fillOpacity=".1">
          <path d="M18.1 10.3 L21.4 7 H33.1 L36.4 10.3 L33.1 13.6 H21.4 Z" />
          <path d="M16.8 11.6 L20.1 14.9 V27.4 L16.8 30.7 L13.5 27.4 V14.9 Z" />
          <path d="M18.1 32 L21.4 28.7 H33.1 L36.4 32 L33.1 35.3 H21.4 Z" />
        </g>
        <g fill="#ECEEF1">
          <path d="M37.7 11.6 L41 14.9 V27.4 L37.7 30.7 L34.4 27.4 V14.9 Z" />
          <path d="M37.7 33.3 L41 36.6 V49.1 L37.7 52.4 L34.4 49.1 V36.6 Z" />
          <path d="M18.1 53.7 L21.4 50.4 H33.1 L36.4 53.7 L33.1 57 H21.4 Z" />
          <path d="M16.8 33.3 L20.1 36.6 V49.1 L16.8 52.4 L13.5 49.1 V36.6 Z" />
        </g>
      </g>
      <circle cx="46.9" cy="52.4" r="4.4" fill="#FF8A3D" className="mark__led" />
    </svg>
  );
}

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
} as const;

export type GroupId = "frontend" | "backend" | "database" | "languages" | "ai" | "tools";

/** One line icon per layer of the stack. */
export function GroupGlyph({ id, className = "h-5 w-5" }: { id: GroupId; className?: string }) {
  switch (id) {
    case "frontend":
      return (
        <svg aria-hidden="true" className={className} {...line}>
          <rect x="2.5" y="4" width="19" height="14" rx="2" />
          <path d="M2.5 8h19M5.5 6h.01M8 6h.01M9 21h6M12 18v3" />
        </svg>
      );
    case "backend":
      return (
        <svg aria-hidden="true" className={className} {...line}>
          <rect x="3" y="3.5" width="18" height="7" rx="1.5" />
          <rect x="3" y="13.5" width="18" height="7" rx="1.5" />
          <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
        </svg>
      );
    case "database":
      return (
        <svg aria-hidden="true" className={className} {...line}>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
          <path d="M4.5 5.5v13c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13" />
          <path d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
        </svg>
      );
    case "languages":
      return (
        <svg aria-hidden="true" className={className} {...line}>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
        </svg>
      );
    case "ai":
      return (
        <svg aria-hidden="true" className={className} {...line}>
          <circle cx="5" cy="6" r="1.8" />
          <circle cx="5" cy="18" r="1.8" />
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="19" cy="6" r="1.8" />
          <circle cx="19" cy="18" r="1.8" />
          <path d="M6.6 7.2 10.2 10.6M6.6 16.8l3.6-3.4M13.8 10.6l3.6-3.4M13.8 13.4l3.6 3.4" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" className={className} {...line}>
          <rect x="2.5" y="4" width="19" height="16" rx="2" />
          <path d="m6.5 9 3 3-3 3M12 15h5" />
        </svg>
      );
  }
}

/** A small quad-flat IC: a body, pins on all four sides, a pin-1 dot. */
export function IcGlyph({ className = "", label = "U1" }: { className?: string; label?: string }) {
  const pins = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="currentColor" opacity="0.55">
        {pins.map((i) => (
          <g key={i}>
            <rect x={18 + i * 8} y="4" width="3.2" height="8" rx="0.8" />
            <rect x={18 + i * 8} y="52" width="3.2" height="8" rx="0.8" />
            <rect x="4" y={18 + i * 8} width="8" height="3.2" rx="0.8" />
            <rect x="52" y={18 + i * 8} width="8" height="3.2" rx="0.8" />
          </g>
        ))}
      </g>
      <rect x="12" y="12" width="40" height="40" rx="5" fill="var(--panel-3)" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="19" cy="19" r="2" fill="var(--accent)" />
      <text x="32" y="36" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="currentColor">
        {label}
      </text>
    </svg>
  );
}

/** The gold contact pad of a smart card. */
export function EmvChip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 34" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="emv-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4D58D" />
          <stop offset="0.5" stopColor="#C99A3E" />
          <stop offset="1" stopColor="#8C6420" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="43" height="33" rx="6" fill="url(#emv-gold)" stroke="#6E4E19" strokeOpacity="0.5" />
      <g fill="none" stroke="#6E4E19" strokeOpacity="0.55" strokeWidth="1.1">
        <path d="M0.5 12H14M0.5 22H14M30 12H43.5M30 22H43.5M22 0.5V9M22 25V33.5" />
        <rect x="14" y="9" width="16" height="16" rx="3" />
      </g>
    </svg>
  );
}

/** A barcode drawn from a string, so it is stable from build to build. */
export function Barcode({ value, className = "" }: { value: string; className?: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    for (let b = 0; b < 4; b++) {
      const w = ((code >> b) & 3) + 1;
      bars.push({ x, w });
      x += w + (((code >> (b + 2)) & 1) + 1);
    }
  }
  return (
    <svg viewBox={`0 0 ${x} 20`} preserveAspectRatio="none" className={className} aria-hidden="true">
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x} y="0" width={bar.w} height="20" fill="currentColor" />
      ))}
    </svg>
  );
}
