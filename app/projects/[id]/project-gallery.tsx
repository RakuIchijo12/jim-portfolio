"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { m, useScroll, useSpring } from "framer-motion";
import type { projects } from "@/app/lib/data";
import { useSpotlight } from "@/app/components/ui/spotlight";
import { RevealWords } from "@/app/components/ui/reveal";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronIcon,
  ExternalIcon,
} from "@/app/components/ui/icons";

type Project = (typeof projects)[number];
type Sibling = {
  id: string;
  name: string;
  category: string;
  image: string | null;
} | null;

const ease = [0.22, 1, 0.36, 1] as const;

/** "Obsentry — Admin Dashboard" → "Admin Dashboard". */
function screenLabel(alt: string) {
  return alt.replace(/^.*?\s+[—–-]\s+/, "");
}

/* ─── Small parts ────────────────────────────────────────────────── */

function ExpandIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M15 3h6v6M9 21H3v-6m18-12-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-5 shrink-0" style={{ background: "var(--gold)" }} />
      <span className="lux-label" style={{ color: "var(--gold)" }}>{children}</span>
    </div>
  );
}

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
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5"
      style={{ border: "1px solid var(--border-hv)", background: "var(--card)" }}
    >
      {iconFile && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          aria-hidden="true"
          className={`h-3.5 w-3.5 object-contain${darkIcons.has(tech) ? " dark:invert" : ""}`}
          src={`/stack-icons/${iconFile}`}
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="text-[0.7rem]" style={{ color: "var(--fg)", fontWeight: 600 }}>
        {tech}
      </span>
    </span>
  );
}

/** Fallback mark for projects with no screenshots. */
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

  const { ref: asideRef, onPointerMove: onAsideMove } = useSpotlight<HTMLDivElement>();

  /* Reading progress for the whole case study */
  const { scrollYProgress } = useScroll();
  const readProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

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

  const facts = [
    { k: "Category", v: project.category },
    { k: "Stack",    v: `${project.technologies.length} technologies` },
    { k: "Features", v: `${project.features.length} shipped` },
    hasImages
      ? { k: "Screens", v: `${imageCount} captured` }
      : { k: "Access",  v: "Private client system" },
  ];

  return (
    <div className="ambient-bg min-h-dvh" style={{ color: "var(--fg)" }}>

      {/* ── Reading progress ───────────────────────────────────── */}
      <m.div className="scroll-progress" style={{ scaleX: readProgress }} />

      {/* ── Sticky header ──────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8"
        style={{
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(20px) saturate(1.6)",
        }}
      >
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--muted)" }}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowLeftIcon />
          </span>
          <span className="nav-link">Portfolio</span>
        </Link>

        <span
          className="font-display absolute left-1/2 hidden -translate-x-1/2 text-sm tracking-tight sm:block"
          style={{ color: "var(--fg)", fontWeight: 700 }}
        >
          {project.name}
        </span>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn-gold group inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs"
          >
            {project.linkLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              <ExternalIcon />
            </span>
          </a>
        ) : (
          <span className="lux-label" style={{ color: "var(--subtle)" }}>
            Internal Project
          </span>
        )}
      </header>

      {/* ── Title block ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="section-eyebrow">{project.category}</div>
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-2xl leading-none"
              style={{ color: "var(--gold)", fontWeight: 700 }}
            >
              {String(index).padStart(2, "0")}
            </span>
            <span className="lux-label" style={{ color: "var(--subtle)" }}>
              / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <h1 className="font-display t-display t-balance mb-5" style={{ fontWeight: 700 }}>
          <RevealWords text={project.name} delay={0.12} stagger={0.07} />
        </h1>

        <m.p
          className="t-pretty mb-9 max-w-2xl text-lg leading-9"
          style={{ color: "var(--muted)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
        >
          {project.tagline}
        </m.p>

        {/* Key facts, up front — these used to be buried in a sidebar box */}
        <m.dl
          className="fact-strip"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.52 }}
        >
          {facts.map((f) => (
            <div key={f.k} className="fact">
              <dt className="lux-label fact__k">{f.k}</dt>
              <dd className="fact__v">{f.v}</dd>
            </div>
          ))}
        </m.dl>
      </section>

      {/* ── Gallery ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {hasImages ? (
          <>
            <m.figure
              className="window group m-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.3 }}
            >
              {/* Browser chrome. The screen's own name sits where a URL would —
                  honest, and it surfaces a caption we already author as alt text. */}
              <div className="window__bar">
                <span aria-hidden="true" className="window__dots">
                  <span className="window__dot" />
                  <span className="window__dot" />
                  <span className="window__dot" />
                </span>
                <figcaption className="window__label" aria-live="polite">
                  {screenLabel(activeImage!.alt)}
                </figcaption>
                <span className="window__count">
                  {String(activeIdx + 1).padStart(2, "0")}/{String(imageCount).padStart(2, "0")}
                </span>
              </div>

              <div className="window__body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={activeImage!.alt}
                  src={activeImage!.src}
                  className="window__shot"
                  style={{
                    opacity: imgVisible ? 1 : 0,
                    transform: imgVisible ? "scale(1)" : "scale(0.99)",
                    transition: `opacity ${imgVisible ? 300 : 140}ms ease, transform 460ms cubic-bezier(0.22,1,0.36,1)`,
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
                      className="absolute inset-y-0 left-0 z-10 flex w-14 items-center justify-center text-white transition-opacity focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                      style={{ background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }}
                      onClick={goPrev}
                      type="button"
                    >
                      <ChevronIcon dir="left" className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Next image"
                      className="absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-center text-white transition-opacity focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                      style={{ background: "linear-gradient(to left, rgba(0,0,0,0.4), transparent)" }}
                      onClick={goNext}
                      type="button"
                    >
                      <ChevronIcon dir="right" className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </m.figure>

            {/* Filmstrip */}
            {imageCount > 1 && (
              <m.div
                className="mt-4 flex items-center justify-between gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.55 }}
              >
                <div className="filmstrip no-bar">
                  {project.images.map((img, idx) => (
                    <button
                      key={img.src}
                      aria-label={`Show ${screenLabel(img.alt)}`}
                      aria-current={activeIdx === idx}
                      className="filmstrip__item"
                      data-on={activeIdx === idx ? "true" : undefined}
                      onClick={() => goTo(idx)}
                      type="button"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="" aria-hidden="true" src={img.src} decoding="async" loading="lazy" />
                    </button>
                  ))}
                </div>

                <p
                  className="lux-label hidden shrink-0 whitespace-nowrap lg:block"
                  style={{ color: "var(--subtle)" }}
                >
                  ← → to browse
                </p>
              </m.div>
            )}
          </>
        ) : (
          <div className="lux-panel relative flex flex-col items-center justify-center gap-6 px-6 py-14 sm:py-20">
            <Corners />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(194,168,120,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="relative grid place-items-center"
              style={{
                width: "9rem",
                height: "9rem",
                border: "1px solid var(--gold-line)",
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

      {/* ── Body ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_0.8fr] lg:gap-16">

          {/* Narrative */}
          <div className="space-y-14">
            <div>
              <SectionLabel>Overview</SectionLabel>
              <p
                className="t-pretty mb-5 max-w-2xl text-xl leading-9"
                style={{ color: "var(--fg)", fontWeight: 500 }}
              >
                {project.overview}
              </p>
              {project.details.map((d) => (
                <p
                  key={d.slice(0, 24)}
                  className="t-pretty mb-3 max-w-2xl text-sm leading-8"
                  style={{ color: "var(--muted)" }}
                >
                  {d}
                </p>
              ))}
            </div>

            <div>
              <SectionLabel>What shipped</SectionLabel>
              <m.ul
                className="grid gap-3 sm:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              >
                {project.features.map((f, i) => (
                  <m.li
                    key={f}
                    className="feature-item"
                    variants={{
                      hidden:  { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                    }}
                  >
                    <span aria-hidden="true" className="feature-item__n">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-pretty block text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {f}
                    </span>
                  </m.li>
                ))}
              </m.ul>
            </div>
          </div>

          {/* Sticky rail */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div
              ref={asideRef}
              onPointerMove={onAsideMove}
              className="lux-panel spotlight p-6"
            >
              <Corners />

              <p className="lux-label mb-4" style={{ color: "var(--gold)" }}>
                Built with
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} techIconMap={techIconMap} darkIcons={darkIcons} />
                ))}
              </div>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline group inline-flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm"
                >
                  {project.linkLabel}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </a>
              ) : (
                <p
                  className="rounded-md px-4 py-3 text-center text-xs leading-6"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--subtle)",
                  }}
                >
                  Source and deployment are private to the client.
                </p>
              )}

              <Link
                href="/#contact"
                className="nav-link mt-5 inline-flex items-center gap-2 text-sm"
                style={{ color: "var(--muted)" }}
              >
                Discuss a project like this
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Prev / next project ────────────────────────────────── */}
      {(prev || next) && (
        <nav
          aria-label="Other case studies"
          style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <div className="mx-auto grid max-w-6xl sm:grid-cols-2">
            {prev && (
              <Link
                href={`/projects/${prev.id}`}
                className="pager group flex flex-col gap-1.5 px-4 py-12 sm:px-6 lg:px-8"
              >
                {prev.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" aria-hidden="true" src={prev.image} className="pager__bg" loading="lazy" />
                )}
                <span className="lux-label flex items-center gap-2" style={{ color: "var(--gold)" }}>
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  Previous
                </span>
                <span className="font-display text-2xl leading-tight" style={{ fontWeight: 700 }}>
                  {prev.name}
                </span>
                <span className="text-xs" style={{ color: "var(--subtle)" }}>{prev.category}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/projects/${next.id}`}
                className="pager group flex flex-col items-end gap-1.5 px-4 py-12 text-right sm:px-6 lg:px-8"
                style={{ borderLeft: "1px solid var(--border)" }}
              >
                {next.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" aria-hidden="true" src={next.image} className="pager__bg" loading="lazy" />
                )}
                <span className="lux-label flex items-center gap-2" style={{ color: "var(--gold)" }}>
                  Next
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <span className="font-display text-2xl leading-tight" style={{ fontWeight: 700 }}>
                  {next.name}
                </span>
                <span className="text-xs" style={{ color: "var(--subtle)" }}>{next.category}</span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* ── Lightbox ───────────────────────────────────────────── */}
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
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-md transition-all duration-200"
            style={{
              border: "1px solid var(--gold-line)",
              color: "var(--gold)",
              background: "rgba(8,13,24,0.8)",
            }}
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
                className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-md transition-all duration-200"
                style={{
                  border: "1px solid var(--gold-line)",
                  color: "var(--gold)",
                  background: "rgba(8,13,24,0.7)",
                }}
                onClick={goPrev}
                type="button"
              >
                <ChevronIcon dir="left" className="h-5 w-5" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-md transition-all duration-200"
                style={{
                  border: "1px solid var(--gold-line)",
                  color: "var(--gold)",
                  background: "rgba(8,13,24,0.7)",
                }}
                onClick={goNext}
                type="button"
              >
                <ChevronIcon dir="right" className="h-5 w-5" />
              </button>
              <div
                aria-live="polite"
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm"
                style={{
                  background: "rgba(8,13,24,0.8)",
                  color: "var(--gold)",
                  border: "1px solid var(--gold-line)",
                  backdropFilter: "blur(4px)",
                  fontWeight: 700,
                }}
              >
                {screenLabel(activeImage.alt)} · {activeIdx + 1} / {imageCount}
              </div>
            </>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}
