"use client";

import { navLinks, resumeHref, socialLinks } from "@/app/lib/data";
import CurrentYear from "@/app/current-year";
import RollText from "@/app/components/ui/roll-text";
import LocalTime from "@/app/components/ui/local-time";
import { LogoMark } from "@/app/components/ui/glyphs";
import { scrollToTarget } from "@/app/components/motion/smooth-scroll";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { ArrowUpIcon, ArrowUpRightIcon, BranchIcon, CheckIcon } from "@/app/components/ui/icons";

const sections = navLinks.filter((link) => link.href !== "#home");

/**
 * Links, a large wordmark, and an editor status bar along the very bottom:
 * branch, problems, the stack this site is built on and the local time.
 */
export default function SiteFooter() {
  return (
    <footer className="footer defer-render">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <LogoMark className="footer__mark" />
            <p className="footer__pitch t-balance">
              Have something worth <span className="t-em">building?</span>
            </p>
            {/* Into the home page: they scroll there, and from a case
                study they play the panel first. */}
            <TransitionLink href="/#contact" label="Contact" className="btn btn--primary roll-host">
              <span aria-hidden="true" className="btn__led" />
              <RollText text="Start a conversation" />
            </TransitionLink>
          </div>

          <nav aria-label="Footer" className="footer__col">
            <p className="footer__k">Index</p>
            <ul>
              {sections.map((link, i) => (
                <li key={link.href}>
                  <TransitionLink href={`/${link.href}`} label={link.label} className="footer__link roll-host">
                    <span className="footer__n">{String(i + 1).padStart(2, "0")}</span>
                    <RollText text={link.label} />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__k">Elsewhere</p>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={link.icon === "mail" ? undefined : "noreferrer"}
                    className="footer__link roll-host"
                  >
                    <RollText text={link.label} />
                    <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              ))}
              <li>
                <a href={resumeHref} target="_blank" rel="noreferrer" className="footer__link roll-host">
                  <RollText text="Résumé" />
                  <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="statusbar">
        <div className="wrap statusbar__in">
          <span className="statusbar__item statusbar__item--accent">
            <BranchIcon className="h-3.5 w-3.5" /> main
          </span>
          <span className="statusbar__item">
            <CheckIcon className="h-3.5 w-3.5" /> 0 problems
          </span>
          <span className="statusbar__item hidden md:inline-flex">Next.js / TypeScript / Framer Motion</span>
          <span className="statusbar__item hidden sm:inline-flex">
            <LocalTime prefix="Davao" />
          </span>
          <span className="statusbar__item statusbar__push">
            &copy; <CurrentYear /> Jimuel Dave Rodado
          </span>
          <button type="button" onClick={() => scrollToTarget(0)} className="statusbar__item statusbar__top">
            <ArrowUpIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to top</span>
            <span className="sr-only sm:hidden">Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
