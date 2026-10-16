"use client";

import { useEffect, useState } from "react";
import { SHAPE_CLASS, type ProjectLook } from "@/app/lib/project-looks";
import CountUp from "@/app/components/ui/count-up";
import RollText from "@/app/components/ui/roll-text";
import { scrollToTarget } from "@/app/components/motion/smooth-scroll";
import { ExternalIcon } from "@/app/components/ui/icons";

export type Chapter = { id: string; title: string };
export type Fact = { k: string; n?: number; unit?: string; text?: string };

/**
 * The dossier's margin: a table of contents that follows the chapter being
 * read, then the project's facts. Sticky beside the text on wide screens; on
 * phones only the facts show, as a grid above the first chapter.
 */
export default function Contents({
  chapters,
  facts,
  look,
  link,
  linkLabel,
}: {
  chapters: Chapter[];
  facts: Fact[];
  look: ProjectLook;
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

  const split = look.shape === "split";

  return (
    <div className="rail">
      <nav aria-label="Case study contents" className="rail__toc">
        <p className="t-label rail__k">Contents</p>
        <div className="rail__list-wrap" style={{ "--active": active } as React.CSSProperties}>
          <span
            aria-hidden="true"
            className={`rail__marker sh ${SHAPE_CLASS[look.shape]}`}
            style={split ? undefined : { background: look.color }}
          />
          <ol className="rail__list">
          {chapters.map((chapter, i) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className="rail__link roll-host"
                aria-current={active === i ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget(`#${chapter.id}`, { offset: -24 });
                }}
              >
                <span className="t-label rail__n">{String(i + 1).padStart(2, "0")}</span>
                <RollText text={chapter.title} />
              </a>
            </li>
          ))}
          </ol>
        </div>
      </nav>

      <dl className="rail__facts">
        {facts.map((fact) => (
          <div key={fact.k} className="rail__fact">
            <dt className="t-label rail__k">{fact.k}</dt>
            <dd>
              {fact.n !== undefined ? (
                <>
                  <CountUp value={fact.n} className="rail__n-big" />
                  <span className="t-label rail__unit">{fact.unit}</span>
                </>
              ) : (
                <span className="rail__text">{fact.text}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="btn btn-solid roll-host rail__cta">
          <span aria-hidden="true" className="btn__dot" />
          <RollText text={linkLabel} />
          <ExternalIcon />
        </a>
      ) : (
        <p className="rail__private t-label">Source and deployment are private to the client.</p>
      )}
    </div>
  );
}
