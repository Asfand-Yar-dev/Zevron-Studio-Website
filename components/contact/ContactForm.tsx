"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, SERVICES } from "@/lib/content";

const INTERESTS = [...SERVICES.map((s) => s.title), "Not sure yet"];

const field =
  "w-full border-b border-line bg-transparent py-3 text-lg text-white transition-colors duration-300 placeholder:text-muted/60 hover:border-muted focus:border-cyan focus:outline-none";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="label flex items-center justify-between text-[0.6rem] text-silver">
      {children}
      {optional && <span className="text-muted">Optional</span>}
    </label>
  );
}

// No backend is configured: submitting composes the brief in the visitor's own email app.
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "unconfigured">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Arriving from a service page (/contact?service=Agentic%20Systems) pre-ticks that service.
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (!service || !formRef.current) return;
    for (const input of formRef.current.querySelectorAll<HTMLInputElement>('input[name="interest"]')) {
      if (input.value === service) input.checked = true;
    }
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!CONTACT_EMAIL) {
      setStatus("unconfigured");
      return;
    }
    const data = new FormData(e.currentTarget);
    const interests = data.getAll("interest").join(", ") || "Not specified";
    const company = String(data.get("company") || "").trim();
    const subject = `New project — ${data.get("name")}${company ? ` (${company})` : ""}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      company && `Company: ${company}`,
      `Interested in: ${interests}`,
      "",
      String(data.get("message")),
    ]
      .filter((line) => line !== "")
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative">
      <fieldset>
        <legend className="label w-full text-center text-[0.6rem] text-silver lg:text-left">What can we help with?</legend>
        {/* Mobile/tablet: 2×2 grid of services with "Not sure yet" full-width below. Desktop: one inline row. */}
        <div className="mt-4 grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:justify-start">
          {INTERESTS.map((item, i) => (
            <label
              key={item}
              className={`group/chip relative cursor-pointer border border-line px-3 py-3 text-[0.8rem] text-silver transition-colors duration-300 hover:border-muted hover:text-white has-checked:border-signal has-checked:bg-signal/10 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cyan sm:text-sm lg:px-4 lg:py-2.5 ${
                i === INTERESTS.length - 1 && INTERESTS.length % 2 === 1 ? "col-span-2" : ""
              }`}
            >
              <input type="checkbox" name="interest" value={item} className="sr-only" />
              <span className="flex items-center justify-center gap-2.5 text-center lg:justify-start lg:text-left">
                <span aria-hidden className="h-1.5 w-1.5 bg-line transition-colors group-has-checked/chip:bg-signal" />
                {item}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8">
        <div>
          <Label htmlFor="name">Your name</Label>
          <input id="name" name="name" required autoComplete="name" placeholder="Full name" className={field} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="company" optional>
            Company
          </Label>
          <input id="company" name="company" autoComplete="organization" placeholder="Company or project name" className={field} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Project details</Label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you building, what problem does it solve, and where are you today?"
            className={`${field} resize-y leading-relaxed`}
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <button
          type="submit"
          className="group/btn relative inline-flex h-16 items-center justify-between gap-6 pl-7 pr-5 font-display text-base font-semibold text-black sm:justify-start"
        >
          <span aria-hidden className="chamfer absolute inset-0 bg-signal transition-colors duration-300 group-hover/btn:bg-white" />
          <span className="relative">Send Project Brief</span>
          <ArrowUpRight aria-hidden className="relative h-5 w-5 transition-transform duration-500 ease-precise group-hover/btn:rotate-45" />
        </button>
        {CONTACT_EMAIL && (
          <p className="label max-w-xs text-[0.6rem] leading-relaxed text-muted">
            Opens your email app with your brief ready to send.
          </p>
        )}
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-8 border-l border-cyan pl-4 text-sm leading-relaxed text-silver ${status === "idle" ? "sr-only" : ""}`}
      >
        {status === "sent" && (
          <>
            Your email app should now be open with the brief filled in just press send. If nothing opened, email us
            directly at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline decoration-signal underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            .
          </>
        )}
        {status === "unconfigured" &&
          "Thanks our project inbox is being set up right now. Please reach out through one of our profiles in the meantime."}
      </p>
    </form>
  );
}
