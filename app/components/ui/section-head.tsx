"use client";

import { m } from "framer-motion";
import { RevealWords, ease } from "@/app/components/ui/reveal";

/** "(02)  Toolbox  ------------  +" : numbered like the folios of a printed book. */
export function SectionMeta({
  index,
  label,
  end,
  className = "",
}: {
  index: string;
  label: string;
  end?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`shead__meta t-label ${className}`}>
      <span className="shead__idx">({index})</span>
      <span>{label}</span>
      <m.span
        aria-hidden="true"
        className="shead__rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.4, ease }}
      />
      {end ?? <span aria-hidden="true" className="reg" />}
    </div>
  );
}

/**
 * The shared masthead for each section: folio line, a display heading whose
 * words rise into view (asterisks mark the italic emphasis), an optional
 * lead, and an optional slot on the right for counters.
 */
export default function SectionHead({
  index,
  label,
  title,
  lead,
  aside,
  className = "",
}: {
  index: string;
  label: string;
  title: string;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`shead ${className}`}>
      <SectionMeta index={index} label={label} />

      <div className="shead__row">
        <h2 className="t-h2 t-balance max-w-[17ch]">
          <RevealWords text={title} />
        </h2>
        {aside && (
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
          >
            {aside}
          </m.div>
        )}
      </div>

      {lead && (
        <m.p
          className="t-lead shead__lead t-pretty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          {lead}
        </m.p>
      )}
    </div>
  );
}
