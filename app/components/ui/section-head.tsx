"use client";

import { m } from "framer-motion";
import { RevealWords, ease } from "@/app/components/ui/reveal";

/**
 * The line that opens a section, like a path in a terminal prompt:
 * "01 / ~/about", with a rule that draws out to the edge.
 */
export function SectionMeta({
  index,
  path,
  end,
  className = "",
}: {
  index: string;
  path: string;
  end?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`smeta ${className}`}>
      <span className="smeta__n">{index}</span>
      <span className="smeta__path">
        <span aria-hidden="true" className="smeta__tilde">~/</span>
        {path}
      </span>
      <m.span
        aria-hidden="true"
        className="smeta__rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease }}
      />
      {end && <span className="smeta__end">{end}</span>}
    </div>
  );
}

/** Meta line, a large title whose words rise in, a lead and an aside. */
export default function SectionHead({
  index,
  path,
  title,
  lead,
  aside,
  end,
}: {
  index: string;
  path: string;
  title: string;
  lead?: string;
  aside?: React.ReactNode;
  end?: React.ReactNode;
}) {
  return (
    <header className="shead">
      <SectionMeta index={index} path={path} end={end} />
      <div className="shead__row">
        <div className="shead__main">
          <h2 className="t-h2 t-balance">
            <RevealWords text={title} />
          </h2>
          {lead && (
            <m.p
              className="shead__lead t-pretty"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
            >
              {lead}
            </m.p>
          )}
        </div>
        {aside && (
          <m.div
            className="shead__aside"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            {aside}
          </m.div>
        )}
      </div>
    </header>
  );
}
