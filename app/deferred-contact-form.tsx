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
    <div aria-hidden="true" className="win api">
      <div className="win__bar">
        <span className="win__lights">
          <i />
          <i />
          <i />
        </span>
        <span className="skeleton h-3 w-36" />
      </div>
      <div className="win__body grid gap-5">
        <div className="skeleton h-4 w-48" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-36 w-full" />
        <div className="flex items-center justify-between">
          <div className="skeleton h-3 w-28" />
          <div className="skeleton h-11 w-44" />
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
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [load]);

  return <div ref={wrapperRef}>{load ? <ContactForm /> : <ContactFormSkeleton />}</div>;
}
