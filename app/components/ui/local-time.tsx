"use client";

import { useSyncExternalStore } from "react";

/* One shared one-second clock for every instance on the page. */
let now = 0;
let timer: number | undefined;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (timer === undefined) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

const getSnapshot = () => now;
const getServerSnapshot = () => 0;

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Local time in Davao, with a colon that ticks every second. */
export default function LocalTime({ className = "", prefix = "Davao" }: { className?: string; prefix?: string }) {
  const t = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hh, mm] = t ? format.format(t).split(":") : ["--", "--"];
  const tick = t ? Math.floor(t / 1000) % 2 === 0 : true;

  return (
    <span className={className}>
      {prefix ? `${prefix} ` : ""}
      {hh}
      <span style={{ opacity: tick ? 1 : 0.25, transition: "opacity 0.3s ease" }}>:</span>
      {mm} PHT
    </span>
  );
}
