"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import RollText from "@/app/components/ui/roll-text";
import { ArrowRightIcon } from "@/app/components/ui/icons";
import { Led } from "@/app/components/ui/circuit";

type SubmitState = "idle" | "sending" | "sent" | "error";

const ease = [0.16, 1, 0.3, 1] as const;
const MESSAGE_MIN = 10;

export default function ContactForm() {
  const [clientEmail, setClientEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const characterCount = useMemo(() => body.trim().length, [body]);
  const enough = characterCount >= MESSAGE_MIN;

  async function handleSubmit(event: { preventDefault(): void }) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, email: clientEmail, name }),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "Message could not be sent.");

      setStatus("sent");
      setStatusMessage(data.message ?? "Message sent.");
      setClientEmail("");
      setName("");
      setBody("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Message could not be sent right now.",
      );
    }
  }

  /* ── Sent: swap the whole form for a confirmation ─────────────────────── */
  if (status === "sent") {
    return (
      <m.div
        className="flex flex-col items-center justify-center py-12 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <m.div
          className="grid h-20 w-20 place-items-center rounded-full"
          style={{ background: "var(--brand-terra)" }}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <svg
            aria-hidden="true"
            className="h-8 w-8"
            fill="none"
            stroke="var(--ink)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.25"
            viewBox="0 0 24 24"
          >
            <path className="check-path" d="m4.5 12.5 5 5 10-11" />
          </svg>
        </m.div>

        <h3 className="mt-7 font-display text-3xl font-semibold tracking-tight">Message sent</h3>
        <p className="t-pretty mt-3 max-w-sm text-sm leading-7 text-muted">
          {statusMessage} I read every message personally and will reply with a
          clear next step, usually within 24 hours.
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStatusMessage("");
          }}
          className="btn btn-line btn-sm roll-host mt-8"
        >
          <RollText text="Send another" />
        </button>
      </m.div>
    );
  }

  /* ── Form ─────────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="t-label text-accent">Send a message</span>
        {/* Status LEDs, like the lights on a modem: TX blinks, RX and power hold. */}
        <span aria-hidden="true" className="form-leds t-label">
          <Led color="#BB613F" blink />
          <Led color="#C99A3E" />
          <Led color="#92825A" />
          <span>TX RX PWR</span>
        </span>
      </div>

      <div className="grid gap-5">
        <label className="field">
          <input
            className="field__input"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="e.g. Maria Santos"
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="field__label">Full name</span>
          <span aria-hidden="true" className="field__bar" />
        </label>

        <label className="field">
          <input
            className="field__input"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="e.g. maria@company.com"
            required
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <span className="field__label">Email address</span>
          <span aria-hidden="true" className="field__bar" />
        </label>

        <label className="field">
          <textarea
            className="field__input"
            name="message"
            placeholder="Tell me about the project, role, or opportunity you have in mind."
            required
            minLength={MESSAGE_MIN}
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <span className="field__label">Message</span>
          <span aria-hidden="true" className="field__bar" />
        </label>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* The minimum-length hint doubles as the character counter. */}
          <p
            className="t-label flex items-center gap-2.5 transition-colors duration-300"
            style={{ color: enough ? "var(--accent-text)" : "var(--subtle)" }}
          >
            <span
              aria-hidden="true"
              className="block h-1 w-10 overflow-hidden rounded-full"
              style={{ background: "var(--line-strong)" }}
            >
              <span
                className="block h-full origin-left rounded-full transition-transform duration-500"
                style={{
                  background: "var(--accent)",
                  transform: `scaleX(${Math.min(characterCount / MESSAGE_MIN, 1)})`,
                }}
              />
            </span>
            {characterCount} characters
          </p>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-solid roll-host"
          >
            {status === "sending" ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2"
                  style={{ borderColor: "currentColor", borderTopColor: "transparent" }}
                />
                Sending
              </>
            ) : (
              <>
                <RollText text="Send message" />
                <ArrowRightIcon className="btn__arrow h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {status === "error" && statusMessage && (
            <m.p
              role="alert"
              className="border px-4 py-3 text-sm font-semibold"
              style={{
                background: "rgba(187, 97, 63, 0.1)",
                borderColor: "rgba(187, 97, 63, 0.45)",
                color: "var(--accent-text)",
              }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease }}
            >
              {statusMessage}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
