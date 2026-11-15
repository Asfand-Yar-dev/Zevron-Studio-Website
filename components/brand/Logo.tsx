import { useId } from "react";
import { LOGO_BODY, LOGO_BOX, LOGO_TRI_LARGE, LOGO_TRI_SMALL, toPoints } from "@/lib/geometry";

// The official mark: orange Z body + two silver triangles, in its true proportions.
export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  const id = useId();
  const pad = 0.5;
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${LOGO_BOX.width + pad * 2} ${LOGO_BOX.height + pad * 2}`}
      className={className}
      style={{ aspectRatio: `${LOGO_BOX.width + pad * 2} / ${LOGO_BOX.height + pad * 2}` }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-signal`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#F2852A" />
          <stop offset="0.5" stopColor="#EA6506" />
          <stop offset="1" stopColor="#C95404" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#F5F5F5" />
          <stop offset="0.55" stopColor="#C7CDD4" />
          <stop offset="1" stopColor="#9299A1" />
        </linearGradient>
      </defs>
      <polygon points={toPoints(LOGO_BODY)} fill={`url(#${id}-signal)`} />
      <polygon points={toPoints(LOGO_TRI_LARGE)} fill={`url(#${id}-metal)`} />
      <polygon points={toPoints(LOGO_TRI_SMALL)} fill={`url(#${id}-metal)`} />
    </svg>
  );
}

export function Logo({ compact = false, markClassName = "h-8 w-auto" }: { compact?: boolean; markClassName?: string }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={`${markClassName} shrink-0`} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-bold tracking-[0.18em] text-white">ZEVRON</span>
          <span className="label mt-1 text-[0.55rem] tracking-[0.42em] text-muted">Studio</span>
        </span>
      )}
    </span>
  );
}
