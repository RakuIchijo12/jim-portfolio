"use client";

import { Fragment } from "react";
import { m } from "framer-motion";
import { ease } from "@/app/components/ui/reveal";

/**
 * Letters that rise one by one out of their own clipped boxes. Each word is
 * kept whole, so a long name wraps between words and never mid-word.
 */
export default function RiseChars({
  text,
  play,
  delay,
  stagger,
  tilt = false,
  suffix,
}: {
  text: string;
  play: boolean;
  delay: number;
  stagger: number;
  tilt?: boolean;
  /** Rendered inside the last word's box, so it wraps with that word. */
  suffix?: React.ReactNode;
}) {
  const words = text.split(" ");
  const offsets = words.map((_, w) => words.slice(0, w).reduce((n, word) => n + word.length, 0));

  return (
    <>
      {words.map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, c) => (
              <span key={c} className="mask">
                <m.span
                  className="hero__char"
                  initial={{ y: "115%", rotate: tilt ? 9 : 0 }}
                  animate={play ? { y: "0%", rotate: 0 } : undefined}
                  transition={{ duration: 1.15, ease, delay: delay + (offsets[w] + c) * stagger }}
                >
                  {ch}
                </m.span>
              </span>
            ))}
            {w === words.length - 1 ? suffix : null}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
