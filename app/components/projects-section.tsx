"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/app/lib/data";
import ProjectCard from "@/app/project-card";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden:   { opacity: 0, y: 48 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown    = false;
    let startX    = 0;
    let startScroll = 0;
    let velX      = 0;
    let lastX     = 0;
    let lastTime  = 0;
    let rafId     = 0;

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
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.div
          className="section-eyebrow mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          03 / Selected Works
        </motion.div>

        {/* Heading row */}
        <motion.div
          className="mb-8 sm:mb-12 grid gap-4 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <h2
            className="font-display text-3xl font-700 leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontWeight: 700 }}
          >
            Built to solve{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>real problems.</em>
          </h2>
          <p className="max-w-xs text-sm leading-6" style={{ color: "var(--muted)" }}>
            IoT systems, real-time dashboards,
            and full-stack web applications.
          </p>
        </motion.div>

        {/* Project scroll row */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <motion.div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              cursor: "grab",
              userSelect: "none",
            }}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="shrink-0 w-[85vw] sm:w-80 lg:w-96"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* More projects note */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease }}
        >
          <div className="h-px flex-1 max-w-24" style={{ background: "var(--border-hv)" }} />
          <span className="text-xs font-600" style={{ color: "var(--subtle)", fontWeight: 600 }}>
            More works available on request
          </span>
          <div className="h-px flex-1 max-w-24" style={{ background: "var(--border-hv)" }} />
        </motion.div>
      </div>
    </section>
  );
}
