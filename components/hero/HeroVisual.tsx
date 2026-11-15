"use client";

import dynamic from "next/dynamic";
import type { RefObject } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type Props = {
  ready: boolean;
  onReady: () => void;
  onFail: () => void;
  anchorRef: RefObject<HTMLElement | null>;
};

export function HeroVisual({ ready, ...sceneProps }: Props) {
  return (
    <div aria-hidden className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
      <HeroScene {...sceneProps} />
    </div>
  );
}
