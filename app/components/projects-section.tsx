"use client";

import { useRef } from "react";
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

        {/* Project grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

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
