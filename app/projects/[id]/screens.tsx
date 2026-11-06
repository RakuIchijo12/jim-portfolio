"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { ease } from "@/app/components/ui/reveal";
import { useLenis } from "@/app/components/motion/smooth-scroll";
import { ChevronIcon, CloseIcon } from "@/app/components/ui/icons";

type Shot = { src: string; alt: string };

const sweep = [0.76, 0, 0.24, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** "Obsentry: Admin Dashboard" -> "Admin Dashboard". */
export function screenLabel(alt: string) {
  return alt.replace(/^[^:]*:\s*/, "");
}

/** "/projects/obsentry/login.webp" -> "login.webp", like a file in the repo. */
const fileName = (src: string) => src.split("/").pop() ?? src;

/* ── Full-size viewer ──────────────────────────────────────────────────── */

const slide = {
  enter: (d: number) => ({ x: d > 0 ? "5%" : "-5%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-5%" : "5%", opacity: 0 }),
};

function Lightbox({
  shots,
  index,
  dir,
  onClose,
  onStep,
}: {
  shots: readonly Shot[];
  index: number;
  dir: number;
  onClose: () => void;
  onStep: (d: 1 | -1) => void;
}) {
  const lenis = useLenis();
  const shot = shots[index];
  const count = shots.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onStep(-1);
      else if (event.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = previous;
    };
  }, [lenis, onClose, onStep]);

  return createPortal(
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label="Full-size screen"
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: sweep }}
      data-lenis-prevent
    >
      <div aria-hidden="true" className="absolute inset-0" onClick={onClose} />

      <div className="lightbox__bar">
        <span className="lightbox__file">{fileName(shot.src)}</span>
        <span className="lightbox__count">
          {pad(index + 1)} / {pad(count)}
        </span>
        <button type="button" aria-label="Close full size" className="lightbox__btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="relative z-10 p-4">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <m.img
            key={shot.src}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { duration: 0.55, ease }, opacity: { duration: 0.3 } }}
            src={shot.src}
            alt={shot.alt}
            className="lightbox__img"
            decoding="async"
          />
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button type="button" aria-label="Previous screen" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={() => onStep(-1)}>
            <ChevronIcon dir="left" className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Next screen" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={() => onStep(1)}>
            <ChevronIcon dir="right" className="h-5 w-5" />
          </button>
        </>
      )}
      <p aria-live="polite" className="lightbox__caption">
        Fig. {pad(index + 1)} / {screenLabel(shot.alt)}
      </p>
    </m.div>,
    document.body,
  );
}

/**
 * The screens chapter: every screen as a window in a grid, the first one
 * full width, and any of them opens full size with the arrow keys to step.
 */
export default function Screens({ shots }: { shots: readonly Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const count = shots.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setOpen((i) => (i === null ? i : (i + d + count) % count));
    },
    [count],
  );

  if (count === 0) {
    return <p className="doc__p">This is a private client system, so no public screens are shown.</p>;
  }

  return (
    <>
      <m.ul
        className="shots"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }}
      >
        {shots.map((shot, i) => (
          <m.li
            key={shot.src}
            className="shots__item"
            variants={{
              hidden: { opacity: 0, y: 20 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
          >
            <button
              type="button"
              className="shot"
              data-cursor="Zoom"
              aria-label={`View ${screenLabel(shot.alt)} full size`}
              onClick={() => {
                setDir(1);
                setOpen(i);
              }}
            >
              <span className="shot__bar" aria-hidden="true">
                <span className="win__lights">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="shot__file">{fileName(shot.src)}</span>
              </span>
              <span className="shot__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              </span>
            </button>
            <p className="shot__cap">
              <span className="shot__n">Fig. {pad(i + 1)}</span> {screenLabel(shot.alt)}
            </p>
          </m.li>
        ))}
      </m.ul>
      {open !== null && <Lightbox shots={shots} index={open} dir={dir} onClose={close} onStep={step} />}
    </>
  );
}
