"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { projects } from "@/app/lib/data";
import ProjectCard from "@/app/project-card";
import SectionHead from "@/app/components/ui/section-head";
import { ChevronIcon } from "@/app/components/ui/icons";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });
  const scrollRef  = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [nearest,  setNearest]  = useState(0);
  const [atStart,  setAtStart]  = useState(true);
  const [atEnd,    setAtEnd]    = useState(false);

  /** Keep the progress rail and arrow states in step with the scroller. */
  const syncScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max > 0 ? el.scrollLeft >= max - 2 : true);

    const first = el.firstElementChild as HTMLElement | null;
    if (first) {
      const step = first.offsetWidth + 24;
      setNearest(Math.min(projects.length - 1, Math.round(el.scrollLeft / step)));
    }
  }, []);

  /** Advance by one card plus the flex gap. */
  const nudge = useCallback((dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  /** Jump straight to a card from the segmented progress rail. */
  const goToCard = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollTo({ left: idx * step, behavior: "smooth" });
  }, []);

  /* Pointer drag with inertia, plus arrow-key navigation. */
  useEffect(() => {
    const rawEl = scrollRef.current;
    if (!rawEl) return;
    const el: HTMLDivElement = rawEl;

    syncScrollState();

    let isDown      = false;
    let startX      = 0;
    let startScroll = 0;
    let velX        = 0;
    let lastX       = 0;
    let lastTime    = 0;
    let rafId       = 0;

    function onMouseDown(e: MouseEvent) {
      cancelAnimationFrame(rafId);
      isDown      = true;
      startX      = e.pageX;
      startScroll = el.scrollLeft;
      lastX       = e.pageX;
      lastTime    = performance.now();
      velX        = 0;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
      e.preventDefault();
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDown) return;
      const now = performance.now();
      const dt  = now - lastTime;
      if (dt > 0) velX = (e.pageX - lastX) / dt;
      lastX    = e.pageX;
      lastTime = now;
      el.scrollLeft = startScroll - (e.pageX - startX);
    }

    function onMouseUp() {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = "grab";
      let vel = velX * 15;
      function coast() {
        vel *= 0.93;
        el.scrollLeft -= vel;
        if (Math.abs(vel) > 0.5) {
          rafId = requestAnimationFrame(coast);
        } else {
          el.style.scrollSnapType = "x mandatory";
        }
      }
      rafId = requestAnimationFrame(coast);
    }

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("scroll", syncScrollState, { passive: true });
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", syncScrollState);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("scroll", syncScrollState);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState]);

  const onRailKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); nudge(-1); }
  }, [nudge]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHead
          eyebrow="03 / Selected Works"
          heading={<>Built to solve <em className="t-em">real problems.</em></>}
          lead="IoT systems, real-time dashboards, and full-stack web applications."
          aside={
            <div className="flex items-center gap-3">
              <span className="lux-label hidden sm:block" style={{ color: "var(--subtle)" }}>
                {String(projects.length).padStart(2, "0")} Projects
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px w-6 sm:block"
                style={{ background: "var(--border-hv)" }}
              />
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label="Previous project"
                className="icon-btn h-10 w-10"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label="Next project"
                className="icon-btn h-10 w-10"
              >
                <ChevronIcon dir="right" />
              </button>
            </div>
          }
          className="mb-8 sm:mb-12"
        />

        {/* Project rail */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          {/* Edge fades — only on the side that still has cards to reveal */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 transition-opacity duration-300 sm:w-16"
            style={{
              background: "linear-gradient(90deg, var(--surface), transparent)",
              opacity: atStart ? 0 : 1,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 transition-opacity duration-300 sm:w-16"
            style={{
              background: "linear-gradient(270deg, var(--surface), transparent)",
              opacity: atEnd ? 0 : 1,
            }}
          />

          <m.div
            ref={scrollRef}
            role="region"
            aria-label="Project carousel"
            tabIndex={0}
            onKeyDown={onRailKeyDown}
            className="no-bar flex gap-6 overflow-x-auto px-4 pb-4 pt-4 sm:px-6 lg:px-8"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              cursor: "grab",
              userSelect: "none",
            }}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {projects.map((project, i) => (
              <m.div
                key={project.id}
                variants={fadeUp}
                className="w-[85vw] shrink-0 sm:w-80 lg:w-96"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProjectCard project={project} index={i + 1} />
              </m.div>
            ))}
          </m.div>
        </div>

        {/* Segmented progress — one clickable segment per project */}
        <m.div
          className="mt-6 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease }}
        >
          <div className="flex flex-1 items-center gap-1.5">
            {projects.map((project, i) => {
              // The nearest card fills proportionally; the rest read binary.
              const fill = i < nearest ? 1 : i === nearest ? Math.max(0.25, progress) : 0;
              return (
                <button
                  key={project.id}
                  type="button"
                  className="rail-seg"
                  aria-label={`Go to ${project.name}`}
                  onClick={() => goToCard(i)}
                >
                  <span
                    className="rail-seg__fill"
                    style={{ transform: `scaleX(${fill})` }}
                  />
                </button>
              );
            })}
          </div>
          <span className="lux-label whitespace-nowrap" style={{ color: "var(--subtle)" }}>
            Drag to explore
          </span>
        </m.div>
      </div>
    </section>
  );
}
