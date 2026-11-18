"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { CONTACT_PATH } from "@/lib/content";
import { HeroVisual } from "./HeroVisual";

// The live 3D scene only runs on desktop (lg+). Phones/tablets get a still render of the same
// model (public/hero/zevron-3d-mobile.webp), so they never download or run Three.js.
const DESKTOP_QUERY = "(min-width: 1024px)";

/** True once the page is idle on a desktop-sized screen; follows later resizes immediately. */
function useDesktop3D() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setEnabled(mq.matches);
    // Let the headline and buttons render first; start the 3D work when the browser is idle.
    const start = () => {
      // Safari has no requestIdleCallback; a short timeout does the same job there.
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(update, { timeout: 1500 });
      else setTimeout(update, 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("load", start);
      mq.removeEventListener("change", update);
    };
  }, []);
  return enabled;
}


function CropMark({ className }: { className: string }) {
  return <span className={`absolute h-4 w-4 border-silver/40 ${className}`} />;
}

export function Hero() {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [scene, setScene] = useState<"loading" | "ready" | "fallback">("loading");
  const onReady = useCallback(() => setScene("ready"), []);
  const onFail = useCallback(() => setScene("fallback"), []);
  const desktop3D = useDesktop3D();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black">
      {/* Backdrop: engineering grid + controlled light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_42%,black,transparent)]" />
        <div className="absolute left-1/2 top-[40%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.06] blur-[120px]" />
        <div className="absolute -bottom-[10vmin] left-1/2 h-[30vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-signal/[0.09] blur-[110px]" />
      </div>

      {desktop3D && scene !== "fallback" && (
        <div className="absolute inset-0 -z-10">
          <HeroVisual ready={scene === "ready"} onReady={onReady} onFail={onFail} anchorRef={anchorRef} />
        </div>
      )}

      {/* HUD layer */}
      <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-4 top-24 hidden sm:block lg:inset-x-6">
        <CropMark className="left-0 top-0 border-l border-t" />
        <CropMark className="right-0 top-0 border-r border-t" />
        <CropMark className="bottom-0 left-0 border-b border-l" />
        <CropMark className="bottom-0 right-0 border-b border-r" />
        <span className="absolute right-0 top-1/2 hidden h-[38%] w-2 -translate-y-1/2 bg-[repeating-linear-gradient(to_bottom,var(--color-line)_0_1px,transparent_1px_12px)] lg:block" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-10 pt-28 sm:px-10 lg:px-14 lg:pt-36">
        {/* Mobile/tablet: centred composition. Desktop (lg+): left-aligned editorial layout. */}
        <p className="label relative flex items-center justify-center gap-4 text-center text-silver lg:justify-start lg:text-left">
          <span aria-hidden className="hidden h-px w-10 shrink-0 bg-signal lg:block" />
          <span>Independent Technology &amp; AI Engineering Studio</span>
        </p>

        <h1
          id="hero-title"
          className="relative mt-8 text-center font-display font-bold leading-[0.86] tracking-[-0.05em] text-white [text-shadow:0_2px_40px_rgb(0_0_0_/_0.55)] lg:text-left text-[clamp(3.25rem,15.5vw,6.5rem)] md:text-[clamp(6rem,13vw,8.5rem)] lg:mt-10 lg:text-[clamp(6.5rem,10.6vw,12rem)]"
        >
          <span className="flex flex-wrap items-center justify-center gap-x-[0.24em] lg:flex-nowrap lg:justify-between lg:gap-x-[0.3em]">
            <span>Build</span>
            <span
              ref={anchorRef}
              aria-hidden
              className="relative order-last flex h-[min(80vw,30rem)] basis-full items-center justify-center lg:order-none lg:h-[1.7em] lg:min-w-[2.2em] lg:flex-1 lg:basis-auto lg:-translate-y-[0.08em]"
            >
              {/* Mobile/tablet: still render of the 3D model, placed exactly where the live scene puts it
                  (model centre at 42.25% / 52.23% of the image; image is 129.27% of this box's height). */}
              <Image
                src="/hero/zevron-3d-mobile.webp"
                alt=""
                width={1013}
                height={1210}
                quality={90}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 640px) 560px, 340px"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[129.27%] w-auto max-w-none -translate-x-[42.25%] -translate-y-[52.23%] [mask-image:linear-gradient(to_right,black_82%,transparent)] lg:hidden"
              />
              {desktop3D && scene === "fallback" && <LogoMark className="h-[80%] w-auto" />}
            </span>
            <span>what</span>
          </span>
          <span className="block lg:-mt-[0.18em] lg:text-right">
            comes <span className="text-metal">next</span>
            <span className="text-signal">.</span>
          </span>
        </h1>

        <div className="relative mt-16 lg:mt-auto lg:pt-20">
          <div className="relative grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
            <span aria-hidden className="absolute -top-px left-1/2 h-px w-16 -translate-x-1/2 bg-signal lg:left-0 lg:translate-x-0" />
            <p className="mx-auto max-w-md text-center text-base leading-relaxed text-silver lg:col-span-4 lg:mx-0 lg:text-left lg:text-[1.05rem]">
              We engineer digital products, intelligent software, and automation systems that turn complex business
              challenges into practical solutions.
            </p>
            <div className="flex flex-wrap items-start justify-center gap-3 lg:col-span-6 lg:col-start-7 lg:justify-end">
              <ButtonLink href={CONTACT_PATH}>Let&rsquo;s Build Something</ButtonLink>
              <ButtonLink href="#work" variant="secondary">
                Explore Our Work
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
