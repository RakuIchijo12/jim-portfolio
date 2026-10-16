"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects } from "@/app/lib/data";
import { TECH_ICON_MAP } from "@/app/lib/tech-icons";
import { lookFor, SHAPE_CLASS } from "@/app/lib/project-looks";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { scrollToTarget } from "@/app/components/motion/smooth-scroll";
import { SectionMeta } from "@/app/components/ui/section-head";
import { ease, RevealWords } from "@/app/components/ui/reveal";
import RollText from "@/app/components/ui/roll-text";
import { ArrowRightIcon, ExternalIcon } from "@/app/components/ui/icons";

const sweep = [0.76, 0, 0.24, 1] as const;

/* Panel widths in vw. The pinned wall's scroll length is derived from these
   in CSS, so it is right before any script runs. */
const INTRO = 44;
const PANEL = 74;
const OUTRO = 42;
const N = projects.length;
const TRAVEL = INTRO + N * PANEL + OUTRO - 100;

type Work = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  technologies: readonly string[];
  image: string | null;
  cover: string | null;
  link: string;
};

const works: Work[] = projects.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  tagline: p.tagline,
  overview: p.overview,
  technologies: p.technologies,
  image: p.images[0]?.src ?? null,
  cover: "cover" in p ? p.cover : null,
  link: p.link,
}));

/* Where each project's shape peeks out of its screenshot on the wall: into
   the gutter between plates, never over the labels above or the type below.
   Colour and shape come from the shared project looks. */
const PLACEMENT: Record<string, { size: string; pos: React.CSSProperties }> = {
  obsentry: { size: "w-[24%] rotate-90", pos: { right: "-14%", top: "22%" } },
  eingress: { size: "w-[17%]", pos: { left: "-9%", top: "30%" } },
  "velora-motors": { size: "w-[16%]", pos: { right: "-8%", top: "34%" } },
  "marrea-erp": { size: "w-[13%]", pos: { left: "-7%", top: "26%" } },
};

function wallLook(id: string) {
  const look = lookFor(id);
  const place = PLACEMENT[id] ?? { size: "w-[14%]", pos: { right: "-7%", top: "30%" } };
  return { color: look.color, shape: `${SHAPE_CLASS[look.shape]} ${place.size}`, pos: place.pos };
}

const pad = (n: number) => String(n).padStart(2, "0");

function TechDots({ items }: { items: readonly string[] }) {
  return (
    <ul className="work__tech">
      {items.slice(0, 8).map((tech) => {
        const file = TECH_ICON_MAP[tech];
        return (
          <li key={tech} className="tech-dot" title={tech}>
            {file ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={tech} src={`/stack-icons/${file}`} width={18} height={18} loading="lazy" decoding="async" />
            ) : (
              <span className="tech-dot__txt">{tech.slice(0, 3)}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Screenshot, or for the private ERP the cover photo under a scrim. */
function Media({ work, imgStyle }: { work: Work; imgStyle?: { x: MotionValue<string> } }) {
  if (work.image) {
    return (
       
      <m.img
        src={work.image}
        alt={`${work.name}: ${work.category}`}
        loading="lazy"
        decoding="async"
        style={imgStyle}
      />
    );
  }
  return (
    <span className="private-art">
      {work.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={work.cover} alt="" loading="lazy" decoding="async" />
      )}
      <span className="relative grid place-items-center gap-3 text-center">
        <span className="sh sh-half w-16" style={{ background: "var(--fg)" }} />
        <span className="t-label">Private client system</span>
      </span>
    </span>
  );
}

/* ── Desktop: the pinned wall ─────────────────────────────────────────── */

function Panel({ work, index, progress }: { work: Work; index: number; progress: MotionValue<number> }) {
  const left = INTRO + index * PANEL;
  const start = Math.max(0, (left - 100) / TRAVEL);
  const end = Math.min(1, (left + PANEL) / TRAVEL);

  const imgX = useTransform(progress, [start, end], ["4%", "-4%"]);
  const shapeRotate = useTransform(progress, [start, end], [-70, 70]);
  const shapeY = useTransform(progress, [start, end], ["14%", "-14%"]);
  const look = wallLook(work.id);

  return (
    <article className="work" aria-labelledby={`work-${work.id}`}>
      <div className="work__meta t-label">
        <span>
          PL. {pad(index + 1)} / {work.category}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="status-dot" style={{ background: look.color }} />
          {work.link ? "Live" : "Private"}
        </span>
      </div>

      <TransitionLink
        href={`/projects/${work.id}`}
        label={work.name}
        className="work__media block"
        data-cursor="View"
        aria-label={`Open the ${work.name} case study`}
      >
        <m.span
          aria-hidden="true"
          className={`work__shape sh ${look.shape}`}
          style={{ ...look.pos, background: look.color, rotate: shapeRotate, y: shapeY }}
        />
        <span className="work__frame">
          <Media work={work} imgStyle={{ x: imgX }} />
        </span>
      </TransitionLink>

      <div className="work__row">
        <div>
          <h3 id={`work-${work.id}`} className="work__name t-balance">
            {work.name}
          </h3>
          <p className="work__tagline t-pretty">{work.tagline}</p>
        </div>
        <div>
          <p className="work__overview line-clamp-3">{work.overview}</p>
          <TechDots items={work.technologies} />
          <div className="mt-5 flex flex-wrap gap-2.5">
            <TransitionLink
              href={`/projects/${work.id}`}
              label={work.name}
              className="btn btn-line btn-sm roll-host"
            >
              <RollText text="Case study" />
              <ArrowRightIcon className="btn__arrow h-3.5 w-3.5" />
            </TransitionLink>
            {work.link && (
              <a href={work.link} target="_blank" rel="noreferrer" className="btn btn-line btn-sm roll-host">
                <RollText text="Visit" />
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Wall() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${TRAVEL}vw`]);
  const [stage, setStage] = useState<number>(-1);

  /* Which plate sits under the middle of the screen: -1 intro, N outro. */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const center = v * TRAVEL + 50;
    const next =
      center < INTRO ? -1 : center >= INTRO + N * PANEL ? N : Math.floor((center - INTRO) / PANEL);
    setStage(next);
  });

  const vars = {
    "--intro-w": `${INTRO}vw`,
    "--panel-w": `${PANEL}vw`,
    "--outro-w": `${OUTRO}vw`,
    "--travel": `${TRAVEL}vw`,
  } as React.CSSProperties;

  const current = stage >= 0 && stage < N ? works[stage] : null;

  return (
    <div ref={ref} className="works__pin hidden lg:block" style={vars}>
      <div className="works__sticky">
        <m.div className="works__track" style={{ x }}>
          <div className="works__intro">
            <SectionMeta index="03" label="Selected works" />
            <h2 className="works__big">
              <RevealWords text="Selected" amount={0.6} />
              <em>
                <RevealWords text="works" delay={0.12} amount={0.6} />
              </em>
            </h2>
            <m.p
              className="t-lead t-pretty mt-8 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease, delay: 0.3 }}
            >
              IoT systems, real-time dashboards and full-stack platforms, shipped for real users.
            </m.p>
            <p className="t-label mt-10 flex items-center gap-3 text-muted">
              <span className="works__count">({pad(N)})</span> Keep scrolling
              <span aria-hidden="true" className="works__hint-arrow">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </p>
          </div>

          {works.map((work, i) => (
            <Panel key={work.id} work={work} index={i} progress={scrollYProgress} />
          ))}

          <div className="works__outro">
            <p className="t-label text-muted">End of the selection</p>
            <p className="works__big mt-6" style={{ fontSize: "clamp(3rem, 6.2vw, 6.75rem)" }}>
              More in <em>the archive</em>
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://github.com/RakuIchijo12"
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid roll-host"
              >
                <RollText text="GitHub" />
                <ExternalIcon />
              </a>
              <button type="button" className="btn btn-line roll-host" onClick={() => scrollToTarget("#contact")}>
                <RollText text="Let's talk" />
              </button>
            </div>
          </div>
        </m.div>

        <div className="works__hud t-label" aria-hidden="true">
          <span className="inline-flex items-center gap-3">
            <span className="text-accent">
              {current ? `PL. ${pad(stage + 1)}` : stage < 0 ? "PL. 00" : "FIN."}
            </span>
            <span>/ {pad(N)}</span>
            <span className="hidden xl:inline">{current ? current.name : "Selected works"}</span>
          </span>
          <span className="inline-flex items-center gap-3">
            {Array.from({ length: N }, (_, i) => (
              <span
                key={i}
                className="block h-1.5 w-1.5 rounded-full transition-transform duration-500"
                style={{
                  background: i === stage ? "var(--accent)" : "var(--line-strong)",
                  transform: i === stage ? "scale(1.6)" : "scale(1)",
                }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Phones and tablets: a plain list ─────────────────────────────────── */

function Card({ work, index }: { work: Work; index: number }) {
  return (
    <article className="work-card">
      <div className="work__meta t-label">
        <span>
          PL. {pad(index + 1)} / {work.category}
        </span>
        <span>{work.link ? "Live" : "Private"}</span>
      </div>

      <TransitionLink
        href={`/projects/${work.id}`}
        label={work.name}
        className="work-card__media block"
        aria-label={`Open the ${work.name} case study`}
      >
        <m.span
          className="absolute inset-0 block"
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease }}
        >
          <Media work={work} />
        </m.span>
        <m.span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: lookFor(work.id).color, originY: 0 }}
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: sweep }}
        />
      </TransitionLink>

      <h3 className="work__name mt-6">{work.name}</h3>
      <p className="work__tagline t-pretty">{work.tagline}</p>
      <p className="work__overview mt-4 line-clamp-4">{work.overview}</p>
      <TechDots items={work.technologies} />
      <TransitionLink
        href={`/projects/${work.id}`}
        label={work.name}
        className="btn btn-line btn-sm roll-host mt-6"
      >
        <RollText text="Case study" />
        <ArrowRightIcon className="btn__arrow h-3.5 w-3.5" />
      </TransitionLink>
    </article>
  );
}

function List() {
  return (
    <div className="section lg:hidden">
      <div className="wrap">
        <SectionMeta index="03" label="Selected works" />
        <h2 className="works__big">
          <RevealWords text="Selected" />
          <em>
            <RevealWords text="works" delay={0.1} />
          </em>
        </h2>
        <p className="t-lead t-pretty mt-6 max-w-md">
          IoT systems, real-time dashboards and full-stack platforms, shipped for real users.
        </p>
        <div className="mt-10">
          {works.map((work, i) => (
            <Card key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="works scheme-ink">
      <Wall />
      <List />
    </section>
  );
}
