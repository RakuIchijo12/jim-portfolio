"use client";

import { m, type Variants } from "framer-motion";
import { aboutBio, aboutCards, experience, labNotes, totalTechnologies } from "@/app/lib/data";
import SectionHead from "@/app/components/ui/section-head";
import { Window } from "@/app/components/ui/window";
import { ease, Reveal } from "@/app/components/ui/reveal";
import { Barcode, EmvChip, LogoMark } from "@/app/components/ui/glyphs";

const DOMAINS = ["healthcare/", "erp/", "crm/", "hr-payroll/", "dashboards/", "iot/"];

/* Terminal output prints a line at a time once it scrolls into view. */
const printer: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const printed: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.25 } },
};

function Prompt({ cmd }: { cmd: string }) {
  return (
    <m.p variants={printed} className="term__cmd">
      <span className="term__user">jimuel@davao</span>
      <span className="term__dim">:</span>
      <span className="term__path">~</span>
      <span className="term__dim">$</span> {cmd}
    </m.p>
  );
}

function Terminal() {
  return (
    <Window title="jimuel@davao: ~ (zsh)" extra={<span className="term__size">120 &times; 32</span>} className="term">
      <m.div variants={printer} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }}>
        <Prompt cmd="whoami" />
        <m.p variants={printed} className="term__out term__out--strong">
          Jimuel Dave Rodado
        </m.p>
        <m.p variants={printed} className="term__out">
          Software Engineer <span className="term__dim">/</span> BS Computer Engineering, University of Mindanao
        </m.p>

        <Prompt cmd="cat about.md" />
        {aboutBio.map((paragraph) => (
          <m.p key={paragraph.slice(0, 24)} variants={printed} className="term__out term__para t-pretty">
            {paragraph}
          </m.p>
        ))}

        <Prompt cmd="ls ./domains" />
        <m.p variants={printed} className="term__out term__ls">
          {DOMAINS.map((dir) => (
            <span key={dir}>{dir}</span>
          ))}
        </m.p>

        <Prompt cmd="uptime" />
        <m.p variants={printed} className="term__out">
          up <span className="term__hi">2+ years</span>, {experience.length} roles, {totalTechnologies} tools
          loaded, load average: healthcare, erp, iot
        </m.p>

        <m.p variants={printed} className="term__cmd">
          <span className="term__user">jimuel@davao</span>
          <span className="term__dim">:</span>
          <span className="term__path">~</span>
          <span className="term__dim">$</span> <span aria-hidden="true" className="term__caret" />
        </m.p>
      </m.div>
    </Window>
  );
}

/* The off-duty photo on an access badge: whole, at its own 2:3 ratio. */
function Badge() {
  return (
    <Reveal className="badge-wrap" y={28}>
      <figure className="badge">
        <span aria-hidden="true" className="badge__clip" />
        <div className="badge__card">
          <div className="badge__head">
            <LogoMark className="badge__mark" />
            <span className="badge__org">
              Access pass
              <span>Engineering</span>
            </span>
            <span aria-hidden="true" className="badge__nfc">
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="badge__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jim-cafe-portrait-optimized.webp"
              width={768}
              height={1154}
              alt="Jimuel Dave Rodado smiling with his arms crossed at a garden cafe in Davao City"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="badge__body">
            <p className="badge__name">Jimuel Dave Rodado</p>
            <p className="badge__role">Software Engineer</p>
            <div className="badge__row">
              <EmvChip className="badge__chip" />
              <dl className="badge__meta">
                <div>
                  <dt>ID</dt>
                  <dd>JDR-2026</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>Davao City</dd>
                </div>
              </dl>
            </div>
            <Barcode value="JDR2026" className="badge__code" />
          </div>
        </div>
        <figcaption className="badge__cap">Fig. 02 / Off the clock, Davao City</figcaption>
      </figure>
    </Reveal>
  );
}

const rows: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* The three facts as a component datasheet. */
function Datasheet() {
  return (
    <div className="sheet">
      <div className="sheet__head">
        <span>Datasheet</span>
        <span className="sheet__part">JDR-2026 / rev. B</span>
      </div>
      <m.dl className="sheet__rows" variants={rows} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
        {aboutCards.map((card, i) => (
          <m.div key={card.title} className="sheet__row" variants={row}>
            <dt className="sheet__k">
              <span className="sheet__pin">P{i + 1}</span>
              {card.title}
            </dt>
            <dd className="sheet__v">
              <span className="sheet__value">{card.value}</span>
              <span className="sheet__copy t-pretty">{card.copy}</span>
            </dd>
          </m.div>
        ))}
      </m.dl>
    </div>
  );
}

/* The work approach as a passing test run. */
function TestRun() {
  return (
    <Window title="npm test" className="tests" extra={<span className="tests__ok">passing</span>}>
      <p className="tests__cmd">
        <span className="text-accent">$</span> npm test <span className="term__dim">-- --profile=jimuel</span>
      </p>
      {/* The list is what scrolls into view; a bar at scaleX(0) has no area
          for an observer to see. */}
      <m.ul className="tests__list" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.5 }}>
        {labNotes.map((note, i) => (
          <li key={note.label} className="tests__item">
            <span className="tests__pass">PASS</span>
            <span className="tests__name">{note.label.toLowerCase()}</span>
            <span className="tests__bar">
              <m.span
                className="tests__fill"
                variants={{
                  hidden: { scaleX: 0 },
                  shown: {
                    scaleX: note.value / 100,
                    transition: { duration: 1.3, ease, delay: 0.15 + i * 0.15 },
                  },
                }}
              />
            </span>
            <span className="tests__n">{note.display}</span>
          </li>
        ))}
      </m.ul>
      <p className="tests__sum">
        Tests: <b>{labNotes.length} passed</b>, {labNotes.length} total
        <span className="term__dim"> / </span>
        Time: 2+ yrs
      </p>
    </Window>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section defer-render">
      <div className="wrap">
        <SectionHead
          index="01"
          path="about"
          title="Engineering software for institutions that cannot afford to *fail.*"
          lead="A software engineer trained as a computer engineer: comfortable from the database schema up to the interface, and down to the hardware when a project needs it."
        />

        <div className="about">
          <Reveal className="about__term" y={28}>
            <Terminal />
          </Reveal>
          <Badge />
        </div>

        <div className="about__specs">
          <Reveal y={24}>
            <Datasheet />
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <TestRun />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
