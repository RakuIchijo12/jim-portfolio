"use client";

import { m, type Variants } from "framer-motion";
import type { projects } from "@/app/lib/data";
import { lookFor, SHAPE_CLASS } from "@/app/lib/project-looks";
import { useIntroDone } from "@/app/components/motion/intro";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { ease, Reveal, RevealWords } from "@/app/components/ui/reveal";
import { ArrowRightIcon } from "@/app/components/ui/icons";
import CaseNav from "./case-nav";
import Cover, { type CoverPrint } from "./cover";
import Contents, { type Chapter, type Fact } from "./contents";
import Screens, { screenLabel } from "./screens";
import NextCover from "./next-cover";

type Project = (typeof projects)[number];
type Sibling = {
  id: string;
  name: string;
  category: string;
  image: string | null;
} | null;

const pad = (n: number) => String(n).padStart(2, "0");

/** "https://github.com/RakuIchijo12" -> "github.com/RakuIchijo12". */
function siteLabel(link: string) {
  try {
    const url = new URL(link);
    return url.host + (url.pathname === "/" ? "" : url.pathname);
  } catch {
    return link;
  }
}

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/** A chapter opens on an outlined numeral, its title, and a rule that draws. */
function ChapterHead({ n, title }: { n: number; title: string }) {
  return (
    <header className="chapter__head">
      <m.span
        aria-hidden="true"
        className="chapter__n"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease }}
      >
        {pad(n)}
      </m.span>
      <h2 className="chapter__title">
        <RevealWords text={title} amount={0.8} />
      </h2>
      <m.span
        aria-hidden="true"
        className="chapter__rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.3, ease, delay: 0.1 }}
      />
    </header>
  );
}

export default function ProjectView({
  project,
  techIconMap,
  index,
  total,
  prev,
  next,
}: {
  project: Project;
  techIconMap: Record<string, string>;
  index: number;
  total: number;
  prev: Sibling;
  next: Sibling;
}) {
  const play = useIntroDone();
  const look = lookFor(project.id);
  const shots = project.images;
  const count = shots.length;
  const cover = "cover" in project && project.cover ? project.cover : null;
  const home = project.link ? siteLabel(project.link) : "Private deployment";

  const print: CoverPrint | null = count
    ? { src: shots[0].src, caption: `Fig. 01 / ${screenLabel(shots[0].alt)}`, count: `01/${pad(count)}` }
    : cover
      ? { src: cover, caption: "Fig. 01 / Cover artwork", count: "Private" }
      : null;

  const chapters: Chapter[] = [
    { id: "cs-brief", title: "Brief" },
    { id: "cs-screens", title: count ? "Screens" : "Artwork" },
    { id: "cs-shipped", title: "Shipped" },
    { id: "cs-stack", title: "Built with" },
  ];

  const facts: Fact[] = [
    { k: "Category", text: project.category },
    { k: "Stack", n: project.technologies.length, unit: "technologies" },
    { k: "Features", n: project.features.length, unit: "shipped" },
    count ? { k: "Screens", n: count, unit: "captured" } : { k: "Access", text: "Private client system" },
  ];

  const overview = project.overview;
  const initial = overview.charAt(0);
  const rest = overview.slice(1);

  return (
    <>
      <CaseNav
        name={project.name}
        plate={index}
        total={total}
        link={project.link}
        linkLabel={project.linkLabel}
        tone={{ bg: look.color, ink: look.ink }}
      />

      <main className="cs">
        <Cover
          name={project.name}
          tagline={project.tagline}
          category={project.category}
          plate={index}
          total={total}
          link={project.link}
          home={home}
          look={look}
          print={print}
          play={play}
        />

        <div className="wrap dossier" style={{ "--project": look.color } as React.CSSProperties}>
          <aside className="dossier__rail">
            <Contents chapters={chapters} facts={facts} look={look} link={project.link} linkLabel={project.linkLabel} />
          </aside>

          <div className="dossier__main">
            {/* ── 01 Brief: a standfirst with a drop cap in the project's shape ── */}
            <section id="cs-brief" className="chapter">
              <ChapterHead n={1} title="Brief" />
              <p className="sr-only">{overview}</p>
              <div className="brief" aria-hidden="true">
                <m.span
                  className={`brief__cap brief__cap--${look.shape}`}
                  style={{ "--cover": look.color, "--cover-ink": look.ink } as React.CSSProperties}
                  initial={{ scale: 0, rotate: -40 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                >
                  {initial}
                </m.span>
                <RevealWords text={rest} stagger={0.012} amount={0.15} className="brief__stand" />
              </div>
              <div className="brief__cols">
                {project.details.map((detail, i) => (
                  <Reveal key={detail.slice(0, 24)} delay={i * 0.1}>
                    <p className="t-lead t-pretty">{detail}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── 02 Screens: prints that stack, then the contact sheet ── */}
            <section id="cs-screens" className="chapter">
              <ChapterHead n={2} title={count ? "Screens" : "Artwork"} />
              <Screens shots={shots} look={look} cover={cover} category={project.category} />
            </section>

            {/* ── 03 Shipped: an index of features ── */}
            <section id="cs-shipped" className="chapter">
              <ChapterHead n={3} title="Shipped" />
              <m.ol
                className="shipped"
                variants={list}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.15 }}
              >
                {project.features.map((feature, i) => (
                  <m.li key={feature} variants={item} className="shipped__item">
                    <span aria-hidden="true" className="shipped__n t-label">
                      <span
                        className={`sh ${SHAPE_CLASS[look.shape]} shipped__mark`}
                        style={look.shape === "split" ? undefined : { background: look.color }}
                      />
                      {pad(i + 1)}
                    </span>
                    <p className="shipped__text t-pretty">{feature}</p>
                  </m.li>
                ))}
              </m.ol>
            </section>

            {/* ── 04 Built with: a colophon ── */}
            <section id="cs-stack" className="chapter">
              <ChapterHead n={4} title="Built with" />
              <m.ul
                className="colophon"
                variants={list}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.2 }}
              >
                {project.technologies.map((tech, i) => {
                  const icon = techIconMap[tech];
                  return (
                    <m.li key={tech} variants={item} className="colophon__row">
                      <span className="chip__icon">
                        {icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img alt="" aria-hidden="true" src={`/stack-icons/${icon}`} loading="lazy" decoding="async" />
                        ) : (
                          <span className="tech-dot__txt">{tech.slice(0, 2)}</span>
                        )}
                      </span>
                      <span className="colophon__name">{tech}</span>
                      <span aria-hidden="true" className="colophon__leader" />
                      <span className="t-label colophon__n">{pad(i + 1)}</span>
                    </m.li>
                  );
                })}
              </m.ul>

              <Reveal className="colophon__foot" delay={0.1}>
                <p className="t-lead">Want something built with this kind of care?</p>
                <TransitionLink href="/#contact" label="Let's talk" className="btn btn-line roll-host">
                  Discuss a project like this
                  <ArrowRightIcon className="btn__arrow h-3.5 w-3.5" />
                </TransitionLink>
              </Reveal>
            </section>
          </div>
        </div>

        {next && <NextCover next={next} prev={prev} plate={(index % total) + 1} total={total} />}
      </main>
    </>
  );
}
