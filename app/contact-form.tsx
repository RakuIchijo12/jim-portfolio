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
      setStatusMessage(data.message ?? "Message sent to Gmail.");
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
      className="animated-card contact-form-card quirk-card motion-card accent-contact rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-5 shadow-[0_0_26px_#48f5ff33] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80 dark:shadow-[0_0_26px_#48f5ff33] sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-black text-zinc-800 dark:text-zinc-100">Name</span>
          <input
            className="rounded-md border-2 border-[#78e5ff]/60 bg-[#030916]/75 px-4 py-3 text-base font-medium text-[#eaf6ff] shadow-[0_0_18px_#48f5ff2e] outline-none transition focus:bg-[#07172c] focus:shadow-[0_0_24px_#48f5ff55] focus:ring-4 focus:ring-[#48f5ff]/25 dark:border-[#78e5ff]/60 dark:bg-[#030916]/75 dark:text-zinc-50"
            minLength={3}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Maria Santos"
            required
            type="text"
            value={name}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black text-zinc-800 dark:text-zinc-100">Email</span>
          <input
            className="rounded-md border-2 border-[#78e5ff]/60 bg-[#030916]/75 px-4 py-3 text-base font-medium text-[#eaf6ff] shadow-[0_0_18px_#48f5ff2e] outline-none transition focus:bg-[#07172c] focus:shadow-[0_0_24px_#48f5ff55] focus:ring-4 focus:ring-[#48f5ff]/25 dark:border-[#78e5ff]/60 dark:bg-[#030916]/75 dark:text-zinc-50"
            onChange={(event) => setClientEmail(event.target.value)}
            placeholder="e.g. maria@company.com"
            required
            type="email"
            value={clientEmail}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black text-zinc-800 dark:text-zinc-100">Message body</span>
          <textarea
            className="min-h-44 resize-y rounded-md border-2 border-[#78e5ff]/60 bg-[#030916]/75 px-4 py-3 text-base font-medium leading-7 text-[#eaf6ff] shadow-[0_0_18px_#48f5ff2e] outline-none transition focus:bg-[#07172c] focus:shadow-[0_0_24px_#48f5ff55] focus:ring-4 focus:ring-[#48f5ff]/25 dark:border-[#78e5ff]/60 dark:bg-[#030916]/75 dark:text-zinc-50"
            minLength={10}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Tell me about the project, role, or opportunity you have in mind."
            required
            rows={7}
            value={body}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs font-black uppercase text-slate-600 dark:text-zinc-300">
            {characterCount} characters
          </p>
          <button
            className="quirk-submit rounded-md border-2 border-[#ff8fe8]/80 bg-[linear-gradient(135deg,#ff4fd8,#7c5cff)] px-5 py-3 text-sm font-black text-white shadow-[5px_5px_0_#48f5ff66] transition focus:outline-none focus:ring-4 focus:ring-[#48f5ff]/35 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#ff8fe8]/80 dark:bg-[linear-gradient(135deg,#ff4fd8,#7c5cff)] dark:text-white dark:shadow-[5px_5px_0_#48f5ff66]"
            disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </div>
        {statusMessage ? (
          <p
            className={`text-sm font-bold ${
              status === "sent"
                ? "text-[#0f766e] dark:text-[#b8ff5c]"
                : "text-[#be185d] dark:text-[#ff4fd8]"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
