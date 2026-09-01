"use client";

import { useRef } from "react";
import { m, useInView, useScroll, useTransform } from "framer-motion";
import { aboutBio, aboutCards, labNotes } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const metersRef   = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const cardsInView   = useInView(cardsRef,   { once: true, amount: 0.2 });
  const metersInView  = useInView(metersRef,  { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Eyebrow + heading ── */}
        <div ref={headingRef} className="mb-10 sm:mb-14">
          <m.div
            className="section-eyebrow mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            01 / About
          </m.div>

          <m.h2
            className="font-display max-w-4xl text-3xl font-700 leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontWeight: 700 }}
            initial={{ opacity: 0, y: 32 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering software for institutions that cannot afford to{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>fail.</em>
          </m.h2>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:items-start">

          {/* Left — portrait card */}
          <m.div
            ref={portraitRef}
            className="lux-panel flex flex-col items-center gap-6 p-6 sm:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
          >
            <span aria-hidden="true" className="lux-corner lux-corner--tl" />
            <span aria-hidden="true" className="lux-corner lux-corner--tr" />
            <span aria-hidden="true" className="lux-corner lux-corner--bl" />
            <span aria-hidden="true" className="lux-corner lux-corner--br" />

            {/* Gold ring + circle crop */}
            <m.div
              className="relative"
              style={{ y: portraitY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="rounded-full p-0.75"
                style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))" }}
              >
                <div className="h-44 w-44 overflow-hidden rounded-full sm:h-52 sm:w-52" style={{ background: "var(--bg)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jim-cafe-portrait-optimized.webp"
                    alt="Portrait of Jimuel Dave Rodado"
                    className="block h-full w-full object-cover"
                    style={{ objectPosition: "center 18%", filter: "saturate(0.95) contrast(1.05)" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Availability badge */}
              <m.div
                className="glass-card absolute bottom-1 right-1 flex items-center gap-2 rounded-full px-3 py-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, ease }}
              >
                <span aria-hidden="true" className="live-dot" />
                <span className="lux-label" style={{ color: "var(--fg)" }}>
                  Available
                </span>
              </m.div>
            </m.div>

            {/* Name + role */}
            <m.div
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
            >
              <p className="font-display text-2xl leading-tight" style={{ fontWeight: 700 }}>
                Jimuel Dave Rodado
              </p>
              <p className="lux-label mt-2" style={{ color: "var(--gold)" }}>
                Software Engineer · Computer Engineer
              </p>
            </m.div>

            <div aria-hidden="true" className="gold-rule w-full opacity-50" />

            {/* Bio */}
            <m.div
              className="space-y-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.7, ease }}
            >
              {aboutBio.map((para) => (
                <p key={para.slice(0, 30)} className="text-sm leading-7" style={{ color: "var(--muted)" }}>
                  {para}
                </p>
              ))}
            </m.div>
          </m.div>

          {/* Right — cards + meters */}
          <div className="space-y-5">

            {/* About cards */}
            <m.div
              ref={cardsRef}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              variants={stagger}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
            >
              {aboutCards.map((card, i) => (
                <m.article
                  key={card.title}
                  variants={fadeUp}
                  className="lux-card flex flex-col p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <p className="lux-label" style={{ color: "var(--gold)" }}>
                      {card.title}
                    </p>
                    <span
                      className="font-mono text-[0.58rem]"
                      style={{ color: "var(--subtle)", opacity: 0.7 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display mb-2 text-xl font-600 leading-tight" style={{ fontWeight: 600 }}>
                    {card.value}
                  </h3>
                  <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                    {card.copy}
                  </p>
                </m.article>
              ))}
            </m.div>

            {/* Work approach meters */}
            <m.div
              ref={metersRef}
              className="lux-panel p-5 sm:p-7"
              initial={{ opacity: 0, y: 24 }}
              animate={metersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <span aria-hidden="true" className="lux-corner lux-corner--tl" />
              <span aria-hidden="true" className="lux-corner lux-corner--tr" />
              <span aria-hidden="true" className="lux-corner lux-corner--bl" />
              <span aria-hidden="true" className="lux-corner lux-corner--br" />

              <div className="mb-6 flex items-baseline gap-4">
                <p className="lux-label" style={{ color: "var(--gold)" }}>
                  Work Approach
                </p>
                <span aria-hidden="true" className="h-px flex-1" style={{ background: "var(--border-hv)" }} />
              </div>

              <div className="space-y-5">
                {labNotes.map((note, i) => (
                  <div key={note.label}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm font-600" style={{ fontWeight: 600 }}>{note.label}</span>
                      <span
                        className="font-display text-lg leading-none"
                        style={{ color: "var(--gold)", fontWeight: 700 }}
                      >
                        {note.display}
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--border-hv)" }}>
                      {metersInView && (
                        <div
                          className="meter-fill-bar h-full rounded-full"
                          style={{
                            width: note.display,
                            background: "linear-gradient(90deg, var(--gold-dark), var(--gold))",
                            animationDelay: `${i * 180}ms`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
}
