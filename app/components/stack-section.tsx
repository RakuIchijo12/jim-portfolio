"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, m, useInView } from "framer-motion";
import { stackGroups } from "@/app/lib/data";
import SectionHead from "@/app/components/ui/section-head";
import CountUp from "@/app/components/ui/count-up";
import { alpha, useSpotlight } from "@/app/components/ui/spotlight";

const ease = [0.22, 1, 0.36, 1] as const;

const AI_ICON_PATHS: Record<string, string> = {
  claude: "/ai-icons/claude-color.png",
  codex:  "/ai-icons/codex-color.png",
  openai: "/ai-icons/openai.png",
};

function iconSrc(icon: string, ai?: boolean) {
  return ai ? (AI_ICON_PATHS[icon] ?? `/stack-icons/${icon}.png`) : `/stack-icons/${icon}.png`;
}

/* `bleed` marks an asset that is a solid tile rather than a transparent
   mark — it fills the plate and takes its shape instead of floating in it. */
function StackIcon({ icon, ai, bleed }: { icon: string; ai?: boolean; bleed?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      src={iconSrc(icon, ai)}
      width={40}
      height={40}
      className={bleed ? "is-bleed" : undefined}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

type GroupId = (typeof stackGroups)[number]["id"];

const groupLabels: Record<GroupId, string> = {
  frontend:  "Frontend",
  backend:   "Backend",
  database:  "Database",
  languages: "Languages",
  ai:        "AI Tools",
  tools:     "Other Tools",
};

const groupBlurbs: Record<GroupId, string> = {
  frontend:  "Interfaces, design systems, and the browser runtime.",
  backend:   "Frameworks and services that run the server side.",
  database:  "Storage, querying, and managed data platforms.",
  languages: "The core languages everything else is written in.",
  ai:        "Assistants and models woven into the daily workflow.",
  tools:     "Version control, containers, editors, and delivery.",
};

const groupColors: Record<GroupId, string> = {
  frontend:  "#3A6A8F",
  backend:   "#C2A878",
  database:  "#2D8D6F",
  languages: "#A8705E",
  ai:        "#6B5B8A",
  tools:     "#7A7A8C",
};

const groupIds = stackGroups.map((g) => g.id as GroupId);
const totalCount = stackGroups.reduce((n, g) => n + g.items.length, 0);

export default function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });
  const [active, setActive] = useState<GroupId>("frontend");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const { ref: panelRef, onPointerMove: onPanelMove } = useSpotlight<HTMLDivElement>();

  const activeGroup = stackGroups.find((g) => g.id === active)!;
  const accent      = groupColors[active];

  /** Roving-focus arrow key navigation across the category rail. */
  const onTabKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    const i = groupIds.indexOf(active);
    const next =
      e.key === "Home" ? 0
      : e.key === "End" ? groupIds.length - 1
      : e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % groupIds.length
        : (i - 1 + groupIds.length) % groupIds.length;

    const id = groupIds[next];
    setActive(id);
    tabRefs.current[id]?.focus();
  }, [active]);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      {/* Accent wash that shifts with the active category */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 78% 12%, ${alpha(accent, 0.08)} 0%, transparent 62%)`,
          transition: "background 700ms ease",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHead
          eyebrow="02 / Stack"
          heading={<>Tools I <em className="t-em">build</em> with.</>}
          lead="A working toolkit spanning frontend, backend, database, and AI tooling."
          aside={
            <div className="flex items-end gap-6 sm:gap-8">
              <Counter value={totalCount} label="Technologies" />
              <div className="h-12 w-px self-center" style={{ background: "var(--border-hv)" }} />
              <Counter value={stackGroups.length} label="Disciplines" />
            </div>
          }
        />

        {/* ── Category rail + panel ── */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-8">

          {/* Rail: horizontal scroller on mobile, vertical list from lg up */}
          <m.div
            role="tablist"
            aria-label="Technology categories"
            className="stack-rail -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {stackGroups.map((group) => {
              const id    = group.id as GroupId;
              const on    = active === id;
              const color = groupColors[id];

              return (
                <button
                  key={id}
                  ref={(el) => { tabRefs.current[id] = el; }}
                  role="tab"
                  id={`stack-tab-${id}`}
                  aria-selected={on}
                  aria-controls={`stack-panel-${id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(id)}
                  onKeyDown={onTabKeyDown}
                  className="stack-cat shrink-0 lg:w-full"
                  data-on={on ? "true" : undefined}
                  style={{
                    "--cat":      color,
                    "--cat-soft": alpha(color, 0.12),
                  } as React.CSSProperties}
                >
                  <span aria-hidden="true" className="stack-cat__bar" />
                  <span aria-hidden="true" className="stack-cat__dot" />
                  <span className="stack-cat__label">{groupLabels[id]}</span>
                  <span className="stack-cat__count">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </m.div>

          {/* Panel */}
          <m.div
            ref={panelRef}
            onPointerMove={onPanelMove}
            className="stack-panel spotlight relative flex flex-col p-5 sm:p-7 lg:p-8"
            style={{
              "--spot-soft": alpha(accent, 0.14),
              "--spot-line": alpha(accent, 0.7),
            } as React.CSSProperties}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            <span aria-hidden="true" className="lux-corner lux-corner--tl" />
            <span aria-hidden="true" className="lux-corner lux-corner--tr" />
            <span aria-hidden="true" className="lux-corner lux-corner--bl" />
            <span aria-hidden="true" className="lux-corner lux-corner--br" />

            {/* Panel header */}
            <div className="relative z-2 mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: accent, fontWeight: 700 }}
              >
                {groupLabels[active]}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 sm:block"
                style={{ background: `linear-gradient(90deg, ${alpha(accent, 0.4)}, transparent)` }}
              />
              <span className="text-xs leading-5" style={{ color: "var(--subtle)" }}>
                {groupBlurbs[active]}
              </span>
            </div>

            <div
              role="tabpanel"
              id={`stack-panel-${active}`}
              aria-labelledby={`stack-tab-${active}`}
              tabIndex={0}
              className="relative z-2 flex flex-1 items-center outline-none"
            >
              <AnimatePresence mode="wait">
                <m.ul
                  key={active}
                  className="flex w-full flex-wrap justify-center gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {activeGroup.items.map((item, i) => (
                    <m.li
                      key={item.name}
                      className="stack-cell"
                      initial={{ opacity: 0, y: 10, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: Math.min(i, 12) * 0.03, duration: 0.38, ease }}
                    >
                      <div
                        className="stack-tile"
                        style={{
                          "--tech":      item.color,
                          "--tech-soft": alpha(item.color, 0.16),
                          "--tech-glow": alpha(item.color, 0.26),
                        } as React.CSSProperties}
                      >
                        <span aria-hidden="true" className="stack-tile__edge" />
                        <span className="stack-tile__plate">
                          <StackIcon
                            icon={item.icon}
                            ai={"ai" in item ? (item as { ai?: boolean }).ai : false}
                            bleed={"bleed" in item ? (item as { bleed?: boolean }).bleed : false}
                          />
                        </span>
                        <span className="stack-tile__name">{item.name}</span>
                      </div>
                    </m.li>
                  ))}
                </m.ul>
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

function Counter({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <CountUp
        value={value}
        className="font-display block text-4xl leading-none sm:text-5xl"
        style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
      />
      <p className="lux-label mt-2" style={{ color: "var(--gold)" }}>
        {label}
      </p>
    </div>
  );
}
