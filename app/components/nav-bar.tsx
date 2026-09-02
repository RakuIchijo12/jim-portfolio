"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { navLinks, resumeHref, socialLinks } from "@/app/lib/data";
import ThemeToggle from "@/app/theme-toggle";
import Magnetic from "@/app/components/ui/magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NavBar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  const railRef  = useRef<HTMLElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [thumb, setThumb] = useState({ x: 0, w: 0, ready: false });

  /* ── Scrolled chrome ─────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 80) setActiveHash("#home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section ──────────────────────────────────────────────────── */
  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
        const best = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) setActiveHash(`#${best[0]}`);
      },
      { threshold: [0.15, 0.3, 0.5, 0.75] },
    );

    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Slide the rail indicator under the active pill ──────────────────── */
  const measureThumb = useCallback(() => {
    const rail = railRef.current;
    const pill = pillRefs.current[activeHash];
    if (!rail || !pill) return;
    setThumb({ x: pill.offsetLeft, w: pill.offsetWidth, ready: true });
  }, [activeHash]);

  useLayoutEffect(measureThumb, [measureThumb]);

  useEffect(() => {
    window.addEventListener("resize", measureThumb);
    // Web fonts land after first paint and change pill widths.
    document.fonts?.ready.then(measureThumb).catch(() => {});
    return () => window.removeEventListener("resize", measureThumb);
  }, [measureThumb]);

  /* ── Mobile sheet: lock scroll, close on Escape ──────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const goTo = useCallback((href: string) => {
    const scroll = () =>
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Let the sheet finish closing before the page moves under it.
    if (menuOpen) { setMenuOpen(false); setTimeout(scroll, 320); }
    else scroll();
  }, [menuOpen]);

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled ? "color-mix(in srgb, var(--bg) 78%, transparent)" : "transparent",
            borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
            backdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
            boxShadow: scrolled ? "var(--shadow-xs)" : "none",
          }}
        >
          <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

            {/* Monogram — expands to the full surname on hover */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              aria-label="Back to top"
              className="group relative inline-flex items-center gap-2.5"
            >
              <span
                className="font-display text-lg italic tracking-wide lg:text-xl"
                style={{ color: "var(--gold)", fontWeight: 700 }}
              >
                JDR
              </span>
              <span
                aria-hidden="true"
                className="h-3.5 w-px origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                style={{ background: "var(--gold)" }}
              />
              <span
                aria-hidden="true"
                className="lux-label max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-32 group-hover:opacity-100"
                style={{ color: "var(--subtle)" }}
              >
                Rodado
              </span>
            </a>

            {/* Desktop rail */}
            <nav
              ref={railRef}
              aria-label="Sections"
              className="nav-rail absolute left-1/2 hidden -translate-x-1/2 lg:flex"
            >
              <span
                aria-hidden="true"
                className="nav-rail__thumb"
                style={{
                  transform: `translateX(${thumb.x}px)`,
                  width: thumb.w,
                  opacity: thumb.ready ? 1 : 0,
                }}
              />
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  ref={(el) => { pillRefs.current[link.href] = el; }}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className="nav-pill"
                  data-on={activeHash === link.href ? "true" : undefined}
                  aria-current={activeHash === link.href ? "true" : undefined}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="ml-auto hidden items-center gap-2.5 lg:flex">
              <ThemeToggle />
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost rounded-md px-4 py-2 text-sm"
              >
                Résumé
              </a>
              <Magnetic strength={0.22}>
                <button
                  type="button"
                  onClick={() => goTo("#contact")}
                  className="btn-gold whitespace-nowrap rounded-md px-5 py-2 text-sm"
                >
                  Hire Me
                </button>
              </Magnetic>
            </div>

            {/* Mobile trigger — the two rules cross into an X */}
            <button
              type="button"
              className="ml-auto grid h-10 w-10 place-items-center rounded-md lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{ color: "var(--fg)" }}
            >
              <span className="relative block h-4 w-5">
                <span
                  className="absolute left-0 block h-px w-full transition-all duration-300"
                  style={{
                    background: "currentColor",
                    top: menuOpen ? "50%" : "2px",
                    transform: menuOpen ? "rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="absolute left-0 top-1/2 block h-px w-full transition-all duration-200"
                  style={{ background: "currentColor", opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="absolute left-0 block h-px w-full transition-all duration-300"
                  style={{
                    background: "currentColor",
                    top: menuOpen ? "50%" : "auto",
                    bottom: menuOpen ? "auto" : "2px",
                    transform: menuOpen ? "rotate(-45deg)" : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="nav-sheet lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-24">
              <nav aria-label="Sections" className="flex-1">
                {navLinks.map((link, i) => (
                  <m.button
                    key={link.href}
                    type="button"
                    onClick={() => goTo(link.href)}
                    className="nav-sheet__link"
                    data-on={activeHash === link.href ? "true" : undefined}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Entry staggers; exit does not — AnimatePresence waits for
                    // the slowest child, so a staggered exit makes the sheet
                    // linger on screen after the tap.
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.15, delay: 0 } }}
                    transition={{ duration: 0.45, ease, delay: 0.06 + i * 0.05 }}
                  >
                    <span className="nav-sheet__idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl" style={{ fontWeight: 600 }}>
                      {link.label}
                    </span>
                  </m.button>
                ))}
              </nav>

              <m.div
                className="space-y-4"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.36 }}
              >
                <div className="flex gap-2.5">
                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost flex-1 rounded-md px-4 py-3 text-center text-sm"
                  >
                    Résumé
                  </a>
                  <button
                    type="button"
                    onClick={() => goTo("#contact")}
                    className="btn-gold flex-1 rounded-md px-4 py-3 text-sm"
                  >
                    Hire Me
                  </button>
                </div>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="flex flex-wrap gap-1">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.icon === "mail" ? undefined : "_blank"}
                        rel={link.icon === "mail" ? undefined : "noreferrer"}
                        className="lux-label nav-link"
                        style={{ color: "var(--subtle)", padding: "0.35rem 0.5rem" }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <ThemeToggle />
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
