"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { aboutBio, aboutCards, labNotes } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.12 } },
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
      className="relative py-24 sm:py-32"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Eyebrow + heading (full width) ── */}
        <div ref={headingRef} className="mb-14">
          <motion.div
            className="section-eyebrow mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            01 / About
          </motion.div>

          <motion.h2
            className="font-display text-3xl font-700 leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontWeight: 700 }}
            initial={{ opacity: 0, y: 32 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering software for institutions that cannot afford to{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>fail.</em>
          </motion.h2>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:items-start">

          {/* Left — avatar + name + bio */}
          <motion.div
            ref={portraitRef}
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Gold ring + circle crop */}
            <motion.div
              className="relative"
              style={{ y: portraitY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="rounded-full p-0.75"
                style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))" }}
              >
                <div className="h-44 w-44 overflow-hidden rounded-full sm:h-56 sm:w-56" style={{ background: "var(--bg)" }}>
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
              <motion.div
                className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-hv)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, ease }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
                <span className="text-[0.6rem] font-bold uppercase tracking-wider" style={{ color: "var(--fg)" }}>
                  Available
                </span>
              </motion.div>
            </motion.div>

            {/* Name + role */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
            >
              <p className="font-display text-xl leading-tight" style={{ fontWeight: 700 }}>
                Jimuel Dave Rodado
              </p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-widest" style={{ color: "var(--gold)", fontWeight: 700 }}>
                Software Engineer · Computer Engineer
              </p>
            </motion.div>

            {/* Bio */}
            <motion.div
              className="space-y-3 text-center lg:text-left"
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
            </motion.div>
          </motion.div>

          {/* Right — cards + meters */}
          <div className="space-y-5">

            {/* About cards */}
            <motion.div
              ref={cardsRef}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
              variants={stagger}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
            >
              {aboutCards.map((card) => (
                <motion.article
                  key={card.title}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-sm p-5 transition-all duration-300"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                  whileHover={{
                    y: -4,
                    borderColor: "var(--gold)",
                    boxShadow: "0 0 0 1px rgba(194,168,120,0.3), 0 8px 32px rgba(194,168,120,0.07)",
                  }}
                >
                  <div aria-hidden="true" className="absolute top-0 left-4 h-px w-8" style={{ background: "var(--gold)", opacity: 0.6 }} />
                  <p className="font-mono text-[0.58rem] font-700 uppercase tracking-[0.22em] mb-3" style={{ color: "var(--gold)", fontWeight: 700 }}>
                    {card.title}
                  </p>
                  <h3 className="font-display text-xl font-600 leading-tight mb-2" style={{ fontWeight: 600 }}>
                    {card.value}
                  </h3>
                  <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                    {card.copy}
                  </p>
                </motion.article>
              ))}
            </motion.div>

            {/* Work approach meters */}
            <motion.div
              ref={metersRef}
              className="rounded-sm p-5 sm:p-6"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={metersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <p className="font-mono text-[0.6rem] font-700 uppercase tracking-widest mb-5" style={{ color: "var(--gold)", fontWeight: 700 }}>
                Work Approach
              </p>

              <div className="space-y-5">
                {labNotes.map((note, i) => (
                  <div key={note.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-600" style={{ fontWeight: 600 }}>{note.label}</span>
                      <span className="font-mono text-sm font-700" style={{ color: "var(--gold)", fontWeight: 700 }}>{note.display}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--border-hv)" }}>
                      {metersInView && (
                        <div
                          className="h-full rounded-full meter-fill-bar"
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
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
