"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { lookFor } from "@/app/lib/project-looks";
import { TransitionLink } from "@/app/components/motion/page-transition";
import RollText from "@/app/components/ui/roll-text";
import { useFitLines } from "@/app/components/ui/use-fit-lines";
import ProjectGlyph from "@/app/components/ui/project-glyph";
import { ArrowLeftIcon, ArrowRightIcon } from "@/app/components/ui/icons";

type Sibling = { id: string; name: string; category: string; image: string | null };

const pad = (n: number) => String(n).padStart(2, "0");


/**
 * The page ends on the next project's cover, in miniature: its colour, its
 * shape and its lead screen as a print. The print straightens on hover, and
 * a click plays the curtain into that cover.
 */
export default function NextCover({
  next,
  prev,
  plate,
  total,
}: {
  next: Sibling;
  prev: Sibling | null;
  plate: number;
  total: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const look = lookFor(next.id);
  const fit = useFitLines(nameRef, next.name, { heightShare: 0.24, lineHeight: 0.86, tracking: -0.045, tail: 0, maxLines: 3 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const slabRotate = useTransform(scrollYProgress, [0, 1], [look.mirror ? 40 : -40, 0]);
  const printY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

  const tilt = look.mirror ? 4 : -4;
  const lines = fit ? fit.lines : [next.name.toUpperCase()];

  return (
    <section
      ref={ref}
      aria-label="Next case study"
      className="cover next-cover"
      data-mirror={look.mirror}
      style={{ "--cover": look.color, "--cover-ink": look.ink, "--tilt": `${tilt}deg` } as React.CSSProperties}
    >
      <m.span aria-hidden="true" className="cover__slab-wrap" style={{ rotate: slabRotate }}>
        <span className="cover__slab">
          <ProjectGlyph kind={look.glyph} fill="var(--cover-deep)" detail="var(--cover)" accent="var(--cover-deep)" />
        </span>
      </m.span>

      <div className="wrap next-cover__wrap">
        <div className="next-cover__head t-label">
          <span>
            Next case study / PL. {pad(plate)} of {pad(total)}
          </span>
          {prev && (
            <TransitionLink href={`/projects/${prev.id}`} label={prev.name} className="roll-host inline-flex items-center gap-2">
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <RollText text={`Previous: ${prev.name}`} />
            </TransitionLink>
          )}
        </div>

        <TransitionLink
          href={`/projects/${next.id}`}
          label={next.name}
          className="next-cover__link"
          data-cursor="Next"
          data-cursor-bg={look.ink}
          data-cursor-fg={look.color}
          aria-label={`Next case study: ${next.name}`}
        >
          {next.image && (
            <m.span aria-hidden="true" className="next-cover__print-wrap" style={{ y: printY }}>
              <span className="print next-cover__print">
                <span className="print__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={next.image} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="print__cap t-label">
                  <span>{next.category}</span>
                  <span>Fig. 01</span>
                </span>
              </span>
            </m.span>
          )}

          <span
            ref={nameRef}
            className="next-cover__name"
            style={fit ? { fontSize: `${fit.size}px` } : undefined}
            data-fit={fit ? "true" : undefined}
          >
            {lines.map((line) => (
              <span key={line} className="cover__line">
                {line}
              </span>
            ))}
          </span>

          <span className="next-cover__cta t-label">
            Open the case study
            <ArrowRightIcon className="next-cover__arrow h-3.5 w-3.5" />
          </span>
        </TransitionLink>
      </div>
    </section>
  );
}
