"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { contactEmail, contactPhone, socialLinks } from "@/app/lib/data";
import DeferredContactForm from "@/app/deferred-contact-form";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.94 8.98H3.56V20h3.38V8.98ZM7.17 5.58A1.95 1.95 0 1 0 3.28 5.6a1.95 1.95 0 0 0 3.89-.02ZM20.72 13.7c0-3.18-1.7-4.97-4.28-4.97a3.69 3.69 0 0 0-3.33 1.83h-.05V8.98H9.82V20h3.37v-5.45c0-1.44.27-2.84 2.06-2.84 1.76 0 1.78 1.65 1.78 2.93V20h3.38l.31-6.3Z" />
      </svg>
    );
  }
  if (icon === "github") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.69c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.05c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.66-4.55 4.91.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }
  if (icon === "facebook") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.35 8.84V6.98c0-.8.53-.99.91-.99h2.31V2.13L14.39 2.1c-3.53 0-4.33 2.64-4.33 4.33v2.41H7.28v3.98h2.78V23h4.29V12.82h3.58l.16-3.98h-3.74Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ContactDetailIcon({ icon }: { icon: string }) {
  if (icon === "phone") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12.62 19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8 9.72A16 16 0 0 0 14.29 16l1.29-1.29a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }
  if (icon === "location") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 21s7-5.33 7-12A7 7 0 0 0 5 9c0 6.67 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

const contactDetails = [
  { label: "Phone",    value: contactPhone,              icon: "phone",    href: `tel:${contactPhone}`    },
  { label: "Email",    value: contactEmail,              icon: "mail",     href: `mailto:${contactEmail}` },
  { label: "Location", value: "Davao City, Philippines", icon: "location", href: undefined                },
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

        {/* Eyebrow */}
        <m.div
          className="section-eyebrow mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          05 / Contact
        </m.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-14">

          {/* Left — info */}
          <m.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <m.h2
              variants={fadeUp}
              className="font-display mb-5 text-2xl font-700 leading-tight sm:mb-6 sm:text-4xl lg:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Have a project, role, or{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>opportunity</em>{" "}
              in mind?
            </m.h2>

            <m.p
              variants={fadeUp}
              className="mb-6 max-w-md text-base leading-8"
              style={{ color: "var(--muted)" }}
            >
              Share your name, email, and a brief note about what you&apos;re
              looking for. I will read it carefully and respond with a clear next step.
            </m.p>

            {/* Availability strip */}
            <m.div
              variants={fadeUp}
              className="mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2"
              style={{
                background: "var(--gold-light)",
                border: "1px solid rgba(194,168,120,0.3)",
              }}
            >
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
                      className="grid h-10 w-10 shrink-0 place-items-center rounded"
                      style={{
                        background: "var(--gold-light)",
                        border: "1px solid rgba(194,168,120,0.25)",
                        color: "var(--gold)",
                      }}
                    >
                      <ContactDetailIcon icon={detail.icon} />
                    </span>
                    <span className="min-w-0">
                      <span
                        className="lux-label mb-0.5 block"
                        style={{ color: "var(--subtle)" }}
                      >
                        {detail.label}
                      </span>
                      <span
                        className="block break-all text-sm font-600"
                        style={{ color: "var(--fg)", fontWeight: 600 }}
                      >
                        {detail.value}
                      </span>
                    </span>
                  </>
                );

                return detail.href ? (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="lux-card flex items-center gap-4 p-3.5"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={detail.label} className="lux-card flex items-center gap-4 p-3.5">
                    {inner}
                  </div>
                );
              })}
            </m.div>

            {/* Social links */}
            <m.div variants={fadeUp}>
              <div className="mb-4 flex items-center gap-4">
                <p className="lux-label" style={{ color: "var(--subtle)" }}>
                  Find me on
                </p>
                <span aria-hidden="true" className="h-px flex-1" style={{ background: "var(--border-hv)" }} />
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

          {/* Right — form */}
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
