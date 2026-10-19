"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, resumeHref, socialLinks } from "@/app/lib/data";
import ThemeToggle from "@/app/theme-toggle";
import Magnetic from "@/app/components/ui/magnetic";
import RollText from "@/app/components/ui/roll-text";
import LocalTime from "@/app/components/ui/local-time";
import { ease } from "@/app/components/ui/reveal";
import { useIntroDone } from "@/app/components/motion/intro";
import { scrollToTarget, useLenis } from "@/app/components/motion/smooth-scroll";
import { Cpu, Gate } from "@/app/components/ui/circuit";

const sweep = [0.76, 0, 0.24, 1] as const;
const sections = navLinks.filter((link) => link.href !== "#home");

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
    setSolid(y > 24);
    if (y < 140) setHidden(false);
    else if (y > previous + 6) setHidden(true);
    else if (y < previous - 6) setHidden(false);
  });

  /* The active section is whichever one crosses the middle of the screen,
     which stays right however tall a section is (the pinned gallery). */
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
        window.setTimeout(() => scrollToTarget(href), 520);
      } else {
        scrollToTarget(href);
      }
    },
    [open],
  );

  return (
    <>
      <header
        className={`nav ${open ? "scheme-ink" : ""}`}
        data-solid={solid || open}
        data-hidden={hidden && !open}
        style={open ? { background: "transparent", borderColor: "transparent" } : undefined}
      >
        <m.div
          className="wrap flex h-full items-center gap-6"
          initial={{ y: -24, opacity: 0 }}
          animate={introDone ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
          transition={{ duration: 1, ease, delay: 0.35 }}
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              goTo("#home");
            }}
            className="logo"
            aria-label="Jimuel Dave Rodado, back to top"
          >
            <span aria-hidden="true" className="logo__mark">
              <span className="logo__chip" />
              <span className="logo__led led" />
            </span>
            <span aria-hidden="true" className="logo__word hidden sm:block lg:hidden xl:block">
              Jimuel Dave
              <br />
              Rodado
            </span>
          </a>

          <nav aria-label="Sections" className="mx-auto hidden items-center gap-7 lg:flex">
            {sections.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => goTo(link.href)}
                className="nav__link roll-host"
                aria-current={active === link.href ? "true" : undefined}
              >
                <span aria-hidden="true" className="nav__pip" />
                <RollText text={link.label} />
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <ThemeToggle />
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line btn-sm roll-host hidden lg:inline-flex"
            >
              <RollText text={"Résumé"} />
            </a>
            <span className="hidden lg:inline-flex">
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={() => goTo("#contact")}
                  className="btn btn-solid btn-sm roll-host"
                >
                  <span aria-hidden="true" className="btn__dot" />
                  <RollText text="Let's talk" />
                </button>
              </Magnetic>
            </span>
            <button
              type="button"
              className="btn btn-line btn-sm roll-host lg:hidden"
              aria-expanded={open}
              aria-controls="menu-sheet"
              onClick={() => setOpen((v) => !v)}
            >
              <RollText text={open ? "Close" : "Menu"} />
            </button>
          </div>
        </m.div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-sheet"
            className="menu-sheet scheme-ink lg:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%", transition: { duration: 0.6, ease: sweep, delay: 0.1 } }}
            transition={{ duration: 0.75, ease: sweep }}
          >
            {/* Hardware in the corner of the sheet: a processor and a gate */}
            <m.span
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 top-24 w-52"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.25 }}
            >
              <Cpu body="#BB613F" die="#D6AB52" pin="#CFC7B8" />
            </m.span>
            <m.span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 top-[28rem] w-40"
              initial={{ x: "40%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease, delay: 0.35 }}
            >
              <Gate kind="nand" body="#D6AB52" lead="#D6AB52" hole="var(--bg)" />
            </m.span>

            <nav aria-label="Sections" className="relative flex-1">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <m.button
                    type="button"
                    onClick={() => goTo(link.href)}
                    className="menu-sheet__link"
                    aria-current={active === link.href ? "true" : undefined}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3, ease: sweep } }}
                    transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.06 }}
                  >
                    <span className="t-label text-subtle">{String(i).padStart(2, "0")}</span>
                    <span className="menu-sheet__word">{link.label}</span>
                  </m.button>
                </div>
              ))}
            </nav>

            <m.div
              className="relative space-y-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.55 }}
            >
              <div className="flex gap-2.5">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-line flex-1"
                >
                  R&eacute;sum&eacute;
                </a>
                <button type="button" onClick={() => goTo("#contact")} className="btn btn-solid flex-1">
                  <span aria-hidden="true" className="btn__dot" />
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
