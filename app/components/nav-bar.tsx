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
    const el = document.querySelector(href);
    if (!el) return;
    // Skip the section's own top padding so the first visible content
    // (eyebrow/heading) lands 30px below the 64px navbar.
    const paddingTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
    const targetFromTop = 94; // 64px navbar + 30px gap
    const top = el.getBoundingClientRect().top + window.scrollY - targetFromTop + paddingTop;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
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
          <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">

            {/* Logo — left */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="font-display text-xl font-700 italic tracking-wide justify-self-start"
              style={{ color: "var(--gold)", fontWeight: 700 }}
            >
              JDR
            </a>

            {/* Desktop nav — truly centered */}
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => smoothScroll(link.href)}
                  className="nav-link text-sm font-medium tracking-wide transition-colors"
                  style={{
                    color: activeHash === link.href ? "var(--gold)" : "var(--muted)",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTAs — right */}
            <div className="hidden items-center gap-3 justify-self-end md:flex">
              <ThemeToggle />
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost rounded px-4 py-2 text-sm"
              >
                Résumé
              </a>
              <button
                onClick={() => smoothScroll("#contact")}
                className="btn-gold rounded px-5 py-2 text-sm"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="col-start-3 flex h-10 w-10 flex-col items-center justify-center gap-1.5 justify-self-end rounded md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className="block h-px w-5 origin-center transition-all duration-300"
                style={{
                  background: "var(--fg)",
                  transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
                }}
              />
              <span
                className="block h-px w-5 transition-all duration-300"
                style={{
                  background: "var(--fg)",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-px w-5 origin-center transition-all duration-300"
                style={{
                  background: "var(--fg)",
                  transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <motion.div
          initial={false}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden border-b md:hidden"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            backdropFilter: "blur(20px)",
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
            <div className="mt-2 flex gap-2">
              <ThemeToggle />
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
