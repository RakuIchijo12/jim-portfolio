"use client";

import { useState } from "react";
import { contactEmail, contactPhone, socialLinks } from "@/app/lib/data";
import DeferredContactForm from "@/app/deferred-contact-form";
import { SectionMeta } from "@/app/components/ui/section-head";
import { Reveal, RevealWords } from "@/app/components/ui/reveal";
import RollText from "@/app/components/ui/roll-text";
import LocalTime from "@/app/components/ui/local-time";
import { ArrowUpRightIcon, CheckIcon, CopyIcon, SocialIcon } from "@/app/components/ui/icons";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={copied ? "Email copied" : "Copy email address"}
      onClick={() => {
        navigator.clipboard?.writeText(contactEmail).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        });
      }}
    >
      {copied ? <CheckIcon className="h-4 w-4 text-accent" /> : <CopyIcon className="h-4 w-4" />}
    </button>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section contact defer-render">
      <div aria-hidden="true" className="contact__bg" />
      <div className="wrap relative">
        <SectionMeta
          index="05"
          path="contact"
          end={
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="pulse-dot" />
              <span className="hidden sm:inline">Usually replies within 24 hours</span>
              <span className="sm:hidden">Replies in 24h</span>
            </span>
          }
        />

        <div className="contact__grid">
          <div>
            <h2 className="contact__title t-balance">
              <RevealWords text="Let's build something that *lasts.*" />
            </h2>
            <Reveal delay={0.1}>
              <p className="contact__lead t-pretty">
                Hiring for a role, planning a system, or keeping an old one alive? Send a request and I
                will answer with a clear next step.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="contact__mail">
                <span className="contact__k">Email</span>
                <div className="contact__mailrow">
                  <a href={`mailto:${contactEmail}`} className="contact__addr u-link">
                    {contactEmail}
                  </a>
                  <CopyEmail />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="contact__facts">
                <div className="contact__fact">
                  <dt className="contact__k">Phone</dt>
                  <dd>
                    <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="u-link">
                      {contactPhone}
                    </a>
                  </dd>
                </div>
                <div className="contact__fact">
                  <dt className="contact__k">Based in</dt>
                  <dd>
                    Davao City, Philippines
                    <LocalTime className="contact__time" prefix="Local time" />
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.25}>
              <ul className="contact__socials">
                {socialLinks
                  .filter((link) => link.icon !== "mail")
                  .map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noreferrer" className="social roll-host">
                        <SocialIcon icon={link.icon} className="h-4 w-4" />
                        <RollText text={link.label} />
                        <ArrowUpRightIcon className="social__arrow h-3 w-3" />
                      </a>
                    </li>
                  ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={30}>
            <DeferredContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
