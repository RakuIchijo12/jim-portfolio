"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { tokenize } from "@/app/components/ui/reveal";
import { Chip, Gate } from "@/app/components/ui/circuit";
import type { InlineGlyph } from "@/app/components/ui/shapes";

type Piece =
  | { kind: "word"; text: string; em: boolean }
  | { kind: "glyph"; glyph: InlineGlyph };

function parse(text: string): Piece[] {
  return tokenize(text).map((token) => {
    const match = token.text.match(/^\[(led|chip|gate)\]$/);
    return match
      ? { kind: "glyph", glyph: match[1] as InlineGlyph }
      : { kind: "word", text: token.text, em: token.em };
  });
}

/* Each inline part, drawn to sit on the line like a word. */
function GlyphArt({ glyph }: { glyph: InlineGlyph }) {
  if (glyph === "led") {
    return <span className="led manifesto__led" style={{ "--led": "#D0714D" } as React.CSSProperties} />;
  }
  if (glyph === "chip") {
    return <Chip pins={3} body="var(--ochre)" pin="var(--fg)" mark="rgba(20, 18, 15, 0.55)" className="manifesto__chip" />;
  }
  return <Gate kind="and" body="var(--olive)" lead="var(--olive)" className="manifesto__gate" />;
}

function Word({
  progress,
  range,
  text,
  em,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  text: string;
  em: boolean;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <>
      <m.span style={{ opacity }} className={em ? "t-em" : undefined}>
        {text}
      </m.span>{" "}
    </>
  );
}

function InlinePart({
  progress,
  range,
  glyph,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  glyph: InlineGlyph;
}) {
  const scale = useTransform(progress, range, [0, 1]);
  const rotate = useTransform(progress, range, [glyph === "chip" ? -90 : -40, 0]);
  return (
    <>
      <m.span aria-hidden="true" className="manifesto__glyph" style={{ scale, rotate }}>
        <GlyphArt glyph={glyph} />
      </m.span>{" "}
    </>
  );
}

/**
 * Copy that lights up word by word as it passes through the screen.
 * Asterisks set italic emphasis; [led], [chip] and [gate] drop a part into
 * the line that grows in with its neighbours.
 */
export default function ScrollLit({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const pieces = parse(text);
  const n = pieces.length;

  return (
    <p ref={ref} className={className}>
      {pieces.map((piece, i) => {
        const range: [number, number] = [i / n, Math.min(1, (i + 1.6) / n)];
        return piece.kind === "glyph" ? (
          <InlinePart key={i} progress={scrollYProgress} range={range} glyph={piece.glyph} />
        ) : (
          <Word key={i} progress={scrollYProgress} range={range} text={piece.text} em={piece.em} />
        );
      })}
    </p>
  );
}
