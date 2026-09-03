"use client";

import Link from "next/link";
import { useSpotlight } from "@/app/components/ui/spotlight";
import { ArrowRightIcon } from "@/app/components/ui/icons";
import { TECH_ICON_MAP, DARK_ICONS } from "@/app/lib/tech-icons";

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
  caseStudy?: boolean;
}

/** Stand-in artwork for the private ERP, which ships no screenshots. */
function RealEstateMark() {
  return (
    <div
      className="relative flex h-full min-h-44 w-full flex-col items-center justify-center gap-3 sm:min-h-52"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(194,168,120,0.2) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(194,168,120,0.08) 0%, transparent 65%)",
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 72 72"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: "3.75rem", height: "3.75rem", opacity: 0.88, position: "relative" }}
      >
        <rect x="10" y="30" width="52" height="34" />
        <polyline points="6,30 36,10 66,30" />
        <rect x="29" y="46" width="14" height="18" rx="1" />
        <rect x="14" y="38" width="10" height="8" rx="0.5" />
        <rect x="48" y="38" width="10" height="8" rx="0.5" />
        <rect x="14" y="52" width="10" height="8" rx="0.5" />
        <rect x="48" y="52" width="10" height="8" rx="0.5" />
      </svg>
      <span
        className="relative font-mono text-[0.47rem] font-bold uppercase tracking-[0.28em]"
        style={{ color: "var(--gold)", opacity: 0.6 }}
      >
        Enterprise ERP
      </span>
    </div>
  );
}

function TechIcon({ tech }: { tech: string }) {
  const iconFile = TECH_ICON_MAP[tech];
  return (
    <span
      title={tech}
      className="grid h-7 w-7 place-items-center rounded transition-transform duration-300 hover:-translate-y-0.5"
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
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="px-0.5 text-[8px] font-bold leading-tight" style={{ color: "var(--muted)" }}>
          {tech.slice(0, 3)}
        </span>
      )}
    </span>
  );
}

export default function ProjectCard({ project, index }: { project: ProjectData; index?: number }) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();
  const hasCaseStudy = project.caseStudy !== false;

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className="project-card spotlight group flex h-full flex-col"
    >
      {/* Gold top accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          opacity: 0.6,
        }}
      />

      {/* Thumbnail */}
      <div
        className="relative z-2 flex items-center justify-center overflow-hidden p-4"
        style={{ background: "var(--surface-alt)", borderBottom: "1px solid var(--border)" }}
      >
        <span
          className="absolute left-3 top-3 z-20 rounded px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
          }}
        >
          {project.category}
        </span>

        {index !== undefined && (
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 z-20 rounded px-2 py-1 font-mono text-[0.6rem] font-bold tracking-widest"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-hv)",
              color: "var(--muted)",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
        )}

        {project.images.length > 0 ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={project.images[0].alt}
              src={project.images[0].src}
              className="project-shot h-44 w-full rounded-sm object-cover sm:h-52"
              decoding="async"
              loading="lazy"
            />
            {/* Scrim that lifts on hover so the shot reads at full contrast */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 hidden opacity-100 transition-opacity duration-500 group-hover:opacity-0 [@media(hover:hover)]:block"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--surface-alt) 55%, transparent), transparent 55%)",
              }}
            />
          </>
        ) : (
          <RealEstateMark />
        )}
      </div>

      {/* Body */}
      <div className="relative z-2 flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="font-display mb-2 text-xl leading-tight" style={{ fontWeight: 700 }}>
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
              className="grid h-7 place-items-center rounded px-2 text-[10px] font-bold"
              style={{
                border: "1px solid var(--border-hv)",
                background: "var(--surface-alt)",
                color: "var(--muted)",
              }}
            >
              +{project.technologies.length - 7}
            </span>
          )}
        </div>

        {hasCaseStudy ? (
          <Link
            href={`/projects/${project.id}`}
            className="btn-gold-outline group/cta mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm"
          >
            View Case Study
            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        ) : (
          <div
            className="mt-auto flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="text-[0.68rem] font-medium" style={{ color: "var(--subtle)" }}>
              Built at DevbeansPH
            </span>
            <span className="font-mono text-[0.62rem]" style={{ color: "var(--subtle)", opacity: 0.7 }}>
              2024 – 2025
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
