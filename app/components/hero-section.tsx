"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { resumeHref } from "@/app/lib/data";
import { useIntroDone } from "@/app/components/motion/intro";
import { scrollToTarget } from "@/app/components/motion/smooth-scroll";
import Magnetic from "@/app/components/ui/magnetic";
import Marquee from "@/app/components/ui/marquee";
import RollText from "@/app/components/ui/roll-text";
import RotatingBadge from "@/app/components/ui/rotating-badge";
import LocalTime from "@/app/components/ui/local-time";
import { ease } from "@/app/components/ui/reveal";
import RiseChars from "@/app/components/ui/rise-chars";
import { useOffscreenPause } from "@/app/components/ui/use-offscreen";
import { ArrowDownIcon, ArrowRightIcon, DocumentIcon } from "@/app/components/ui/icons";
import {
  SchCapacitor,
  SchDiode,
  SchGate,
  SchGround,
  SchLed,
  SchResistor,
} from "@/app/components/ui/circuit";
import HeroCircuit from "@/app/components/hero-circuit";

const sweep = [0.76, 0, 0.24, 1] as const;
/** Seconds after the intro lifts before the hero starts composing itself. */
const T = 0.1;

const stackTape = [
  "Laravel",
  "FilamentPHP",
  "React",
  "Next.js",
  "TypeScript",
  "Inertia.js",
  "Livewire",
  "NestJS",
  "Angular",
  "Django",
  "PostgreSQL",
  "MySQL",
];

const focusTape = [
  "Hospital systems",
  "ERP and CRM",
  "Payroll and HR",
  "Operational dashboards",
  "REST APIs",
  "AI-assisted delivery",
];

/* Schematic symbols between the tape words, cycling through the parts bin. */
const SEP_GLYPHS = [
  SchResistor,
  SchDiode,
  (props: { className?: string }) => <SchGate kind="and" {...props} />,
  SchCapacitor,
  SchGround,
  SchLed,
];

function Sep({ i, tone }: { i: number; tone: "a" | "b" }) {
  const Glyph = SEP_GLYPHS[i % SEP_GLYPHS.length];
  const color =
    tone === "a" ? "var(--ink)" : ["var(--brand-terra)", "#D6AB52", "#A3936A"][i % 3];
  return (
    <span className="tape__sep" style={{ color }}>
      <Glyph className="tape__glyph" />
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const play = useIntroDone();
  useOffscreenPause(posterRef);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* Leaving the hero: the copy sinks back and the poster comes apart. */
  const copyY = useTransform(p, [0, 1], ["0%", "22%"]);
  const copyFade = useTransform(p, [0.45, 1], [1, 0.2]);
  const frameY = useTransform(p, [0, 1], ["0%", "-9%"]);
  const imgScale = useTransform(p, [0, 1], [1, 1.14]);

  const on = (target: Record<string, number | string | number[]>) => (play ? target : undefined);

  return (
    <section id="home" ref={ref} className="hero">
      <div className="wrap hero__wrap">
        {/* Masthead, like the folio line of a magazine cover */}
        <m.div
          className="hero__masthead t-label"
          initial={{ opacity: 0, y: -12 }}
          animate={on({ opacity: 1, y: 0 })}
          transition={{ duration: 1, ease, delay: T }}
        >
          <span>
            Portfolio <span className="text-accent">&copy;2026</span>
          </span>
          <span className="hidden md:inline">Davao City, Philippines</span>
          <span className="hidden xl:inline">7.07&deg; N, 125.61&deg; E</span>
          <LocalTime className="hidden sm:inline" />
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="status-dot" />
            Available for work
          </span>
        </m.div>

        <div className="hero__grid">
          {/* Copy */}
          <m.div className="hero__copy" style={{ y: copyY, opacity: copyFade }}>
            <m.p
              className="hero__kicker t-label"
              initial={{ opacity: 0, x: -20 }}
              animate={on({ opacity: 1, x: 0 })}
              transition={{ duration: 1, ease, delay: T + 0.15 }}
            >
              Software engineer / Computer engineer
            </m.p>

            <h1 className="hero__name">
              <span className="sr-only">Jimuel Dave Rodado</span>
              <span aria-hidden="true" className="hero__first">
                <RiseChars text="Jimuel Dave" play={play} delay={T + 0.25} stagger={0.03} />
              </span>
              <span aria-hidden="true" className="hero__last">
                <RiseChars text="RODADO" play={play} delay={T + 0.38} stagger={0.065} tilt />
                {/* The full stop is a power LED: it drops into place and flickers on. */}
                <m.span
                  className="hero__dot led"
                  style={{ "--led": "#D0714D" } as React.CSSProperties}
                  initial={{ scale: 0, opacity: 0.25 }}
                  animate={on({ scale: 1, opacity: [0.25, 1, 0.3, 1, 0.55, 1] })}
                  transition={{
                    scale: { type: "spring", stiffness: 260, damping: 13, delay: T + 0.8 },
                    opacity: { duration: 1.2, delay: T + 1.05, times: [0, 0.18, 0.32, 0.5, 0.68, 1] },
                  }}
                />
              </span>
            </h1>

            <m.p
              className="hero__lead t-lead t-pretty"
              initial={{ opacity: 0, y: 24 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 1.1, ease, delay: T + 0.95 }}
            >
              I build the systems hospitals and operations teams run on every day:
              management platforms, business software, and applications where
              downtime is never an option.
            </m.p>

            <m.div
              className="hero__ctas"
              initial={{ opacity: 0, y: 24 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 1.1, ease, delay: T + 1.05 }}
            >
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  className="btn btn-solid roll-host"
                  onClick={() => scrollToTarget("#contact")}
                >
                  <span aria-hidden="true" className="btn__dot" />
                  <RollText text="Let's talk" />
                </button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <button
                  type="button"
                  className="btn btn-line roll-host"
                  onClick={() => scrollToTarget("#projects")}
                >
                  <RollText text="Selected work" />
                  <ArrowRightIcon className="btn__arrow h-3.5 w-3.5" />
                </button>
              </Magnetic>
              <a href={resumeHref} target="_blank" rel="noreferrer" className="btn btn-line roll-host">
                <RollText text="Résumé" />
                <DocumentIcon className="h-3.5 w-3.5" />
              </a>
            </m.div>
          </m.div>

          {/* Poster: the portrait as the processor on a circuit board */}
          <div className="hero__art">
            <div ref={posterRef} className="poster">
              <div className="poster__stage">
                <HeroCircuit play={play} progress={p} />

                <m.div className="poster__frame" style={{ y: frameY }}>
                  <m.div
                    className="absolute inset-0"
                    initial={{ scale: 1.28 }}
                    animate={on({ scale: 1 })}
                    transition={{ duration: 1.9, ease, delay: T + 0.15 }}
                  >
                    <m.img
                      src="/images/jim-studio-portrait-1024.webp"
                      srcSet="/images/jim-studio-portrait-640.webp 640w, /images/jim-studio-portrait-1024.webp 1024w"
                      sizes="(min-width: 1024px) 27rem, 58vw"
                      width={1024}
                      height={1536}
                      alt="Studio portrait of Jimuel Dave Rodado in a brown polo against an olive backdrop"
                      fetchPriority="high"
                      decoding="async"
                      style={{ scale: imgScale }}
                    />
                  </m.div>
                  <m.span
                    aria-hidden="true"
                    className="poster__curtain"
                    style={{ originY: 0 }}
                    initial={{ scaleY: 1 }}
                    animate={on({ scaleY: 0 })}
                    transition={{ duration: 1.25, ease: sweep, delay: T + 0.12 }}
                  />
                </m.div>

                <m.p
                  className="poster__caption t-label"
                  initial={{ opacity: 0, y: 8 }}
                  animate={on({ opacity: 1, y: 0 })}
                  transition={{ duration: 1, ease, delay: T + 1.5 }}
                >
                  <span aria-hidden="true" className="reg" />
                  Fig. 01<span className="hidden sm:inline"> / Davao City, PH</span>
                </m.p>

                <m.div
                  className="poster__badge"
                  initial={{ scale: 0, rotate: -120 }}
                  animate={on({ scale: 1, rotate: 0 })}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: T + 1.35 }}
                >
                  <RotatingBadge
                    text={"Scroll down ✦ See the work ✦ "}
                    onClick={() => scrollToTarget("#about")}
                    label="Scroll to the about section"
                  >
                    <ArrowDownIcon className="h-4 w-4" />
                  </RotatingBadge>
                </m.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two tapes crossing at the foot of the poster */}
      <m.div
        className="tapes"
        aria-hidden="true"
        initial={{ opacity: 0, y: 40 }}
        animate={on({ opacity: 1, y: 0 })}
        transition={{ duration: 1.2, ease, delay: T + 1.1 }}
      >
        <div className="tape tape--b">
          <Marquee duration={40} direction={-1}>
            {focusTape.map((item, i) => (
              <span key={item} className="tape__item">
                <em>{item}</em>
                <Sep i={i} tone="b" />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="tape tape--a">
          <Marquee duration={34}>
            {stackTape.map((item, i) => (
              <span key={item} className="tape__item">
                {item}
                <Sep i={i} tone="a" />
              </span>
            ))}
          </Marquee>
        </div>
      </m.div>
    </section>
  );
}
