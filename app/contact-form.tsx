"use client";

import { useMemo, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [clientEmail,   setClientEmail]   = useState("");
  const [name,          setName]          = useState("");
  const [body,          setBody]          = useState("");
  const [status,        setStatus]        = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const characterCount = useMemo(() => body.trim().length, [body]);

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

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "0.5rem",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-sm p-6 sm:p-8"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-hv)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <span aria-hidden="true" className="lux-corner lux-corner--tl" />
      <span aria-hidden="true" className="lux-corner lux-corner--tr" />
      <span aria-hidden="true" className="lux-corner lux-corner--bl" />
      <span aria-hidden="true" className="lux-corner lux-corner--br" />

      {/* Gold top accent */}
      <div
        aria-hidden="true"
        className="h-px w-12 mb-6"
        style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
      />

      <div className="grid gap-5">
        <label className="block">
          <span style={labelStyle}>Full Name</span>
          <input
            className="field-input"
            type="text"
            placeholder="e.g. Maria Santos"
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block">
          <span style={labelStyle}>Email Address</span>
          <input
            className="field-input"
            type="email"
            placeholder="e.g. maria@company.com"
            required
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </label>

        <label className="block">
          <span style={labelStyle}>Message</span>
          <textarea
            className="field-input resize-y"
            placeholder="Tell me about the project, role, or opportunity you have in mind."
            required
            minLength={10}
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ minHeight: "10rem" }}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="font-mono text-xs"
            style={{ color: "var(--subtle)" }}
          >
            {characterCount} characters
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-gold inline-flex items-center justify-center gap-2 rounded px-7 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2"
                  style={{
                    borderColor: "rgba(15,23,42,0.2)",
                    borderTopColor: "var(--navy)",
                  }}
                />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                </svg>
              </>
            )}
          </button>
        </div>

        {statusMessage && (
          <p
            className="rounded px-4 py-3 text-sm font-600"
            style={{
              fontWeight: 600,
              background: status === "sent"
                ? "rgba(194,168,120,0.12)"
                : "rgba(220,38,38,0.08)",
              border: status === "sent"
                ? "1px solid rgba(194,168,120,0.3)"
                : "1px solid rgba(220,38,38,0.25)",
              color: status === "sent" ? "var(--gold)" : "#ef4444",
            }}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}
