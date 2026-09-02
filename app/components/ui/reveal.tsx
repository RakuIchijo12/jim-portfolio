"use client";

import { Fragment } from "react";
import { m } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A block that wipes up into view once, from a clipped edge.
 * Works with arbitrary inline markup inside, unlike a per-word split.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.85,
  className = "",
  once = true,
  amount = 0.35,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </m.div>
  );
}

/**
 * Word-by-word mask reveal — each word rides up out of its own clipped box.
 * The signature move of the hero and every section heading.
 */
export function RevealWords({
  text,
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  className = "",
  inView = false,
  as: Tag = "span",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  /** Trigger on scroll into view instead of on mount. */
  inView?: boolean;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const words = text.split(" ");
  const motionProps = inView
    ? { initial: { y: "108%" }, whileInView: { y: "0%" }, viewport: { once: true, amount: 0.5 } }
    : { initial: { y: "108%" }, animate: { y: "0%" } };

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        // The separator must sit *outside* the mask: a trailing space inside
        // an overflow:hidden inline-block is trimmed, which welds words together.
        <Fragment key={`${word}-${i}`}>
          <span className="word-mask">
            <m.span
              className="inline-block"
              {...motionProps}
              transition={{ duration, ease, delay: delay + i * stagger }}
            >
              {word}
            </m.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Standard container/child variants so sections stagger identically. */
export const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

export const fadeUpChild = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};
