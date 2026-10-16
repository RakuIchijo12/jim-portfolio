"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import type { ProjectLook } from "@/app/lib/project-looks";
import { ease } from "@/app/components/ui/reveal";
import { useLenis } from "@/app/components/motion/smooth-scroll";
import { ChevronIcon } from "@/app/components/ui/icons";

type Shot = { src: string; alt: string };

const sweep = [0.76, 0, 0.24, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
/** How many screens are pulled out as large prints. */
const FEATURED = 3;

/** "Obsentry: Admin Dashboard" -> "Admin Dashboard". */
export function screenLabel(alt: string) {
  return alt.replace(/^[^:]*:\s*/, "");
}

/* ── Large prints that pile up as you scroll ──────────────────────────── */

const Print = forwardRef<
  HTMLDivElement,
  { shot: Shot; i: number; depth: number; total: number; onOpen: (i: number) => void }
>(function Print({ shot, i, depth, total, onOpen }, ref) {
  // How many prints lie on top of this one. The step back and the dimming
  // are CSS transitions on transform and opacity, so they run on the
  // compositor and nothing is recalculated per scroll frame.
  const vars = { "--i": i, "--depth": depth } as React.CSSProperties;

  return (
    <div ref={ref} className="prints__slot" style={vars}>
      <figure className="print prints__print">
        <button
          type="button"
          className="print__img"
          data-cursor="Zoom"
          aria-label={`View ${screenLabel(shot.alt)} full size`}
          onClick={() => onOpen(i)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
        </button>
        <figcaption className="print__cap t-label">
          <span>
            Fig. {pad(i + 1)} / {screenLabel(shot.alt)}
          </span>
          <span>
            {pad(i + 1)}/{pad(total)}
          </span>
        </figcaption>
        <span aria-hidden="true" className="print__shade" />
      </figure>
    </div>
  );
});

function Prints({ shots, total, onOpen }: { shots: readonly Shot[]; total: number; onOpen: (i: number) => void }) {
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  // A print has "landed" once its top passes the middle of the screen.
  const [landed, setLanded] = useState<boolean[]>(() => shots.map(() => false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setLanded((prev) => {
          let next = prev;
          for (const entry of entries) {
            const i = slots.current.indexOf(entry.target as HTMLDivElement);
            if (i < 0) continue;
            // Still true after the pile scrolls away above, so nothing pops.
            const value = entry.boundingClientRect.top < window.innerHeight * 0.5;
            if (next[i] !== value) {
              if (next === prev) next = [...prev];
              next[i] = value;
            }
          }
          return next;
        });
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    slots.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="prints">
      {shots.map((shot, i) => (
        <Print
          key={shot.src}
          ref={(el) => {
            slots.current[i] = el;
          }}
          shot={shot}
          i={i}
          depth={landed.slice(i + 1).filter(Boolean).length}
          total={total}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

/* ── Contact sheet: every frame, the featured ones ringed in grease pencil ─ */

function ContactSheet({
  shots,
  look,
  onOpen,
}: {
  shots: readonly Shot[];
  look: ProjectLook;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="sheet">
      <div className="sheet__head t-label">
        <span>Contact sheet</span>
        <span aria-hidden="true" className="sheet__rule" />
        <span>
          {pad(shots.length)} frames / {pad(Math.min(FEATURED, shots.length))} selects
        </span>
      </div>
      <m.ul
        className="sheet__grid"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }}
      >
        {shots.map((shot, i) => (
          <m.li
            key={shot.src}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
          >
            <button
              type="button"
              className="sheet__frame"
              data-cursor="Zoom"
              aria-label={`View ${screenLabel(shot.alt)} full size`}
              onClick={() => onOpen(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span className="sheet__n t-label">{pad(i + 1)}</span>
              {i < FEATURED && (
                <svg className="sheet__ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <m.path
                    d="M 10 52 C 6 20, 88 6, 95 44 C 100 78, 30 97, 8 66 C 3 56, 9 40, 24 30"
                    fill="none"
                    stroke="var(--brand-terra)"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.9, ease, delay: 0.3 + i * 0.15 }}
                  />
                </svg>
              )}
            </button>
            <p className="sheet__label t-label">
              {screenLabel(shot.alt)}
              {i < FEATURED && <span className="sheet__select" style={{ background: look.color }} />}
            </p>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

/* ── Full-size viewer ──────────────────────────────────────────────────── */

const slide = {
  enter: (d: number) => ({ x: d > 0 ? "6%" : "-6%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-6%" : "6%", opacity: 0 }),
};

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

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
      transition={{ duration: 0.35, ease: sweep }}
      data-lenis-prevent
    >
      <div aria-hidden="true" className="absolute inset-0" onClick={onClose} />

      <button type="button" aria-label="Close full size" className="lightbox__btn right-4 top-4" onClick={onClose}>
        <CloseIcon />
      </button>

      <div className="relative z-10 p-4">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <m.img
            key={shot.src}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { duration: 0.7, ease }, opacity: { duration: 0.4 } }}
            src={shot.src}
            alt={shot.alt}
            className="max-h-[84vh] max-w-[90vw] object-contain shadow-2xl"
            decoding="async"
          />
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button type="button" aria-label="Previous screen" className="lightbox__btn left-4 top-1/2 -translate-y-1/2" onClick={() => onStep(-1)}>
            <ChevronIcon dir="left" className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Next screen" className="lightbox__btn right-4 top-1/2 -translate-y-1/2" onClick={() => onStep(1)}>
            <ChevronIcon dir="right" className="h-5 w-5" />
          </button>
        </>
      )}
      <p aria-live="polite" className="lightbox__caption t-label">
        Fig. {pad(index + 1)} / {screenLabel(shot.alt)}
      </p>
    </m.div>,
    document.body,
  );
}

/* ── Private project: one artwork print, no screenshots ───────────────── */

function PrivatePrint({ cover, category, look }: { cover: string | null; category: string; look: ProjectLook }) {
  return (
    <m.figure
      className="print private-print"
      style={{ rotate: -1.2 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease }}
    >
      <span className="print__img private-print__img">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        )}
        {/* A paper sticker on the print, like a label on a confidential file. */}
        <span className="private-print__sticker">
          <span aria-hidden="true" className="flex items-end gap-1.5">
            <span className="sh sh-half w-8" style={{ background: look.color }} />
            <span className="sh h-5 w-5" style={{ background: "#C99A3E" }} />
            <span className="sh sh-tri h-6 w-6" style={{ background: "#BB613F" }} />
          </span>
          <span className="t-label">Under NDA / no public screens</span>
        </span>
      </span>
      <figcaption className="print__cap t-label">
        <span>Fig. 01 / {category}</span>
        <span>Cover artwork</span>
      </figcaption>
    </m.figure>
  );
}

/**
 * The screens chapter. Up to three screens become large prints that stack
 * as you scroll, every screen appears on the contact sheet, and any of them
 * opens full size. A private project shows one artwork print instead.
 */
export default function Screens({
  shots,
  look,
  cover,
  category,
}: {
  shots: readonly Shot[];
  look: ProjectLook;
  cover: string | null;
  category: string;
}) {
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
  const openAt = useCallback((i: number) => {
    setDir(1);
    setOpen(i);
  }, []);

  if (count === 0) return <PrivatePrint cover={cover} category={category} look={look} />;

  return (
    <>
      <Prints shots={shots.slice(0, FEATURED)} total={count} onOpen={openAt} />
      {count > 1 && <ContactSheet shots={shots} look={look} onOpen={openAt} />}
      {open !== null && <Lightbox shots={shots} index={open} dir={dir} onClose={close} onStep={step} />}
    </>
  );
}
