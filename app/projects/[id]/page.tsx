import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/app/lib/data";
import ProjectView from "./project-gallery";

const TECH_ICON_MAP: Record<string, string> = {
  "HTML":          "frontend/html5.png",
  "CSS":           "frontend/css3.png",
  "JavaScript":    "frontend/javascript.png",
  "TypeScript":    "frontend/typescript.png",
  "Node.js":       "backend/Node.js.png",
  "Express.js":    "backend/Express.png",
  "Firebase":      "database/Firebase.png",
  "GitHub":        "tools/GitHub.png",
  "Angular":       "frontend/angular.png",
  "NestJS":        "backend/nestjs.png",
  "PostgreSQL":    "database/postgresql.png",
  "MySQL":         "database/mysql.png",
  "React":         "frontend/react.png",
  "Next.js":       "frontend/next-js.png",
  "Vue.js":        "frontend/vue-js.png",
  "Laravel":       "backend/laravel.png",
  "PHP":           "backend/php.png",
  "Python":        "backend/python.png",
  "Django":        "backend/django.png",
  "Tailwind CSS":  "frontend/tailwind-css.png",
  "Alpine.js":     "frontend/alpine-js.png",
  "Filament":      "backend/filament.png",
  "Livewire":      "frontend/livewire.png",
  "Supabase":      "database/supabase.png",
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
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = projects[index];

  /** Wrap around so the case studies read as a continuous set. */
  const sibling = (i: number) => {
    const p = projects[(i + projects.length) % projects.length];
    return { id: p.id, name: p.name, category: p.category };
  };

  return (
    <ProjectView
      project={project}
      techIconMap={TECH_ICON_MAP}
      darkIcons={DARK_ICONS}
      index={index + 1}
      total={projects.length}
      prev={projects.length > 1 ? sibling(index - 1) : null}
      next={projects.length > 1 ? sibling(index + 1) : null}
    />
  );
}
