import type { ServiceVisual } from "@/lib/content";

// Hover transforms are driven by the parent `group/svc`.
const svgProps = { viewBox: "0 0 320 240", className: "h-full w-full", "aria-hidden": true } as const;

function WebVisual() {
  const plane = (y: number) => `60,${y} 160,${y - 50} 260,${y} 160,${y + 50}`;
  return (
    <svg {...svgProps}>
      <g className="svg-part opacity-0 group-hover/svc:opacity-100" stroke="#00D4FF" strokeDasharray="3 5" strokeWidth="1">
        <path d="M60 170V110M260 170V110M160 220V160" />
      </g>
      <polygon className="svg-part" points={plane(170)} fill="#101010" stroke="#292929" strokeWidth="1.5" />
      <polygon
        className="svg-part group-hover/svc:-translate-y-[14px]"
        points={plane(140)}
        fill="#171717"
        stroke="#9299A1"
        strokeWidth="1.5"
      />
      <polygon
        className="svg-part fill-signal/10 group-hover/svc:-translate-y-[34px] group-hover/svc:fill-signal/25"
        points={plane(110)}
        stroke="#EA6506"
        strokeWidth="1.5"
      />
      <g fontFamily="var(--font-plex-mono)" fontSize="9" letterSpacing="1.5" fill="#9299A1">
        <text x="272" y="174">DATA</text>
        <text x="272" y="144">API</text>
        <text x="272" y="114" fill="#EA6506">UI</text>
      </g>
    </svg>
  );
}

function SoftwareVisual() {
  const cells = Array.from({ length: 12 }, (_, i) => ({ c: i % 4, r: Math.floor(i / 4) }));
  const highlight = new Set([0, 4, 8, 9, 10]);
  return (
    <svg {...svgProps}>
      {cells.map(({ c, r }, i) => {
        const on = highlight.has(i);
        return (
          <rect
            key={i}
            x={62 + c * 50}
            y={50 + r * 50}
            width="42"
            height="42"
            className={`svg-part ${
              on
                ? "fill-elevated stroke-silver group-hover/svc:fill-signal group-hover/svc:stroke-signal"
                : "fill-black stroke-line group-hover/svc:opacity-40"
            } ${i === 3 ? "group-hover/svc:translate-x-[18px] group-hover/svc:-translate-y-[10px]" : ""}`}
            strokeWidth="1.5"
          />
        );
      })}
      <rect x="54" y="42" width="208" height="158" fill="none" stroke="#00D4FF" strokeDasharray="2 6" className="svg-part opacity-30 group-hover/svc:opacity-100" />
    </svg>
  );
}

function AgenticVisual() {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return { x: 160 + Math.cos(a) * 78, y: 120 + Math.sin(a) * 78, dx: Math.cos(a) * 10, dy: Math.sin(a) * 10 };
  });
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${160 + Math.cos(a) * 26},${120 + Math.sin(a) * 26}`;
  }).join(" ");
  return (
    <svg {...svgProps}>
      <circle cx="160" cy="120" r="102" fill="none" stroke="#292929" strokeDasharray="2 6" />
      {nodes.map((n, i) => (
        <line
          key={`l${i}`}
          x1="160"
          y1="120"
          x2={n.x}
          y2={n.y}
          className="svg-part stroke-line group-hover/svc:stroke-cyan"
          strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <rect
          key={`n${i}`}
          x={n.x - 8}
          y={n.y - 8}
          width="16"
          height="16"
          style={{ ["--dx" as string]: `${n.dx}px`, ["--dy" as string]: `${n.dy}px` }}
          className="svg-part fill-black stroke-silver group-hover/svc:translate-x-(--dx) group-hover/svc:translate-y-(--dy) group-hover/svc:stroke-cyan"
          strokeWidth="1.5"
        />
      ))}
      <polygon points={hex} className="svg-part fill-elevated stroke-signal group-hover/svc:fill-signal" strokeWidth="1.5" />
    </svg>
  );
}

function AutomationVisual() {
  const chevrons = [92, 136, 180, 224];
  return (
    <svg {...svgProps}>
      <path
        d="M40 120H280"
        stroke="#292929"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        className="transition-[stroke-dashoffset] duration-[1200ms] ease-precise [stroke-dashoffset:0] group-hover/svc:[stroke-dashoffset:-48]"
      />
      <circle cx="40" cy="120" r="9" fill="#000" stroke="#C7CDD4" strokeWidth="1.5" />
      <rect x="270" y="110" width="20" height="20" className="svg-part fill-black stroke-silver group-hover/svc:fill-signal group-hover/svc:stroke-signal" strokeWidth="1.5" />
      {chevrons.map((x, i) => (
        <path
          key={x}
          d={`M${x - 10} 96 L${x + 12} 120 L${x - 10} 144`}
          fill="none"
          strokeWidth="2"
          className={`svg-part group-hover/svc:translate-x-[12px] ${i === chevrons.length - 1 ? "stroke-signal" : "stroke-muted group-hover/svc:stroke-cyan"}`}
          style={{ transitionDelay: `${i * 60}ms` }}
        />
      ))}
      <g fontFamily="var(--font-plex-mono)" fontSize="9" letterSpacing="1.5" fill="#9299A1">
        <text x="28" y="160">IN</text>
        <text x="266" y="160">OUT</text>
      </g>
    </svg>
  );
}

export function ServiceGraphic({ kind }: { kind: ServiceVisual }) {
  switch (kind) {
    case "web":
      return <WebVisual />;
    case "software":
      return <SoftwareVisual />;
    case "agentic":
      return <AgenticVisual />;
    case "automation":
      return <AutomationVisual />;
  }
}
