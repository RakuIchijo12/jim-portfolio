import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/app/lib/data";
import ProjectGallery from "./project-gallery";

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

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study | Jimuel Dave Rodado`,
    description: project.overview,
  };
}

export default async function ProjectCaseStudyPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Top Nav ── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 sm:px-8"
        style={{
          background: "rgba(var(--bg-rgb, 15 23 42) / 0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 1px 0 rgba(194,168,120,0.1)",
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
          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          style={{ color: "var(--muted)" }}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
          </svg>
          <span className="group-hover:underline underline-offset-4" style={{ color: "var(--muted)" }}>
            Back to Portfolio
          </span>
        </Link>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="btn-gold inline-flex items-center gap-2 rounded px-4 py-1.5 text-xs font-bold"
        >
          {project.linkLabel}
          <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
          </svg>
        </a>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:py-28"
        style={{
          background: "linear-gradient(160deg, var(--surface) 0%, var(--bg) 65%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-30"
          style={{ background: "radial-gradient(circle, rgba(194,168,120,0.18) 0%, transparent 70%)" }}
        />

        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 shrink-0" style={{ background: "var(--gold)" }} />
            <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
              {project.category}
            </span>
          </div>

          <h1
            className="font-display mb-4 leading-[1.12]"
            style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {project.name}
          </h1>

          <p
            className="max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {project.tagline}
          </p>

          {/* Gold rule */}
          <div
            aria-hidden="true"
            className="mt-10 h-px max-w-xs"
            style={{ background: "linear-gradient(to right, var(--gold), rgba(194,168,120,0.1))" }}
          />
        </div>
      </section>

      {/* ── Gallery ── */}
      <section
        className="px-5 py-10 sm:px-8 sm:py-14"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-4xl">
          <ProjectGallery images={project.images} />
        </div>
      </section>

      {/* ── Content ── */}
      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">

            {/* Left — Overview */}
            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="h-px w-5 shrink-0" style={{ background: "var(--gold)" }} />
                <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
                  Overview
                </span>
              </div>

              <p
                className="mb-4 leading-[1.85]"
                style={{ color: "var(--fg)", fontWeight: 500, fontSize: "1.0625rem" }}
              >
                {project.overview}
              </p>

              {project.details.map((d) => (
                <p
                  key={d.slice(0, 20)}
                  className="mb-3 text-[0.9rem] leading-loose"
                  style={{ color: "var(--muted)" }}
                >
                  {d}
                </p>
              ))}
            </div>

            {/* Right — Features + Tech */}
            <div className="lg:w-72 xl:w-80 shrink-0">

              {/* Key Features */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="h-px w-5 shrink-0" style={{ background: "var(--gold)" }} />
                  <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
                    Key Features
                  </span>
                </div>
                <ul className="space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-px w-4 shrink-0"
                        style={{ background: "linear-gradient(to right, var(--gold), rgba(194,168,120,0.2))" }}
                      />
                      <span className="text-[0.875rem] leading-relaxed" style={{ color: "var(--muted)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gold rule */}
              <div
                aria-hidden="true"
                className="mb-8 h-px"
                style={{ background: "linear-gradient(to right, var(--gold), rgba(194,168,120,0.08))", opacity: 0.5 }}
              />

              {/* Technologies */}
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="h-px w-5 shrink-0" style={{ background: "var(--gold)" }} />
                  <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
                    Technologies
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => {
                    const iconFile = TECH_ICON_MAP[tech];
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded px-2.5 py-1"
                        style={{ border: "1px solid var(--border-hv)", background: "var(--surface)" }}
                      >
                        {iconFile && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt=""
                            aria-hidden="true"
                            className={`h-3.5 w-3.5 object-contain${DARK_ICONS.has(tech) ? " dark:invert" : ""}`}
                            src={`/stack-icons/${iconFile}`}
                          />
                        )}
                        <span className="text-[0.7rem] font-medium" style={{ color: "var(--fg)" }}>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <footer
        className="px-5 py-10 sm:px-8 sm:py-12"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      >
        {/* Gold rule */}
        <div
          aria-hidden="true"
          className="mb-8 mx-auto h-px max-w-4xl"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />

        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--muted)" }}
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
            </svg>
            Back to Portfolio
          </Link>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center gap-2 rounded px-6 py-2.5 text-sm font-bold"
          >
            {project.linkLabel}
            <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
