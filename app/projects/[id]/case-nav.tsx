"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import ThemeToggle from "@/app/theme-toggle";
import RollText from "@/app/components/ui/roll-text";
import { ease } from "@/app/components/ui/reveal";
import { LogoMark } from "@/app/components/ui/glyphs";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { useIntroDone } from "@/app/components/motion/intro";
import { SearchButton } from "@/app/components/nav-bar";
import { openPalette } from "@/app/components/command-palette";
import { ArrowUpRightIcon, SearchIcon } from "@/app/components/ui/icons";

/** The case study's bar: the logo, a breadcrumb path and the live link. */
export default function CaseNav({
  id,
  link,
  linkLabel,
}: {
  id: string;
  link: string;
  linkLabel: string;
}) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const play = useIntroDone();
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  /* Tuck away while reading down, come back the moment you scroll up. */
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = lastY.current;
    lastY.current = y;
    setSolid(y > 16);
    if (y < 140) setHidden(false);
    else if (y > previous + 6) setHidden(true);
    else if (y < previous - 6) setHidden(false);
  });

  return (
    <header className="nav" data-solid={solid} data-hidden={hidden}>
      <m.div
        className="wrap nav__in"
        initial={{ y: -16, opacity: 0 }}
        animate={play ? { y: 0, opacity: 1 } : { y: -16, opacity: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
      >
        <TransitionLink href="/" label="Portfolio" className="brand" aria-label="Jimuel Dave Rodado, back to the portfolio">
          <LogoMark className="brand__mark" />
        </TransitionLink>

        <nav aria-label="Breadcrumb" className="crumbs">
          <TransitionLink href="/" label="Portfolio" className="crumbs__link">
            ~
          </TransitionLink>
          <span aria-hidden="true" className="crumbs__sep">/</span>
          <TransitionLink href="/#projects" label="Projects" className="crumbs__link">
            projects
          </TransitionLink>
          <span aria-hidden="true" className="crumbs__sep">/</span>
          <span className="crumbs__here" aria-current="page">
            {id}
          </span>
        </nav>

        <div className="nav__actions">
          <SearchButton className="hidden md:inline-flex" />
          <button type="button" className="icon-btn md:hidden" onClick={openPalette} aria-label="Open the command palette">
            <SearchIcon className="h-4 w-4" />
          </button>
          <ThemeToggle />
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm roll-host hidden sm:inline-flex">
              <RollText text={linkLabel} />
              <ArrowUpRightIcon />
            </a>
          )}
        </div>
      </m.div>
    </header>
  );
}
