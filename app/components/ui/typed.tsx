"use client";

import { useEffect, useRef } from "react";

/**
 * Types each phrase, holds it, erases it and moves to the next, like a
 * shell prompt. It writes `textContent` directly, so React never re-renders
 * per keystroke, and it rests while off screen. Screen readers get the
 * full list once; under reduced motion the first phrase simply stays.
 */
export default function Typed({
  words,
  play = true,
  className = "",
}: {
  words: readonly string[];
  play?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !play || words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    let n = words[0].length;
    let erasing = false;
    let visible = true;
    let timer = 0;

    const step = () => {
      timer = 0;
      if (!visible) return;
      const word = words[i];
      if (!erasing) {
        if (n < word.length) {
          n += 1;
          el.textContent = word.slice(0, n);
          timer = window.setTimeout(step, 48 + Math.random() * 40);
        } else {
          erasing = true;
          timer = window.setTimeout(step, 1900);
        }
      } else if (n > 0) {
        n -= 1;
        el.textContent = word.slice(0, n);
        timer = window.setTimeout(step, 26);
      } else {
        erasing = false;
        i = (i + 1) % words.length;
        timer = window.setTimeout(step, 260);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !timer) timer = window.setTimeout(step, 400);
    });
    observer.observe(el);
    timer = window.setTimeout(step, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      el.textContent = words[0];
    };
  }, [play, words]);

  return (
    <span className={`typed ${className}`}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        <span ref={ref}>{words[0]}</span>
        <span className="typed__caret" />
      </span>
    </span>
  );
}
