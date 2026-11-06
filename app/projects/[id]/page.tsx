import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/app/lib/data";
import ProjectView, { type Sibling } from "./project-gallery";
import SiteFooter from "@/app/components/site-footer";

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
    title: `${project.name} Case Study | Jimuel Dave Rodado`,
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
  const sibling = (i: number): Sibling => {
    const p = projects[(i + projects.length) % projects.length];
    return {
      id: p.id,
      name: p.name,
      category: p.category,
      image: (p.images.find((image) => !/logo/i.test(image.alt)) ?? p.images[0])?.src ?? null,
    };
  };

  return (
    <>
      <ProjectView
        project={project}
        index={index + 1}
        total={projects.length}
        prev={projects.length > 1 ? sibling(index - 1) : null}
        next={projects.length > 1 ? sibling(index + 1) : null}
      />
      <SiteFooter />
    </>
  );
}
