"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { projects } from "@/app/lib/data";

type Project = (typeof projects)[number];

/* ─── Icons ──────────────────────────────────────────────────────── */
function ArrowLeft() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 3h6v6M9 21H3v-6m18-12-7 7M3 21l7-7" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

/* ─── Accent label ───────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <div className="h-px w-4 shrink-0" style={{ background: "var(--gold)" }} />
      <span className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
        {children}
      </span>
    </div>
  );
}

/* ─── Tech badge ─────────────────────────────────────────────────── */
function TechBadge({
  tech, techIconMap, darkIcons,
}: {
  tech: string;
  techIconMap: Record<string, string>;
  darkIcons: Set<string>;
}) {
  const iconFile = techIconMap[tech];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-2 py-1"
      style={{ border: "1px solid var(--border-hv)", background: "var(--surface)" }}
    >
      {iconFile && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          aria-hidden="true"
          className={`h-3 w-3 object-contain${darkIcons.has(tech) ? " dark:invert" : ""}`}
          src={`/stack-icons/${iconFile}`}
        />
      )}
      <span className="text-[0.65rem] font-semibold" style={{ color: "var(--fg)" }}>{tech}</span>
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function ProjectView({
  project,
  techIconMap,
  darkIcons,
}: {
  project: Project;
  techIconMap: Record<string, string>;
  darkIcons: Set<string>;
}) {
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const [lightbox,   setLightbox]   = useState(false);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageCount = project.images.length;
  const hasImages  = imageCount > 0;

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => {
      setActiveIdx((p) => (p + dir + imageCount) % imageCount);
      setImgVisible(true);
    }, 160);
  }, [imageCount]);

  const goTo = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => { setActiveIdx(idx); setImgVisible(true); }, 160);
  }, [activeIdx]);

  const goPrev = useCallback(() => navigate(-1), [navigate]);
  const goNext = useCallback(() => navigate(1),  [navigate]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && lightbox) { setLightbox(false); return; }
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, goPrev, goNext]);

  const activeImage = hasImages ? project.images[activeIdx] : null;

  return (
    <div
      className="flex flex-col lg:h-dvh lg:overflow-hidden"
      style={{ minHeight: "100dvh", background: "var(--bg)", color: "var(--fg)" }}
    >

      {/* ── Header ──────────────────────────────────────────────── */}
      <header
        className="relative flex shrink-0 items-center justify-between px-5 sm:px-8"
        style={{
          height: "52px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 1px 0 rgba(194,168,120,0.1)",
          zIndex: 40,
        }}
      >
        {/* Gold top rule */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />

        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--muted)", transition: "color 200ms" }}
        >
          <ArrowLeft />
          <span className="group-hover:underline underline-offset-4">Portfolio</span>
        </Link>

        {/* Center: name */}
        <span
          className="absolute left-1/2 -translate-x-1/2 hidden sm:block font-display text-sm font-bold tracking-tight"
          style={{ color: "var(--fg)" }}
        >
          {project.name}
        </span>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center gap-2 rounded px-4 py-1.5 text-xs font-bold"
          >
            {project.linkLabel}
            <ArrowRight />
          </a>
        )}
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 lg:flex-row lg:overflow-hidden">

        {/* ── Left: Gallery or Icon ───────────────────────────── */}
        {hasImages ? (
          <div
            className="relative flex flex-col shrink-0 lg:w-[58%]"
            style={{ background: "var(--surface-alt)" }}
          >
            {/* Ambient gold glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-32 z-0"
              style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(194,168,120,0.07) 0%, transparent 100%)" }}
            />

            {/* Main image */}
            <div className="group relative overflow-hidden aspect-video lg:aspect-auto lg:flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={activeImage!.alt}
                src={activeImage!.src}
                className="absolute inset-0 w-full h-full transition-opacity"
                style={{
                  objectFit: "contain",
                  padding: "1.5rem",
                  opacity: imgVisible ? 1 : 0,
                  transitionDuration: imgVisible ? "260ms" : "130ms",
                }}
                decoding="async"
              />

              {/* Expand */}
              <button
                aria-label="View full size"
                className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded opacity-0 transition-all duration-200 group-hover:opacity-100"
                style={{
                  background: "rgba(15,23,42,0.72)",
                  border: "1px solid rgba(194,168,120,0.4)",
                  color: "var(--gold)",
                  backdropFilter: "blur(6px)",
                }}
                onClick={() => setLightbox(true)}
                type="button"
              >
                <ExpandIcon />
              </button>

              {/* Nav arrows */}
              {imageCount > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    className="absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center text-white transition-opacity opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                    style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }}
                    onClick={goPrev}
                    type="button"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    aria-label="Next image"
                    className="absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-center text-white transition-opacity opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                    style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }}
                    onClick={goNext}
                    type="button"
                  >
                    <ChevronRight />
                  </button>

                  {/* Counter pill */}
                  <div
                    aria-live="polite"
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[0.52rem] font-bold tracking-widest"
                    style={{
                      background: "rgba(15,23,42,0.72)",
                      border: "1px solid rgba(194,168,120,0.28)",
                      color: "var(--gold)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {activeIdx + 1} / {imageCount}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {imageCount > 1 && (
              <div
                className="flex shrink-0 gap-2 px-4 py-3 overflow-x-auto"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {project.images.map((img, idx) => (
                  <button
                    key={img.src}
                    aria-label={`Show ${img.alt}`}
                    aria-current={activeIdx === idx}
                    className="shrink-0 overflow-hidden rounded transition-all duration-200"
                    style={{
                      border: activeIdx === idx ? "2px solid var(--gold)" : "2px solid transparent",
                      opacity: activeIdx === idx ? 1 : 0.38,
                      boxShadow: activeIdx === idx ? "0 0 10px rgba(194,168,120,0.25)" : "none",
                    }}
                    onClick={() => goTo(idx)}
                    type="button"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={img.alt}
                      src={img.src}
                      className="block object-cover"
                      style={{ width: "4.5rem", height: "3rem" }}
                      decoding="async"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Left: Icon Panel (no images) ──────────────────── */
          <div
            className="relative flex shrink-0 flex-col items-center justify-center lg:w-[58%] px-10 py-12"
            style={{ background: "var(--surface-alt)" }}
          >
            {/* Dot grid texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(194,168,120,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(194,168,120,0.06) 0%, transparent 100%)" }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-7 text-center">

              {/* Category eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "var(--gold)", opacity: 0.45 }} />
                <span
                  className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.32em]"
                  style={{ color: "var(--gold)" }}
                >
                  {project.category}
                </span>
                <div className="h-px w-8" style={{ background: "var(--gold)", opacity: 0.45 }} />
              </div>

              {/* Icon in a subtle frame */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: "10rem",
                  height: "10rem",
                  border: "1px solid rgba(194,168,120,0.22)",
                  background: "rgba(194,168,120,0.03)",
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "5.5rem", height: "5.5rem", opacity: 0.82 }}
                >
                  <rect x="15" y="50" width="90" height="58" />
                  <polyline points="8,50 60,16 112,50" />
                  <rect x="48" y="76" width="24" height="32" rx="1.5" />
                  <rect x="22" y="62" width="18" height="14" rx="1" />
                  <rect x="80" y="62" width="18" height="14" rx="1" />
                  <rect x="22" y="84" width="18" height="14" rx="1" />
                  <rect x="80" y="84" width="18" height="14" rx="1" />
                  <line x1="60" y1="16" x2="60" y2="8" />
                </svg>
              </div>

              {/* Project name */}
              <div className="flex flex-col items-center gap-2">
                <h2
                  className="font-display text-2xl font-bold leading-snug max-w-56"
                  style={{ color: "var(--fg)" }}
                >
                  {project.name}
                </h2>
                <div className="h-px w-10" style={{ background: "var(--gold)", opacity: 0.45 }} />
              </div>

              {/* Tagline */}
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "var(--muted)" }}
              >
                {project.tagline}
              </p>

            </div>
          </div>
        )}

        {/* Panel separator — horizontal on mobile, vertical on lg */}
        <div
          className="h-px w-full shrink-0 lg:h-auto lg:w-px"
          style={{ background: "var(--border)" }}
        />

        {/* ── Right: Details ───────────────────────────────────── */}
        <div
          className="flex-1 lg:overflow-y-auto"
          style={{ background: "var(--bg)" }}
        >
          <div className="flex flex-col px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 gap-5 lg:min-h-full">

            {/* Category eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-px w-6 shrink-0" style={{ background: "var(--gold)" }} />
              <span className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.34em]" style={{ color: "var(--gold)" }}>
                {project.category}
              </span>
            </div>

            {/* Name + tagline */}
            <div>
              <h1
                className="font-display leading-[1.1] mb-2"
                style={{ fontWeight: 700, fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)", color: "var(--fg)" }}
              >
                {project.name}
              </h1>
              <p className="text-[0.84rem] leading-relaxed" style={{ color: "var(--muted)" }}>
                {project.tagline}
              </p>
            </div>

            {/* Gold divider */}
            <div
              className="h-px shrink-0"
              style={{ background: "linear-gradient(to right, var(--gold), rgba(194,168,120,0.06))", opacity: 0.55 }}
            />

            {/* Overview */}
            <div>
              <SectionLabel>Overview</SectionLabel>
              <p className="text-[0.84rem] leading-[1.8] mb-2.5" style={{ color: "var(--fg)", fontWeight: 500 }}>
                {project.overview}
              </p>
              {project.details.map((d) => (
                <p key={d.slice(0, 24)} className="text-[0.78rem] leading-loose mb-1" style={{ color: "var(--muted)" }}>
                  {d}
                </p>
              ))}
            </div>

            {/* Key Features */}
            <div>
              <SectionLabel>Key Features</SectionLabel>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-3.5 shrink-0"
                      style={{ background: "linear-gradient(to right, var(--gold), rgba(194,168,120,0.15))" }}
                    />
                    <span className="text-[0.79rem] leading-snug" style={{ color: "var(--muted)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies — pushed to bottom */}
            <div className="mt-auto pt-1">
              <div
                className="mb-4 h-px"
                style={{ background: "linear-gradient(to right, rgba(194,168,120,0.3), transparent)" }}
              />
              <SectionLabel>Technologies</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} techIconMap={techIconMap} darkIcons={darkIcons} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      {lightbox && activeImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size image"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(10px)" }}
        >
          <div aria-hidden="true" className="absolute inset-0" onClick={() => setLightbox(false)} />

          <button
            aria-label="Close fullscreen"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded transition-all duration-200"
            style={{ border: "1px solid rgba(194,168,120,0.4)", color: "var(--gold)", background: "rgba(15,23,42,0.8)" }}
            onClick={() => setLightbox(false)}
            type="button"
          >
            <CloseIcon />
          </button>

          <div className="relative z-10 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={activeImage.alt}
              src={activeImage.src}
              className="max-h-[88vh] max-w-[90vw] rounded object-contain shadow-2xl transition-opacity"
              style={{ opacity: imgVisible ? 1 : 0 }}
              decoding="async"
            />
          </div>

          {imageCount > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded transition-all duration-200"
                style={{ border: "1px solid rgba(194,168,120,0.3)", color: "var(--gold)", background: "rgba(15,23,42,0.7)" }}
                onClick={goPrev}
                type="button"
              >
                <ChevronLeft />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded transition-all duration-200"
                style={{ border: "1px solid rgba(194,168,120,0.3)", color: "var(--gold)", background: "rgba(15,23,42,0.7)" }}
                onClick={goNext}
                type="button"
              >
                <ChevronRight />
              </button>
              <div
                aria-live="polite"
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm font-bold"
                style={{ background: "rgba(15,23,42,0.8)", color: "var(--gold)", border: "1px solid rgba(194,168,120,0.3)", backdropFilter: "blur(4px)" }}
              >
                {activeIdx + 1} / {imageCount}
              </div>
            </>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}
