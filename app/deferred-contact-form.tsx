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
    <div aria-hidden="true">
      <div className="mb-8 flex items-center justify-between">
        <div className="skeleton h-3 w-32" />
        <div className="skeleton h-3 w-10" />
      </div>
      <div className="grid gap-7">
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-36 w-full" />
        <div className="flex items-center justify-between">
          <div className="skeleton h-3 w-28" />
          <div className="skeleton h-13 w-44 rounded-full" />
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
