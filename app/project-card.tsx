"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-8 w-8 drop-shadow-lg" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
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
  "Composer":      "composer.png",
  "Figma":         "figma.png",
  "Postman":       "postman.png",
  "Docker":        "docker.png",
  "Git":           "git.png",
};

const DARK_ICONS = new Set(["Express.js", "GitHub"]);

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
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => { html.style.overflow = prevHtml; body.style.overflow = prevBody; };
  }, [open]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const navigate = useCallback((direction: 1 | -1) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => {
      setActiveImage((prev) => (prev + direction + imageCount) % imageCount);
      setImgVisible(true);
    }, 200);
  }, [imageCount]);

  const goToImage = useCallback((index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => { setActiveImage(index); setImgVisible(true); }, 200);
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
      <article className="animated-card scroll-reveal motion-card flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition dark:bg-[var(--surface)]">
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <span className="project-badge absolute left-3 top-3 z-10 rounded-md px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={project.images[0].alt}
            className="h-48 w-full object-cover"
            decoding="async"
            loading="lazy"
            src={project.images[0].src}
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-white dark:to-[var(--surface)]" />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{project.name}</h3>
            <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {project.overview}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => {
              const iconFile = TECH_ICON_MAP[tech];
              return (
                <span
                  className="grid h-7 w-7 place-items-center rounded border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60"
                  key={tech}
                  title={tech}
                >
                  {iconFile ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt={tech}
                      className={`h-4 w-4 object-contain${DARK_ICONS.has(tech) ? " dark:invert" : ""}`}
                      height={16} src={`/stack-icons/${iconFile}`} width={16} />
                  ) : (
                    <span className="px-1 text-[9px] font-bold leading-tight text-slate-600 dark:text-slate-400">{tech}</span>
                  )}
                </span>
              );
            })}
            {project.technologies.length > 6 && (
              <span className="grid h-7 w-7 place-items-center rounded border border-slate-200 bg-slate-50 text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>

          <button
            className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-(--accent)/30"
            onClick={openModal}
            type="button"
          >
            View Details
            <ArrowIcon />
          </button>
        </div>
      </article>

      {/* ── Modal ── */}
      {open && createPortal(
        <div
          aria-labelledby={`${project.id}-modal-title`}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
          role="dialog"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl max-h-[95vh] sm:max-h-[90vh] dark:border-slate-700 dark:bg-[var(--surface)]">
            {/* Header */}
            <div className="flex shrink-0 items-start gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 dark:border-slate-700 dark:bg-[var(--surface-muted)]">
              <div className="min-w-0 flex-1">
                <span className="project-badge inline-block rounded-md px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest">
                  {project.category}
                </span>
                <h2 className="mt-1.5 text-xl font-bold text-slate-900 dark:text-slate-100" id={`${project.id}-modal-title`}>
                  {project.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{project.tagline}</p>
              </div>
              <button
                aria-label="Close dialog"
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-300 text-slate-500 transition hover:border-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400/50 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-400"
                onClick={() => setOpen(false)}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain sm:overflow-hidden sm:flex-row">
              {/* Left: gallery */}
              <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 p-4 sm:w-[42%] sm:border-b-0 sm:border-r sm:p-5 dark:border-slate-700">
                <div className="group relative overflow-hidden rounded-xl bg-slate-100 dark:bg-[var(--surface-muted)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={project.images[activeImage].alt}
                    className={`h-44 w-full object-contain transition-opacity sm:h-auto sm:aspect-video ${
                      imgVisible ? "opacity-100 duration-300" : "opacity-0 duration-150"
                    }`}
                    decoding="async" loading="lazy" src={project.images[activeImage].src}
                  />
                  <button
                    aria-label="View full size"
                    className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-lg bg-black/50 text-white opacity-70 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/70 hover:opacity-100 focus:opacity-100 focus:outline-none sm:opacity-0 sm:group-hover:opacity-100"
                    onClick={() => setLightbox(true)} type="button"
                  >
                    <ExpandIcon />
                  </button>

                  {imageCount > 1 && (
                    <>
                      <button aria-label="Previous image"
                        className="absolute inset-y-0 left-0 flex w-1/2 cursor-pointer items-center justify-start pl-4 text-white opacity-60 transition-opacity duration-200 hover:opacity-100 focus:opacity-100 focus:outline-none sm:opacity-0 sm:hover:opacity-100"
                        onClick={goPrev} style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }} type="button"
                      >
                        <ChevronIcon direction="left" />
                      </button>
                      <button aria-label="Next image"
                        className="absolute inset-y-0 right-0 flex w-1/2 cursor-pointer items-center justify-end pr-4 text-white opacity-60 transition-opacity duration-200 hover:opacity-100 focus:opacity-100 focus:outline-none sm:opacity-0 sm:hover:opacity-100"
                        onClick={goNext} style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }} type="button"
                      >
                        <ChevronIcon direction="right" />
                      </button>
                      <div aria-live="polite" className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        {activeImage + 1} / {imageCount}
                      </div>
                    </>
                  )}
                </div>

                {imageCount > 1 && (
                  <div className="hidden flex-wrap gap-2 sm:flex">
                    {project.images.map((image, index) => (
                      <button
                        aria-current={activeImage === index}
                        aria-label={`Show image ${index + 1}`}
                        className={`overflow-hidden rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--accent)/40 ${
                          activeImage === index
                            ? "border-(--accent) opacity-100"
                            : "border-slate-300/60 opacity-50 hover:opacity-80 dark:border-slate-600/40 dark:opacity-40"
                        }`}
                        key={image.src} onClick={() => goToImage(index)} type="button"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={image.alt} className="h-12 w-16 object-cover" decoding="async" loading="lazy" src={image.src} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: details */}
              <div className="flex-1 p-4 sm:overflow-y-auto sm:overscroll-contain sm:p-5">
                <div className="space-y-4">
                  <div>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-(--accent)">Overview</p>
                    <div className="space-y-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      <p>{project.overview}</p>
                      {project.details.map((detail) => <p key={detail}>{detail}</p>)}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-(--accent)">Key Features</p>
                    <ul className="space-y-1.5">
                      {project.features.map((feature) => (
                        <li className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300" key={feature}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-(--accent)">Technologies</p>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech) => {
                        const iconFile = TECH_ICON_MAP[tech];
                        return (
                          <div className="flex flex-col items-center gap-1" key={tech} title={tech}>
                            <div className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-700 dark:bg-slate-800/60">
                              {iconFile ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img alt={tech}
                                  className={`h-full w-full object-contain${DARK_ICONS.has(tech) ? " dark:invert" : ""}`}
                                  height={36} src={`/stack-icons/${iconFile}`} width={36} />
                              ) : (
                                <span className="text-center text-[9px] font-bold leading-tight text-slate-600 dark:text-slate-300">{tech}</span>
                              )}
                            </div>
                            <span className="max-w-14 text-center text-[10px] font-medium leading-tight text-slate-500 dark:text-slate-400">{tech}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex shrink-0 items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4 dark:border-slate-700 dark:bg-[var(--surface-muted)]">
              <button
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-500 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-400"
                onClick={() => setOpen(false)} type="button"
              >
                Close
              </button>
              <a
                className="inline-flex items-center gap-2 rounded-lg bg-(--accent) px-4 py-2 text-sm font-bold text-white transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-(--accent)/40"
                href={project.link} rel="noreferrer" target="_blank"
              >
                {project.linkLabel}
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {/* ── Lightbox ── */}
      {lightbox && createPortal(
        <div aria-label="Full-size image view" aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center" role="dialog"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/92 backdrop-blur-sm" onClick={() => setLightbox(false)} />
          <button aria-label="Close fullscreen"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none"
            onClick={() => setLightbox(false)} type="button"
          >
            <CloseIcon />
          </button>
          <div className="relative z-10 flex items-center justify-center p-4 sm:p-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={project.images[activeImage].alt}
              className={`max-h-[88vh] max-w-[88vw] rounded-xl object-contain shadow-2xl transition-opacity ${
                imgVisible ? "opacity-100 duration-300" : "opacity-0 duration-150"
              }`}
              decoding="async" src={project.images[activeImage].src}
            />
          </div>
          {imageCount > 1 && (
            <>
              <button aria-label="Previous image"
                className="absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none"
                onClick={goPrev} type="button"
              >
                <ChevronIcon direction="left" />
              </button>
              <button aria-label="Next image"
                className="absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none"
                onClick={goNext} type="button"
              >
                <ChevronIcon direction="right" />
              </button>
              <div aria-live="polite"
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm"
              >
                {activeImage + 1} / {imageCount}
              </div>
            </>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
