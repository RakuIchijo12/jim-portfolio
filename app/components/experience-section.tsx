"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { experience } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const lineVariants = {
  hidden:  { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.9, ease } },
};

const entryVariants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const bulletVariant = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <m.div
          className="section-eyebrow mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          04 / Experience
        </m.div>

        {/* Heading */}
        <m.div
          className="mb-10 grid gap-6 sm:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <div>
            <h2
              className="font-display max-w-3xl text-3xl font-700 leading-tight sm:text-4xl lg:text-5xl"
              style={{ fontWeight: 700 }}
            >
              A record of building software that serves{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>real institutions.</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7" style={{ color: "var(--muted)" }}>
              Healthcare systems, ERP platforms, APIs, and workflows built for reliability.
            </p>
          </div>

          <div className="flex items-end gap-6">
            <div>
              <p className="font-display text-4xl leading-none sm:text-5xl" style={{ fontWeight: 700 }}>
                {String(experience.length).padStart(2, "0")}
              </p>
              <p className="lux-label mt-2" style={{ color: "var(--gold)" }}>
                Roles
              </p>
            </div>
          </div>
        </m.div>

        {/* Timeline */}
        <m.div
          className="relative pl-6 sm:pl-8"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <m.div className="timeline-line" variants={lineVariants} />

          {experience.map((job, i) => (
            <m.article
              key={`${job.company}-${i}`}
              variants={entryVariants}
              className="relative pb-6 last:pb-0 sm:pb-8"
            >
              <div className={`timeline-dot${job.current ? " timeline-dot--current" : ""}`} />

              <div className="lux-card p-5 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:gap-8 lg:grid-cols-[240px_1fr]">

                  {/* Left: meta */}
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className="font-mono text-[0.6rem] font-700 uppercase tracking-widest"
                        style={{ color: "var(--gold)", fontWeight: 700 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {job.current && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[0.58rem] font-700 uppercase tracking-wide"
                          style={{
                            background: "var(--gold-light)",
                            border: "1px solid rgba(194,168,120,0.35)",
                            color: "var(--gold)",
                            fontWeight: 700,
                          }}
                        >
                          <span aria-hidden="true" className="live-dot" style={{ width: 5, height: 5 }} />
                          Current
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-700 leading-snug" style={{ fontWeight: 700 }}>
                      {job.company}
                    </h4>
                    <p className="mt-1.5 font-mono text-[0.65rem] leading-5" style={{ color: "var(--muted)" }}>
                      {job.period}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.6rem]" style={{ color: "var(--subtle)" }}>
                      {job.type} · {job.location}
                    </p>
                  </div>

                  {/* Right: role + bullets */}
                  <div>
                    <h3
                      className="font-display mb-4 text-lg font-600 leading-snug sm:text-2xl"
                      style={{ fontWeight: 600 }}
                    >
                      {job.role}
                    </h3>

                    <m.ul className="max-w-2xl space-y-2.5" variants={stagger}>
                      {job.points.map((point) => (
                        <m.li
                          key={point.slice(0, 30)}
                          variants={bulletVariant}
                          className="flex items-start gap-3 text-sm leading-7"
                          style={{ color: "var(--muted)" }}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: "var(--gold)" }}
                          />
                          <span>{point}</span>
                        </m.li>
                      ))}
                    </m.ul>
                  </div>
                </div>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
