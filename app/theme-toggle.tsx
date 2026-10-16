"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = (): Theme => "dark";

/**
 * Half-filled disc that turns over with the theme. Where the browser supports
 * view transitions, the new theme grows out of the button as a circle;
 * elsewhere, and under reduced motion, it switches instantly.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const next: Theme = isDark ? "light" : "dark";
      const apply = () => {
        document.documentElement.classList.toggle("dark", next === "dark");
        try {
          localStorage.setItem("theme", next);
        } catch {
          /* storage blocked: the choice lasts for this page only */
        }
      };

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (typeof document.startViewTransition !== "function" || reduce) {
        apply();
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = document.startViewTransition(apply);
      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 800,
              easing: "cubic-bezier(0.76, 0, 0.24, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {});
    },
    [isDark],
  );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`icon-btn ${className}`}
    >
      <span aria-hidden="true" className="theme-glyph" />
    </button>
  );
}
