"use client";

import { m, type Variants } from "framer-motion";
import type { projects } from "@/app/lib/data";
import { lookFor } from "@/app/lib/project-looks";
import { useIntroDone } from "@/app/components/motion/intro";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { ease, Reveal } from "@/app/components/ui/reveal";
import { TechList } from "@/app/components/ui/tech";
import RollText from "@/app/components/ui/roll-text";
import { ArrowRightIcon, CheckIcon } from "@/app/components/ui/icons";
import { Flow } from "@/app/components/projects-section";
import CaseNav from "./case-nav";
import Cover, { type Fact } from "./cover";
import Contents, { type Chapter } from "./contents";
import Screens from "./screens";
import NextCover from "./next-cover";

type Project = (typeof projects)[number];
export type Sibling = {
  id: string;
  name: string;
  category: string;
  image: string | null;
};

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** A chapter opens like a markdown heading: "## Overview", and a rule. */
function DocHead({ n, title }: { n: number; title: string }) {
  return (
    <header className="doc__head">
      <h2 className="doc__title">
        <span aria-hidden="true" className="doc__hash">
          ##
        </span>
        {title}
      </h2>
      <span aria-hidden="true" className="doc__n">
        {String(n).padStart(2, "0")}
      </span>
      <m.span
        aria-hidden="true"
        className="doc__rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease }}
      />
    </header>
  );
}

export default function ProjectView({
  project,
  index,
  total,
  prev,
  next,
}: {
  project: Project;
  index: number;
  total: number;
  prev: Sibling | null;
  next: Sibling | null;
}) {
  const play = useIntroDone();
  const look = lookFor(project.id);
  const shots = project.images;
  const count = shots.length;

  const chapters: Chapter[] = [
    { id: "cs-overview", title: "Overview" },
    ...(look.flow.length ? [{ id: "cs-architecture", title: "Architecture" }] : []),
    { id: "cs-screens", title: "Screens" },
    { id: "cs-features", title: "Features" },
    { id: "cs-stack", title: "Stack" },
  ];
  const n = (id: string) => chapters.findIndex((c) => c.id === id) + 1;

  const facts: Fact[] = [
    { k: "Technologies", n: project.technologies.length },
    { k: "Features", n: project.features.length },
    { k: "Screens", n: count },
    { k: "Pipeline stages", n: look.flow.length || 1 },
  ];

  return (
    <>
      <CaseNav id={project.id} link={project.link} linkLabel={project.linkLabel} />

      <main className="cs" style={{ "--proj": look.accent } as React.CSSProperties}>
        <Cover
          id={project.id}
          name={project.name}
          tagline={project.tagline}
          category={project.category}
          plate={index}
          total={total}
          link={project.link}
          linkLabel={project.linkLabel}
          look={look}
          facts={facts}
          lead={shots.find((shot) => !/logo/i.test(shot.alt)) ?? shots[0] ?? null}
          play={play}
        />

        <div className="wrap docs">
          <aside className="docs__rail">
            <Contents chapters={chapters} file="README.md" link={project.link} linkLabel={project.linkLabel} />
          </aside>

          <div className="docs__main">
            <section id="cs-overview" className="doc">
              <DocHead n={n("cs-overview")} title="Overview" />
              <Reveal y={20}>
                <p className="doc__lead t-pretty">{project.overview}</p>
              </Reveal>
              <div className="doc__cols">
                {project.details.map((detail, i) => (
                  <Reveal key={detail.slice(0, 24)} delay={i * 0.08} y={20}>
                    <p className="doc__p t-pretty">{detail}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            {look.flow.length > 0 && (
              <section id="cs-architecture" className="doc">
                <DocHead n={n("cs-architecture")} title="Architecture" />
                <p className="doc__note">Source to screen, in the order the data travels.</p>
                <Reveal y={20}>
                  <Flow id={project.id} />
                </Reveal>
              </section>
            )}

            <section id="cs-screens" className="doc defer-render">
              <DocHead n={n("cs-screens")} title="Screens" />
              <Screens shots={shots} />
            </section>

            <section id="cs-features" className="doc defer-render">
              <DocHead n={n("cs-features")} title="Features" />
              <m.ul
                className="checks"
                variants={list}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.15 }}
              >
                {project.features.map((feature) => (
                  <m.li key={feature} variants={item} className="checks__item">
                    <span aria-hidden="true" className="checks__box">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className="t-pretty">{feature}</span>
                  </m.li>
                ))}
              </m.ul>
            </section>

            <section id="cs-stack" className="doc defer-render">
              <DocHead n={n("cs-stack")} title="Stack" />
              <TechList items={project.technologies} className="doc__stack" />

              <Reveal className="doc__cta" y={20}>
                <p>Want something built with this kind of care?</p>
                <TransitionLink href="/#contact" label="Contact" className="btn btn--primary roll-host">
                  <RollText text="Discuss a project like this" />
                  <ArrowRightIcon className="btn__arrow h-4 w-4" />
                </TransitionLink>
              </Reveal>
            </section>
          </div>
        </div>

        <NextCover prev={prev} next={next} />
      </main>
    </>
  );
}
