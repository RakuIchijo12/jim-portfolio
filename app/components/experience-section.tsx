"use client";

import { useState } from "react";
import { m, type Variants } from "framer-motion";
import { experience } from "@/app/lib/data";
import { shortHash } from "@/app/lib/project-looks";
import SectionHead from "@/app/components/ui/section-head";
import { TechList } from "@/app/components/ui/tech";
import { ease } from "@/app/components/ui/reveal";
import { BranchIcon } from "@/app/components/ui/icons";

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const entry: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

/** "Full-time · On-site" -> "full-time". */
const kind = (type: string) => type.split("·")[0].trim().toLowerCase();

/**
 * The work history as `git log --graph`: one commit per role, newest on
 * top, HEAD on the current job. Each commit opens into its diff: what the
 * role added, and the stack it ran on.
 */
export default function ExperienceSection() {
  // The current role starts open; the rest wait for a click.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="section section--alt defer-render">
      <div className="wrap">
        <SectionHead
          index="04"
          path="experience"
          title="A record of software that serves *real institutions.*"
          lead="Healthcare systems, ERP platforms, APIs and workflows built for reliability."
          aside={
            <p className="gitcmd">
              <BranchIcon className="h-4 w-4 text-accent" />
              <span>
                git log --graph
                <br />
                <span className="text-subtle">
                  {experience.length} commits on <b className="text-fg">main</b>
                </span>
              </span>
            </p>
          }
        />

        <m.ol
          className="log"
          variants={list}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experience.map((job, i) => {
            const isOpen = open === i;
            const panelId = `log-panel-${i}`;
            const hash = shortHash(`${job.company}${job.period}${job.role}`);
            return (
              <m.li
                key={`${job.company}-${job.period}`}
                className="log__item"
                data-open={isOpen}
                data-current={job.current}
                variants={entry}
              >
                <span aria-hidden="true" className="log__node" />
                <h3 className="m-0">
                  <button
                    type="button"
                    className="log__head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="log__line1">
                      <span className="log__hash">{hash}</span>
                      {job.current && (
                        <span className="log__ref">
                          HEAD <span aria-hidden="true">&rarr;</span> main
                        </span>
                      )}
                      <span className="log__tag">{kind(job.type)}</span>
                      <span className="log__period">{job.period}</span>
                    </span>
                    <span className="log__role">{job.role}</span>
                    <span className="log__company">
                      <span className="text-subtle">@</span> {job.company}
                    </span>
                    <span aria-hidden="true" className="log__toggle">
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>

                <div id={panelId} className="log__panel" inert={!isOpen}>
                  <div className="log__panel-in">
                    <div className="log__diff">
                      <p className="log__diffhead">
                        <span>
                          {job.type} / {job.location}
                        </span>
                        <span className="log__stat">
                          <b>+{job.points.length}</b> contributions
                        </span>
                      </p>
                      <ul className="log__points">
                        {job.points.map((point) => (
                          <li key={point.slice(0, 32)} className="t-pretty">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {job.stack.length > 0 && <TechList items={job.stack} size="sm" className="log__stack" />}
                  </div>
                </div>
              </m.li>
            );
          })}
          <li aria-hidden="true" className="log__root">
            <span className="log__node log__node--root" />
            <span>
              initial commit <span className="text-subtle">/ BS Computer Engineering, University of Mindanao</span>
            </span>
          </li>
        </m.ol>
      </div>
    </section>
  );
}
