"use client";

import { useId } from "react";
import { m, type Variants } from "framer-motion";
import { ease } from "@/app/components/ui/reveal";

const sweep = [0.76, 0, 0.24, 1] as const;
/* The postmark comes down fast, like a hand stamp. */
const press = [0.55, 0, 0.8, 0.2] as const;

const WAVES = [24, 38, 52, 66, 80, 94];

const v = {
  back: {
    hidden: { opacity: 0, x: "22%", rotate: 8 },
    shown: { opacity: 1, x: "0%", rotate: 0, transition: { type: "spring", stiffness: 55, damping: 14, delay: 0.15 } },
  },
  main: {
    hidden: { opacity: 0, y: 80, rotate: 6 },
    shown: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 65, damping: 15, delay: 0.25 } },
  },
  curtain: {
    hidden: { scaleY: 1 },
    shown: { scaleY: 0, transition: { duration: 1.2, ease: sweep, delay: 0.6 } },
  },
  mark: {
    hidden: {},
    shown: { transition: { delayChildren: 1.1 } },
  },
  ring: {
    hidden: { opacity: 0, scale: 1.8 },
    shown: { opacity: 1, scale: 1, transition: { duration: 0.42, ease: press } },
  },
  waves: {
    hidden: {},
    shown: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
  },
  wave: {
    hidden: { pathLength: 0, opacity: 0 },
    shown: { pathLength: 1, opacity: 1, transition: { duration: 0.75, ease } },
  },
  caption: {
    hidden: { opacity: 0, y: 10 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 1.3 } },
  },
} satisfies Record<string, Variants>;

/** A wave of 12-unit wavelength, from x 122 to 206, at height y. */
const wavePath = (y: number) => `M122 ${y} q 3.5 -4 7 0 t 7 0 t 7 0 t 7 0 t 7 0 t 7 0 t 7 0 t 7 0 t 7 0 t 7 0 t 7 0 t 7 0`;

/**
 * The off-duty portrait as a postage stamp: the whole photo in a perforated
 * stamp with a printed country line and value, a second stamp from the same
 * sheet tucked behind, and a postmark with wavy cancellation lines stamped
 * on the corner. Everything plays once on arrival and then holds still.
 */
export default function AboutStamp({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ringPath = `pm-ring-${uid}`;
  const inkFilter = `pm-ink-${uid}`;

  return (
    <m.figure
      className={`stamp-fig ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="stamp-fig__stage">
        {/* A second stamp from the same sheet, tucked behind */}
        <m.div className="stamp-fig__back" variants={v.back} aria-hidden="true">
          <div className="stamp-fig__back-pose">
            <div className="stamp stamp--back">
              <span className="stamp--back__sun" />
              <span className="stamp--back__label">Pilipinas 2026</span>
            </div>
          </div>
        </m.div>

        {/* The portrait stamp */}
        <m.div className="stamp-fig__main" variants={v.main}>
          <div className="stamp-fig__lift">
            <div className="stamp-fig__shadow">
              <div className="stamp">
                <div className="stamp__window">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jim-cafe-portrait-optimized.webp"
                    alt="Jimuel Dave Rodado smiling with arms folded at a garden cafe at night"
                    width={768}
                    height={1154}
                    loading="lazy"
                    decoding="async"
                  />
                  <m.span aria-hidden="true" className="stamp__curtain" style={{ originY: 0 }} variants={v.curtain} />
                </div>
                <div className="stamp__band" aria-hidden="true">
                  <span className="stamp__country">
                    Pilipinas
                    <span className="stamp__series">Off the clock series</span>
                  </span>
                  <span className="stamp__value">
                    <span className="stamp__peso">P</span>26
                  </span>
                </div>
              </div>
            </div>
          </div>
        </m.div>

        {/* Postmark and cancellation waves, stamped on the top corner */}
        <m.div className="stamp-fig__mark" variants={v.mark} aria-hidden="true">
          <svg className="postmark" viewBox="0 0 210 124">
            <defs>
              <path id={ringPath} d="M 62,62 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
              {/* Worn ink: a fine noise knocks small specks out of the strokes. */}
              <filter id={inkFilter} x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="11" result="noise" />
                <feColorMatrix
                  in="noise"
                  type="matrix"
                  values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.6 2.3"
                  result="speck"
                />
                <feComposite in="SourceGraphic" in2="speck" operator="in" />
              </filter>
            </defs>
            <g filter={`url(#${inkFilter})`}>
              <m.g className="postmark__ring" variants={v.ring}>
                <circle cx="62" cy="62" r="57" fill="none" stroke="currentColor" strokeWidth="3.2" />
                <circle cx="62" cy="62" r="34" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <text className="postmark__text">
                  <textPath href={`#${ringPath}`} textLength="270" lengthAdjust="spacing">
                    {"Davao City ✦ Philippines ✦ 2026 ✦ "}
                  </textPath>
                </text>
                <text x="62" y="58" textAnchor="middle" className="postmark__small">
                  Off the
                </text>
                <text x="62" y="73" textAnchor="middle" className="postmark__big">
                  Clock
                </text>
              </m.g>
              <m.g variants={v.waves}>
                {WAVES.map((y) => (
                  <m.path
                    key={y}
                    d={wavePath(y)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    variants={v.wave}
                  />
                ))}
              </m.g>
            </g>
          </svg>
        </m.div>
      </div>

      <m.figcaption className="stamp-fig__caption t-label" variants={v.caption}>
        <span>Fig. 02</span>
        <span>
          Off the clock<span className="hidden sm:inline">, Davao City</span>
        </span>
      </m.figcaption>
    </m.figure>
  );
}
