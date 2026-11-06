"use client";

import { m, type Variants } from "framer-motion";
import { stackGroups, totalTechnologies } from "@/app/lib/data";
import SectionHead from "@/app/components/ui/section-head";
import { ease } from "@/app/components/ui/reveal";
import { TechIcon } from "@/app/components/ui/tech";
import { GroupGlyph, type GroupId } from "@/app/components/ui/glyphs";

type Group = (typeof stackGroups)[number];

const AI_ICON_PATHS: Record<string, string> = {
  claude: "/ai-icons/claude-color.png",
  codex: "/ai-icons/codex-color.png",
  openai: "/ai-icons/openai.png",
};

function iconSrc(icon: string, ai?: boolean) {
  return ai ? (AI_ICON_PATHS[icon] ?? `/stack-icons/${icon}.png`) : `/stack-icons/${icon}.png`;
}

/* Each group is a module on the board: a path, a layer and a short note. */
const META: Record<GroupId, { layer: string; blurb: string }> = {
  frontend: { layer: "client", blurb: "Interfaces, design systems and the browser runtime." },
  backend: { layer: "server", blurb: "Frameworks and services that run the server side." },
  database: { layer: "storage", blurb: "Storage, querying and managed data platforms." },
  languages: { layer: "compiler", blurb: "The core languages everything else is written in." },
  ai: { layer: "assist", blurb: "Assistants and models woven into the daily workflow." },
  tools: { layer: "devops", blurb: "Version control, containers, editors and delivery." },
};

const grid: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

function Module({ group }: { group: Group }) {
  const meta = META[group.id];
  return (
    <m.article className={`mod mod--${group.id}`} variants={card}>
      <span aria-hidden="true" className="mod__pins" />
      <header className="mod__head">
        <span className="mod__icon">
          <GroupGlyph id={group.id} />
        </span>
        <div className="min-w-0">
          <h3 className="mod__name">{group.label}</h3>
          <p className="mod__path">
            ./{group.id} <span className="mod__layer">{meta.layer}</span>
          </p>
        </div>
        <span className="mod__count" aria-label={`${group.items.length} technologies`}>
          {String(group.items.length).padStart(2, "0")}
        </span>
      </header>
      <p className="mod__blurb">{meta.blurb}</p>
      <ul className="techs" data-size="md">
        {group.items.map((item) => (
          <li key={item.name} className="tech">
            <TechIcon name={item.name} src={iconSrc(item.icon, "ai" in item ? item.ai : false)} />
            {item.name}
          </li>
        ))}
      </ul>
    </m.article>
  );
}

export default function StackSection() {
  return (
    <section id="stack" className="section section--alt defer-render">
      <div className="wrap">
        <SectionHead
          index="02"
          path="stack"
          title="Tools I *build* with."
          lead="A working toolkit spanning frontend, backend, data and AI tooling, chosen for reliability first."
          aside={
            <div className="npm">
              <p>
                <span className="text-accent">$</span> npm ls --depth=0
              </p>
              <p className="npm__out">
                <span className="npm__tree">└─</span> <b>{totalTechnologies}</b> packages in{" "}
                <b>{stackGroups.length}</b> groups
              </p>
              <p className="npm__out">
                <span className="npm__tree">&nbsp;&nbsp;</span> found <b>0</b> vulnerabilities
              </p>
            </div>
          }
        />

        <m.div
          className="board"
          variants={grid}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.1 }}
        >
          {stackGroups.map((group) => (
            <Module key={group.id} group={group} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
