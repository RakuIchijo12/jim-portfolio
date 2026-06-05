"use client";

import { useMemo, useState, type FormEvent } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [clientEmail, setClientEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const characterCount = useMemo(() => body.trim().length, [body]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          email: clientEmail,
          name,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Message could not be sent.");
      }

      setStatus("sent");
      setStatusMessage("Message sent. Thanks for reaching out.");
      setClientEmail("");
      setName("");
      setBody("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent right now.",
      );
    }
  }

  return (
    <form
      className="animated-card scroll-reveal motion-card accent-contact rounded-lg border-2 border-zinc-950 bg-white p-5 shadow-[8px_8px_0_#14b8a6] dark:border-zinc-100 dark:bg-zinc-900 dark:shadow-[8px_8px_0_#f9735b] sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Name</span>
          <input
            className="rounded-md border border-zinc-300 bg-[#fbfaf7] px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-yellow-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-100 dark:focus:bg-zinc-950 dark:focus:ring-teal-500/25"
            minLength={3}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Maria Santos"
            required
            type="text"
            value={name}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Email</span>
          <input
            className="rounded-md border border-zinc-300 bg-[#fbfaf7] px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-yellow-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-100 dark:focus:bg-zinc-950 dark:focus:ring-teal-500/25"
            onChange={(event) => setClientEmail(event.target.value)}
            placeholder="e.g. maria@company.com"
            required
            type="email"
            value={clientEmail}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Message body</span>
          <textarea
            className="min-h-44 resize-y rounded-md border border-zinc-300 bg-[#fbfaf7] px-4 py-3 text-base leading-7 text-zinc-950 outline-none transition focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-yellow-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-100 dark:focus:bg-zinc-950 dark:focus:ring-teal-500/25"
            minLength={10}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Tell me about the project, role, or opportunity you have in mind."
            required
            rows={7}
            value={body}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            {characterCount} characters
          </p>
          <button
            className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus:ring-teal-500/25"
            disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </div>
        {statusMessage ? (
          <p
            className={`text-sm ${
              status === "sent"
                ? "text-teal-700 dark:text-teal-300"
                : "text-coral"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
