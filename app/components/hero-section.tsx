"use client";

import { m } from "framer-motion";
import {
  heroStats,
  identityTags,
  resumeHref,
  socialLinks,
} from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.94 8.98H3.56V20h3.38V8.98ZM7.17 5.58A1.95 1.95 0 1 0 3.28 5.6a1.95 1.95 0 0 0 3.89-.02ZM20.72 13.7c0-3.18-1.7-4.97-4.28-4.97a3.69 3.69 0 0 0-3.33 1.83h-.05V8.98H9.82V20h3.37v-5.45c0-1.44.27-2.84 2.06-2.84 1.76 0 1.78 1.65 1.78 2.93V20h3.38l.31-6.3Z" />
      </svg>
    );
  }
  if (icon === "github") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.69c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.05c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.66-4.55 4.91.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }
  if (icon === "facebook") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.35 8.84V6.98c0-.8.53-.99.91-.99h2.31V2.13L14.39 2.1c-3.53 0-4.33 2.64-4.33 4.33v2.41H7.28v3.98h2.78V23h4.29V12.82h3.58l.16-3.98h-3.74Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export default function HeroSection() {
  function scrollTo(href: string) {
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[60vh] w-[90vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(194,168,120,0.10) 0%, transparent 65%)",
          }}
        />
        <div className="dot-grid absolute inset-0 opacity-50" />
      </div>

      <m.div
        className="hero-stack relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Availability */}
        <m.div
          variants={item}
          className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
          style={{
            background: "var(--gold-light)",
            border: "1px solid rgba(194,168,120,0.3)",
          }}
        >
          <span aria-hidden="true" className="live-dot" />
          <span className="lux-label" style={{ color: "var(--fg)" }}>
            Available for work
          </span>
        </m.div>

        {/* Eyebrow */}
        <m.div variants={item} className="section-eyebrow section-eyebrow--bare justify-center">
          Computer Engineer · Software Engineer
        </m.div>

        {/* Name */}
        <m.h1
          variants={item}
          className="hero-name font-display"
          style={{ fontWeight: 700 }}
        >
          Jimuel Dave
          <br />
          <span className="hero-name-accent">Rodado</span>
        </m.h1>

        {/* Ornament */}
        <m.div variants={item} className="hero-ornament" aria-hidden="true">
          <span className="hero-ornament__line hero-ornament__line--l" />
          <span className="hero-ornament__gem" />
          <span className="hero-ornament__line hero-ornament__line--r" />
        </m.div>

        {/* Lead */}
        <m.p
          variants={item}
          className="hero-lead max-w-xl"
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
          {identityTags.join("  ·  ")}
        </m.p>

        {/* CTAs */}
        <m.div variants={item} className="flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-gold inline-flex items-center gap-2 rounded px-6 py-2.5 text-sm tracking-wide"
          >
            Get in Touch
            <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("#projects")}
            className="btn-ghost inline-flex items-center rounded px-6 py-2.5 text-sm tracking-wide"
          >
            View Work
          </button>
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2 rounded px-6 py-2.5 text-sm tracking-wide"
          >
            Résumé
            <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v5h5M12 11v6m-3-3 3 3 3-3" />
            </svg>
          </a>
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
              style={i > 0 ? { borderLeft: "1px solid var(--border-hv)" } : undefined}
            >
              <p
                className="hero-stat-value font-display leading-none"
                style={{ fontWeight: 700 }}
              >
                {stat.value}
              </p>
              <p className="lux-label mt-1.5" style={{ color: "var(--gold)" }}>
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

      {/* Scroll cue */}
      <m.button
        aria-label="Scroll to about section"
        onClick={() => scrollTo("#about")}
        className="hero-scroll-cue icon-btn absolute bottom-5 left-1/2 z-20 h-9 w-9 -translate-x-1/2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <m.svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 5v14" /><path d="m7 14 5 5 5-5" />
        </m.svg>
      </m.button>
    </section>
  );
}
