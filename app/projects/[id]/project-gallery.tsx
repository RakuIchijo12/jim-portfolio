"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ImageItem {
  src: string;
  alt: string;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 3h6v6M9 21H3v-6m18-12-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

export default function ProjectGallery({ images }: { images: readonly ImageItem[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [imgVisible,  setImgVisible]  = useState(true);
  const [lightbox,    setLightbox]    = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageCount = images.length;

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => {
      setActiveImage((p) => (p + dir + imageCount) % imageCount);
      setImgVisible(true);
    }, 180);
  }, [imageCount]);

  const goToImage = useCallback((idx: number) => {
    if (idx === activeImage) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setImgVisible(false);
    timerRef.current = setTimeout(() => { setActiveImage(idx); setImgVisible(true); }, 180);
  }, [activeImage]);

  const goPrev = useCallback(() => navigate(-1), [navigate]);
  const goNext = useCallback(() => navigate(1),  [navigate]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape")      { setLightbox(false); return; }
      if (e.key === "ArrowLeft")   goPrev();
      if (e.key === "ArrowRight")  goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main image */}
        <div
          className="group relative overflow-hidden rounded"
          style={{
            background: "var(--surface-alt)",
            border: "1px solid var(--border-hv)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={images[activeImage].alt}
            src={images[activeImage].src}
            className="w-full object-contain transition-opacity"
            style={{
              aspectRatio: "16/9",
              opacity: imgVisible ? 1 : 0,
              transitionDuration: imgVisible ? "280ms" : "140ms",
            }}
            decoding="async"
          />

          {/* Expand */}
          <button
            aria-label="View full size"
            className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded opacity-0 transition-all duration-200 group-hover:opacity-100"
            style={{
              background: "rgba(15,23,42,0.78)",
              border: "1px solid rgba(194,168,120,0.4)",
              color: "var(--gold)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setLightbox(true)}
            type="button"
          >
            <ExpandIcon />
          </button>

          {/* Nav arrows */}
          {imageCount > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute inset-y-0 left-0 z-10 flex w-14 cursor-pointer items-center justify-center text-white opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55), transparent)" }}
                onClick={goPrev}
                type="button"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                aria-label="Next image"
                className="absolute inset-y-0 right-0 z-10 flex w-14 cursor-pointer items-center justify-center text-white opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
                style={{ background: "linear-gradient(to left, rgba(0,0,0,0.55), transparent)" }}
                onClick={goNext}
                type="button"
              >
                <ChevronIcon direction="right" />
              </button>
              <div
                aria-live="polite"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[0.58rem] font-bold tracking-widest"
                style={{
                  background: "rgba(15,23,42,0.78)",
                  border: "1px solid rgba(194,168,120,0.28)",
                  color: "var(--gold)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {activeImage + 1} / {imageCount}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {imageCount > 1 && (
          <div className="flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <button
                key={img.src}
                aria-label={`Show image ${idx + 1}`}
                aria-current={activeImage === idx}
                className="overflow-hidden rounded transition-all duration-200"
                style={{
                  border: activeImage === idx ? "2px solid var(--gold)" : "2px solid var(--border-hv)",
                  opacity: activeImage === idx ? 1 : 0.42,
                  boxShadow: activeImage === idx ? "0 0 14px rgba(194,168,120,0.32)" : "none",
                }}
                onClick={() => goToImage(idx)}
                type="button"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={img.alt}
                  src={img.src}
                  className="block object-cover"
                  style={{ width: "5rem", height: "3.5rem" }}
                  decoding="async"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Caption */}
        <p className="text-[0.65rem] leading-relaxed" style={{ color: "var(--subtle)", fontStyle: "italic" }}>
          {images[activeImage].alt}
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size image"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(10px)" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            onClick={() => setLightbox(false)}
          />
          <button
            aria-label="Close fullscreen"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded transition-all duration-200"
            style={{ border: "1px solid rgba(194,168,120,0.4)", color: "var(--gold)", background: "rgba(15,23,42,0.8)" }}
            onClick={() => setLightbox(false)}
            type="button"
          >
            <CloseIcon />
          </button>
          <div className="relative z-10 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={images[activeImage].alt}
              src={images[activeImage].src}
              className="max-h-[88vh] max-w-[90vw] rounded object-contain shadow-2xl transition-opacity"
              style={{ opacity: imgVisible ? 1 : 0 }}
              decoding="async"
            />
          </div>
          {imageCount > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded transition-all duration-200"
                style={{ border: "1px solid rgba(194,168,120,0.3)", color: "var(--gold)", background: "rgba(15,23,42,0.7)" }}
                onClick={goPrev}
                type="button"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded transition-all duration-200"
                style={{ border: "1px solid rgba(194,168,120,0.3)", color: "var(--gold)", background: "rgba(15,23,42,0.7)" }}
                onClick={goNext}
                type="button"
              >
                <ChevronIcon direction="right" />
              </button>
              <div
                aria-live="polite"
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm font-bold"
                style={{ background: "rgba(15,23,42,0.8)", color: "var(--gold)", border: "1px solid rgba(194,168,120,0.3)", backdropFilter: "blur(4px)" }}
              >
                {activeImage + 1} / {imageCount}
              </div>
            </>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
