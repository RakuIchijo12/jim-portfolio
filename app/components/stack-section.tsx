"use client";

import { useCallback, useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { stackGroups } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const AI_ICON_PATHS: Record<string, string> = {
  claude: "/ai-icons/claude-color.png",
  codex:  "/ai-icons/codex-color.png",
  openai: "/ai-icons/openai.png",
};

/** #rrggbb to rgba() so per-tech colors can drive tints and glows. */
function alpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function iconSrc(icon: string, ai?: boolean) {
  return ai ? (AI_ICON_PATHS[icon] ?? `/stack-icons/${icon}.png`) : `/stack-icons/${icon}.png`;
}

function StackIcon({ icon, ai, size = 40 }: { icon: string; ai?: boolean; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      src={iconSrc(icon, ai)}
      width={size}
      height={size}
      className="object-contain"
      style={{ width: size, height: size }}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

type GroupId = (typeof stackGroups)[number]["id"];

const groupLabels: Record<GroupId, string> = {
  frontend: "Frontend",
  backend:  "Backend",
  database: "Database",
  ai:       "AI Tools",
  tools:    "Other Tools",
};

const groupBlurbs: Record<GroupId, string> = {
  frontend: "Interfaces, design systems, and the browser runtime.",
  backend:  "APIs, services, and the languages behind them.",
  database: "Storage, querying, and managed data platforms.",
  ai:       "Assistants and models woven into the daily workflow.",
  tools:    "Version control, containers, editors, and delivery.",
};

const groupColors: Record<GroupId, string> = {
  frontend: "#3A6A8F",
  backend:  "#C2A878",
  database: "#2D8D6F",
  ai:       "#6B5B8A",
  tools:    "#7A7A8C",
};

const groupIds = stackGroups.map((g) => g.id as GroupId);
const totalCount = stackGroups.reduce((n, g) => n + g.items.length, 0);

/** Flat list for the marquee: every logo in the stack, one pass. */
const marqueeItems = stackGroups.flatMap((g) =>
  g.items.map((it) => ({
    name:  it.name,
    icon:  it.icon,
    color: it.color as string,
    ai:    "ai" in it ? Boolean((it as { ai?: boolean }).ai) : false,
  })),
);

export default function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });
  const [active, setActive] = useState<GroupId>("frontend");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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
          background: `radial-gradient(ellipse 55% 45% at 78% 12%, ${alpha(accent, 0.07)} 0%, transparent 62%)`,
          transition: "background 700ms ease",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <m.div
          className="section-eyebrow mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          02 / Stack
        </m.div>

        {/* ── Heading + counters ── */}
        <m.div
          className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <div>
            <h2
              className="font-display text-3xl font-700 leading-tight sm:text-4xl lg:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Tools I{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>build</em>{" "}
              with.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7" style={{ color: "var(--muted)" }}>
              A working toolkit spanning frontend, backend, database, and AI tooling.
            </p>
          </div>

          <div className="flex items-end gap-6 sm:gap-8">
            <Counter value={String(totalCount)} label="Technologies" />
            <div className="h-12 w-px self-center" style={{ background: "var(--border-hv)" }} />
            <Counter value={String(stackGroups.length).padStart(2, "0")} label="Disciplines" />
          </div>
        </m.div>

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
            className="stack-panel relative flex flex-col rounded-sm p-5 sm:p-7 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            {/* Corner brackets */}
            <span aria-hidden="true" className="lux-corner lux-corner--tl" />
            <span aria-hidden="true" className="lux-corner lux-corner--tr" />
            <span aria-hidden="true" className="lux-corner lux-corner--bl" />
            <span aria-hidden="true" className="lux-corner lux-corner--br" />

            {/* Panel header */}
            <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span
                className="font-mono text-xs font-700 uppercase tracking-[0.22em]"
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
              className="flex flex-1 items-center outline-none"
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

        {/* ── Everything, scrolling ── */}
        <m.div
          className="stack-marquee mt-10 sm:mt-14"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease }}
        >
          <div className="stack-marquee__track">
            {[0, 1].map((pass) => (
              <div className="stack-marquee__set" key={pass}>
                {marqueeItems.map((item) => (
                  <span
                    key={`${pass}-${item.name}`}
                    className="stack-marquee__item"
                    style={{ "--tech": item.color } as React.CSSProperties}
                  >
                    <StackIcon icon={item.icon} ai={item.ai} size={22} />
                    {item.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

function Counter({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl leading-none sm:text-5xl" style={{ fontWeight: 700 }}>
        {value}
      </p>
      <p
        className="mt-2 font-mono text-[0.58rem] font-700 uppercase tracking-[0.22em]"
        style={{ color: "var(--gold)", fontWeight: 700 }}
      >
        {label}
      </p>
    </div>
  );
}
