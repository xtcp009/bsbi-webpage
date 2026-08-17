"use client";

import { useState } from "react";

const topics = ["Visiting", "Mikvah", "Membership", "Donation", "Kiddush / event", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please call the office.");
        return;
      }
      setStatus("sent");
      setMessage("Thank you. The office will follow up. For a minyan today, calling is fastest.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not send. Please call (843) 577-6599.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel flex flex-col gap-4 p-5 sm:p-6" noValidate>
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Name
        <input
          required
          name="name"
          maxLength={80}
          autoComplete="name"
          className="min-h-12 rounded-xl border border-line bg-parchment px-3 text-base font-normal"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Email
        <input
          required
          type="email"
          name="email"
          maxLength={120}
          autoComplete="email"
          className="min-h-12 rounded-xl border border-line bg-parchment px-3 text-base font-normal"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Phone <span className="font-normal text-muted">(optional)</span>
        <input
          name="phone"
          maxLength={24}
          autoComplete="tel"
          className="min-h-12 rounded-xl border border-line bg-parchment px-3 text-base font-normal"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Topic
        <select name="topic" className="min-h-12 rounded-xl border border-line bg-parchment px-3 text-base font-normal">
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Message
        <textarea
          required
          name="message"
          maxLength={2000}
          rows={5}
          className="rounded-xl border border-line bg-parchment px-3 py-3 text-base font-normal"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 rounded-md bg-teal text-sm font-semibold tracking-wide text-cream disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-red-800" : "text-teal"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
