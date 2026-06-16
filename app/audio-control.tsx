"use client";

import dynamic from "next/dynamic";

const AmbientAudio = dynamic(() => import("./ambient-audio"), {
  loading: () => (
    <div aria-hidden="true" className="audio-control flex items-center gap-1">
      <button
        className="quirk-icon-button audio-toggle grid h-11 w-11 cursor-wait place-items-center rounded-md border-2 border-transparent text-[#eaf6ff]/60 transition dark:text-zinc-50/60"
        disabled
        tabIndex={-1}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="m18 9 4 4" />
          <path d="m22 9-4 4" />
        </svg>
      </button>
      <span className="h-11 w-16 sm:w-20" />
    </div>
  ),
  ssr: false,
});

export default function AudioControl() {
  return <AmbientAudio />;
}
