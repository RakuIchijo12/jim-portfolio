"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(() => import("./contact-form"), {
  loading: () => <ContactFormPlaceholder />,
  ssr: false,
});

function ContactFormPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="contact-form-card quirk-card rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-5 shadow-[0_0_20px_#48f5ff24] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80 sm:p-6"
    >
      <div className="grid gap-5">
        <span className="form-skeleton h-5 w-24 rounded-md" />
        <span className="form-skeleton h-12 rounded-md" />
        <span className="form-skeleton h-5 w-24 rounded-md" />
        <span className="form-skeleton h-12 rounded-md" />
        <span className="form-skeleton h-5 w-32 rounded-md" />
        <span className="form-skeleton h-44 rounded-md" />
        <div className="flex justify-end">
          <span className="form-skeleton h-12 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function DeferredContactForm() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const wrapper = wrapperRef.current;

    if (!wrapper || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={wrapperRef}>
      {shouldLoad ? <ContactForm /> : <ContactFormPlaceholder />}
    </div>
  );
}
