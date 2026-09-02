"use client";

import { useRef } from "react";
import { m, useInView, useScroll, useTransform } from "framer-motion";
import { aboutBio, aboutCards, labNotes } from "@/app/lib/data";
import SectionHead from "@/app/components/ui/section-head";
import SpotlightCard from "@/app/components/ui/spotlight";
import { fadeUpChild, staggerParent } from "@/app/components/ui/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const metersRef  = useRef<HTMLDivElement>(null);
  const metersInView = useInView(metersRef, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHead
          eyebrow="01 / About"
          heading={
            <>
              Engineering software for institutions that cannot afford to{" "}
              <em className="t-em">fail.</em>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">

          {/* ── Left: portrait card ── */}
          <m.div
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

            <m.div className="relative" style={{ y: portraitY }}>
              {/* Slowly turning conic ring — the frame, not the photo, moves */}
              <m.div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, var(--gold) 70deg, var(--gold-bright) 110deg, var(--gold) 150deg, transparent 230deg, var(--gold-dark) 300deg, transparent 360deg)",
                  opacity: 0.55,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />

              <div
                className="relative rounded-full p-0.75"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))",
                }}
              >
                <div
                  className="h-44 w-44 overflow-hidden rounded-full sm:h-52 sm:w-52"
                  style={{ background: "var(--bg)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jim-cafe-portrait-optimized.webp"
                    alt="Portrait of Jimuel Dave Rodado"
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    style={{ objectPosition: "center 18%", filter: "saturate(0.95) contrast(1.05)" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

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

            <m.div
              className="space-y-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.7, ease }}
            >
              {aboutBio.map((para) => (
                <p
                  key={para.slice(0, 30)}
                  className="t-pretty text-sm leading-7"
                  style={{ color: "var(--muted)" }}
                >
                  {para}
                </p>
              ))}
            </m.div>
          </m.div>

          {/* ── Right: cards + meters ── */}
          <div className="space-y-5">

            <m.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {aboutCards.map((card, i) => (
                <m.div key={card.title} variants={fadeUpChild} className="h-full">
                  <SpotlightCard className="lux-card flex h-full flex-col p-5 sm:p-6">
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

                    <h3
                      className="font-display mb-2 text-xl leading-tight"
                      style={{ fontWeight: 600 }}
                    >
                      {card.value}
                    </h3>
                    <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                      {card.copy}
                    </p>
                  </SpotlightCard>
                </m.div>
              ))}
            </m.div>

            {/* Work approach meters */}
            <m.div
              ref={metersRef}
              className="lux-panel p-5 sm:p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
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
                <span aria-hidden="true" className="rule-soft flex-1" />
              </div>

              <div className="space-y-5">
                {labNotes.map((note, i) => (
                  <div key={note.label}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm" style={{ fontWeight: 600 }}>
                        {note.label}
                      </span>
                      <span
                        className="font-display text-lg leading-none"
                        style={{ color: "var(--gold)", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
                      >
                        {note.display}
                      </span>
                    </div>
                    <div
                      className="h-1 w-full overflow-hidden rounded-full"
                      style={{ background: "var(--border-hv)" }}
                    >
                      <m.div
                        className="h-full origin-left rounded-full"
                        style={{
                          width: note.display,
                          background: "linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-bright))",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={metersInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 1.2, ease, delay: 0.15 + i * 0.14 }}
                      />
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
