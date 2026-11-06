"use client";

import { useSyncExternalStore } from "react";
import { setTheme, type Theme } from "@/app/lib/theme";
import { MoonIcon, SunIcon } from "@/app/components/ui/icons";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = (): Theme => "dark";

/** Sun and moon on a two-position switch. The new theme grows out of it. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTheme(isDark ? "light" : "dark", {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`icon-btn theme-btn ${className}`}
      data-theme={theme}
    >
      <span aria-hidden="true" className="theme-btn__icons">
        <MoonIcon className="theme-btn__moon" />
        <SunIcon className="theme-btn__sun" />
      </span>
    </button>
  );
}
