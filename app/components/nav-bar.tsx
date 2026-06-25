"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { navLinks, resumeHref } from "@/app/lib/data";
import ThemeToggle from "@/app/theme-toggle";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NavBar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeHash,  setActiveHash]  = useState("#home");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (window.scrollY < 80) setActiveHash("#home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const map = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          map.set(e.target.id, e.intersectionRatio);
        });
        const best = [...map.entries()].sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) setActiveHash(`#${best[0]}`);
      },
      { threshold: 0.3 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function smoothScroll(href: string) {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  }

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* ── Main nav ── */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? "var(--surface)"
              : "transparent",
            borderBottom: scrolled
              ? "1px solid var(--border)"
              : "1px solid transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
          }}
        >
          <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

            {/* Logo — left */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="font-display text-lg font-700 italic tracking-wide lg:text-xl"
              style={{ color: "var(--gold)", fontWeight: 700 }}
            >
              JDR
            </a>

            {/* Desktop nav — truly centered */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 xl:flex xl:gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => smoothScroll(link.href)}
                  className="nav-link text-xs font-medium tracking-wide transition-colors lg:text-sm"
                  style={{
                    color: activeHash === link.href ? "var(--gold)" : "var(--muted)",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTAs — right */}
            <div className="ml-auto hidden items-center gap-2 xl:flex xl:gap-3">
              <ThemeToggle />
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost rounded px-3 py-2 text-sm lg:px-4"
              >
                Résumé
              </a>
              <button
                onClick={() => smoothScroll("#contact")}
                className="btn-gold whitespace-nowrap rounded px-4 py-2 text-sm lg:px-5"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="ml-auto grid h-10 w-10 place-items-center rounded transition-colors duration-200 xl:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ color: "var(--fg)" }}
            >
              {menuOpen ? (
                <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <motion.div
          initial={false}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden border-b xl:hidden"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            backdropFilter: "blur(20px)",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => smoothScroll(link.href)}
                className="rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors"
                style={{
                  color: activeHash === link.href ? "var(--gold)" : "var(--fg)",
                  background: activeHash === link.href ? "var(--gold-light)" : "transparent",
                }}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 flex items-stretch gap-2">
              <ThemeToggle className="h-full" />
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost flex-1 rounded px-4 py-2.5 text-center text-sm"
              >
                Résumé
              </a>
              <button
                onClick={() => smoothScroll("#contact")}
                className="btn-gold flex-1 rounded px-4 py-2.5 text-sm"
              >
                Hire Me
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}
