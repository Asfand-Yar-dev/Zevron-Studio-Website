"use client";

import { useRef, useState, type PointerEvent } from "react";

const LETTERS = "ZEVRON".split("");

const type = "font-display text-[24vw] font-bold leading-[0.8] tracking-[-0.06em]";

// Two aligned copies of the word: an outline base, and a metal-filled copy that is
// revealed in a spotlight around the pointer. The hovered letter lifts and turns orange.
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState(false);

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const lift = (i: number) =>
    `inline-block transition-[translate,color,-webkit-text-stroke-color] duration-500 ease-precise ${
      hovered === i ? "-translate-y-[0.07em]" : ""
    }`;

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerMove={track}
      onPointerEnter={(e) => e.pointerType !== "touch" && setActive(true)}
      onPointerLeave={() => {
        setActive(false);
        setHovered(null);
      }}
      className="relative cursor-default select-none overflow-hidden [--mx:50%] [--my:65%]"
    >
      <p className={`relative -mb-[0.24em] flex justify-center ${type}`}>
        {LETTERS.map((l, i) => (
          <span
            key={i}
            onPointerEnter={() => setHovered(i)}
            className={`text-outline ${lift(i)} ${hovered === i ? "[-webkit-text-stroke-color:var(--color-signal)]" : ""}`}
          >
            {l}
          </span>
        ))}
      </p>

      <p
        className={`pointer-events-none absolute inset-x-0 top-0 flex justify-center transition-opacity duration-500 [mask-image:radial-gradient(circle_18vw_at_var(--mx)_var(--my),black,transparent_72%)] ${type} ${
          active ? "opacity-100" : "opacity-30"
        }`}
      >
        {LETTERS.map((l, i) => (
          <span key={i} className={`${lift(i)} ${hovered === i ? "text-signal" : "text-metal"}`}>
            {l}
          </span>
        ))}
      </p>

      {/* Hairline that tracks the pointer horizontally */}
      <span
        className={`pointer-events-none absolute top-0 h-px w-[24vw] -translate-x-1/2 bg-linear-to-r from-transparent via-cyan to-transparent transition-opacity duration-500 [left:var(--mx)] ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
