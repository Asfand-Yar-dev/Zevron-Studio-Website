"use client";

import { useId, useState } from "react";

type Item = { q: string; a: string };

// One answer open at a time; all start closed until a question is clicked.
export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <li key={item.q} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group/faq flex w-full items-start gap-5 py-6 text-left"
              >
                <span className="label w-6 shrink-0 pt-[0.55em] text-[0.6rem] text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`flex-1 font-display text-lg font-medium leading-snug transition-colors duration-300 sm:text-xl ${
                    isOpen ? "text-white" : "text-silver group-hover/faq:text-white"
                  }`}
                >
                  {item.q}
                </span>
                {/* Plus that turns into a cross; tile fills orange when open. */}
                <span aria-hidden className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                  <span
                    className={`chamfer absolute inset-0 bg-signal transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                  />
                  <span
                    className={`chamfer-frame absolute inset-0 transition-colors duration-300 ${
                      isOpen ? "bg-signal" : "bg-line group-hover/faq:bg-signal"
                    }`}
                  />
                  <span
                    className={`relative block h-3.5 w-3.5 transition-transform duration-500 ease-precise ${isOpen ? "rotate-45" : ""}`}
                  >
                    <span className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 ${isOpen ? "bg-black" : "bg-white"}`} />
                    <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${isOpen ? "bg-black" : "bg-white"}`} />
                  </span>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-precise ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 pl-11 leading-relaxed text-silver sm:pr-14">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
