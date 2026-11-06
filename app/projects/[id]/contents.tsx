"use client";

import { useEffect, useState } from "react";
import RollText from "@/app/components/ui/roll-text";
import { scrollToTarget } from "@/app/components/motion/smooth-scroll";
import { ArrowUpRightIcon } from "@/app/components/ui/icons";

export type Chapter = { id: string; title: string };

/**
 * The README's outline in the margin: it follows the chapter being read.
 * Sticky beside the text on wide screens, hidden on phones where the
 * chapters simply follow each other.
 */
export default function Contents({
  chapters,
  file,
  link,
  linkLabel,
}: {
  chapters: Chapter[];
  file: string;
  link: string;
  linkLabel: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = chapters.findIndex((c) => c.id === entry.target.id);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <div className="toc">
      <p className="toc__file">
        <span aria-hidden="true" className="toc__icon">
          #
        </span>
        {file}
      </p>
      <nav aria-label="Case study contents" className="toc__rail" style={{ "--active": active } as React.CSSProperties}>
        <span aria-hidden="true" className="toc__marker" />
        <ol className="toc__list">
          {chapters.map((chapter, i) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className="toc__link roll-host"
                aria-current={active === i ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget(`#${chapter.id}`, { offset: -90 });
                }}
              >
                <span className="toc__n">{String(i + 1).padStart(2, "0")}</span>
                <RollText text={chapter.title} />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm roll-host toc__cta">
          <RollText text={linkLabel} />
          <ArrowUpRightIcon />
        </a>
      ) : (
        <p className="toc__private">Deployed internally for the client&apos;s staff.</p>
      )}
    </div>
  );
}
