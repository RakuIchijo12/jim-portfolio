"use client";

import { Fragment } from "react";
import { m, type Variants } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;

type Token = { text: string; em: boolean };

/**
 * Splits copy into words. Words wrapped in asterisks are emphasised and set
 * in the italic serif, and emphasis can span several words:
 * "Built to solve *real problems.*"
 */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let open = false;
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    let word = raw;
    let em = open;
    if (word.startsWith("*")) {
      word = word.slice(1);
      em = true;
      open = true;
    }
    const close = word.match(/\*([^*]*)$/);
    if (close && close.index !== undefined) {
      word = word.slice(0, close.index) + close[1];
      open = false;
    }
    tokens.push({ text: word, em });
  }
  return tokens;
}

const word: Variants = {
  hidden: { y: "112%" },
  shown: { y: "0%", transition: { duration: 1.05, ease } },
};

/**
 * Each word rises out of its own clipped box. Plays when scrolled into view,
 * or when `play` turns true if it is given.
 */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  amount = 0.5,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
  play?: boolean;
}) {
  const tokens = tokenize(text);
  const parent: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "shown", viewport: { once: true, amount } }
      : { initial: "hidden", animate: play ? "shown" : "hidden" };

  return (
    <m.span className={className} variants={parent} {...trigger}>
      {tokens.map((token, i) => (
        <Fragment key={`${token.text}-${i}`}>
          <span className={token.em ? "mask mask--em" : "mask"}>
            <m.span variants={word} className={token.em ? "t-em" : undefined}>
              {token.text}
            </m.span>
          </span>
          {i < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </m.span>
  );
}

/** A block that drifts up into place once it scrolls into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  amount = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </m.div>
  );
}

/** Container and child variants, so lists stagger the same way everywhere. */
export const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const riseChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
};
