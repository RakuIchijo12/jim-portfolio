"use client";

import { useEffect, useState, type RefObject } from "react";

export type FitResult = { lines: string[]; size: number } | null;

type Options = {
  /** Most of the box's height the name may take, as a share of the viewport. */
  heightShare: number;
  /** CSS line height of the name, in em. */
  lineHeight: number;
  /** CSS letter spacing of the name, in em. */
  tracking: number;
  /** Extra width after the last word, in em (the rolling full stop). */
  tail: number;
  maxLines?: number;
};

/** Every way to cut `words` into `k` consecutive lines. */
function splits(words: string[], k: number): string[][] {
  if (k === 1) return [[words.join(" ")]];
  const out: string[][] = [];
  for (let i = 1; i <= words.length - k + 1; i++) {
    const head = words.slice(0, i).join(" ");
    for (const rest of splits(words.slice(i), k - 1)) out.push([head, ...rest]);
  }
  return out;
}

/**
 * Poster setting for a name: measures the words in the real font, tries
 * every line break, and picks the break and size that fill the box's width
 * without passing the height budget. Re-runs when the width changes or the
 * web font lands; height-only changes (a phone's URL bar) are ignored.
 */
export function useFitLines(
  ref: RefObject<HTMLElement | null>,
  text: string,
  { heightShare, lineHeight, tracking, tail, maxLines = 4 }: Options,
): FitResult {
  const [fit, setFit] = useState<FitResult>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const words = text.toUpperCase().split(" ").filter(Boolean);
    let lastWidth = -1;
    let height = window.innerHeight;

    const measure = (force: boolean) => {
      const width = el.clientWidth;
      if (!width || (!force && width === lastWidth)) return;
      lastWidth = width;

      const style = getComputedStyle(el);
      ctx.font = `${style.fontWeight} 100px ${style.fontFamily}`;
      const lineWidth = (line: string) =>
        ctx.measureText(line).width + Array.from(line).length * tracking * 100;

      const budget = height * heightShare;
      let best: { lines: string[]; size: number } | null = null;
      for (let k = 1; k <= Math.min(words.length, maxLines); k++) {
        for (const lines of splits(words, k)) {
          const widest = Math.max(
            ...lines.map((line, i) => lineWidth(line) + (i === lines.length - 1 ? tail * 100 : 0)),
          );
          const size = Math.min((width / widest) * 100, budget / (k * lineHeight));
          // Fewer lines win ties: a break has to buy a visibly bigger size.
          if (!best || size > best.size * 1.02) best = { lines, size };
        }
      }
      // A hair under the exact fit, for sub-pixel rounding across browsers.
      if (best) setFit({ lines: best.lines, size: Math.floor(best.size * 0.985) });
    };

    const observer = new ResizeObserver(() => measure(false));
    observer.observe(el);
    document.fonts?.ready.then(() => measure(true)).catch(() => {});
    const onOrientation = () => {
      height = window.innerHeight;
      measure(true);
    };
    window.addEventListener("orientationchange", onOrientation);
    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, [ref, text, heightShare, lineHeight, tracking, tail, maxLines]);

  return fit;
}
