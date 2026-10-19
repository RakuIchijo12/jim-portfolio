"use client";

import { useId } from "react";
import { m } from "framer-motion";
import { navLinks, resumeHref, socialLinks } from "@/app/lib/data";
import CurrentYear from "@/app/current-year";
import RollText from "@/app/components/ui/roll-text";
import LocalTime from "@/app/components/ui/local-time";
import { ease } from "@/app/components/ui/reveal";
import { scrollToTarget } from "@/app/components/motion/smooth-scroll";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { ArrowRightIcon } from "@/app/components/ui/icons";

/* The palette, read off a six-band resistor: five bands close together and
   the tolerance band apart, on the right-hand bulge. */
const swatches = [
  { name: "Ink", hex: "#14120F" },
  { name: "Paper", hex: "#F0E9DC" },
  { name: "Terracotta", hex: "#BB613F" },
  { name: "Ochre", hex: "#C99A3E" },
  { name: "Olive", hex: "#92825A" },
  { name: "Teal", hex: "#21423F" },
];

const BAND_X = [30, 45, 53, 61, 69, 85];
/* A carbon-film body: bulged caps and a narrower waist. */
const RESISTOR_BODY =
  "M24 7 Q24 3 29 3 H37 Q41 3 43 6 H77 Q79 3 83 3 H91 Q96 3 96 7 V21 Q96 25 91 25 H83 Q79 25 77 22 H43 Q41 25 37 25 H29 Q24 25 24 21 Z";

function PaletteResistor() {
  const clip = `res-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg className="palette-resistor" viewBox="0 0 120 28" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <path d={RESISTOR_BODY} />
        </clipPath>
      </defs>
      <path d="M2 14 H26 M94 14 H118" stroke="#CFC7B8" strokeWidth="2.4" strokeLinecap="round" />
      <path d={RESISTOR_BODY} fill="#D8C8A6" />
      <g clipPath={`url(#${clip})`}>
        {swatches.map((swatch, i) => (
          <rect key={swatch.name} x={BAND_X[i]} y="0" width="5" height="28" fill={swatch.hex} />
        ))}
      </g>
    </svg>
  );
}

const sections = navLinks.filter((link) => link.href !== "#home");

export default function SiteFooter() {
  return (
    <footer className="footer scheme-ink">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="t-label text-muted">Next step</p>
            <p className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Have something worth <span className="t-em">building?</span>
            </p>
            {/* Links into the home page: they scroll there, and from a case
                study they play the curtain first. */}
            <TransitionLink href="/#contact" label="Let's talk" className="btn btn-solid roll-host mt-7">
              <span aria-hidden="true" className="btn__dot" />
              <RollText text="Start a conversation" />
            </TransitionLink>
          </div>

          <nav aria-label="Footer">
            <p className="t-label text-muted">Index</p>
            <ul className="mt-4 grid gap-2.5">
              {sections.map((link, i) => (
                <li key={link.href}>
                  <TransitionLink
                    href={`/${link.href}`}
                    label={link.label}
                    className="roll-host inline-flex items-baseline gap-3 text-lg font-medium"
                  >
                    <span className="t-label text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <RollText text={link.label} />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-label text-muted">Elsewhere</p>
            <ul className="mt-4 grid gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={link.icon === "mail" ? undefined : "noreferrer"}
                    className="roll-host inline-flex items-center gap-2 text-lg font-medium"
                  >
                    <RollText text={link.label} />
                    <ArrowRightIcon className="h-3.5 w-3.5 -rotate-45" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="roll-host inline-flex items-center gap-2 text-lg font-medium"
                >
                  <RollText text="Résumé" />
                  <ArrowRightIcon className="h-3.5 w-3.5 -rotate-45" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* The wordmark rises letter by letter as the page runs out. */}
        <m.p
          className="footer__word"
          aria-hidden="true"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
        >
          {Array.from("RODADO").map((ch, i) => (
            <span key={i} className="mask">
              <m.span
                className="inline-block"
                variants={{
                  hidden: { y: "105%", rotate: 8 },
                  shown: { y: "0%", rotate: 0, transition: { duration: 1.2, ease } },
                }}
              >
                {ch}
              </m.span>
            </span>
          ))}
          {/* The full stop is a power LED: it drops in and flickers on. */}
          <m.span
            className="led footer__led"
            style={{ "--led": "#D0714D" } as React.CSSProperties}
            variants={{
              hidden: { scale: 0, opacity: 0.2 },
              shown: {
                scale: 1,
                opacity: [0.2, 1, 0.3, 1, 0.6, 1],
                transition: {
                  scale: { type: "spring", stiffness: 260, damping: 13, delay: 0.5 },
                  opacity: { duration: 1.1, delay: 0.75, times: [0, 0.18, 0.32, 0.5, 0.68, 1] },
                },
              },
            }}
          />
        </m.p>

        <div className="flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="t-label text-muted">
            &copy; <CurrentYear /> Jimuel Dave Rodado
          </p>
          <ul className="swatches t-label" aria-label="Colour palette">
            <li aria-hidden="true" className="swatch">
              <PaletteResistor />
            </li>
            {swatches.map((swatch) => (
              <li key={swatch.name} className="swatch" title={swatch.hex}>
                <span aria-hidden="true" className="swatch__chip" style={{ background: swatch.hex }} />
                {swatch.name}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <LocalTime className="t-label text-muted" />
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="nav__link roll-host"
            >
              <RollText text="Back to top" />
              <ArrowRightIcon className="h-3.5 w-3.5 -rotate-90" />
            </button>
          </div>
        </div>

        <p className="t-label mt-6 text-subtle">
          Set in Jost, Playfair Display, Inter and Geist Mono. Built with Next.js, Framer Motion and Lenis.
        </p>
      </div>
    </footer>
  );
}
