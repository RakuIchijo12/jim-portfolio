"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { projects } from "@/app/lib/data";

type Project = (typeof projects)[number];
type Sibling = { id: string; name: string; category: string } | null;

/* ─── Icons ──────────────────────────────────────────────────────── */
function ArrowLeft() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" />
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
function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

/* ─── Section label ──────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-5 shrink-0" style={{ background: "var(--gold)" }} />
      <span className="lux-label" style={{ color: "var(--gold)" }}>{children}</span>
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
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{ border: "1px solid var(--border-hv)", background: "var(--card)" }}
    >
      {iconFile && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          aria-hidden="true"
          className={`h-3.5 w-3.5 object-contain${darkIcons.has(tech) ? " dark:invert" : ""}`}
          src={`/stack-icons/${iconFile}`}
        />
      )}
      <span className="text-[0.7rem] font-600" style={{ color: "var(--fg)", fontWeight: 600 }}>
        {tech}
      </span>
    </span>
  );
}

/* ─── Fallback mark for projects with no screenshots ─────────────── */
function ProjectMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "6rem", height: "6rem", opacity: 0.82 }}
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
  );
}

function Corners() {
  return (
    <>
      <span aria-hidden="true" className="lux-corner lux-corner--tl" />
      <span aria-hidden="true" className="lux-corner lux-corner--tr" />
      <span aria-hidden="true" className="lux-corner lux-corner--bl" />
      <span aria-hidden="true" className="lux-corner lux-corner--br" />
    </>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function ProjectView({
  project,
  techIconMap,
  darkIcons,
  index,
  total,
  prev,
  next,
}: {
  project: Project;
  techIconMap: Record<string, string>;
  darkIcons: Set<string>;
  index: number;
  total: number;
  prev: Sibling;
  next: Sibling;
}) {
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const [lightbox,   setLightbox]   = useState(false);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageCount = project.images.length;
  const hasImages  = imageCount > 0;

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (imageCount < 2) return;
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

  /* Lock body scroll while the lightbox is open */
  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [lightbox]);

  const activeImage = hasImages ? project.images[activeIdx] : null;

  const glanceRows = [
    { label: "Category", value: project.category },
    ...(hasImages ? [{ label: "Screens", value: `${imageCount}` }] : []),
    { label: "Stack",    value: `${project.technologies.length} technologies` },
    { label: "Features", value: `${project.features.length} shipped` },
  ];

  return (
    <div className="ambient-bg min-h-dvh" style={{ color: "var(--fg)" }}>

      {/* ── Sticky header ───────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(20px) saturate(1.5)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />

        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--muted)" }}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowLeft />
          </span>
          <span className="group-hover:underline underline-offset-4">Portfolio</span>
        </Link>

        <span
          className="font-display absolute left-1/2 hidden -translate-x-1/2 text-sm font-bold tracking-tight sm:block"
          style={{ color: "var(--fg)" }}
        >
          {project.name}
        </span>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn-gold group inline-flex items-center gap-2 rounded px-4 py-2 text-xs font-bold"
          >
            {project.linkLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </a>
        ) : (
          <span className="lux-label" style={{ color: "var(--subtle)" }}>
            Internal Project
          </span>
        )}
      </header>

      {/* ── Title block ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="section-eyebrow">{project.category}</div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl leading-none" style={{ color: "var(--gold)", fontWeight: 700 }}>
              {String(index).padStart(2, "0")}
            </span>
            <span className="lux-label" style={{ color: "var(--subtle)" }}>
              / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <h1
          className="font-display mb-4 leading-[1.05]"
          style={{ fontWeight: 700, fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
        >
          {project.name}
        </h1>

        <p className="max-w-2xl text-base leading-8" style={{ color: "var(--muted)" }}>
          {project.tagline}
        </p>
      </section>

      {/* ── Gallery ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {hasImages ? (
          <>
            <div className="lux-panel group relative aspect-16/10 overflow-hidden sm:aspect-video">
              <Corners />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32"
                style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(194,168,120,0.08) 0%, transparent 100%)" }}
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={activeImage!.alt}
                src={activeImage!.src}
                className="absolute inset-0 h-full w-full"
                style={{
                  objectFit: "contain",
                  padding: "clamp(1rem, 3vw, 2.5rem)",
                  opacity: imgVisible ? 1 : 0,
                  transform: imgVisible ? "scale(1)" : "scale(0.985)",
                  transition: `opacity ${imgVisible ? 300 : 140}ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1)`,
                }}
                decoding="async"
              />

              <button
                aria-label="View full size"
                className="icon-btn absolute right-3 top-3 z-20 h-9 w-9 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
                onClick={() => setLightbox(true)}
                type="button"
              >
                <ExpandIcon />
              </button>

              {imageCount > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    className="absolute inset-y-0 left-0 z-10 flex w-14 items-center justify-center text-white opacity-100 transition-opacity focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                    style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45), transparent)" }}
                    onClick={goPrev}
                    type="button"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    aria-label="Next image"
                    className="absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-center text-white opacity-100 transition-opacity focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                    style={{ background: "linear-gradient(to left, rgba(0,0,0,0.45), transparent)" }}
                    onClick={goNext}
                    type="button"
                  >
                    <ChevronRight />
                  </button>

                  <div
                    aria-live="polite"
                    className="lux-label absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-3 py-1"
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

            {/* Thumbnails */}
            {imageCount > 1 && (
              <div className="no-bar mt-3 flex gap-2.5 overflow-x-auto pb-1">
                {project.images.map((img, idx) => (
                  <button
                    key={img.src}
                    aria-label={`Show ${img.alt}`}
                    aria-current={activeIdx === idx}
                    className="shrink-0 overflow-hidden rounded transition-all duration-240"
                    style={{
                      border: activeIdx === idx ? "2px solid var(--gold)" : "2px solid var(--border)",
                      opacity: activeIdx === idx ? 1 : 0.45,
                      boxShadow: activeIdx === idx ? "0 4px 16px -6px rgba(194,168,120,0.6)" : "none",
                    }}
                    onClick={() => goTo(idx)}
                    type="button"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={img.alt}
                      src={img.src}
                      className="block object-cover"
                      style={{ width: "5.5rem", height: "3.5rem" }}
                      decoding="async"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="lux-panel relative flex flex-col items-center justify-center gap-6 px-6 py-14 sm:py-20">
            <Corners />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(194,168,120,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="relative grid place-items-center"
              style={{
                width: "9rem",
                height: "9rem",
                border: "1px solid rgba(194,168,120,0.22)",
                background: "rgba(194,168,120,0.03)",
              }}
            >
              <ProjectMark />
            </div>
            <div className="relative text-center">
              <p className="lux-label" style={{ color: "var(--gold)" }}>
                {project.category}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-7" style={{ color: "var(--muted)" }}>
                A private client system — no public screenshots available.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── Body ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.85fr] lg:gap-14">

          {/* Narrative */}
          <div className="space-y-10">
            <div>
              <SectionLabel>Overview</SectionLabel>
              <p
                className="mb-4 max-w-2xl text-lg leading-9"
                style={{ color: "var(--fg)", fontWeight: 500 }}
              >
                {project.overview}
              </p>
              {project.details.map((d) => (
                <p
                  key={d.slice(0, 24)}
                  className="mb-3 max-w-2xl text-sm leading-8"
                  style={{ color: "var(--muted)" }}
                >
                  {d}
                </p>
              ))}
            </div>

            <div>
              <SectionLabel>Key Features</SectionLabel>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-4 shrink-0"
                      style={{ background: "linear-gradient(to right, var(--gold), rgba(194,168,120,0.2))" }}
                    />
                    <span className="text-sm leading-7" style={{ color: "var(--muted)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* At a glance */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="lux-panel p-6">
              <Corners />

              <p className="lux-label mb-5" style={{ color: "var(--gold)" }}>
                At a Glance
              </p>

              <dl className="space-y-4">
                {glanceRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 pb-4 last:pb-0"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <dt className="lux-label" style={{ color: "var(--subtle)" }}>{row.label}</dt>
                    <dd className="text-right text-sm font-600" style={{ fontWeight: 600 }}>{row.value}</dd>
                  </div>
                ))}
              </dl>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline group mt-6 inline-flex w-full items-center justify-center gap-2 rounded py-3 text-sm"
                >
                  {project.linkLabel}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight />
                  </span>
                </a>
              )}
            </div>
          </aside>
        </div>

        {/* Technologies */}
        <div className="mt-12 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
          <SectionLabel>Technologies</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechBadge key={tech} tech={tech} techIconMap={techIconMap} darkIcons={darkIcons} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Prev / next project ─────────────────────────────────── */}
      {(prev || next) && (
        <nav
          aria-label="Other case studies"
          style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-2">
            {prev && (
              <Link
                href={`/projects/${prev.id}`}
                className="group flex flex-col gap-1.5 px-4 py-8 transition-colors sm:px-6 lg:px-8"
              >
                <span className="lux-label flex items-center gap-2" style={{ color: "var(--gold)" }}>
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  Previous
                </span>
                <span className="font-display text-xl leading-tight" style={{ fontWeight: 700 }}>
                  {prev.name}
                </span>
                <span className="text-xs" style={{ color: "var(--subtle)" }}>{prev.category}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/projects/${next.id}`}
                className="group flex flex-col items-end gap-1.5 px-4 py-8 text-right transition-colors sm:px-6 lg:px-8"
                style={{ borderLeft: "1px solid var(--border)" }}
              >
                <span className="lux-label flex items-center gap-2" style={{ color: "var(--gold)" }}>
                  Next
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <span className="font-display text-xl leading-tight" style={{ fontWeight: 700 }}>
                  {next.name}
                </span>
                <span className="text-xs" style={{ color: "var(--subtle)" }}>{next.category}</span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* ── Lightbox ────────────────────────────────────────────── */}
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
