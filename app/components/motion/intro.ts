"use client";

import { useSyncExternalStore } from "react";
import { createStore } from "@/app/lib/store";

/**
 * Whether the intro has lifted, so the hero knows when to play. The boot
 * script in the layout marks <html> with `intro-seen` when the intro should
 * be skipped (already played this session, or reduced motion), which is
 * read once when this module first loads in the browser.
 */
const skipped =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("intro-seen");

export const introStore = createStore<boolean>(skipped);

export function useIntroDone() {
  return useSyncExternalStore(introStore.subscribe, introStore.get, () => false);
}
