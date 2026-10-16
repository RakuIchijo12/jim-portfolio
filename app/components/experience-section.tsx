"use client";

import { useState } from "react";
import { m, type Variants } from "framer-motion";
import { experience } from "@/app/lib/data";
import { TECH_ICON_MAP } from "@/app/lib/tech-icons";
import SectionHead from "@/app/components/ui/section-head";
import CountUp from "@/app/components/ui/count-up";
import { ease } from "@/app/components/ui/reveal";

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ExperienceSection() {
  // The current role starts open; the rest wait for a click.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Experience"
          title="A record of software that serves *real institutions.*"
          lead="Healthcare systems, ERP platforms, APIs and workflows built for reliability."
          aside={
            <div>
              <CountUp
                value={experience.length}
                className="block font-display text-5xl font-bold leading-none tracking-tight sm:text-6xl"
              />
              <p className="t-label mt-2 text-muted">Roles</p>
            </div>
          }
        />

        <m.ol
          className="xp"
          variants={list}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.15 }}
        >
          {experience.map((job, i) => {
            const isOpen = open === i;
            const panelId = `xp-panel-${i}`;
            return (
              <m.li key={`${job.company}-${job.period}`} className="xp__item" data-open={isOpen} variants={row}>
                <h3 className="m-0">
                  <button
                    type="button"
                    className="xp__head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span aria-hidden="true" className="xp__fill" />
                    <span className="xp__idx t-label">({pad(i + 1)})</span>
                    <span className="xp__role">
                      {job.role}
                      {job.current && (
                        <span className="xp__now">
                          <span aria-hidden="true" className="status-dot" />
                          Now
                        </span>
                      )}
                    </span>
                    <span className="xp__company">{job.company}</span>
                    <span className="xp__period t-label">{job.period}</span>
                    <span aria-hidden="true" className="xp__toggle">
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>

                <div id={panelId} className="xp__panel" inert={!isOpen}>
                  <div className="xp__panel-inner">
                    <div className="xp__body">
                      <ul className="xp__points">
                        {job.points.map((point) => (
                          <li key={point.slice(0, 32)} className="t-pretty">
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="xp__side">
                        <p className="t-label text-muted">
                          {job.type} &middot; {job.location}
                        </p>
                        {job.stack.length > 0 && (
                          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                            {job.stack.map((tech) => {
                              const file = TECH_ICON_MAP[tech];
                              return (
                                <li key={tech} className="tech-pill">
                                  <span className="tech-pill__icon">
                                    {file ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        alt=""
                                        aria-hidden="true"
                                        src={`/stack-icons/${file}`}
                                        width={16}
                                        height={16}
                                        loading="lazy"
                                        decoding="async"
                                      />
                                    ) : (
                                      <span className="tech-dot__txt">{tech.slice(0, 2)}</span>
                                    )}
                                  </span>
                                  {tech}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </m.li>
            );
          })}
        </m.ol>
      </div>
    </section>
  );
}
