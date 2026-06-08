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
      className="animated-card quirk-card motion-card accent-contact rounded-lg border-2 border-zinc-950 bg-white p-5 shadow-[8px_8px_0_#ff2f6d] dark:border-zinc-50 dark:bg-[#111632] dark:shadow-[8px_8px_0_#00d5ff] sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-black text-zinc-800 dark:text-zinc-100">Name</span>
          <input
            className="rounded-md border-2 border-zinc-950 bg-[#fbfff4] px-4 py-3 text-base font-medium text-zinc-950 shadow-[3px_3px_0_#ffd166] outline-none transition focus:bg-white focus:shadow-[5px_5px_0_#24c6a8] focus:ring-4 focus:ring-[#24c6a8]/20 dark:border-zinc-50 dark:bg-[#100f1f] dark:text-zinc-50"
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
            className="rounded-md border-2 border-zinc-950 bg-[#fbfff4] px-4 py-3 text-base font-medium text-zinc-950 shadow-[3px_3px_0_#ffd166] outline-none transition focus:bg-white focus:shadow-[5px_5px_0_#24c6a8] focus:ring-4 focus:ring-[#24c6a8]/20 dark:border-zinc-50 dark:bg-[#100f1f] dark:text-zinc-50"
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
            className="min-h-44 resize-y rounded-md border-2 border-zinc-950 bg-[#fbfff4] px-4 py-3 text-base font-medium leading-7 text-zinc-950 shadow-[3px_3px_0_#ffd166] outline-none transition focus:bg-white focus:shadow-[5px_5px_0_#24c6a8] focus:ring-4 focus:ring-[#24c6a8]/20 dark:border-zinc-50 dark:bg-[#100f1f] dark:text-zinc-50"
            minLength={10}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Tell me about the project, role, or opportunity you have in mind."
            required
            rows={7}
            value={body}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs font-black uppercase text-zinc-500 dark:text-zinc-300">
            {characterCount} characters
          </p>
          <button
            className="quirk-submit rounded-md border-2 border-zinc-950 bg-[#ff2f6d] px-5 py-3 text-sm font-black text-white shadow-[5px_5px_0_#22c55e] transition focus:outline-none focus:ring-4 focus:ring-[#ffd60a]/50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:shadow-[5px_5px_0_#00d5ff]"
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
                ? "text-[#0f9f89] dark:text-[#4ee7c7]"
                : "text-[#ff5f57]"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
