"use client";

import { m, type Variants } from "framer-motion";
import { stackGroups, totalTechnologies } from "@/app/lib/data";
import SectionHead from "@/app/components/ui/section-head";
import CountUp from "@/app/components/ui/count-up";
import { ease } from "@/app/components/ui/reveal";

type Group = (typeof stackGroups)[number];
type GroupId = Group["id"];

const AI_ICON_PATHS: Record<string, string> = {
  claude: "/ai-icons/claude-color.png",
  codex: "/ai-icons/codex-color.png",
  openai: "/ai-icons/openai.png",
};

function iconSrc(icon: string, ai?: boolean) {
  return ai ? (AI_ICON_PATHS[icon] ?? `/stack-icons/${icon}.png`) : `/stack-icons/${icon}.png`;
}

/* Each tile is a small Bauhaus poster: three solid fields, three paper ones
   with a shape tucked into the corner. */
const META: Record<
  GroupId,
  { label: string; blurb: string; fill?: "ochre" | "teal" | "terra"; deco: React.ReactNode }
> = {
  frontend: {
    label: "Frontend",
    blurb: "Interfaces, design systems, and the browser runtime.",
    deco: (
      <span
        className="tile__deco sh sh-quarter -bottom-10 -right-10 w-52"
        style={{ background: "var(--brand-terra)", opacity: 0.9 }}
      />
    ),
  },
  backend: {
    label: "Backend",
    blurb: "Frameworks and services that run the server side.",
    fill: "ochre",
    deco: (
      <span
        className="tile__deco sh sh-half -bottom-1 -right-10 w-56"
        style={{ background: "var(--ink)" }}
      />
    ),
  },
  database: {
    label: "Database",
    blurb: "Storage, querying, and managed data platforms.",
    fill: "teal",
    deco: (
      <span className="tile__deco -bottom-20 -right-20 grid w-52 place-items-center">
        <span className="sh sh-ring aspect-square w-full" style={{ color: "var(--paper)" }} />
        <span
          className="sh sh-circle absolute aspect-square w-10"
          style={{ background: "var(--brand-terra)", top: "18%", left: "18%" }}
        />
      </span>
    ),
  },
  languages: {
    label: "Languages",
    blurb: "The core languages everything else is written in.",
    deco: (
      <span
        className="tile__deco sh sh-half -right-12 bottom-0 w-60"
        style={{ background: "var(--olive)" }}
      />
    ),
  },
  ai: {
    label: "AI Tools",
    blurb: "Assistants and models woven into the daily workflow.",
    fill: "terra",
    deco: (
      <span
        className="tile__deco sh sh-tri -bottom-6 -right-6 aspect-square w-36"
        style={{ background: "var(--ink)" }}
      />
    ),
  },
  tools: {
    label: "Other Tools",
    blurb: "Version control, containers, editors, and delivery.",
    deco: (
      <span className="tile__deco bottom-8 right-8 hidden items-end gap-2 md:flex">
        <span className="block h-16 w-4" style={{ background: "var(--fg)" }} />
        <span className="block h-24 w-4" style={{ background: "var(--brand-terra)" }} />
        <span className="block h-12 w-4" style={{ background: "var(--ochre)" }} />
      </span>
    ),
  },
};

const tileContent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

function Tile({ group }: { group: Group }) {
  const meta = META[group.id];

  return (
    <m.article
      className={`tile tile--${group.id}${meta.fill ? ` tile--fill-${meta.fill}` : ""}`}
      variants={tileContent}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <m.header className="tile__head" variants={rise}>
        <h3 className="tile__name">{meta.label}</h3>
        <span className="tile__count">({String(group.items.length).padStart(2, "0")})</span>
      </m.header>
      <m.p className="tile__blurb" variants={rise}>
        {meta.blurb}
      </m.p>

      <m.ul className="tile__chips" variants={tileContent}>
        {group.items.map((item) => (
          <m.li key={item.name} variants={chip}>
            <span className="chip">
              <span className="chip__icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  aria-hidden="true"
                  src={iconSrc(item.icon, "ai" in item ? item.ai : false)}
                  width={40}
                  height={40}
                  className={"bleed" in item && item.bleed ? "is-bleed" : undefined}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </span>
              {item.name}
            </span>
          </m.li>
        ))}
      </m.ul>

      <span aria-hidden="true">{meta.deco}</span>
    </m.article>
  );
}

function Counter({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <CountUp
        value={value}
        className="block font-display text-5xl font-bold leading-none tracking-tight sm:text-6xl"
        style={{ fontVariantNumeric: "tabular-nums" }}
      />
      <p className="t-label mt-2 text-muted">{label}</p>
    </div>
  );
}

export default function StackSection() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Toolbox"
          title="Tools I *build* with."
          lead="A working toolkit spanning frontend, backend, data and AI tooling, chosen for reliability first."
          aside={
            <div className="flex items-end gap-8">
              <Counter value={totalTechnologies} label="Technologies" />
              <span aria-hidden="true" className="h-14 w-px self-center bg-line" />
              <Counter value={stackGroups.length} label="Disciplines" />
            </div>
          }
        />

        <div className="bento">
          {stackGroups.map((group) => (
            <Tile key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
