"use client";

import Link from "next/link";
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

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
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

function TechIcon({ tech }: { tech: string }) {
  const iconFile = TECH_ICON_MAP[tech];
  return (
    <span
      title={tech}
      className="grid h-7 w-7 place-items-center rounded"
      style={{ border: "1px solid var(--border-hv)", background: "var(--surface-alt)" }}
    >
      {iconFile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={tech}
          className={`h-4 w-4 object-contain${DARK_ICONS.has(tech) ? " dark:invert" : ""}`}
          src={`/stack-icons/${iconFile}`}
          width={16}
          height={16}
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
  return (
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
      <div
        className="relative flex items-center justify-center overflow-hidden p-4"
        style={{ background: "var(--surface-alt)", borderBottom: "1px solid var(--border)" }}
      >
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
          className="w-full rounded-sm object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ height: "13rem" }}
          decoding="async"
          loading="lazy"
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
            <TechIcon key={tech} tech={tech} />
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

        <Link
          href={`/projects/${project.id}`}
          className="btn-gold mt-auto inline-flex w-full items-center justify-center gap-2 rounded py-3 text-sm"
        >
          View Case Study
          <ArrowIcon />
        </Link>
      </div>
    </motion.article>
  );
}
