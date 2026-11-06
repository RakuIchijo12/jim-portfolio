"use client";

import { useRef } from "react";
import { heroStats, projects, resumeHref } from "@/app/lib/data";
import { useIntroDone } from "@/app/components/motion/intro";
import { scrollToTarget } from "@/app/components/motion/smooth-scroll";
import RollText from "@/app/components/ui/roll-text";
import LocalTime from "@/app/components/ui/local-time";
import CountUp from "@/app/components/ui/count-up";
import Typed from "@/app/components/ui/typed";
import { IcGlyph } from "@/app/components/ui/glyphs";
import { useOffscreenPause } from "@/app/components/ui/use-offscreen";
import { ArrowDownIcon, ArrowRightIcon, DocumentIcon } from "@/app/components/ui/icons";

const BUILDS = [
  "hospital systems",
  "ERP platforms",
  "REST APIs",
  "IoT dashboards",
  "payroll and HR tools",
  "operational software",
] as const;

const STATS = [
  ...heroStats.slice(0, 2),
  { n: projects.length, suffix: "", label: "Shipped projects" },
  ...heroStats.slice(2),
];

/** Entrance delay for one element, in seconds after the intro lifts. */
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const play = useIntroDone();
  useOffscreenPause(ref);

  return (
    <section id="home" ref={ref} className="hero" data-play={play}>
      {/* A quiet circuit grid with packets running along a few of its lines */}
      <div aria-hidden="true" className="hero__bg">
        <span className="hero__grid" />
        <span className="packet packet--h" style={{ top: "calc(var(--cell) * 2)", animationDelay: "-2s" }} />
        <span className="packet packet--v" style={{ left: "calc(var(--cell) * 14)", animationDelay: "-1s" }} />
        <span className="packet packet--v packet--slow" style={{ left: "calc(var(--cell) * 24)", animationDelay: "-5s" }} />
      </div>

      <div className="wrap hero__wrap">
        <div className="hero__copy">
          <p className="hero__status in" style={d(0.05)}>
            <span className="hero__pill">
              <span aria-hidden="true" className="pulse-dot" />
              Available for work
            </span>
            <span className="hero__where">Davao City, PH</span>
            <LocalTime className="hero__time hidden sm:inline" prefix="" />
          </p>

          <p className="hero__kicker in" style={d(0.12)}>
            <span className="text-accent">&gt;</span> Software Engineer
            <span aria-hidden="true" className="hero__amp">&amp;</span>
            Computer Engineer
          </p>

          <h1 className="hero__name">
            <span className="sr-only">Jimuel Dave Rodado</span>
            <span aria-hidden="true" className="hero__line">
              <span style={d(0.18)}>Jimuel Dave</span>
            </span>
            <span aria-hidden="true" className="hero__line">
              <span style={d(0.26)}>
                Rodado<span className="hero__block" />
              </span>
            </span>
          </h1>

          <p className="hero__typed in" style={d(0.42)}>
            <span className="hero__prompt">~/jimuel $</span> build <Typed words={BUILDS} play={play} />
          </p>

          <p className="hero__lead t-pretty in" style={d(0.5)}>
            I build the systems hospitals and operations teams run on every day: management
            platforms, business software, and applications where downtime is never an option.
          </p>

          <div className="hero__ctas in" style={d(0.58)}>
            <button type="button" className="btn btn--primary roll-host" onClick={() => scrollToTarget("#projects")}>
              <RollText text="View projects" />
              <ArrowRightIcon className="btn__arrow h-4 w-4" />
            </button>
            <button type="button" className="btn btn--ghost roll-host" onClick={() => scrollToTarget("#contact")}>
              <span aria-hidden="true" className="btn__led" />
              <RollText text="Get in touch" />
            </button>
            <a href={resumeHref} target="_blank" rel="noreferrer" className="btn btn--ghost roll-host">
              <DocumentIcon className="h-4 w-4" />
              <RollText text="Résumé" />
            </a>
          </div>
        </div>

        {/* The portrait, whole, framed like a capture on a workstation */}
        <div className="hero__visual">
          <figure className="portrait in" style={d(0.2)}>
            <figcaption className="portrait__bar">
              <span aria-hidden="true" className="win__lights">
                <i />
                <i />
                <i />
              </span>
              <span className="portrait__file">jimuel.webp</span>
              <span className="portrait__dim">1024 &times; 1536</span>
            </figcaption>
            <span className="portrait__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/jim-studio-portrait-1024.webp"
                srcSet="/images/jim-studio-portrait-640.webp 640w, /images/jim-studio-portrait-1024.webp 1024w"
                sizes="(min-width: 1024px) 23rem, 70vw"
                width={1024}
                height={1536}
                alt="Studio portrait of Jimuel Dave Rodado in a brown polo against an olive backdrop"
                fetchPriority="high"
                decoding="async"
              />
              <span aria-hidden="true" className="portrait__corners" />
              <span aria-hidden="true" className="portrait__tag">
                <span className="pulse-dot" /> REC / Davao City
              </span>
            </span>
          </figure>

          {/* Two small instruments beside it: the code and the chip */}
          <div aria-hidden="true" className="float float--code in" style={d(0.62)}>
            <p className="float__title">engineer.ts</p>
            <pre className="code code--sm">
              <code>
                <span className="tk-k">export const</span> <span className="tk-v">jimuel</span> = {"{"}
                {"\n  "}
                <span className="tk-p">role</span>: <span className="tk-s">&quot;Software Engineer&quot;</span>,
                {"\n  "}
                <span className="tk-p">degree</span>: <span className="tk-s">&quot;BS CpE&quot;</span>,
                {"\n  "}
                <span className="tk-p">stack</span>: [<span className="tk-s">&quot;Laravel&quot;</span>, <span className="tk-s">&quot;React&quot;</span>],
                {"\n  "}
                <span className="tk-p">available</span>: <span className="tk-n">true</span>,
                {"\n"}
                {"}"};
              </code>
            </pre>
          </div>

          <div aria-hidden="true" className="float float--chip in" style={d(0.7)}>
            <IcGlyph className="float__ic" label="JDR" />
            <span className="float__lines">
              <span className="float__k">U1 / JDR-26</span>
              <span className="float__v">
                <span className="pulse-dot" /> uptime 2y+
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="hero__foot in" style={d(0.7)}>
          <dl className="hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="m-0">
                  <CountUp value={stat.n} suffix={stat.suffix} className="hero__stat-n" />
                  <span aria-hidden="true" className="hero__stat-l">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            className="hero__scroll"
            onClick={() => scrollToTarget("#about")}
            aria-label="Scroll to the about section"
          >
            <span>scroll</span>
            <ArrowDownIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
