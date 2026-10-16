"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { tokenize } from "@/app/components/ui/reveal";
import { SHAPE_CLASS, SHAPE_COLOR, type ShapeName } from "@/app/components/ui/shapes";

type Piece =
  | { kind: "word"; text: string; em: boolean }
  | { kind: "shape"; shape: ShapeName };

function parse(text: string): Piece[] {
  return tokenize(text).map((token) => {
    const match = token.text.match(/^\[(circle|square|tri)\]$/);
    return match
      ? { kind: "shape", shape: match[1] as ShapeName }
      : { kind: "word", text: token.text, em: token.em };
  });
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

function InlineShape({
  progress,
  range,
  shape,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  shape: ShapeName;
}) {
  const scale = useTransform(progress, range, [0, 1]);
  const rotate = useTransform(progress, range, [-120, 0]);
  return (
    <>
      <m.span
        aria-hidden="true"
        className={`manifesto__shape ${SHAPE_CLASS[shape]}`}
        style={{ scale, rotate, background: SHAPE_COLOR[shape] }}
      />{" "}
    </>
  );
}

/**
 * Copy that lights up word by word as it passes through the screen.
 * Asterisks set italic emphasis; [circle], [square] and [tri] drop a
 * shape into the line that grows in with its neighbours.
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
        return piece.kind === "shape" ? (
          <InlineShape key={i} progress={scrollYProgress} range={range} shape={piece.shape} />
        ) : (
          <Word key={i} progress={scrollYProgress} range={range} text={piece.text} em={piece.em} />
        );
      })}
    </p>
  );
}
