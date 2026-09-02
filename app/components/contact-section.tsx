"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { contactEmail, contactPhone, socialLinks } from "@/app/lib/data";
import DeferredContactForm from "@/app/deferred-contact-form";
import SectionHead from "@/app/components/ui/section-head";
import SpotlightCard from "@/app/components/ui/spotlight";
import { LocationIcon, MailIcon, PhoneIcon, SocialIcon } from "@/app/components/ui/icons";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function DetailIcon({ icon }: { icon: string }) {
  if (icon === "phone")    return <PhoneIcon />;
  if (icon === "location") return <LocationIcon />;
  return <MailIcon />;
}

const contactDetails = [
  { label: "Phone",    value: contactPhone,              icon: "phone",    href: `tel:${contactPhone.replace(/\s/g, "")}` },
  { label: "Email",    value: contactEmail,              icon: "mail",     href: `mailto:${contactEmail}`                 },
  { label: "Location", value: "Davao City, Philippines", icon: "location", href: undefined                                },
] as const;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHead
          eyebrow="05 / Contact"
          heading={
            <>
              Have a project, role, or <em className="t-em">opportunity</em> in mind?
            </>
          }
          className="mb-10 sm:mb-14"
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-14">

          {/* ── Left: the human side ── */}
          <m.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <m.p
              variants={fadeUp}
              className="t-pretty mb-6 max-w-md text-base leading-8"
              style={{ color: "var(--muted)" }}
            >
              Share your name, email, and a brief note about what you&apos;re
              looking for. I will read it carefully and respond with a clear next step.
            </m.p>

            <m.div variants={fadeUp} className="status-pill mb-8">
              <span aria-hidden="true" className="live-dot" />
              <span className="lux-label" style={{ color: "var(--fg)" }}>
                Usually replies within 24 hours
              </span>
            </m.div>

            {/* Contact details */}
            <m.div variants={fadeUp} className="mb-10 space-y-3">
              {contactDetails.map((detail) => {
                const inner = (
                  <>
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-md transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: "var(--gold-light)",
                        border: "1px solid var(--gold-line)",
                        color: "var(--gold)",
                      }}
                    >
                      <DetailIcon icon={detail.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="lux-label mb-0.5 block" style={{ color: "var(--subtle)" }}>
                        {detail.label}
                      </span>
                      <span
                        className="block break-all text-sm"
                        style={{ color: "var(--fg)", fontWeight: 600 }}
                      >
                        {detail.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <SpotlightCard key={detail.label} className="lux-card">
                    {detail.href ? (
                      <a href={detail.href} className="group flex items-center gap-4 p-3.5">
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 p-3.5">{inner}</div>
                    )}
                  </SpotlightCard>
                );
              })}
            </m.div>

            {/* Social links */}
            <m.div variants={fadeUp}>
              <div className="mb-4 flex items-center gap-4">
                <p className="lux-label" style={{ color: "var(--subtle)" }}>
                  Find me on
                </p>
                <span aria-hidden="true" className="rule-soft flex-1" />
              </div>
              <div className="flex gap-2.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={link.icon === "mail" ? undefined : "noreferrer"}
                    aria-label={link.label}
                    title={link.label}
                    className="icon-btn h-10 w-10"
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </m.div>
          </m.div>

          {/* ── Right: form ── */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <DeferredContactForm />
          </m.div>
        </div>
      </div>
    </section>
  );
}
