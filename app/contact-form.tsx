"use client";

import { useMemo, useState, type FormEvent } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [clientEmail,    setClientEmail]    = useState("");
  const [name,           setName]           = useState("");
  const [body,           setBody]           = useState("");
  const [status,         setStatus]         = useState<SubmitState>("idle");
  const [statusMessage,  setStatusMessage]  = useState("");

  const characterCount = useMemo(() => body.trim().length, [body]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

  return (
    <form
      className="animated-card contact-form-card quirk-card motion-card accent-contact rounded-xl border p-5 sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-bold">Name</span>
          <input
            className="rounded-lg border px-4 py-3 text-base font-medium outline-none transition"
            minLength={3}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Maria Santos"
            required
            type="text"
            value={name}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold">Email</span>
          <input
            className="rounded-lg border px-4 py-3 text-base font-medium outline-none transition"
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="e.g. maria@company.com"
            required
            type="email"
            value={clientEmail}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold">Message body</span>
          <textarea
            className="min-h-44 resize-y rounded-lg border px-4 py-3 text-base font-medium leading-7 outline-none transition"
            minLength={10}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell me about the project, role, or opportunity you have in mind."
            required
            rows={7}
            value={body}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs font-bold uppercase text-(--muted)">
            {characterCount} characters
          </p>
          <button
            className="quirk-submit rounded-lg px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-(--accent)/30 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </div>

        {statusMessage ? (
          <p className={`text-sm font-bold ${
            status === "sent" ? "text-(--accent)" : "text-rose-600 dark:text-rose-400"
          }`}>
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
