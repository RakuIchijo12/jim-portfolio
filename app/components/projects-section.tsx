"use client";

import { m } from "framer-motion";
import { projects } from "@/app/lib/data";
import { lookFor } from "@/app/lib/project-looks";
import { TransitionLink } from "@/app/components/motion/page-transition";
import SectionHead from "@/app/components/ui/section-head";
import { BrowserBar } from "@/app/components/ui/window";
import { TechList } from "@/app/components/ui/tech";
import { ease } from "@/app/components/ui/reveal";
import RollText from "@/app/components/ui/roll-text";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/app/components/ui/icons";

const pad = (n: number) => String(n).padStart(2, "0");

type Project = (typeof projects)[number];

/** Source to screen, as a row of stages joined by traces. */
export function Flow({ id, compact = false }: { id: string; compact?: boolean }) {
  const flow = lookFor(id).flow;
  if (!flow.length) return null;
  return (
    <ol className="flow" data-compact={compact} aria-label="Data flow">
      {flow.map((node, i) => (
        <li key={node.label} className="flow__node" style={{ "--i": i } as React.CSSProperties}>
          <span className="flow__box">
            <span className="flow__layer">
              <span className="flow__n">{pad(i + 1)}</span> {node.layer}
            </span>
            <span className="flow__label">{node.label}</span>
          </span>
          {i < flow.length - 1 && <span aria-hidden="true" className="flow__arrow" />}
        </li>
      ))}
    </ol>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const look = lookFor(project.id);
  // A real screen leads, not a logo card.
  const shot = project.images.find((image) => !/logo/i.test(image.alt)) ?? project.images[0];
  const live = Boolean(project.link) && project.linkLabel !== "GitHub";

  return (
    <m.article
      className="proj"
      data-flip={index % 2 === 1}
      style={{ "--proj": look.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease }}
      aria-labelledby={`proj-${project.id}`}
    >
      <TransitionLink
        href={`/projects/${project.id}`}
        label={project.name}
        className="proj__media"
        data-cursor="Open"
        aria-label={`Open the ${project.name} case study`}
      >
        <span className="win win--shot">
          <BrowserBar link={project.link} />
          <span className="proj__screen">
            {shot && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
            )}
          </span>
        </span>
        <span aria-hidden="true" className="proj__part">
          {look.part}
        </span>
      </TransitionLink>

      <div className="proj__info">
        <p className="proj__meta">
          <span className="proj__n">{pad(index + 1)}</span>
          <span className="proj__cat">{project.category}</span>
          <span className="proj__status" data-live={live}>
            <span aria-hidden="true" className="proj__dot" />
            {live ? "Live" : "Source"}
          </span>
        </p>
        <h3 id={`proj-${project.id}`} className="proj__name t-balance">
          {project.name}
        </h3>
        <p className="proj__tagline t-pretty">{project.tagline}</p>
        <p className="proj__overview line-clamp-3">{project.overview}</p>

        <Flow id={project.id} compact />

        <TechList items={project.technologies.slice(0, 7)} size="sm" className="proj__tech" />

        <div className="proj__actions">
          <TransitionLink href={`/projects/${project.id}`} label={project.name} className="btn btn--primary btn--sm roll-host">
            <RollText text="Case study" />
            <ArrowRightIcon className="btn__arrow h-3.5 w-3.5" />
          </TransitionLink>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm roll-host">
              <RollText text={project.linkLabel} />
              <ArrowUpRightIcon />
            </a>
          )}
        </div>
      </div>
    </m.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section defer-render">
      <div className="wrap">
        <SectionHead
          index="03"
          path="projects"
          title="Selected *projects.*"
          lead="IoT systems, real-time dashboards and full-stack platforms, shipped for real users."
          aside={
            <p className="repo-count">
              <span className="repo-count__n">{pad(projects.length)}</span>
              <span>
                repositories
                <br />
                <span className="text-subtle">each with a case study</span>
              </span>
            </p>
          }
        />

        <div className="projs">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="projs__more">
          <p>More experiments and source code live on GitHub.</p>
          <a href="https://github.com/RakuIchijo12" target="_blank" rel="noreferrer" className="btn btn--ghost roll-host">
            <RollText text="github.com/RakuIchijo12" />
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
