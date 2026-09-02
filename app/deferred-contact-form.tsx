"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(() => import("./contact-form"), {
  loading: () => <ContactFormSkeleton />,
  ssr: false,
});

/** Mirrors the real form's metrics so nothing shifts when it hydrates. */
function ContactFormSkeleton() {
  return (
    <div
      className="p-6 sm:p-8"
      style={{
        borderRadius: "var(--r-md)",
        background: "var(--card)",
        border: "1px solid var(--border-hv)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-10" style={{ background: "var(--gold)" }} />
        <div className="skeleton h-2.5 w-28" />
      </div>

      <div className="grid gap-4">
        <div className="skeleton h-14 w-full" style={{ borderRadius: "var(--r-sm)" }} />
        <div className="skeleton h-14 w-full" style={{ borderRadius: "var(--r-sm)" }} />
        <div className="skeleton h-40 w-full" style={{ borderRadius: "var(--r-sm)" }} />

        <div className="flex items-center justify-between">
          <div className="skeleton h-3 w-28" />
          <div className="skeleton h-12 w-40" style={{ borderRadius: "var(--r-sm)" }} />
        </div>
      </div>
    </div>
  );
}

export default function DeferredContactForm() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) return;
    const el = wrapperRef.current;
    if (!el || !("IntersectionObserver" in window)) { setLoad(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoad(true); observer.disconnect(); } },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [load]);

  return (
    <div ref={wrapperRef}>
      {load ? <ContactForm /> : <ContactFormSkeleton />}
    </div>
  );
}
