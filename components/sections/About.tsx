import { LOGO_BODY, LOGO_BOX, LOGO_TRI_LARGE, LOGO_TRI_SMALL, type Point } from "@/lib/geometry";
import { SectionTag } from "@/components/ui/SectionTag";

// Drawing space: logo units scaled by S, offset to (OX, OY) inside a 560×500 sheet.
const S = 5.6;
const OX = 50;
const OY = 96;
const X = (x: number) => OX + x * S;
const Y = (y: number) => OY + y * S;
const pts = (p: Point[]) => p.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ");
const centroid = (p: Point[]) => [p.reduce((s, [x]) => s + x, 0) / p.length, p.reduce((s, [, y]) => s + y, 0) / p.length];
const mono = { fontFamily: "var(--font-plex-mono)", fontSize: 10, letterSpacing: 1.6 } as const;

// Construction drawing of the official mark: real geometry, real measurements, annotated.
function Blueprint() {
  const { width: W, height: H } = LOGO_BOX;
  // The Z's main diagonal runs from the body's bottom-left corner up to the top bar's inner corner.
  const [bx, by] = LOGO_BODY[4];
  const [tx, ty] = LOGO_BODY[3];
  const angle = Math.atan2(by - ty, tx - bx);
  const angleDeg = (angle * 180) / Math.PI;
  const r = 52;
  const [lx, ly] = centroid(LOGO_TRI_LARGE);
  const [sx, sy] = centroid(LOGO_TRI_SMALL);

  return (
    <svg viewBox="0 0 560 500" className="h-auto w-full" role="img" aria-label="Construction drawing of the Zevron mark">
      {/* 10-unit construction grid over the mark's bounding box */}
      <g stroke="#292929" strokeWidth="1" opacity="0.6">
        {Array.from({ length: Math.floor(W / 10) + 1 }, (_, i) => (
          <path key={`v${i}`} d={`M${X(i * 10)} ${Y(0)}V${Y(H)}`} />
        ))}
        {Array.from({ length: Math.floor(H / 10) + 1 }, (_, i) => (
          <path key={`h${i}`} d={`M${X(0)} ${Y(i * 10)}H${X(W)}`} />
        ))}
        <rect x={X(0)} y={Y(0)} width={W * S} height={H * S} fill="none" />
      </g>

      {/* Diagonal construction line, extended to the top of the box */}
      <path
        d={`M${X(bx)} ${Y(by)}L${X(bx + (by * (tx - bx)) / (by - ty))} ${Y(0)}`}
        stroke="#00D4FF"
        strokeOpacity="0.3"
        strokeDasharray="4 6"
      />

      <polygon points={pts(LOGO_BODY)} fill="#EA6506" fillOpacity="0.14" stroke="#EA6506" strokeWidth="1.5" />
      <polygon points={pts(LOGO_TRI_LARGE)} fill="#C7CDD4" fillOpacity="0.08" stroke="#C7CDD4" strokeWidth="1.5" />
      <polygon points={pts(LOGO_TRI_SMALL)} fill="#C7CDD4" fillOpacity="0.08" stroke="#C7CDD4" strokeWidth="1.5" />

      {/* Width dimension */}
      <g stroke="#9299A1">
        <path d={`M${X(0)} ${Y(0) - 40}V${Y(0) - 26}M${X(W)} ${Y(0) - 40}V${Y(0) - 26}`} />
        <path d={`M${X(0)} ${Y(0) - 33}H${X(W)}`} />
      </g>
      <rect x={X(W / 2) - 26} y={Y(0) - 41} width="52" height="16" fill="#101010" />
      <text x={X(W / 2)} y={Y(0) - 29} textAnchor="middle" fill="#C7CDD4" style={mono}>
        {W.toFixed(1)}
      </text>

      {/* Height dimension */}
      <g stroke="#9299A1">
        <path d={`M${X(0) - 36} ${Y(0)}H${X(0) - 22}M${X(0) - 36} ${Y(H)}H${X(0) - 22}`} />
        <path d={`M${X(0) - 29} ${Y(0)}V${Y(H)}`} />
      </g>
      <text
        x={X(0) - 29}
        y={Y(H / 2)}
        fill="#C7CDD4"
        style={mono}
        textAnchor="middle"
        transform={`rotate(-90 ${X(0) - 29} ${Y(H / 2)})`}
        dy="-6"
      >
        {H.toFixed(1)}
      </text>

      {/* Diagonal angle at the body's base */}
      <path d={`M${X(bx)} ${Y(by)}H${X(bx) + r + 26}`} stroke="#00D4FF" strokeOpacity="0.6" strokeDasharray="3 4" />
      <path
        d={`M${X(bx) + r} ${Y(by)} A ${r} ${r} 0 0 0 ${X(bx) + r * Math.cos(angle)} ${Y(by) - r * Math.sin(angle)}`}
        fill="none"
        stroke="#00D4FF"
      />
      <text x={X(bx) + r + 8} y={Y(by) - 18} fill="#00D4FF" style={mono}>
        {angleDeg.toFixed(1)}°
      </text>

      {/* Callouts on the defining cuts */}
      <circle cx={X(W)} cy={Y(LOGO_BODY[6][1])} r="12" fill="none" stroke="#9299A1" strokeDasharray="2 3" />
      <circle cx={X(LOGO_TRI_LARGE[1][0])} cy={Y(LOGO_TRI_LARGE[1][1])} r="12" fill="none" stroke="#9299A1" strokeDasharray="2 3" />

      {/* Leaders */}
      {[
        { x: lx, y: ly, n: "01", t: "SCALE", c: "#C7CDD4" },
        { x: sx, y: sy, n: "02", t: "SPEED", c: "#C7CDD4" },
        { x: 60, y: 47.5, n: "03", t: "STRUCTURE", c: "#EA6506" },
      ].map((l) => (
        <g key={l.n}>
          <circle cx={X(l.x)} cy={Y(l.y)} r="3" fill={l.c} />
          <path d={`M${X(l.x)} ${Y(l.y)}H${478}`} stroke={l.c} strokeOpacity="0.6" />
          <text x="484" y={Y(l.y) - 6} fill="#9299A1" style={mono}>
            {l.n}
          </text>
          <text x="484" y={Y(l.y) + 10} fill={l.c} style={mono}>
            {l.t}
          </text>
        </g>
      ))}
    </svg>
  );
}

const PRINCIPLES = ["The right systems", "Meaningful problems", "Room for growth"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-t border-line bg-black py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag index="04" label="About Zevron" />

        <h2
          id="about-title"
          className="mt-12 text-center font-display text-[clamp(3.25rem,10vw,11rem)] font-bold leading-[0.86] tracking-[-0.055em] text-white lg:mt-16 lg:text-left"
        >
          Engineered
          <span className="block lg:text-right">
            <span className="text-metal">for What&rsquo;s Next</span>
            <span className="text-signal">.</span>
          </span>
        </h2>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-6">
            <div className="border border-line bg-surface p-5 sm:p-8">
              <Blueprint />
            </div>
            <figcaption className="label mt-4 flex justify-between text-[0.6rem] text-muted">
              <span>Mark construction</span>
              <span className="text-silver">10-unit grid</span>
            </figcaption>
          </figure>

          <div className="flex flex-col lg:col-span-5 lg:col-start-8">
            <p className="text-center font-display text-[1.65rem] font-medium leading-[1.25] tracking-[-0.02em] text-white sm:text-[2.1rem] lg:text-left">
              Zevron Studio brings together software engineering, modern web technologies, and intelligent automation
              to create solutions that make businesses <span className="text-signal">more capable.</span>
            </p>

            <div className="label mt-12 flex items-center gap-4 text-[0.6rem] text-muted">
              <span className="h-px flex-1 bg-line lg:hidden" />
              <span className="text-cyan">Belief</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <p className="mx-auto mt-6 max-w-lg text-center text-lg leading-relaxed text-silver lg:mx-0 lg:text-left">
              We believe great technology is not just about writing code. It&rsquo;s about building the right systems,
              solving meaningful problems, and creating room for growth.
            </p>

            <ol className="mt-auto grid gap-px border border-line bg-line pt-px sm:grid-cols-3 lg:mt-16">
              {PRINCIPLES.map((p, i) => (
                <li key={p} className="group/p bg-black p-5 text-center transition-colors duration-300 hover:bg-elevated lg:text-left">
                  <span className="label text-[0.6rem] text-signal">0{i + 1}</span>
                  <p className="mt-6 font-display text-lg font-medium leading-tight text-white">{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
