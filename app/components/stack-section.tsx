"use client";

import { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { stackGroups } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const AI_ICON_PATHS: Record<string, string> = {
  claude: "/ai-icons/claude-color.png",
  codex:  "/ai-icons/codex-color.png",
  openai: "/ai-icons/openai.png",
};

function StackIcon({ icon, ai }: { icon: string; ai?: boolean }) {
  const src = ai ? (AI_ICON_PATHS[icon] ?? `/stack-icons/${icon}.png`) : `/stack-icons/${icon}.png`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      src={src}
      width={40}
      height={40}
      className="object-contain"
      style={{ width: "2.5rem", height: "2.5rem" }}
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

const groupColors: Record<GroupId, string> = {
  frontend: "#3A6A8F",
  backend:  "#C2A878",
  database: "#2D8D6F",
  ai:       "#6B5B8A",
  tools:    "#7A7A8C",
};

export default function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });
  const [active, setActive] = useState<GroupId>("frontend");

  const activeGroup = stackGroups.find((g) => g.id === active)!;

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <m.div
          className="section-eyebrow mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          02 / Stack
        </m.div>

        {/* Heading */}
        <m.div
          className="mb-8 sm:mb-12 grid gap-4 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <h2
            className="font-display text-3xl font-700 leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontWeight: 700 }}
          >
            Tools I build with.
          </h2>
          <p className="max-w-xs text-sm leading-6" style={{ color: "var(--muted)" }}>
            35+ technologies across frontend, backend, database, and AI tooling.
          </p>
        </m.div>

        {/* Tab buttons */}
        <m.div
          className="mb-8 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          {stackGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActive(group.id as GroupId)}
              className="relative px-3.5 py-2 sm:px-5 sm:py-2.5 text-sm font-600 rounded transition-all duration-240"
              style={{
                fontWeight: 600,
                background: active === group.id ? "var(--gold-light)" : "transparent",
                border: active === group.id
                  ? `1px solid ${groupColors[group.id as GroupId]}`
                  : "1px solid var(--border-hv)",
                color: active === group.id ? groupColors[group.id as GroupId] : "var(--muted)",
              }}
            >
              {groupLabels[group.id as GroupId]}
              <span
                className="ml-2 font-mono text-[0.6rem]"
                style={{ opacity: 0.7 }}
              >
                {group.items.length}
              </span>
            </button>
          ))}
        </m.div>

        {/* Icon grid */}
        <m.div
          className="rounded-sm p-6 sm:p-8"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          {/* Group heading */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="h-px w-6"
              style={{ background: groupColors[active] }}
            />
            <span
              className="font-mono text-xs font-700 uppercase tracking-[0.22em]"
              style={{ color: groupColors[active], fontWeight: 700 }}
            >
              {groupLabels[active]}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <m.ul
              key={active}
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              {activeGroup.items.map((item, i) => (
                <m.li
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease }}
                >
                  <div
                    className="stack-tile group relative"
                    title={item.name}
                    tabIndex={0}
                  >
                    <div className="flex items-center justify-center" style={{ height: "2.8rem" }}>
                      <StackIcon icon={item.icon} ai={"ai" in item ? (item as { ai?: boolean }).ai : false} />
                    </div>
                    <span
                      className="text-center text-[0.68rem] font-600 leading-tight"
                      style={{ color: "var(--muted)", fontWeight: 600 }}
                    >
                      {item.name}
                    </span>

                    {/* Hover color glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[7px] opacity-0 transition-opacity duration-240 group-hover:opacity-100 group-focus:opacity-100"
                      style={{
                        background: `radial-gradient(circle at center, ${item.color}14, transparent 70%)`,
                      }}
                    />
                  </div>
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>
        </m.div>

        {/* All-groups compact view below on mobile */}
        <m.p
          className="mt-6 text-center text-xs"
          style={{ color: "var(--subtle)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease }}
        >
          Switch tabs to explore Frontend, Backend, Database, AI tools, and more.
        </m.p>
      </div>
    </section>
  );
}
