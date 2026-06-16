"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const themeChangeEvent = "portfolio-theme-change";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToThemeChanges(onStoreChange: () => void) {
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeChangeEvent, onStoreChange);
  colorSchemeQuery.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeChangeEvent, onStoreChange);
    colorSchemeQuery.removeEventListener("change", onStoreChange);
  };
}

function getServerTheme(): Theme {
  return "light";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getPreferredTheme,
    getServerTheme,
  );
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    window.localStorage.setItem("theme", isDark ? "light" : "dark");
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="quirk-icon-button grid h-11 w-11 place-items-center rounded-md border-2 border-transparent text-[#eaf6ff] transition hover:border-[#78e5ff]/70 hover:bg-[#48f5ff]/15 hover:text-[#ffffff] focus:outline-none focus:ring-4 focus:ring-[#48f5ff]/35 dark:text-zinc-50 dark:hover:border-[#78e5ff]/70 dark:hover:bg-[#48f5ff]/15 dark:hover:text-zinc-50 dark:focus:ring-[#48f5ff]/35"
      onClick={toggleTheme}
      suppressHydrationWarning
      title={isDark ? "Light mode" : "Dark mode"}
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
        {isDark ? (
          <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
