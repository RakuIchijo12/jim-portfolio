"use client";

import { m } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The shared masthead for every section: numbered eyebrow, display heading,
 * optional lead, and an optional right-hand slot for counters or controls.
 * Keeping it in one place is what makes the sections feel like one document.
 */
export default function SectionHead({
  eyebrow,
  heading,
  lead,
  aside,
  className = "mb-10 sm:mb-14",
}: {
  eyebrow: string;
  heading: React.ReactNode;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
  /** Replaces the default bottom margin entirely. */
  className?: string;
}) {
  return (
    <div className={className}>
      <m.div
        className="section-eyebrow mb-6"
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease }}
      >
        {eyebrow}
      </m.div>

      <div
        className={
          aside
            ? "grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
            : undefined
        }
      >
        <div>
          <m.h2
            className="font-display t-h2 t-balance max-w-4xl"
            style={{ fontWeight: 700 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease, delay: 0.08 }}
          >
            {heading}
          </m.h2>

          {lead && (
            <m.p
              className="t-pretty mt-5 max-w-lg text-sm leading-7"
              style={{ color: "var(--muted)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease, delay: 0.2 }}
            >
              {lead}
            </m.p>
          )}
        </div>

        {aside && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease, delay: 0.28 }}
          >
            {aside}
          </m.div>
        )}
      </div>
    </div>
  );
}
