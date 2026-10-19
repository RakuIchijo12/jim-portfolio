"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import ThemeToggle from "@/app/theme-toggle";
import RollText from "@/app/components/ui/roll-text";
import { ease } from "@/app/components/ui/reveal";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { useIntroDone } from "@/app/components/motion/intro";
import { ArrowLeftIcon, ExternalIcon } from "@/app/components/ui/icons";

const pad = (n: number) => String(n).padStart(2, "0");

/** The case study's bar: the same chrome as the home nav, folio in the middle. */
export default function CaseNav({
  name,
  plate,
  total,
  link,
  linkLabel,
  tone,
}: {
  name: string;
  plate: number;
  total: number;
  link: string;
  linkLabel: string;
  /** The cover's colours, worn while the bar sits over the cover. */
  tone: { bg: string; ink: string };
}) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onCover, setOnCover] = useState(true);
  const play = useIntroDone();
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  /* Tuck away while reading down, come back the moment you scroll up. */
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = lastY.current;
    lastY.current = y;
    setSolid(y > 24);
    if (y < 140) setHidden(false);
    else if (y > previous + 6) setHidden(true);
    else if (y < previous - 6) setHidden(false);
    const cover = document.getElementById("cs-cover");
    setOnCover(cover ? cover.getBoundingClientRect().bottom > 36 : false);
  });

  const coverTone = onCover
    ? ({
        "--bg": tone.bg,
        "--fg": tone.ink,
        "--muted": `color-mix(in srgb, ${tone.ink} 72%, ${tone.bg})`,
        "--subtle": `color-mix(in srgb, ${tone.ink} 60%, ${tone.bg})`,
        "--line": `color-mix(in srgb, ${tone.ink} 18%, transparent)`,
        "--line-strong": `color-mix(in srgb, ${tone.ink} 42%, transparent)`,
        "--accent": tone.ink,
        "--accent-text": tone.ink,
        "--on-accent": tone.bg,
      } as React.CSSProperties)
    : undefined;

  return (
    <header className="nav" data-solid={solid} data-hidden={hidden} style={coverTone}>
      <m.div
        className="wrap flex h-full items-center gap-5"
        initial={{ y: -24, opacity: 0 }}
        animate={play ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 1, ease, delay: 0.2 }}
      >
        <TransitionLink href="/" label="Portfolio" className="logo" aria-label="Jimuel Dave Rodado, back to the portfolio">
          <span aria-hidden="true" className="logo__mark">
            <span className="logo__chip" />
            <span className="logo__led led" />
          </span>
        </TransitionLink>

        <TransitionLink href="/#projects" label="Selected works" className="nav__link roll-host">
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <RollText text="All work" />
        </TransitionLink>

        <p className="t-label mx-auto hidden items-center gap-3 text-muted md:flex">
          <span className="text-accent">PL. {pad(plate)}</span>
          <span>/ {pad(total)}</span>
          <span aria-hidden="true" className="block h-px w-6 bg-line" />
          <span className="text-fg">{name}</span>
        </p>

        <div className="ml-auto flex items-center gap-2.5 md:ml-0">
          <ThemeToggle />
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid btn-sm roll-host hidden sm:inline-flex"
            >
              <RollText text={linkLabel} />
              <ExternalIcon />
            </a>
          ) : (
            <span className="t-label hidden text-subtle sm:inline">Private client system</span>
          )}
        </div>
      </m.div>
    </header>
  );
}
