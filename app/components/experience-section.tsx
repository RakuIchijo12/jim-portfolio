"use client";

import { useRef } from "react";
import { m, useInView, useScroll, useSpring } from "framer-motion";
import { experience } from "@/app/lib/data";
import SectionHead from "@/app/components/ui/section-head";
import SpotlightCard from "@/app/components/ui/spotlight";
import CountUp from "@/app/components/ui/count-up";
import { TECH_ICON_MAP, DARK_ICONS } from "@/app/lib/tech-icons";

const ease = [0.22, 1, 0.36, 1] as const;

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

/* Tighter than the bullet stagger — ten plates at 0.18s would crawl. */
const plateStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const plateVariant = {
  hidden:  { opacity: 0, y: 8, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease } },
};

/**
 * One technology, as a logo disc — the same circular language the stack
 * section uses, at rail scale. The name rides above on hover, so a column
 * of these stays a tidy grid instead of a ragged run of word-pills.
 */
function TechPlate({ tech }: { tech: string }) {
  const iconFile = TECH_ICON_MAP[tech];

  return (
    <m.li variants={plateVariant} className="group relative">
      <span
        title={tech}
        className="relative grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          background: "var(--surface-alt)",
          boxShadow: "inset 0 0 0 1px var(--border)",
        }}
      >
        {/* Gold rim, faded in over the resting one so neither has to win a
            specificity fight with the inline style above. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 1px var(--gold-line), 0 10px 22px -12px var(--gold)",
          }}
        />

        {iconFile ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            aria-hidden="true"
            src={`/stack-icons/${iconFile}`}
            width={18}
            height={18}
            className={`relative h-[1.125rem] w-[1.125rem] object-contain opacity-75 transition duration-300 group-hover:scale-110 group-hover:opacity-100${
              DARK_ICONS.has(tech) ? " dark:invert" : ""
            }`}
            style={{ filter: "saturate(0.65)" }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-mono text-[0.5rem] font-bold tracking-tight"
            style={{ color: "var(--muted)" }}
          >
            {tech.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>

      {/* Left-anchored so the first disc in a row never spills past the
          card padding. */}
      <span
        className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 whitespace-nowrap rounded px-2 py-1 font-mono text-[0.55rem] font-bold uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: "var(--card)",
          border: "1px solid var(--gold-line)",
          color: "var(--gold)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {tech}
      </span>
    </m.li>
  );
}

export default function ExperienceSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView      = useInView(sectionRef, { once: true, amount: 0.1 });

  /* The gold line draws itself as the timeline passes through the viewport. */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHead
          eyebrow="04 / Experience"
          heading={
            <>
              A record of building software that serves{" "}
              <em className="t-em">real institutions.</em>
            </>
          }
          lead="Healthcare systems, ERP platforms, APIs, and workflows built for reliability."
          aside={
            <div>
              <CountUp
                value={experience.length}
                className="font-display block text-4xl leading-none sm:text-5xl"
                style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
              />
              <p className="lux-label mt-2" style={{ color: "var(--gold)" }}>
                Roles
              </p>
            </div>
          }
          className="mb-10 sm:mb-16"
        />

        {/* Timeline */}
        <m.div
          ref={timelineRef}
          className="relative pl-6 sm:pl-8"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div aria-hidden="true" className="timeline-line">
            <m.div className="timeline-line__fill" style={{ scaleY: lineScale }} />
          </div>

          {experience.map((job, i) => (
            <m.article
              key={`${job.company}-${i}`}
              variants={entryVariants}
              className="relative pb-6 last:pb-0 sm:pb-8"
            >
              <div className={`timeline-dot${job.current ? " timeline-dot--current" : ""}`} />

              <SpotlightCard className="lux-card p-5 sm:p-7">
                <div className="grid items-start gap-5 sm:grid-cols-[180px_1fr] sm:grid-rows-[auto_1fr] sm:gap-x-8 sm:gap-y-6 lg:grid-cols-[240px_1fr]">

                  {/* Left column, row 1: meta */}
                  <div className="sm:col-start-1 sm:row-start-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className="font-mono text-[0.6rem] uppercase tracking-widest"
                        style={{ color: "var(--gold)", fontWeight: 700 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {job.current && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-wide"
                          style={{
                            background: "var(--gold-light)",
                            border: "1px solid var(--gold-line)",
                            color: "var(--gold)",
                            fontWeight: 700,
                          }}
                        >
                          <span aria-hidden="true" className="live-dot" style={{ width: 5, height: 5 }} />
                          Current
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm leading-snug" style={{ fontWeight: 700 }}>
                      {job.company}
                    </h4>
                    <p
                      className="mt-1.5 font-mono text-[0.65rem] leading-5"
                      style={{ color: "var(--muted)" }}
                    >
                      {job.period}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.6rem]" style={{ color: "var(--subtle)" }}>
                      {job.type} · {job.location}
                    </p>
                  </div>

                  {/* Right column, spanning both rows: role + bullets */}
                  <div className="sm:col-start-2 sm:row-start-1 sm:row-span-2">
                    <h3
                      className="font-display mb-4 text-lg leading-snug sm:text-2xl"
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
                            className="mt-3 h-px w-3 shrink-0"
                            style={{
                              background:
                                "linear-gradient(90deg, var(--gold), transparent)",
                            }}
                          />
                          <span className="t-pretty">{point}</span>
                        </m.li>
                      ))}
                    </m.ul>
                  </div>

                  {/* Left column, row 2 — the meta rail runs short, so the
                      stack fills it. On one column it falls in last. */}
                  {job.stack.length > 0 && (
                    <div
                      className="pt-4 sm:col-start-1 sm:row-start-2"
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <p className="lux-label mb-3" style={{ color: "var(--subtle)" }}>
                        Stack
                      </p>
                      <m.ul className="flex flex-wrap gap-2" variants={plateStagger}>
                        {job.stack.map((tech) => (
                          <TechPlate key={tech} tech={tech} />
                        ))}
                      </m.ul>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
