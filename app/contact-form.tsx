"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import RollText from "@/app/components/ui/roll-text";
import { Window } from "@/app/components/ui/window";

type SubmitState = "idle" | "sending" | "sent" | "error";

const ease = [0.16, 1, 0.3, 1] as const;
const MESSAGE_MIN = 10;

/** A field labelled like a JSON key: "name", "email", "message". */
function Key({ name }: { name: string }) {
  return (
    <span className="field__k">
      <span aria-hidden="true" className="field__q">
        &quot;
      </span>
      {name}
      <span aria-hidden="true" className="field__q">
        &quot;:
      </span>
    </span>
  );
}

/**
 * The contact form as an API client: the request line on top, the body as
 * labelled fields, and the server's answer printed in the response pane.
 * It posts to the real /api/contact route.
 */
export default function ContactForm() {
  const [clientEmail, setClientEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [code, setCode] = useState<number | null>(null);

  const characterCount = body.trim().length;
  const enough = characterCount >= MESSAGE_MIN;

  async function handleSubmit(event: { preventDefault(): void }) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");
    setCode(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, email: clientEmail, name }),
      });

      setCode(response.status);
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "Message could not be sent.");

      setStatus("sent");
      setStatusMessage(data.message ?? "Message sent.");
      setClientEmail("");
      setName("");
      setBody("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Message could not be sent right now.");
    }
  }

  const statusText =
    status === "sending"
      ? "sending..."
      : status === "sent"
        ? `${code ?? 200} OK`
        : status === "error"
          ? code === 400
            ? "400 Bad Request"
            : `${code ?? "ERR"} Server Error`
          : "ready";

  return (
    <Window
      className="api"
      title={
        <span className="api__line">
          <span className="api__method">POST</span>
          <span className="api__url">/api/contact</span>
        </span>
      }
      extra={
        <span className="api__state" data-status={status}>
          <span aria-hidden="true" className="api__dot" />
          {statusText}
        </span>
      }
    >
      {status === "sent" ? (
        <m.div
          className="api__done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          role="status"
        >
          <p className="api__resline">
            HTTP/1.1 <b>{code ?? 200} OK</b>
          </p>
          <pre className="code">
            <code>
              {"{\n  "}
              <span className="tk-p">&quot;status&quot;</span>: <span className="tk-s">&quot;delivered&quot;</span>,
              {"\n  "}
              <span className="tk-p">&quot;message&quot;</span>: <span className="tk-s">&quot;{statusMessage}&quot;</span>,
              {"\n  "}
              <span className="tk-p">&quot;reply&quot;</span>: <span className="tk-s">&quot;within 24 hours&quot;</span>
              {"\n}"}
            </code>
          </pre>
          <p className="api__note t-pretty">
            I read every message personally and will reply with a clear next step.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setStatusMessage("");
              setCode(null);
            }}
            className="btn btn--ghost btn--sm roll-host"
          >
            <RollText text="Send another request" />
          </button>
        </m.div>
      ) : (
        <form onSubmit={handleSubmit} className="api__form">
          <div className="api__tabs" aria-hidden="true">
            <span data-on="true">Body</span>
            <span>Headers</span>
            <span className="api__type">application/json</span>
          </div>

          <div className="api__fields">
            <label className="field">
              <Key name="name" />
              <input
                className="field__in"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Maria Santos"
                required
                minLength={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="field">
              <Key name="email" />
              <input
                className="field__in"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="maria@company.com"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </label>

            <label className="field field--area">
              <Key name="message" />
              <textarea
                className="field__in"
                name="message"
                placeholder="Tell me about the project, role, or opportunity you have in mind."
                required
                minLength={MESSAGE_MIN}
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
          </div>

          <div className="api__foot">
            {/* The minimum-length hint doubles as the character counter. */}
            <p className="api__count" data-ok={enough}>
              <span aria-hidden="true" className="api__meter">
                <span style={{ transform: `scaleX(${Math.min(characterCount / MESSAGE_MIN, 1)})` }} />
              </span>
              {characterCount} chars
              <span className="hidden sm:inline">{enough ? " / ready" : ` / min ${MESSAGE_MIN}`}</span>
            </p>

            <button type="submit" disabled={status === "sending"} className="btn btn--primary roll-host">
              {status === "sending" ? (
                <>
                  <span aria-hidden="true" className="spinner" />
                  Sending
                </>
              ) : (
                <>
                  <RollText text="Send request" />
                  <kbd className="kbd kbd--on-accent">↵</kbd>
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {status === "error" && statusMessage && (
              <m.p
                role="alert"
                className="api__error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease }}
              >
                <b>error:</b> {statusMessage}
              </m.p>
            )}
          </AnimatePresence>
        </form>
      )}
    </Window>
  );
}
