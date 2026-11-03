/**
 * Shared paint for the parts in circuit.tsx, defined once per document.
 *
 * Every part keeps its flat base colour (from props, so the palette still
 * rules) and gets one of these laid over it as a light-and-shade pass:
 * moulded epoxy, tinned metal, a domed lens, a cylinder, a sheet of glass.
 * They are grey-and-alpha only, so they light any colour underneath, and
 * they use the default objectBoundingBox units, so one gradient shades a
 * single pin or a whole board the same way.
 *
 * Mounted in the root layout. Not display:none: a hidden <defs> host stops
 * gradients resolving in some browsers.
 */
export default function MaterialDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      <defs>
        {/* Moulded body lit from the top left: a soft key and a falling shadow. */}
        <linearGradient id="m-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.24" />
          <stop offset="0.32" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.34" />
        </linearGradient>

        {/* The same light for long, flat things: top lit, bottom in shade. */}
        <linearGradient id="m-sheen-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>

        {/* Tinned or plated metal, banded across its thickness. -h for parts
            lying horizontally (light runs top to bottom), -v for upright ones. */}
        <linearGradient id="m-metal-h" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="0.22" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.05" />
          <stop offset="0.78" stopColor="#000" stopOpacity="0.38" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="m-metal-v" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="0.22" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.05" />
          <stop offset="0.78" stopColor="#000" stopOpacity="0.38" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>

        {/* A cylinder standing up: dark edges, a hot line a third of the way in. */}
        <linearGradient id="m-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="0.18" stopColor="#000" stopOpacity="0.08" />
          <stop offset="0.32" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>

        {/* A sphere or domed lens: specular top left, terminator bottom right. */}
        <radialGradient id="m-dome" cx="0.36" cy="0.3" r="0.78">
          <stop offset="0" stopColor="#fff" stopOpacity="0.62" />
          <stop offset="0.28" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.62" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.42" />
        </radialGradient>

        {/* A pressed-in dimple, the pin-one mark: shade top left, light bottom right. */}
        <radialGradient id="m-dimple" cx="0.62" cy="0.66" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>

        {/* Glass over a display: one diagonal glare band and a dim lower edge. */}
        <linearGradient id="m-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.26" />
          <stop offset="0.34" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>

        {/* The shadow just under a screen's bezel lip. */}
        <linearGradient id="m-recess" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.42" />
          <stop offset="0.16" stopColor="#000" stopOpacity="0" />
          <stop offset="0.9" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  );
}
