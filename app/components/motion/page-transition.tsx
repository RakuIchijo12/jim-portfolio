"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { m } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { scrollToTarget } from "./smooth-scroll";

type Phase = "idle" | "cover" | "reveal";

const sweep = [0.76, 0, 0.24, 1] as const;

const NavigateContext = createContext<(href: string, label?: string) => void>(() => {});

export const usePageTransition = () => useContext(NavigateContext);

/**
 * Route changes play behind one panel: it rises to cover the page with a
 * shell line naming the destination, the route changes underneath, and the
 * panel lifts away once the new page has rendered. Same-page hash links
 * just scroll.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const [dest, setDest] = useState("");
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
      setDest(url.pathname === "/" ? `~${url.hash ? `/${url.hash.slice(1)}` : ""}` : `~${url.pathname}`);
      setPhase("cover");
    },
    [router],
  );

  // The new route has rendered: lift the panel on the next frame.
  useEffect(() => {
    if (phase !== "cover" || pathname === origin.current) return;
    const id = requestAnimationFrame(() => setPhase("reveal"));
    return () => cancelAnimationFrame(id);
  }, [pathname, phase]);

  // Never leave the panel down if a navigation stalls.
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
        <m.span
          className="curtain__panel"
          style={{ transformOrigin: revealing ? "50% 0%" : "50% 100%" }}
          initial={false}
          animate={{ scaleY: covering ? 1 : 0 }}
          transition={{ duration: covering ? 0.5 : 0.6, ease: sweep }}
          onAnimationComplete={covering ? onCovered : revealing ? onRevealed : undefined}
        />
        <m.div
          className="curtain__line"
          initial={false}
          animate={covering ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: sweep, delay: covering ? 0.25 : 0 }}
        >
          <p>
            <span className="curtain__prompt">jimuel@portfolio</span>
            <span className="curtain__dim">:</span>
            <span className="curtain__path">~</span>
            <span className="curtain__dim">$</span> cd {dest}
          </p>
          {label && <p className="curtain__label">Loading {label}</p>}
          <span className="curtain__bar" />
        </m.div>
      </div>
    </NavigateContext.Provider>
  );
}

type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Shown on the panel while the route changes. */
  label?: string;
};

/** A Link that plays the panel. Modified clicks still open new tabs. */
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
