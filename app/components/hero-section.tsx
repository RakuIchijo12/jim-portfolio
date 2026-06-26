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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.94 8.98H3.56V20h3.38V8.98ZM7.17 5.58A1.95 1.95 0 1 0 3.28 5.6a1.95 1.95 0 0 0 3.89-.02ZM20.72 13.7c0-3.18-1.7-4.97-4.28-4.97a3.69 3.69 0 0 0-3.33 1.83h-.05V8.98H9.82V20h3.37v-5.45c0-1.44.27-2.84 2.06-2.84 1.76 0 1.78 1.65 1.78 2.93V20h3.38l.31-6.3Z" />
      </svg>
    );
  }
  if (icon === "github") {
    return (
      <svg aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.69c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.05c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.66-4.55 4.91.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }
  if (icon === "facebook") {
    return (
      <svg aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.35 8.84V6.98c0-.8.53-.99.91-.99h2.31V2.13L14.39 2.1c-3.53 0-4.33 2.64-4.33 4.33v2.41H7.28v3.98h2.78V23h4.29V12.82h3.58l.16-3.98h-3.74Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
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
      className="relative flex min-h-screen flex-col items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glows — overflow clipped here, not on the section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(194,168,120,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="dot-grid absolute inset-0 opacity-50" />
      </div>

      {/* Centered content */}
      <m.div
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-20 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-20 lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <m.div variants={item} className="section-eyebrow mb-3 sm:mb-5 justify-center">
          Computer Engineer · Software Engineer
        </m.div>

        {/* Name */}
        <m.h1
          variants={item}
          className="font-display mb-4 sm:mb-6 leading-none tracking-tight"
          style={{ fontSize: "clamp(1rem, 7.5vw, 5rem)", fontWeight: 700 }}
        >
          JIMUEL DAVE{" "}
          <span style={{ color: "var(--gold)" }}>RODADO</span>
        </m.h1>

        {/* Thin gold rule below name */}
        <m.div
          variants={item}
          className="mb-3 sm:mb-5 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />

        {/* Specialty badge */}
        <m.div variants={item} className="mb-3 sm:mb-5">
          <span
            className="inline-block text-[0.58rem] font-bold tracking-[0.26em] uppercase px-4 py-1.5"
            style={{ border: "1px solid var(--gold)", color: "var(--gold)", borderRadius: "2px" }}
          >
            Healthcare · Enterprise · SaaS
          </span>
        </m.div>

        {/* Description */}
        <m.p
          variants={item}
          className="mb-3 sm:mb-5 max-w-lg text-sm leading-7"
          style={{ color: "var(--muted)" }}
        >
          I architect enterprise software for healthcare and operations teams —
          hospital management systems, business platforms, and mission-critical
          applications built for reliability at scale.
        </m.p>

        {/* Identity tags */}
        <m.div variants={item} className="mb-3 sm:mb-5 flex flex-wrap justify-center gap-1.5">
          {identityTags.map((tag) => (
            <span
              key={tag}
              className="rounded px-2.5 py-0.5 text-[0.6rem] uppercase tracking-wide"
              style={{
                border: "1px solid var(--border-hv)",
                color: "var(--muted)",
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </m.div>

        {/* Stats row */}
        <m.div variants={item} className="mb-3 sm:mb-5 flex items-stretch">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-0.5 px-3 sm:px-6"
              style={{
                paddingLeft:  i === 0 ? 0 : undefined,
                paddingRight: i === heroStats.length - 1 ? 0 : undefined,
                borderLeft:   i > 0 ? "1px solid var(--border-hv)" : "none",
              }}
            >
              <span
                className="font-display leading-none"
                style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 600 }}
              >
                {stat.value}
              </span>
              <span
                className="text-[0.55rem] uppercase tracking-[0.18em]"
                style={{ color: "var(--muted)", fontWeight: 700 }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </m.div>

        {/* CTA buttons */}
        <m.div variants={item} className="mb-4 sm:mb-5 flex flex-wrap justify-center gap-2">
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
            onClick={() => scrollTo("#experience")}
            className="btn-ghost inline-flex items-center rounded px-6 py-2.5 text-sm tracking-wide"
          >
            Experience
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

        {/* Social links */}
        <m.div variants={item} className="flex items-center justify-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.icon === "mail" ? undefined : "_blank"}
              rel={link.icon === "mail" ? undefined : "noreferrer"}
              aria-label={link.label}
              title={link.label}
              className="grid h-9 w-9 place-items-center rounded transition-all duration-200"
              style={{
                border: "1px solid var(--border-hv)",
                color: "var(--muted)",
                background: "var(--surface)",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.borderColor = "var(--gold)";
                t.style.color = "var(--gold)";
                t.style.background = "var(--gold-light)";
                t.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.borderColor = "var(--border-hv)";
                t.style.color = "var(--muted)";
                t.style.background = "var(--surface)";
                t.style.transform = "none";
              }}
            >
              <SocialIcon icon={link.icon} />
            </a>
          ))}
        </m.div>
      </m.div>

      {/* Arrow scroll button */}
      <m.button
        aria-label="Scroll to about section"
        onClick={() => scrollTo("#about")}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 grid h-10 w-10 cursor-pointer place-items-center rounded-sm"
        style={{ border: "1px solid var(--border-hv)", color: "var(--muted)" }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        whileHover={{
          borderColor: "var(--gold)",
          color: "var(--gold)",
          background: "var(--gold-light)",
        }}
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
