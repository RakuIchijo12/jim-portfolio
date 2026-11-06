"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, resumeHref, socialLinks } from "@/app/lib/data";
import ThemeToggle from "@/app/theme-toggle";
import RollText from "@/app/components/ui/roll-text";
import LocalTime from "@/app/components/ui/local-time";
import { ease } from "@/app/components/ui/reveal";
import { LogoMark } from "@/app/components/ui/glyphs";
import { CloseIcon, MenuIcon, SearchIcon } from "@/app/components/ui/icons";
import { useIntroDone } from "@/app/components/motion/intro";
import { scrollToTarget, useLenis } from "@/app/components/motion/smooth-scroll";
import { openPalette, useShortcutLabel } from "@/app/components/command-palette";

const sweep = [0.76, 0, 0.24, 1] as const;
const sections = navLinks.filter((link) => link.href !== "#home");
const pad = (n: number) => String(n).padStart(2, "0");

/** The search field in the bar: opens the command palette. */
export function SearchButton({ className = "" }: { className?: string }) {
  const shortcut = useShortcutLabel();
  return (
    <button type="button" className={`search-btn ${className}`} onClick={openPalette} aria-label="Open the command palette">
      <SearchIcon className="h-3.5 w-3.5" />
      <span className="search-btn__text">Search</span>
      <kbd className="kbd">{shortcut}</kbd>
    </button>
  );
}

export default function NavBar() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const introDone = useIntroDone();
  const lenis = useLenis();
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

  /* The active section is whichever one crosses the middle of the screen. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Mobile sheet: hold the page still, close on Escape. */
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const goTo = useCallback(
    (href: string) => {
      if (open) {
        setOpen(false);
        // Let the sheet lift before the page moves under it.
        window.setTimeout(() => scrollToTarget(href), 420);
      } else {
        scrollToTarget(href);
      }
    },
    [open],
  );

  return (
    <>
      <header className="nav" data-solid={solid || open} data-hidden={hidden && !open}>
        <m.div
          className="wrap nav__in"
          initial={{ y: -16, opacity: 0 }}
          animate={introDone ? { y: 0, opacity: 1 } : { y: -16, opacity: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              goTo("#home");
            }}
            className="brand"
            aria-label="Jimuel Dave Rodado, back to top"
          >
            <LogoMark className="brand__mark" />
            <span className="brand__text" aria-hidden="true">
              <span className="brand__name">Jimuel Rodado</span>
              <span className="brand__role">software.engineer</span>
            </span>
          </a>

          <nav aria-label="Sections" className="nav__links">
            {sections.map((link, i) => (
              <button
                key={link.href}
                type="button"
                onClick={() => goTo(link.href)}
                className="nav__link roll-host"
                aria-current={active === link.href ? "true" : undefined}
              >
                <span aria-hidden="true" className="nav__n">
                  {pad(i + 1)}
                </span>
                <RollText text={link.label.toLowerCase()} />
              </button>
            ))}
          </nav>

          <div className="nav__actions">
            <SearchButton className="hidden md:inline-flex" />
            <button
              type="button"
              className="icon-btn md:hidden"
              onClick={openPalette}
              aria-label="Open the command palette"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost btn--sm roll-host hidden xl:inline-flex"
            >
              <RollText text="Résumé" />
            </a>
            <button
              type="button"
              onClick={() => goTo("#contact")}
              className="btn btn--primary btn--sm roll-host hidden lg:inline-flex"
            >
              <span aria-hidden="true" className="btn__led" />
              <RollText text="Let's talk" />
            </button>
            <button
              type="button"
              className="icon-btn lg:hidden"
              aria-expanded={open}
              aria-controls="menu-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            </button>
          </div>
        </m.div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-sheet"
            className="sheet-menu lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, ease: sweep } }}
            transition={{ duration: 0.55, ease: sweep }}
          >
            <p className="sheet-menu__prompt">
              <span className="text-accent">$</span> ls ~/sections
            </p>
            <nav aria-label="Sections" className="sheet-menu__nav">
              {navLinks.map((link, i) => (
                <m.button
                  key={link.href}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className="sheet-menu__link"
                  aria-current={active === link.href ? "true" : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.045 }}
                >
                  <span className="sheet-menu__n">{pad(i)}</span>
                  <span className="sheet-menu__word">{link.label}</span>
                  <span aria-hidden="true" className="sheet-menu__slash">/</span>
                </m.button>
              ))}
            </nav>

            <m.div
              className="sheet-menu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex gap-2.5">
                <a href={resumeHref} target="_blank" rel="noreferrer" className="btn btn--ghost flex-1">
                  R&eacute;sum&eacute;
                </a>
                <button type="button" onClick={() => goTo("#contact")} className="btn btn--primary flex-1">
                  <span aria-hidden="true" className="btn__led" />
                  Let&apos;s talk
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.icon === "mail" ? undefined : "_blank"}
                        rel={link.icon === "mail" ? undefined : "noreferrer"}
                        className="t-label u-link text-muted"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <LocalTime className="t-label text-subtle" />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
