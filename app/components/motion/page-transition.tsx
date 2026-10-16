"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { m } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { scrollToTarget } from "./smooth-scroll";

type Phase = "idle" | "cover" | "reveal";

const sweep = [0.76, 0, 0.24, 1] as const;
const COLS = [0, 1, 2, 3, 4];

const NavigateContext = createContext<(href: string, label?: string) => void>(() => {});

export const usePageTransition = () => useContext(NavigateContext);

/**
 * Route changes play behind a curtain: five columns rise to cover the page,
 * the route changes underneath, and the columns lift away once the new page
 * has rendered. Same-page hash links just scroll.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const target = useRef<string | null>(null);
  const origin = useRef(pathname);

  const navigate = useCallback(
    (href: string, nextLabel = "") => {
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) {
        if (url.hash) scrollToTarget(url.hash);
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      target.current = href;
      origin.current = window.location.pathname;
      setLabel(nextLabel);
      setPhase("cover");
    },
    [router],
  );

  // The new route has rendered: lift the curtain on the next frame.
  useEffect(() => {
    if (phase !== "cover" || pathname === origin.current) return;
    const id = requestAnimationFrame(() => setPhase("reveal"));
    return () => cancelAnimationFrame(id);
  }, [pathname, phase]);

  // Never leave the curtain down if a navigation stalls.
  useEffect(() => {
    if (phase !== "cover") return;
    const id = window.setTimeout(() => setPhase("reveal"), 5000);
    return () => window.clearTimeout(id);
  }, [phase]);

  const onCovered = useCallback(() => {
    if (target.current) router.push(target.current);
  }, [router]);

  const onRevealed = useCallback(() => setPhase("idle"), []);

  const covering = phase === "cover";
  const revealing = phase === "reveal";

  return (
    <NavigateContext.Provider value={navigate}>
      {children}

      <div className="curtain" data-active={phase !== "idle"} aria-hidden="true">
        <div className="curtain__cols">
          {COLS.map((i) => {
            const last = i === COLS.length - 1;
            return (
              <m.span
                key={i}
                className="curtain__col"
                style={{ transformOrigin: revealing ? "50% 0%" : "50% 100%" }}
                initial={false}
                animate={{ scaleY: covering ? 1 : 0 }}
                transition={{ duration: covering ? 0.55 : 0.7, ease: sweep, delay: i * 0.05 }}
                onAnimationComplete={
                  last ? (covering ? onCovered : revealing ? onRevealed : undefined) : undefined
                }
              />
            );
          })}
        </div>
        <m.p
          className="curtain__label"
          initial={false}
          animate={covering ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: sweep, delay: covering ? 0.32 : 0 }}
        >
          {label}
        </m.p>
      </div>
    </NavigateContext.Provider>
  );
}

type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Shown on the curtain while the route changes. */
  label?: string;
};

/** A Link that plays the curtain. Modified clicks still open new tabs. */
export function TransitionLink({ href, label, onClick, children, ...rest }: TransitionLinkProps) {
  const navigate = usePageTransition();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(href, label);
      }}
    >
      {children}
    </Link>
  );
}
