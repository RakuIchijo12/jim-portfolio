"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(() => import("./contact-form"), {
  loading: () => <ContactFormSkeleton />,
  ssr: false,
});

function ContactFormSkeleton() {
  return (
    <div
      className="rounded-sm p-6 sm:p-8"
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border-hv)",
      }}
    >
      <div className="h-px w-12 mb-6 skeleton" />
      <div className="grid gap-5">
        <div className="grid gap-2">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-12 w-full rounded" />
        </div>
        <div className="grid gap-2">
          <div className="skeleton h-3 w-28 rounded" />
          <div className="skeleton h-12 w-full rounded" />
        </div>
        <div className="grid gap-2">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-40 w-full rounded" />
        </div>
        <div className="flex justify-end">
          <div className="skeleton h-12 w-36 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function DeferredContactForm() {
  const wrapperRef  = useRef<HTMLDivElement | null>(null);
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
