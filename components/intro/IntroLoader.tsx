"use client";

import { useEffect, useState } from "react";

/**
 * Opening intro: the wordmark appears, then the black screen splits open.
 *
 * Reliability: the whole sequence is CSS (app/globals.css, "Intro loader"), so it starts on the
 * first paint and always ends hidden — even if JavaScript is slow or fails. The page loads
 * underneath the whole time, so the intro adds no real waiting.
 * - Plays once per browser tab: INTRO_SCRIPT (./introScript, inlined in the layout) marks repeat
 *   visits before paint.
 * - Skipped for prefers-reduced-motion, and on any click / key / scroll / touch.
 * - JavaScript only handles the skip and removes the overlay from the page afterwards.
 */

/** Total length of the CSS sequence, in ms (keep in sync with globals.css). */
const INTRO_MS = 2450;

const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

export function IntroLoader() {
  const [state, setState] = useState<"play" | "skip" | "gone">("play");

  useEffect(() => {
    if (state === "gone") {
      document.body.classList.remove("intro-active");
      return;
    }
    if (state === "play") {
      document.body.classList.add("intro-active");
    }
    if (state === "skip") {
      document.body.classList.remove("intro-active");
      const t = setTimeout(() => setState("gone"), 220);
      return () => clearTimeout(t);
    }
    const seen = document.documentElement.dataset.intro === "seen";
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.remove("intro-active");
      setState("gone");
      return;
    }
    const skip = () => setState("skip");
    SKIP_EVENTS.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    // Measured from hydration, so this always lands after the CSS has already finished.
    const t = setTimeout(() => {
      document.body.classList.remove("intro-active");
      setState("gone");
    }, INTRO_MS + 100);
    return () => {
      clearTimeout(t);
      SKIP_EVENTS.forEach((e) => window.removeEventListener(e, skip));
    };
  }, [state]);

  if (state === "gone") return null;

  const letters = ["Z", "E", "V", "R", "O", "N"];

  return (
    <div aria-hidden className={`intro${state === "skip" ? " intro-skip" : ""}`}>
      <div className="intro-panel intro-panel-top" />
      <div className="intro-panel intro-panel-bottom" />

      {/* Cyber/studio background ambience */}
      <div className="intro-glow pointer-events-none absolute h-[320px] w-[320px] rounded-full sm:h-[450px] sm:w-[450px]" />

      <div className="intro-content relative flex flex-col items-center">
        {/* Animated Corner Brackets for a high-tech studio aesthetic */}
        <span className="intro-corner intro-corner-tl" />
        <span className="intro-corner intro-corner-tr" />
        <span className="intro-corner intro-corner-bl" />
        <span className="intro-corner intro-corner-br" />

        {/* Staggered dynamic 3D letters with glowing gradient */}
        <div
          className="intro-word-wrap flex items-center gap-1 sm:gap-2 select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {letters.map((char, index) => (
            <span
              key={index}
              className="intro-char inline-block text-[3.8rem] sm:text-[5.5rem] md:text-[6.8rem] font-extrabold tracking-tight"
              style={{
                animationDelay: `${0.12 + index * 0.08}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Subtitle with stylish pill badge and scanning sheen */}
        <div className="intro-sub-wrap mt-5 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-signal/60 sm:w-12" />
          <span
            className="intro-sub text-[0.8rem] font-semibold tracking-[0.6em] uppercase text-silver/90 sm:text-[0.95rem] md:text-[1.05rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Studio
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-signal/60 sm:w-12" />
        </div>
      </div>
    </div>
  );
}
