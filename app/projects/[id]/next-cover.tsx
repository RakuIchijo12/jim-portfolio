"use client";

import { lookFor } from "@/app/lib/project-looks";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { ArrowLeftIcon, ArrowRightIcon } from "@/app/components/ui/icons";

type Sibling = { id: string; name: string; category: string; image: string | null };

function Card({ sibling, dir }: { sibling: Sibling; dir: "prev" | "next" }) {
  const look = lookFor(sibling.id);
  return (
    <TransitionLink
      href={`/projects/${sibling.id}`}
      label={sibling.name}
      className="pager__card"
      data-dir={dir}
      data-cursor={dir === "next" ? "Next" : "Prev"}
      style={{ "--proj": look.accent } as React.CSSProperties}
      aria-label={`${dir === "next" ? "Next" : "Previous"} case study: ${sibling.name}`}
    >
      <span className="pager__k">
        {dir === "prev" && <ArrowLeftIcon className="h-3.5 w-3.5" />}
        {dir === "next" ? "Next project" : "Previous project"}
        {dir === "next" && <ArrowRightIcon className="h-3.5 w-3.5" />}
      </span>
      <span className="pager__name">{sibling.name}</span>
      <span className="pager__cat">
        <span aria-hidden="true" className="pager__dot" />
        {sibling.category}
      </span>
      {sibling.image && (
        <span aria-hidden="true" className="pager__thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sibling.image} alt="" loading="lazy" decoding="async" />
        </span>
      )}
    </TransitionLink>
  );
}

/** The page ends on the neighbouring case studies, one on each side. */
export default function NextCover({ prev, next }: { prev: Sibling | null; next: Sibling | null }) {
  if (!prev && !next) return null;
  return (
    <section aria-label="More case studies" className="pager defer-render">
      <div className="wrap pager__grid">
        {prev && <Card sibling={prev} dir="prev" />}
        {next && <Card sibling={next} dir="next" />}
      </div>
    </section>
  );
}
