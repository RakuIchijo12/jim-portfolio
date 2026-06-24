"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  details: readonly string[];
  features: readonly string[];
  technologies: readonly string[];
  images: readonly { src: string; alt: string }[];
  link: string;
  linkLabel: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 3h6v6M9 21H3v-6m18-12-7 7M3 21l7-7" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

const TECH_ICON_MAP: Record<string, string> = {
  "HTML":          "html5.png",
  "CSS":           "css3.png",
  "JavaScript":    "javascript.png",
  "TypeScript":    "typescript.png",
  "Node.js":       "Node.js.png",
  "Express.js":    "Express.png",
  "Firebase":      "Firebase.png",
  "GitHub":        "GitHub.png",
  "Angular":       "angular.png",
  "NestJS":        "nestjs.png",
  "PostgreSQL":    "postgresql.png",
  "MySQL":         "mysql.png",
  "React":         "react.png",
  "Next.js":       "next-js.png",
  "Vue.js":        "vue-js.png",
  "Laravel":       "laravel.png",
  "PHP":           "php.png",
  "Python":        "python.png",
  "Django":        "django.png",
  "Tailwind CSS":  "tailwind-css.png",
  "Alpine.js":     "alpine-js.png",
  "Filament":      "filament.png",
  "Livewire":      "livewire.png",
};

const DARK_ICONS = new Set(["Express.js", "GitHub"]);

function TechIcon({ tech, size = 7 }: { tech: string; size?: number }) {
  const iconFile = TECH_ICON_MAP[tech];
  const dim = size === 7 ? "h-7 w-7" : "h-10 w-10";
  const imgDim = size === 7 ? "h-4 w-4" : "h-6 w-6";
  return (
    <span
      key={tech}
      title={tech}
      className={`grid ${dim} place-items-center rounded`}
      style={{ border: "1px solid var(--border-hv)", background: "var(--surface-alt)" }}
    >
      {iconFile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={tech}
          className={`${imgDim} object-contain${DARK_ICONS.has(tech) ? " dark:invert" : ""}`}
          src={`/stack-icons/${iconFile}`}
          width={size === 7 ? 16 : 24}
          height={size === 7 ? 16 : 24}
        />
      ) : (
        <span className="px-0.5 text-[8px] font-bold leading-tight" style={{ color: "var(--muted)" }}>
          {tech.slice(0, 3)}
        </span>
      )}
    </span>
  );
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const [open,        setOpen]        = useState(false);
  const [lightbox,    setLightbox]    = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [imgVisible,  setImgVisible]  = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageCount = project.images.length;

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const ph = html.style.overflow;
    const pb = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => { html.style.overflow = ph; body.style.overflow = pb; };
  }, [open]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => {
      setActiveImage((p) => (p + dir + imageCount) % imageCount);
      setImgVisible(true);
    }, 200);
  }, [imageCount]);

  const goToImage = useCallback((idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => { setActiveImage(idx); setImgVisible(true); }, 200);
  }, []);

  const goPrev = useCallback(() => navigate(-1), [navigate]);
  const goNext = useCallback(() => navigate(1),  [navigate]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { if (lightbox) { setLightbox(false); return; } setOpen(false); }
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lightbox, goPrev, goNext]);

  function openModal() { setActiveImage(0); setImgVisible(true); setOpen(true); }

  return (
    <>
      {/* ── Card ── */}
      <motion.article
        className="group relative flex h-full flex-col overflow-hidden rounded-sm"
        style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
        whileHover={{
          borderColor: "var(--gold)",
          boxShadow: "0 0 0 1px rgba(194,168,120,0.25), 0 12px 40px rgba(0,0,0,0.15)",
          y: -4,
        }}
        transition={{ duration: 0.25 }}
      >
        {/* Gold top accent */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0.6 }}
        />

        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ height: "15rem" }}>
          <span
            className="absolute left-3 top-3 z-10 rounded px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest"
            style={{ background: "var(--surface)", border: "1px solid var(--gold)", color: "var(--gold)" }}
          >
            {project.category}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={project.images[0].alt}
            src={project.images[0].src}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            decoding="async"
            loading="lazy"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3
              className="font-display text-xl leading-tight mb-2"
              style={{ fontWeight: 700 }}
            >
              {project.name}
            </h3>
            <p className="line-clamp-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
              {project.overview}
            </p>
          </div>

          {/* Tech icons */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 7).map((tech) => (
              <TechIcon key={tech} tech={tech} size={7} />
            ))}
            {project.technologies.length > 7 && (
              <span
                className="grid h-7 px-2 place-items-center rounded text-[10px] font-bold"
                style={{ border: "1px solid var(--border-hv)", background: "var(--surface-alt)", color: "var(--muted)" }}
              >
                +{project.technologies.length - 7}
              </span>
            )}
          </div>

          <button
            className="btn-gold mt-auto inline-flex w-full items-center justify-center gap-2 rounded py-3 text-sm"
            onClick={openModal}
            type="button"
          >
            View Case Study
            <ArrowIcon />
          </button>
        </div>
      </motion.article>

      {/* ── Modal ── */}
      {open && createPortal(
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${project.id}-modal-title`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-sm"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border-hv)",
              boxShadow: "0 0 0 1px rgba(194,168,120,0.2), 0 32px 80px rgba(0,0,0,0.5)",
              maxHeight: "92vh",
            }}
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* Gold rule at very top */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px z-20"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
            />

            {/* Header */}
            <div
              className="flex shrink-0 items-start gap-4 px-6 py-5"
              style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
            >
              <div className="min-w-0 flex-1">
                <span
                  className="inline-block mb-2 rounded px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-widest"
                  style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}
                >
                  {project.category}
                </span>
                <h2
                  className="font-display text-2xl sm:text-3xl leading-tight"
                  id={`${project.id}-modal-title`}
                  style={{ fontWeight: 700 }}
                >
                  {project.name}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {project.tagline}
                </p>
              </div>
              <button
                aria-label="Close dialog"
                className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded transition-all duration-200"
                style={{ border: "1px solid var(--border-hv)", color: "var(--muted)" }}
                onClick={() => setOpen(false)}
                type="button"
                onMouseEnter={(e) => {
                  const t = e.currentTarget as HTMLButtonElement;
                  t.style.borderColor = "var(--gold)";
                  t.style.color = "var(--gold)";
                  t.style.background = "var(--gold-light)";
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget as HTMLButtonElement;
                  t.style.borderColor = "var(--border-hv)";
                  t.style.color = "var(--muted)";
                  t.style.background = "transparent";
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Body */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto sm:overflow-hidden sm:flex-row">

              {/* Gallery */}
              <div
                className="flex shrink-0 flex-col gap-3 p-4 sm:p-5 sm:w-[42%] sm:overflow-y-auto border-b border-(--border) sm:border-b-0 sm:border-r"
                style={{ background: "var(--surface)" }}
              >
                <div
                  className="group relative overflow-hidden rounded-sm"
                  style={{ background: "var(--surface-alt)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={project.images[activeImage].alt}
                    src={project.images[activeImage].src}
                    className="w-full object-contain transition-opacity"
                    style={{ aspectRatio: "16/10", opacity: imgVisible ? 1 : 0, transitionDuration: imgVisible ? "300ms" : "150ms" }}
                    decoding="async"
                    loading="lazy"
                  />
                  <button
                    aria-label="View full size"
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#fff", backdropFilter: "blur(4px)" }}
                    onClick={() => setLightbox(true)}
                    type="button"
                  >
                    <ExpandIcon />
                  </button>
                  {imageCount > 1 && (
                    <>
                      <button
                        aria-label="Previous image"
                        className="absolute inset-y-0 left-0 flex w-1/3 cursor-pointer items-center justify-start pl-2 text-white opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
                        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }}
                        onClick={goPrev} type="button"
                      >
                        <ChevronIcon direction="left" />
                      </button>
                      <button
                        aria-label="Next image"
                        className="absolute inset-y-0 right-0 flex w-1/3 cursor-pointer items-center justify-end pr-2 text-white opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
                        style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }}
                        onClick={goNext} type="button"
                      >
                        <ChevronIcon direction="right" />
                      </button>
                      <div
                        aria-live="polite"
                        className="absolute bottom-2 right-2 rounded px-2 py-0.5 text-xs font-bold text-white"
                        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
                      >
                        {activeImage + 1} / {imageCount}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {imageCount > 1 && (
                  <div className="hidden flex-wrap gap-2 sm:flex">
                    {project.images.map((img, idx) => (
                      <button
                        key={img.src}
                        aria-label={`Show image ${idx + 1}`}
                        aria-current={activeImage === idx}
                        className="overflow-hidden rounded-sm transition-all duration-200"
                        style={{
                          border: activeImage === idx ? "2px solid var(--gold)" : "2px solid var(--border-hv)",
                          opacity: activeImage === idx ? 1 : 0.5,
                        }}
                        onClick={() => goToImage(idx)}
                        type="button"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={img.alt} src={img.src}
                          className="block object-cover"
                          style={{ width: "4rem", height: "3rem" }}
                          decoding="async" loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6" style={{ background: "var(--bg)" }}>
                <div className="space-y-6">

                  {/* Overview */}
                  <div>
                    <p className="font-mono text-[0.58rem] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
                      Overview
                    </p>
                    <div className="space-y-2.5 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      <p>{project.overview}</p>
                      {project.details.map((d) => <p key={d.slice(0, 20)}>{d}</p>)}
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                    <p className="font-mono text-[0.58rem] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
                      Key Features
                    </p>
                    <ul className="space-y-2.5">
                      {project.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                    <p className="font-mono text-[0.58rem] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--gold)" }}>
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech) => {
                        const iconFile = TECH_ICON_MAP[tech];
                        return (
                          <div key={tech} className="flex flex-col items-center gap-1.5" title={tech}>
                            <div
                              className="grid h-10 w-10 place-items-center rounded p-1.5"
                              style={{ border: "1px solid var(--border-hv)", background: "var(--surface)" }}
                            >
                              {iconFile ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  alt={tech}
                                  className={`h-full w-full object-contain${DARK_ICONS.has(tech) ? " dark:invert" : ""}`}
                                  src={`/stack-icons/${iconFile}`}
                                />
                              ) : (
                                <span className="text-[8px] font-bold text-center" style={{ color: "var(--muted)" }}>
                                  {tech.slice(0, 3)}
                                </span>
                              )}
                            </div>
                            <span className="max-w-14 text-center text-[0.58rem] leading-tight" style={{ color: "var(--muted)" }}>
                              {tech}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex shrink-0 items-center justify-end gap-3 px-6 py-4"
              style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
            >
              <button
                className="btn-ghost rounded px-5 py-2.5 text-sm"
                onClick={() => setOpen(false)}
                type="button"
              >
                Close
              </button>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded px-6 py-2.5 text-sm"
              >
                {project.linkLabel}
                <ArrowIcon />
              </a>
            </div>
          </motion.div>
        </motion.div>,
        document.body,
      )}

      {/* ── Lightbox ── */}
      {lightbox && createPortal(
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size image"
          className="fixed inset-0 z-60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(8px)" }}
            onClick={() => setLightbox(false)}
          />
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
              alt={project.images[activeImage].alt}
              src={project.images[activeImage].src}
              className="max-h-[88vh] max-w-[90vw] rounded-sm object-contain shadow-2xl transition-opacity"
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
                onClick={goPrev} type="button"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded transition-all duration-200"
                style={{ border: "1px solid rgba(194,168,120,0.3)", color: "var(--gold)", background: "rgba(15,23,42,0.7)" }}
                onClick={goNext} type="button"
              >
                <ChevronIcon direction="right" />
              </button>
              <div
                aria-live="polite"
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded px-4 py-1.5 text-sm font-bold"
                style={{ background: "rgba(15,23,42,0.8)", color: "var(--gold)", border: "1px solid rgba(194,168,120,0.3)", backdropFilter: "blur(4px)" }}
              >
                {activeImage + 1} / {imageCount}
              </div>
            </>
          )}
        </motion.div>,
        document.body,
      )}
    </>
  );
}
