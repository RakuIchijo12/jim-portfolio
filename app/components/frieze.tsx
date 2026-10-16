"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

/**
 * A band of Bauhaus tiles between sections. Every shape is driven by one
 * scroll value, so the whole band turns and slides like a single mechanism
 * as it passes through the screen. Colours are fixed, poster style, in both
 * themes.
 */
export default function Frieze() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const turn = useTransform(p, [0, 1], [-150, 150]);
  const counter = useTransform(p, [0, 1], [120, -120]);
  const rise = useTransform(p, [0, 1], ["60%", "-60%"]);
  const sink = useTransform(p, [0, 1], ["-60%", "60%"]);
  const slide = useTransform(p, [0, 1], ["-45%", "45%"]);
  const breathe = useTransform(p, [0, 0.5, 1], [0.45, 1, 0.45]);
  const spin = useTransform(p, [0, 1], [0, 540]);

  return (
    <div ref={ref} className="frieze" aria-hidden="true">
      {/* 1: ink quarter turning on terracotta */}
      <div className="frieze__cell" style={{ background: "var(--brand-terra)" }}>
        <m.span className="sh sh-quarter w-[78%]" style={{ background: "var(--ink)", rotate: turn }} />
      </div>

      {/* 2: teal half-disc rocking on the page ground */}
      <div className="frieze__cell" style={{ background: "var(--bg)" }}>
        <m.span className="sh sh-half w-[76%]" style={{ background: "var(--teal)", rotate: counter }} />
      </div>

      {/* 3: ochre sun rising through ink */}
      <div className="frieze__cell" style={{ background: "var(--ink)" }}>
        <m.span className="sh sh-circle aspect-square w-[46%]" style={{ background: "#D6AB52", y: rise }} />
      </div>

      {/* 4: paper triangle turning on olive */}
      <div className="frieze__cell" style={{ background: "var(--brand-olive)" }}>
        <m.span className="sh sh-tri aspect-square w-[58%]" style={{ background: "var(--paper)", rotate: turn }} />
      </div>

      {/* 5: ink bowl with a terracotta ball dropping in */}
      <div className="frieze__cell" style={{ background: "#D6AB52" }}>
        <span className="sh sh-half absolute bottom-[14%] w-[72%] rotate-180" style={{ background: "var(--ink)" }} />
        <m.span className="sh sh-circle aspect-square w-[26%]" style={{ background: "var(--brand-terra)", y: sink }} />
      </div>

      {/* 6: two paper quarters forming a leaf on teal */}
      <div className="frieze__cell" style={{ background: "var(--brand-teal)" }}>
        <m.span className="flex w-[62%] flex-col" style={{ rotate: counter }}>
          <span className="sh sh-quarter w-1/2 self-end" style={{ background: "var(--paper)", transform: "rotate(180deg)" }} />
          <span className="sh sh-quarter w-1/2" style={{ background: "var(--paper)" }} />
        </m.span>
      </div>

      {/* 7: terracotta disc breathing inside an ink ring */}
      <div className="frieze__cell" style={{ background: "var(--bg)" }}>
        <span className="sh sh-ring aspect-square w-[70%]" style={{ color: "var(--fg)", "--ring": "1.5px" } as React.CSSProperties} />
        <m.span className="sh sh-circle aspect-square w-[52%]" style={{ background: "var(--brand-terra)", scale: breathe }} />
      </div>

      {/* 8: the split disc, rolling across ink */}
      <div className="frieze__cell" style={{ background: "var(--ink)" }}>
        <m.span className="sh sh-split aspect-square w-[54%]" style={{ x: slide, rotate: spin }} />
      </div>
    </div>
  );
}
