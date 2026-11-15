import { useId, type ReactNode } from "react";
import type { ProjectVisual as VisualKind } from "@/lib/content";

// Brand palette for SVG compositions.
const C = {
  black: "#000000",
  surface: "#101010",
  elevated: "#171717",
  line: "#292929",
  muted: "#9299A1",
  silver: "#C7CDD4",
  white: "#F5F5F5",
  signal: "#EA6506",
  cyan: "#00D4FF",
};

type Align = "xMidYMid" | "xMinYMin" | "xMinYMid" | "xMaxYMid";

const mono = { fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.12em" } as const;
const display = { fontFamily: "var(--font-space-grotesk), sans-serif", letterSpacing: "-0.03em" } as const;

function Frame({ children, label, align = "xMidYMid" }: { children: ReactNode; label: string; align?: Align }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio={`${align} slice`}
      className="h-full w-full"
      role="img"
      aria-label={label}
    >
      <defs>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={C.line} strokeWidth="1" opacity="0.45" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor={C.elevated} />
          <stop offset="1" stopColor={C.black} />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id}-glow)`} />
      <rect width="1600" height="900" fill={`url(#${id}-grid)`} />
      {children}
    </svg>
  );
}

function Mono({ x, y, children, fill = C.muted, size = 14, anchor }: { x: number; y: number; children: ReactNode; fill?: string; size?: number; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} fill={fill} fontSize={size} style={mono} textAnchor={anchor}>
      {children}
    </text>
  );
}

function Bar({ x, y, w, h = 10, fill = C.line, r = 3 }: { x: number; y: number; w: number; h?: number; fill?: string; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />;
}

/* 01 — Meridian: composable web platform */
function PlatformVisual({ align }: { align?: Align }) {
  const modules = ["HERO", "FEATURE_GRID", "MEDIA_SPLIT", "CTA_BAND", "FOOTER"];
  return (
    <Frame label="Concept preview of Meridian, a composable web platform" align={align}>
      {/* Browser window */}
      <g>
        <rect x="330" y="110" width="1180" height="860" rx="16" fill={C.surface} stroke={C.line} strokeWidth="2" />
        <path d="M330 168H1510" stroke={C.line} strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={366 + i * 26} cy="139" r="7" fill={C.line} />
        ))}
        <rect x="560" y="124" width="520" height="30" rx="15" fill={C.elevated} />
        <Mono x={584} y={144} size={13}>meridian.concept / home</Mono>

        {/* Page nav */}
        <rect x="390" y="206" width="22" height="22" fill={C.signal} />
        <Bar x={424} y={211} w={110} h={12} fill={C.silver} />
        {[0, 1, 2, 3].map((i) => (
          <Bar key={i} x={1080 + i * 90} y={212} w={60} fill={C.line} />
        ))}

        {/* Hero */}
        <text x="390" y="360" fill={C.white} fontSize="76" fontWeight="700" style={display}>
          Composable
        </text>
        <text x="390" y="440" fill={C.silver} fontSize="76" fontWeight="700" style={display}>
          by design.
        </text>
        <Bar x={392} y={480} w={420} h={12} fill={C.line} />
        <Bar x={392} y={504} w={340} h={12} fill={C.line} />
        <rect x="392" y="545" width="170" height="48" fill={C.signal} />
        <Bar x={420} y={564} w={100} h={10} fill={C.black} />

        {/* Hero media: geometric composition */}
        <rect x="1010" y="270" width="440" height="330" fill={C.elevated} stroke={C.line} strokeWidth="2" />
        <polygon points="1130,560 1230,310 1330,310 1230,560" fill={C.signal} />
        <rect x="1060" y="320" width="120" height="16" fill={C.silver} />
        <rect x="1280" y="534" width="120" height="16" fill={C.silver} />
        <rect x="1008" y="268" width="444" height="334" fill="none" stroke={C.cyan} strokeWidth="2" strokeDasharray="6 6" />
        <Mono x={1012} y={258} size={12} fill={C.cyan}>MEDIA_SPLIT</Mono>

        {/* Module grid */}
        {[0, 1, 2].map((i) => {
          const x = 390 + i * 362;
          const active = i === 1;
          return (
            <g key={i}>
              <rect x={x} y="650" width="338" height="260" fill={C.elevated} stroke={active ? C.signal : C.line} strokeWidth="2" />
              <rect x={x + 28} y="680" width="44" height="44" fill="none" stroke={active ? C.signal : C.muted} strokeWidth="2" />
              <Bar x={x + 28} y={752} w={200} h={14} fill={C.silver} />
              <Bar x={x + 28} y={780} w={260} fill={C.line} />
              <Bar x={x + 28} y={800} w={220} fill={C.line} />
            </g>
          );
        })}
        <Mono x={754} y={638} size={12} fill={C.signal}>FEATURE_GRID · 3 COL</Mono>
      </g>

      {/* Component library panel */}
      <g>
        <rect x="70" y="250" width="330" height="440" rx="10" fill={C.black} stroke={C.line} strokeWidth="2" />
        <Mono x={98} y={292} size={13} fill={C.silver}>COMPONENTS</Mono>
        <Mono x={372} y={292} size={13} anchor="end">05</Mono>
        <path d="M98 312H372" stroke={C.line} />
        {modules.map((m, i) => {
          const y = 344 + i * 66;
          const linked = i === 1 || i === 2;
          return (
            <g key={m}>
              <rect x="98" y={y - 26} width="274" height="48" rx="6" fill={linked ? C.elevated : "none"} stroke={linked ? C.cyan : C.line} />
              <rect x="116" y={y - 8} width="12" height="12" fill={linked ? C.cyan : C.line} />
              <Mono x={144} y={y + 3} size={13} fill={linked ? C.white : C.muted}>{m}</Mono>
            </g>
          );
        })}
      </g>

      {/* Bindings from library to page */}
      <path d="M372 384 C 480 384, 520 640, 600 650" fill="none" stroke={C.cyan} strokeWidth="2" strokeDasharray="5 7" />
      <path d="M372 450 C 640 450, 780 280, 1008 300" fill="none" stroke={C.cyan} strokeWidth="2" strokeDasharray="5 7" />
      <circle cx="600" cy="650" r="5" fill={C.cyan} />
      <circle cx="1008" cy="300" r="5" fill={C.cyan} />
    </Frame>
  );
}

/* 02 — Ledgerline: operations console */
function SoftwareVisual({ align }: { align?: Align }) {
  const bars = [0.42, 0.55, 0.48, 0.7, 0.62, 0.8, 0.58, 0.66, 0.74, 0.5, 0.86, 0.68, 0.9, 0.76];
  const approvals = [
    { status: "REVIEW", color: C.signal },
    { status: "APPROVED", color: C.cyan },
    { status: "APPROVED", color: C.cyan },
    { status: "REVIEW", color: C.signal },
    { status: "QUEUED", color: C.muted },
  ];
  return (
    <Frame label="Concept preview of Ledgerline, an operations console" align={align}>
      <rect x="80" y="70" width="1600" height="900" rx="16" fill={C.surface} stroke={C.line} strokeWidth="2" />
      {/* Sidebar */}
      <path d="M330 70V970" stroke={C.line} strokeWidth="2" />
      <rect x="112" y="108" width="24" height="24" fill={C.signal} />
      <text x="150" y="128" fill={C.white} fontSize="22" fontWeight="700" style={display}>Ledgerline</text>
      {["OVERVIEW", "ORDERS", "INVENTORY", "APPROVALS", "AUDIT LOG", "SETTINGS"].map((item, i) => (
        <g key={item}>
          {i === 3 && <rect x="80" y={188 + i * 52} width="4" height="36" fill={C.signal} />}
          <rect x="112" y={198 + i * 52} width="14" height="14" fill="none" stroke={i === 3 ? C.signal : C.muted} strokeWidth="2" />
          <Mono x={142} y={211 + i * 52} size={13} fill={i === 3 ? C.white : C.muted}>{item}</Mono>
        </g>
      ))}

      {/* Header */}
      <text x="380" y="140" fill={C.white} fontSize="40" fontWeight="700" style={display}>Operations</text>
      <rect x="1150" y="105" width="300" height="44" rx="6" fill={C.elevated} stroke={C.line} />
      <Mono x={1172} y={133} size={13}>SEARCH ORDERS…</Mono>

      {/* Status tiles */}
      {["ORDERS", "INVENTORY", "APPROVALS", "SYNC"].map((t, i) => {
        const x = 380 + i * 272;
        const path = `M${x + 24} 300 ${[0, 1, 2, 3, 4, 5, 6].map((k) => `L${x + 24 + k * 36} ${300 - [10, 26, 18, 40, 30, 52, 44][(k + i) % 7]}`).join(" ")}`;
        return (
          <g key={t}>
            <rect x={x} y="190" width="248" height="140" rx="8" fill={C.elevated} stroke={C.line} />
            <Mono x={x + 24} y={226} size={12}>{t}</Mono>
            <rect x={x + 168} y="210" width="58" height="22" rx="11" fill="none" stroke={i === 2 ? C.signal : C.cyan} />
            <Mono x={x + 197} y={225} size={10} fill={i === 2 ? C.signal : C.cyan} anchor="middle">{i === 2 ? "OPEN" : "LIVE"}</Mono>
            <path d={path} fill="none" stroke={i === 2 ? C.signal : C.silver} strokeWidth="2.5" />
          </g>
        );
      })}

      {/* Throughput chart */}
      <rect x="380" y="360" width="700" height="440" rx="8" fill={C.elevated} stroke={C.line} />
      <Mono x={408} y={400} size={12} fill={C.silver}>WEEKLY THROUGHPUT</Mono>
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M408 ${480 + k * 70}H1052`} stroke={C.line} strokeDasharray="3 6" />
      ))}
      {bars.map((b, i) => {
        const h = b * 260;
        return <rect key={i} x={420 + i * 45} y={730 - h} width="26" height={h} fill={i === bars.length - 2 ? C.signal : C.silver} opacity={i === bars.length - 2 ? 1 : 0.35 + b * 0.5} />;
      })}
      {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, i) => (
        <Mono key={d} x={433 + i * 90} y={768} size={11} anchor="middle">{d}</Mono>
      ))}

      {/* Approvals queue */}
      <rect x="1108" y="360" width="400" height="560" rx="8" fill={C.elevated} stroke={C.line} />
      <Mono x={1136} y={400} size={12} fill={C.silver}>APPROVAL QUEUE</Mono>
      {approvals.map((a, i) => {
        const y = 430 + i * 84;
        return (
          <g key={i}>
            <path d={`M1136 ${y + 70}H1480`} stroke={C.line} />
            <circle cx="1156" cy={y + 34} r="16" fill={C.line} />
            <Bar x={1186} y={y + 22} w={150 - (i % 3) * 20} h={10} fill={C.silver} />
            <Bar x={1186} y={y + 40} w={100} h={8} fill={C.line} />
            <rect x="1376" y={y + 22} width="104" height="24" rx="12" fill="none" stroke={a.color} />
            <Mono x={1428} y={y + 38} size={10} fill={a.color} anchor="middle">{a.status}</Mono>
          </g>
        );
      })}
    </Frame>
  );
}

/* 03 — Atlas: knowledge agent */
function AgentVisual({ align }: { align?: Align }) {
  const node = (x: number, y: number, label: string, state: "idle" | "active" | "done" = "idle", w = 170) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height="64" rx="8" fill={state === "active" ? C.signal : C.elevated} stroke={state === "idle" ? C.line : state === "done" ? C.cyan : C.signal} strokeWidth="2" />
      <Mono x={x + 20} y={y + 39} size={14} fill={state === "active" ? C.black : state === "done" ? C.white : C.muted}>{label}</Mono>
    </g>
  );
  return (
    <Frame label="Concept preview of Atlas, a knowledge agent with a reasoning graph" align={align}>
      {/* Conversation panel */}
      <rect x="60" y="80" width="560" height="760" rx="14" fill={C.surface} stroke={C.line} strokeWidth="2" />
      <Mono x={92} y={126} size={13} fill={C.silver}>ATLAS · KNOWLEDGE AGENT</Mono>
      <circle cx="580" cy="121" r="6" fill={C.cyan} />
      <path d="M60 150H620" stroke={C.line} strokeWidth="2" />
      <rect x="200" y="186" width="380" height="96" rx="12" fill={C.elevated} stroke={C.line} />
      <text x="224" y="226" fill={C.white} fontSize="21" style={{ ...display, letterSpacing: "0" }}>Which policies changed</text>
      <text x="224" y="256" fill={C.white} fontSize="21" style={{ ...display, letterSpacing: "0" }}>since the last review?</text>

      <rect x="92" y="316" width="440" height="250" rx="12" fill={C.black} stroke={C.cyan} strokeOpacity="0.5" />
      <Mono x={116} y={350} size={11} fill={C.cyan}>ANSWER · 3 SOURCES</Mono>
      {[0, 1, 2, 3, 4].map((i) => (
        <Bar key={i} x={116} y={376 + i * 28} w={[380, 340, 390, 300, 240][i]} h={10} fill={i < 2 ? C.silver : C.line} />
      ))}
      {["[1]", "[2]", "[3]"].map((c, i) => (
        <g key={c}>
          <rect x={116 + i * 74} y="516" width="60" height="28" rx="4" fill="none" stroke={C.signal} />
          <Mono x={146 + i * 74} y={535} size={12} fill={C.signal} anchor="middle">{c}</Mono>
        </g>
      ))}

      <rect x="92" y="740" width="496" height="64" rx="10" fill={C.elevated} stroke={C.line} />
      <Mono x={116} y={778} size={13}>ASK ATLAS…</Mono>
      <rect x="532" y="752" width="40" height="40" rx="6" fill={C.signal} />

      {/* Reasoning graph */}
      <Mono x={700} y={140} size={13} fill={C.silver}>REASONING TRACE</Mono>
      <path d="M700 160H1540" stroke={C.line} />
      <g fill="none" stroke={C.cyan} strokeWidth="2">
        <path d="M870 292H930" />
        <path d="M1100 292 C 1150 292, 1150 200, 1200 200" />
        <path d="M1100 292H1200" />
        <path d="M1100 292 C 1150 292, 1150 384, 1200 384" />
        <path d="M1370 200 C 1420 200, 1420 520, 1100 560 C 1040 568, 1010 600, 1010 640" strokeOpacity="0.5" />
        <path d="M1370 292 C 1440 292, 1440 540, 1100 580" strokeOpacity="0.5" />
        <path d="M1370 384 C 1400 384, 1400 520, 1180 600" strokeOpacity="0.5" />
      </g>
      {node(700, 260, "QUERY", "done")}
      {node(930, 260, "PLAN", "done")}
      {node(1200, 168, "RETRIEVE", "done")}
      {node(1200, 260, "SEARCH DOCS", "done")}
      {node(1200, 352, "CHECK POLICY", "done")}
      {node(930, 640, "VERIFY", "active")}
      <path d="M1100 672H1200" stroke={C.line} strokeWidth="2" strokeDasharray="6 6" />
      {node(1200, 640, "RESPOND")}
      <path d="M1015 704 C 1015 760, 860 760, 860 800" stroke={C.line} strokeWidth="2" strokeDasharray="6 6" fill="none" />
      {node(760, 800, "HAND OFF → HUMAN", "idle", 240)}

      {/* Confidence meter — qualitative, no figures */}
      <Mono x={1200} y={790} size={12}>CONFIDENCE CHECK</Mono>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={1200 + i * 26} y="808" width="18" height="24" fill={i < 9 ? C.cyan : C.line} opacity={i < 9 ? 0.4 + i * 0.06 : 1} />
      ))}
    </Frame>
  );
}

/* 04 — Relay: intake automation */
function AutomationVisual({ align }: { align?: Align }) {
  const steps = [
    { x: 150, label: "TRIGGER", sub: "Inbox + forms" },
    { x: 480, label: "CLASSIFY", sub: "LLM" },
    { x: 810, label: "EXTRACT", sub: "Fields" },
    { x: 1140, label: "ROUTE", sub: "Rules" },
  ];
  // Track sits high and the log sits right, leaving the lower-left clear for the overlay panel.
  const TY = 260;
  const outputs = [
    { y: TY - 150, label: "CRM", color: C.cyan },
    { y: TY, label: "TEAM CHANNEL", color: C.cyan },
    { y: TY + 150, label: "REVIEW QUEUE", color: C.signal },
  ];
  const log = [
    ["09:41:02", "request.received", C.muted],
    ["09:41:03", "classified → support.billing", C.silver],
    ["09:41:03", "extracted → account, priority, summary", C.silver],
    ["09:41:04", "routed → crm.ticket + team.channel", C.cyan],
    ["09:41:09", "low confidence → review.queue", C.signal],
  ] as const;
  return (
    <Frame label="Concept preview of Relay, an intake automation workflow" align={align}>
      {/* Main track */}
      <path d={`M150 ${TY}H1290`} stroke={C.line} strokeWidth="2" />
      <path d={`M150 ${TY}H1140`} stroke={C.signal} strokeWidth="3" />
      {outputs.map((o) => (
        <path key={o.label} d={`M1290 ${TY} C 1340 ${TY}, 1340 ${o.y}, 1390 ${o.y}`} fill="none" stroke={o.color} strokeWidth="2" strokeOpacity="0.8" />
      ))}
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y={TY - 60} width="150" height="120" rx="10" fill={C.elevated} stroke={i === 1 ? C.signal : C.line} strokeWidth="2" />
          <Mono x={s.x + 20} y={TY - 26} size={11} fill={C.signal}>0{i + 1}</Mono>
          <Mono x={s.x + 20} y={TY + 10} size={15} fill={C.white}>{s.label}</Mono>
          <Mono x={s.x + 20} y={TY + 38} size={12}>{s.sub}</Mono>
          {/* packets */}
          {i < steps.length - 1 && (
            <>
              <rect x={s.x + 200} y={TY - 6} width="12" height="12" fill={C.signal} />
              <rect x={s.x + 236} y={TY - 4} width="8" height="8" fill={C.signal} opacity="0.5" />
            </>
          )}
        </g>
      ))}
      {/* Drop from ROUTE into the log */}
      <path d={`M1215 ${TY + 60}V470`} stroke={C.line} strokeWidth="2" strokeDasharray="4 6" />
      {outputs.map((o) => (
        <g key={o.label}>
          <rect x="1390" y={o.y - 36} width="190" height="72" rx="10" fill={C.black} stroke={o.color} strokeWidth="2" />
          <Mono x={1414} y={o.y + 5} size={13} fill={C.white}>{o.label}</Mono>
        </g>
      ))}

      {/* Execution log */}
      <rect x="700" y="470" width="880" height="320" rx="12" fill={C.surface} stroke={C.line} strokeWidth="2" />
      <Mono x={730} y={510} size={12} fill={C.silver}>EXECUTION LOG · RUN 0142</Mono>
      <path d="M700 530H1580" stroke={C.line} />
      {log.map(([t, msg, color], i) => (
        <g key={i}>
          <Mono x={730} y={574 + i * 42} size={14}>{t}</Mono>
          <Mono x={880} y={574 + i * 42} size={14} fill={color}>{msg}</Mono>
        </g>
      ))}
    </Frame>
  );
}

export function ProjectVisual({ kind, align }: { kind: VisualKind; align?: Align }) {
  switch (kind) {
    case "platform":
      return <PlatformVisual align={align} />;
    case "software":
      return <SoftwareVisual align={align} />;
    case "agent":
      return <AgentVisual align={align} />;
    case "automation":
      return <AutomationVisual align={align} />;
  }
}
