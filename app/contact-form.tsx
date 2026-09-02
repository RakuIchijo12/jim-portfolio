"use client";

import { useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@/app/components/ui/icons";

type SubmitState = "idle" | "sending" | "sent" | "error";

const ease = [0.22, 1, 0.36, 1] as const;
const MESSAGE_MIN = 10;

function Corners() {
  return (
    <>
      <span aria-hidden="true" className="lux-corner lux-corner--tl" />
      <span aria-hidden="true" className="lux-corner lux-corner--tr" />
      <span aria-hidden="true" className="lux-corner lux-corner--bl" />
      <span aria-hidden="true" className="lux-corner lux-corner--br" />
    </>
  );
}

export default function ContactForm() {
  const [clientEmail,   setClientEmail]   = useState("");
  const [name,          setName]          = useState("");
  const [body,          setBody]          = useState("");
  const [status,        setStatus]        = useState<SubmitState>("idle");
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
        className="relative flex flex-col items-center justify-center px-6 py-16 text-center"
        style={{
          borderRadius: "var(--r-md)",
          background: "var(--card)",
          border: "1px solid var(--gold-line)",
          boxShadow: "var(--shadow-md)",
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <Corners />

        <div
          className="check-ring grid h-16 w-16 place-items-center rounded-full"
          style={{ background: "var(--gold-light)", border: "1px solid var(--gold-line)" }}
        >
          <svg
            aria-hidden="true"
            className="h-7 w-7"
            fill="none"
            stroke="var(--gold)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path className="check-path" d="m4.5 12.5 5 5 10-11" />
          </svg>
        </div>

        <h3 className="font-display mt-6 text-2xl" style={{ fontWeight: 700 }}>
          Message sent
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7" style={{ color: "var(--muted)" }}>
          {statusMessage} I read every message personally and will reply with a
          clear next step — usually within 24 hours.
        </p>

        <button
          type="button"
          onClick={() => { setStatus("idle"); setStatusMessage(""); }}
          className="btn-ghost mt-7 rounded-md px-5 py-2.5 text-sm"
        >
          Send another message
        </button>
      </m.div>
    );
  }

  /* ── Form ─────────────────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-6 sm:p-8"
      style={{
        borderRadius: "var(--r-md)",
        background: "var(--card)",
        border: "1px solid var(--border-hv)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <Corners />

      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-10" style={{ background: "var(--gold)" }} />
        <span className="lux-label" style={{ color: "var(--gold)" }}>
          Send a message
        </span>
      </div>

      <div className="grid gap-4">
        <label className="field">
          <input
            className="field-input"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="e.g. Maria Santos"
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="field-label">Full Name</span>
        </label>

        <label className="field">
          <input
            className="field-input"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="e.g. maria@company.com"
            required
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <span className="field-label">Email Address</span>
        </label>

        <label className="field">
          <textarea
            className="field-input"
            name="message"
            placeholder="Tell me about the project, role, or opportunity you have in mind."
            required
            minLength={MESSAGE_MIN}
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ minHeight: "10rem" }}
          />
          <span className="field-label">Message</span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Live minimum-length hint doubles as the character counter */}
          <p
            className="flex items-center gap-2 font-mono text-xs transition-colors duration-300"
            style={{ color: enough ? "var(--gold)" : "var(--subtle)" }}
          >
            <span
              aria-hidden="true"
              className="block h-1 w-8 overflow-hidden rounded-full"
              style={{ background: "var(--border-hv)" }}
            >
              <span
                className="block h-full origin-left rounded-full transition-transform duration-300"
                style={{
                  background: "var(--gold)",
                  transform: `scaleX(${Math.min(characterCount / MESSAGE_MIN, 1)})`,
                }}
              />
            </span>
            {characterCount} characters
          </p>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-gold group inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2"
                  style={{ borderColor: "rgba(20,22,31,0.2)", borderTopColor: "#14161F" }}
                />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {status === "error" && statusMessage && (
            <m.p
              role="alert"
              className="rounded-md px-4 py-3 text-sm"
              style={{
                fontWeight: 600,
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.28)",
                color: "#ef4444",
              }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease }}
            >
              {statusMessage}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
