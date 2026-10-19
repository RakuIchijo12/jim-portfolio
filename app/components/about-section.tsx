"use client";

import { m } from "framer-motion";
import { aboutBio, aboutCards, heroStats, labNotes } from "@/app/lib/data";
import { SectionMeta } from "@/app/components/ui/section-head";
import CountUp from "@/app/components/ui/count-up";
import { ease, Reveal, riseChild, staggerParent } from "@/app/components/ui/reveal";
import ScrollLit from "@/app/components/ui/scroll-lit";
import { SHAPE_CLASS, SHAPE_COLOR, SHAPE_CYCLE } from "@/app/components/ui/shapes";
import AboutStamp from "@/app/components/about-stamp";

const MANIFESTO =
  "Engineering software for institutions that cannot afford to *fail.* [circle] " +
  "I build hospital systems, ERP platforms [square] and the everyday tools operations " +
  "teams depend on, made to be reliable, readable and quietly [tri] *beautiful.*";

function Gauge({
  value,
  label,
  color,
  delay,
}: {
  value: number;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <div className="gauge">
      <div className="gauge__dial">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" strokeWidth="1.5" />
          <m.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={color}
            strokeWidth="5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: value / 100 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.8, ease, delay }}
          />
        </svg>
        <span className="gauge__n">
          <CountUp value={value} suffix="%" duration={1800} />
        </span>
      </div>
      <span className="t-label text-muted">{label}</span>
    </div>
  );
}

const PLATE_SHAPES = SHAPE_CYCLE;
const GAUGE_COLORS = ["var(--brand-terra)", "var(--ochre)", "var(--olive)"];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionMeta index="01" label="About" />

        <ScrollLit text={MANIFESTO} className="manifesto t-pretty" />

        <div className="about-grid">
          {/* The off-duty portrait as a postage stamp, the same size as the hero portrait */}
          <AboutStamp className="lg:sticky lg:top-28" />

          {/* Body */}
          <div className="space-y-14">
            <div className="grid gap-5 md:grid-cols-2">
              {aboutBio.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 24)} delay={i * 0.1}>
                  <p className="t-lead t-pretty">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <dl className="stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="stat">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="m-0">
                      <CountUp value={stat.n} suffix={stat.suffix} className="stat__n" />
                      <span aria-hidden="true" className="stat__l t-label">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <m.ul
              className="plates"
              variants={staggerParent}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.25 }}
            >
              {aboutCards.map((card, i) => (
                <m.li key={card.title} variants={riseChild} className="plate">
                  <div className="plate__top">
                    <span
                      aria-hidden="true"
                      className={`plate__shape plate__shape--${PLATE_SHAPES[i]} ${SHAPE_CLASS[PLATE_SHAPES[i]]}`}
                      style={{ background: SHAPE_COLOR[PLATE_SHAPES[i]] }}
                    />
                    <span className="t-label text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="t-label text-accent">{card.title}</p>
                  <h3 className="plate__title">{card.value}</h3>
                  <p className="plate__copy t-pretty">{card.copy}</p>
                </m.li>
              ))}
            </m.ul>

            <div>
              <SectionMeta index="01.1" label="Work approach" className="mb-8" />
              <div className="gauges">
                {labNotes.map((note, i) => (
                  <Gauge
                    key={note.label}
                    value={note.value}
                    label={note.label}
                    color={GAUGE_COLORS[i % GAUGE_COLORS.length]}
                    delay={0.15 + i * 0.15}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
