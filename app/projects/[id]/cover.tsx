"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import type { ProjectLook } from "@/app/lib/project-looks";
import RiseChars from "@/app/components/ui/rise-chars";
import { ease } from "@/app/components/ui/reveal";
import { useFitLines } from "@/app/components/ui/use-fit-lines";
import { ExternalIcon } from "@/app/components/ui/icons";

const roll = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export type CoverPrint = { src: string; caption: string; count: string };

/* The project's shape, tone on tone, as a slab cropped by the cover's edge. */
const SLAB: Record<ProjectLook["shape"], string> = {
  half: "cover__slab--half",
  quarter: "cover__slab--quarter",
  split: "cover__slab--split",
  square: "cover__slab--square",
};

/**
 * The case study cover: the whole first screen in the project's colour, in
 * either theme. The lead screen sits on it as a tilted print, the project's
 * shape fills a corner, and the name runs across the foot at poster size.
 */
export default function Cover({
  name,
  tagline,
  category,
  plate,
  total,
  link,
  home,
  look,
  print,
  play,
}: {
  name: string;
  tagline: string;
  category: string;
  plate: number;
  total: number;
  link: string;
  home: string;
  look: ProjectLook;
  print: CoverPrint | null;
  play: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const fit = useFitLines(nameRef, name, { heightShare: 0.34, lineHeight: 0.86, tracking: -0.045, tail: 0.26 });

  const tilt = look.mirror ? 3.2 : -3.2;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const printRotate = useTransform(p, [0, 1], [0, -tilt]);
  const printY = useTransform(p, [0, 1], ["0%", "-14%"]);
  const slabRotate = useTransform(p, [0, 1], [0, look.mirror ? -38 : 38]);
  const slabScale = useTransform(p, [0, 1], [1, 1.12]);
  const nameY = useTransform(p, [0, 1], ["0%", "22%"]);
  const folioY = useTransform(p, [0, 1], ["0%", "-30%"]);

  const on = (target: Record<string, number | string>) => (play ? target : undefined);
  const lines = fit ? fit.lines : [name.toUpperCase()];
  const offsets = lines.map((_, i) => lines.slice(0, i).join("").length);
  const chars = Math.max(...name.split(" ").map((word) => word.length));

  const vars = {
    "--cover": look.color,
    "--cover-ink": look.ink,
    "--cover-second": look.second,
    "--chars": chars,
    // The name's set height, so CSS can give the print what is left.
    ...(fit ? { "--name-h": `${Math.round(fit.size * lines.length * 0.86)}px` } : {}),
  } as React.CSSProperties;

  return (
    <section ref={ref} id="cs-cover" className="cover" data-mirror={look.mirror} style={vars}>
      <m.span aria-hidden="true" className="cover__slab-wrap" style={{ rotate: slabRotate, scale: slabScale }}>
        <m.span
          className={`cover__slab ${SLAB[look.shape]}`}
          initial={{ scale: 0, rotate: look.mirror ? 90 : -90 }}
          animate={on({ scale: 1, rotate: 0 })}
          transition={{ type: "spring", stiffness: 55, damping: 15, delay: 0.15 }}
        />
      </m.span>

      <div className="wrap cover__wrap">
        <div className="cover__top">
          <m.div className="cover__folio" style={{ y: folioY }}>
            <m.p
              className="t-label cover__plate"
              initial={{ opacity: 0, y: 14 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 0.9, ease, delay: 0.25 }}
            >
              <span>Case study</span>
              <span aria-hidden="true" className="cover__tick" />
              <span>
                PL. {pad(plate)} of {pad(total)}
              </span>
            </m.p>
            <m.p
              className="cover__cat"
              initial={{ opacity: 0, y: 18 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 1, ease, delay: 0.35 }}
            >
              {category}
            </m.p>
            <m.p
              className="cover__tagline t-pretty"
              initial={{ opacity: 0, y: 18 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 1, ease, delay: 0.45 }}
            >
              {tagline}
            </m.p>
            <m.p
              initial={{ opacity: 0, y: 18 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 1, ease, delay: 0.55 }}
            >
              {link ? (
                <a href={link} target="_blank" rel="noreferrer" className="cover__visit u-link">
                  {home}
                  <ExternalIcon />
                </a>
              ) : (
                <span className="cover__visit">{home}</span>
              )}
            </m.p>
          </m.div>

          {print && (
            <m.div className="cover__print-wrap" style={{ rotate: printRotate, y: printY }}>
              <m.figure
                className="print cover__print"
                initial={{ opacity: 0, y: 90, rotate: tilt * 3 }}
                animate={on({ opacity: 1, y: 0, rotate: tilt })}
                transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.3 }}
              >
                <span className="print__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={print.src} alt="" decoding="async" fetchPriority="high" />
                </span>
                <figcaption className="print__cap t-label">
                  <span>{print.caption}</span>
                  <span>{print.count}</span>
                </figcaption>
              </m.figure>
            </m.div>
          )}
        </div>

        <m.h1
          ref={nameRef}
          className="cover__name"
          data-fit={fit ? "true" : undefined}
          style={{ y: nameY, ...(fit ? { fontSize: `${fit.size}px` } : {}) }}
        >
          <span className="sr-only">{name}</span>
          <span aria-hidden="true">
            {lines.map((line, i) => (
              <span key={line} className="cover__line">
                <RiseChars
                  text={line}
                  play={play}
                  delay={0.45 + offsets[i] * 0.03}
                  stagger={0.03}
                  tilt
                  suffix={
                    i === lines.length - 1 ? (
                      <m.span
                        className="cover__dot"
                        initial={{ x: "5em", rotate: 900 }}
                        animate={on({ x: "0em", rotate: 0 })}
                        transition={{ duration: 1.6, ease: roll, delay: 0.95 }}
                      />
                    ) : undefined
                  }
                />
              </span>
            ))}
          </span>
        </m.h1>

        <m.div
          className="cover__foot t-label"
          initial={{ opacity: 0 }}
          animate={on({ opacity: 1 })}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="cover__cue" />
            Scroll to read
          </span>
          <span>{look.label}</span>
        </m.div>
      </div>
    </section>
  );
}
