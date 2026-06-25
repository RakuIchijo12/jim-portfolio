"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(cb: () => void): () => void {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = (): Theme => "dark";

export default function ThemeToggle({ className = "h-9 w-9" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = useCallback(() => {
    const next: Theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", !isDark);
  }, [isDark]);

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={toggle}
      suppressHydrationWarning
      type="button"
      className={`grid place-items-center rounded transition-all duration-220 ${className}`}
      style={{
        border: "1px solid var(--border-hv)",
        color: "var(--muted)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget as HTMLButtonElement;
        t.style.borderColor = "var(--gold)";
        t.style.color = "var(--gold)";
        t.style.background = "var(--gold-light)";
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLButtonElement;
        t.style.borderColor = "var(--border-hv)";
        t.style.color = "var(--muted)";
        t.style.background = "transparent";
      }}
    >
      <svg
        suppressHydrationWarning
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" />
        )}
      </svg>
    </button>
  );
}
