"use client";

import type { ProjectLook } from "@/app/lib/project-looks";
import { TransitionLink } from "@/app/components/motion/page-transition";
import { BrowserBar } from "@/app/components/ui/window";
import RollText from "@/app/components/ui/roll-text";
import CountUp from "@/app/components/ui/count-up";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/app/components/ui/icons";

const pad = (n: number) => String(n).padStart(2, "0");

export type Fact = { k: string; n?: number; text?: string };

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/**
 * The case study opens like a repository page, not like the home hero: a
 * path, the name and tagline, the actions, a row of facts, and the lead
 * screen in a browser window across the full width.
 */
export default function Cover({
  id,
  name,
  tagline,
  category,
  plate,
  total,
  link,
  linkLabel,
  look,
  facts,
  lead,
  play,
}: {
  id: string;
  name: string;
  tagline: string;
  category: string;
  plate: number;
  total: number;
  link: string;
  linkLabel: string;
  look: ProjectLook;
  facts: Fact[];
  lead: { src: string; alt: string } | null;
  play: boolean;
}) {
  const live = Boolean(link) && linkLabel !== "GitHub";

  return (
    <section id="cs-cover" className="repo" data-play={play} style={{ "--proj": look.accent } as React.CSSProperties}>
      <div aria-hidden="true" className="repo__bg" />
      <div className="wrap">
        <div className="repo__top in" style={d(0.05)}>
          <TransitionLink href="/#projects" label="Projects" className="repo__back roll-host">
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            <RollText text="All projects" />
          </TransitionLink>
          <span className="repo__plate">
            Project {pad(plate)} of {pad(total)}
          </span>
        </div>

        <div className="repo__grid">
          <div>
            <p className="repo__path in" style={d(0.1)}>
              <span className="repo__dot" aria-hidden="true" />
              projects / <b>{id}</b>
              <span className="repo__badge">{live ? "Live" : "Source"}</span>
              <span className="repo__badge repo__badge--dim">{look.part}</span>
            </p>
            <h1 className="repo__name t-balance in" style={d(0.16)}>
              {name}
            </h1>
            <p className="repo__cat in" style={d(0.22)}>
              {category}
            </p>
            <p className="repo__tagline t-pretty in" style={d(0.28)}>
              {tagline}
            </p>
            <div className="repo__actions in" style={d(0.34)}>
              {link && (
                <a href={link} target="_blank" rel="noreferrer" className="btn btn--primary roll-host">
                  <RollText text={linkLabel} />
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              )}
              <TransitionLink href="/#contact" label="Contact" className="btn btn--ghost roll-host">
                <span aria-hidden="true" className="btn__led" />
                <RollText text="Discuss a project like this" />
              </TransitionLink>
            </div>
          </div>

          <dl className="repo__facts in" style={d(0.3)}>
            {facts.map((fact) => (
              <div key={fact.k} className="repo__fact">
                <dt>{fact.k}</dt>
                <dd>{fact.n !== undefined ? <CountUp value={fact.n} /> : fact.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        {lead && (
          <div className="repo__shot in" style={d(0.4)}>
            <span className="win win--shot">
              <BrowserBar link={link} />
              <span className="repo__screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.src} alt={lead.alt} decoding="async" fetchPriority="high" />
              </span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
