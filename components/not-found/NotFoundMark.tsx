"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";

// "4 [mark] 4": outlined digits that lift and light up on hover, with the brand mark
// as the zero, tilting in 3D toward the pointer.
export function NotFoundMark() {
  const markRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const apply = () => {
      raf = 0;
      markRef.current?.style.setProperty("--rx", `${(-target.y * 14).toFixed(2)}deg`);
      markRef.current?.style.setProperty("--ry", `${(target.x * 22).toFixed(2)}deg`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const digit = (i: number) => (
    <span
      onPointerEnter={() => setHovered(i)}
      onPointerLeave={() => setHovered(null)}
      className={`text-outline inline-block [-webkit-text-stroke-width:2px] transition-[translate,-webkit-text-stroke-color] duration-500 ease-precise ${
        hovered === i ? "-translate-y-[0.05em] [-webkit-text-stroke-color:var(--color-signal)]" : ""
      }`}
    >
      4
    </span>
  );

  return (
    <div
      aria-hidden
      className="relative flex select-none items-center justify-center font-display text-[clamp(7.5rem,30vw,23rem)] font-bold leading-[0.8] tracking-[-0.06em]"
    >
      {digit(0)}
      <div className="relative mx-[0.06em] [perspective:900px]">
        <div className="absolute inset-[-20%] rounded-full bg-signal/[0.12] blur-[70px]" />
        <div
          ref={markRef}
          className="relative transition-transform duration-300 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
        >
          <LogoMark className="h-[0.64em] w-auto drop-shadow-[0_24px_48px_rgb(0_0_0_/_0.6)]" />
        </div>
      </div>
      {digit(1)}
    </div>
  );
}
