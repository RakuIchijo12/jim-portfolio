"use client";

import { Fragment, useCallback, useRef } from "react";
import { m } from "framer-motion";
import { heroStats, identityTags, resumeHref, socialLinks } from "@/app/lib/data";
import { RevealWords } from "@/app/components/ui/reveal";
import Magnetic from "@/app/components/ui/magnetic";
import CountUp from "@/app/components/ui/count-up";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DocumentIcon,
  SocialIcon,
} from "@/app/components/ui/icons";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* The gold halo trails the pointer across the hero. */
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  const scrollTo = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Ground ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora">
          <span className="aurora__blob aurora__blob--a" />
          <span className="aurora__blob aurora__blob--b" />
          <span className="aurora__blob aurora__blob--c" />
        </div>
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="hero-halo" />
      </div>

      <m.div
        className="hero-stack relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Availability */}
        <m.div variants={item} className="status-pill">
          <span aria-hidden="true" className="live-dot" />
          <span className="lux-label" style={{ color: "var(--fg)" }}>
            Available for work
          </span>
        </m.div>

        {/* Eyebrow */}
        <m.div
          variants={item}
          className="section-eyebrow section-eyebrow--bare justify-center text-balance tracking-[0.18em] sm:tracking-[0.32em]"
        >
          Computer Engineer · Software Engineer
        </m.div>

        {/* Name — each word rides up out of its own mask */}
        <h1 className="hero-name font-display" style={{ fontWeight: 700 }}>
          <RevealWords text="Jimuel Dave" delay={0.32} stagger={0.08} className="block" />
          <RevealWords
            text="Rodado"
            delay={0.48}
            stagger={0.08}
            className="hero-name-accent block"
          />
        </h1>

        {/* Ornament */}
        <m.div variants={item} className="hero-ornament" aria-hidden="true">
          <span className="hero-ornament__line hero-ornament__line--l" />
          <span className="hero-ornament__gem" />
          <span className="hero-ornament__line hero-ornament__line--r" />
        </m.div>

        {/* Lead */}
        <m.p
          variants={item}
          className="hero-lead t-pretty max-w-xl"
          style={{ color: "var(--muted)" }}
        >
          I architect enterprise software for healthcare and operations teams —
          hospital management systems, business platforms, and mission-critical
          applications built for reliability at scale.
        </m.p>

        {/* Identity line */}
        <m.p
          variants={item}
          className="hero-identity lux-label max-w-2xl leading-6"
          style={{ color: "var(--subtle)" }}
        >
          {identityTags.map((tag, i) => (
            <Fragment key={tag}>
              {i > 0 && <span aria-hidden="true" style={{ opacity: 0.55 }}>{" · "}</span>}
              <span className="whitespace-nowrap">{tag}</span>
            </Fragment>
          ))}
        </m.p>

        {/* CTAs */}
        <m.div
          variants={item}
          className="grid w-full max-w-xs grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-center"
        >
          <Magnetic strength={0.24} className="col-span-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="btn-gold group inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-2.5 text-sm tracking-wide sm:w-auto"
            >
              Get in Touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </button>
          </Magnetic>

          <Magnetic strength={0.18} className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollTo("#projects")}
              className="btn-ghost inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm tracking-wide sm:w-auto sm:px-6"
            >
              View Work
            </button>
          </Magnetic>

          <Magnetic strength={0.18} className="w-full sm:w-auto">
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm tracking-wide sm:w-auto sm:px-6"
            >
              Résumé
              <DocumentIcon className="h-3.5 w-3.5" />
            </a>
          </Magnetic>
        </m.div>

        {/* Stat strip */}
        <m.div
          variants={item}
          className="grid w-full max-w-lg grid-cols-3 py-4"
          style={{
            borderTop: "1px solid var(--border-hv)",
            borderBottom: "1px solid var(--border-hv)",
          }}
        >
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-1"
              style={i > 0 ? { borderLeft: "1px solid var(--border-hv)" } : undefined}
            >
              <CountUp
                value={stat.n}
                suffix={stat.suffix}
                className="hero-stat-value font-display block leading-none"
                style={{ fontWeight: 700 }}
              />
              <p
                className="lux-label mt-1.5 text-[0.55rem] tracking-[0.08em] sm:text-[0.58rem] sm:tracking-[0.22em]"
                style={{ color: "var(--gold)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </m.div>

        {/* Socials */}
        <m.div variants={item} className="flex items-center justify-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.icon === "mail" ? undefined : "_blank"}
              rel={link.icon === "mail" ? undefined : "noreferrer"}
              aria-label={link.label}
              title={link.label}
              className="icon-btn h-9 w-9"
            >
              <SocialIcon icon={link.icon} />
            </a>
          ))}
        </m.div>
      </m.div>

      {/* Scroll cue — a hairline that drains, then the arrow */}
      <m.div
        className="hero-scroll-cue absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span
          aria-hidden="true"
          className="block h-8 w-px overflow-hidden"
          style={{ background: "var(--border-hv)" }}
        >
          <m.span
            className="block h-full w-full"
            style={{ background: "var(--gold)", transformOrigin: "top" }}
            animate={{ scaleY: [0, 1, 1], y: ["0%", "0%", "100%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 1] }}
          />
        </span>
        <button
          type="button"
          aria-label="Scroll to about section"
          onClick={() => scrollTo("#about")}
          className="icon-btn h-9 w-9"
        >
          <ArrowDownIcon />
        </button>
      </m.div>
    </section>
  );
}
