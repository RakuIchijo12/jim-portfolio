"use client";

import { m } from "framer-motion";
import { contactEmail, contactPhone, socialLinks } from "@/app/lib/data";
import DeferredContactForm from "@/app/deferred-contact-form";
import { SectionMeta } from "@/app/components/ui/section-head";
import { ease, Reveal, RevealWords } from "@/app/components/ui/reveal";
import RollText from "@/app/components/ui/roll-text";
import LocalTime from "@/app/components/ui/local-time";
import RotatingBadge from "@/app/components/ui/rotating-badge";
import { ArrowRightIcon } from "@/app/components/ui/icons";
import { PowerSymbol } from "@/app/components/ui/circuit";

export default function ContactSection() {
  return (
    <section id="contact" className="section contact scheme-accent">
      {/* Poster furniture: a giant power symbol switching on behind the type */}
      <m.span
        aria-hidden="true"
        className="contact__power pointer-events-none absolute left-[-5vw] top-[12%] w-[30vw] max-w-110"
        initial={{ x: "-30%", rotate: -60, scale: 0.8 }}
        whileInView={{ x: "0%", rotate: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease }}
      >
        <PowerSymbol />
      </m.span>

      <div className="wrap relative">
        <SectionMeta
          index="05"
          label="Contact"
          end={
            <span className="inline-flex items-center gap-2 text-fg">
              <span aria-hidden="true" className="status-dot" style={{ background: "var(--ink)" }} />
              <span className="hidden sm:inline">Usually replies within 24 hours</span>
              <span className="sm:hidden">Replies in 24h</span>
            </span>
          }
        />

        <div className="contact__grid">
          <div>
            <h2 className="contact__title">
              <RevealWords text="Let's build" className="block" />
              <RevealWords text="something" className="block" delay={0.12} />
              <RevealWords text="that *lasts.*" className="block" delay={0.22} />
            </h2>

            <Reveal className="mt-12" delay={0.2}>
              <p className="t-label mb-3 text-muted">Write to me</p>
              <a href={`mailto:${contactEmail}`} className="contact__mail u-link">
                {contactEmail}
              </a>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="contact__facts">
                <div className="contact__fact">
                  <dt className="t-label">Phone</dt>
                  <dd>
                    <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="u-link">
                      {contactPhone}
                    </a>
                  </dd>
                </div>
                <div className="contact__fact">
                  <dt className="t-label">Based in</dt>
                  <dd>
                    Davao City, Philippines
                    <LocalTime className="t-label mt-1 block font-normal text-muted" prefix="Local time" />
                  </dd>
                </div>
                <div className="contact__fact">
                  <dt className="t-label">Elsewhere</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1">
                    {socialLinks
                      .filter((link) => link.icon !== "mail")
                      .map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="roll-host inline-flex items-center gap-1.5"
                        >
                          <RollText text={link.label} />
                          <ArrowRightIcon className="h-3 w-3 -rotate-45" />
                        </a>
                      ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <m.div
            className="contact__card scheme-paper"
            initial={{ opacity: 0, y: 70, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.3, ease, delay: 0.15 }}
          >
            <m.div
              className="absolute -right-3 -top-12 z-10 w-24 sm:-left-12 sm:right-auto sm:w-28"
              initial={{ scale: 0, rotate: -120 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 120, damping: 13, delay: 0.7 }}
            >
              <RotatingBadge
                text={"Say hello ✦ Say hello ✦ Say hello ✦ "}
                href={`mailto:${contactEmail}`}
                label={`Email ${contactEmail}`}
              >
                <ArrowRightIcon className="h-4 w-4 -rotate-45" />
              </RotatingBadge>
            </m.div>
            <DeferredContactForm />
          </m.div>
        </div>
      </div>
    </section>
  );
}
