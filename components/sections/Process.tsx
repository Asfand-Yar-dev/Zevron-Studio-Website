import { PROCESS } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";

// Deterministic "complexity" strands that converge into a single line.
const STRANDS = Array.from({ length: 11 }, (_, k) => {
  const y = 12 + k * 19.6;
  const wobble = (n: number) => ((Math.sin(k * 12.9898 + n * 78.233) * 43758.5453) % 1) * 60;
  return `M0 ${y.toFixed(1)} C 70 ${(y + wobble(1)).toFixed(1)}, 130 ${(110 - wobble(2)).toFixed(1)}, 200 ${(
    y + wobble(3)
  ).toFixed(1)} S 330 ${(110 + wobble(4) * 0.3).toFixed(1)}, 400 110`;
});

function Tangle({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="none" className={className} aria-hidden>
      {STRANDS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i === 4 ? "#00D4FF" : "#C7CDD4"}
          strokeOpacity={i === 4 ? 0.7 : 0.12 + (i % 4) * 0.08}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden border-t border-line bg-black py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag index="03" label="Engineering Process" />

        <header className="mt-12 flex flex-col items-center gap-8 text-center lg:mt-16 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <h2
            id="process-title"
            className="font-display text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white"
          >
            From Complexity
            <span className="block text-metal">
              to Clarity<span className="text-signal">.</span>
            </span>
          </h2>
          <dl className="label grid grid-cols-2 gap-x-8 gap-y-2 text-[0.6rem] text-muted lg:pb-5">
            <dt>Stages</dt>
            <dd className="text-silver">04</dd>
            <dt>Mode</dt>
            <dd className="text-silver">Iterative</dd>
            <dt>Output</dt>
            <dd className="text-cyan">Clarity</dd>
          </dl>
        </header>

        <div className="mt-20 grid lg:mt-28 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))]">
          {/* Input: complexity */}
          <div className="relative pb-12 lg:pb-0">
            <Tangle className="h-40 w-full lg:h-[220px]" />
            <p className="label mt-6 text-center text-[0.6rem] text-muted lg:text-left">
              <span className="text-silver">Input</span> scattered requirements, disconnected tools, manual work
            </p>
          </div>

          {PROCESS.map((step, i) => (
            <div key={step.index} className="group/stage relative pb-14 pl-16 lg:pb-0 lg:pl-0">
              {/* Rail */}
              <div aria-hidden className="absolute bottom-0 left-0 top-0 w-11 lg:relative lg:h-[220px] lg:w-full">
                <span className="absolute bottom-0 left-1/2 top-0 w-px bg-signal lg:left-0 lg:right-0 lg:top-1/2 lg:h-px lg:w-auto" />
                <span className="absolute bottom-0 left-1/2 top-0 w-px origin-top scale-y-0 bg-cyan transition-transform duration-700 ease-precise group-hover/stage:scale-y-100 lg:left-0 lg:right-0 lg:top-1/2 lg:h-px lg:w-auto lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:group-hover/stage:scale-x-100" />
                <span className="chamfer absolute left-0 top-0 flex h-11 w-11 items-center justify-center bg-silver/50 lg:top-1/2 lg:-translate-y-1/2">
                  <span className="chamfer absolute inset-px bg-black transition-colors duration-300 group-hover/stage:bg-signal" />
                  <span className="label relative text-white transition-colors group-hover/stage:text-black">{step.index}</span>
                </span>
                <span className="label absolute left-14 top-3 hidden text-[0.55rem] text-muted lg:left-0 lg:top-[calc(50%-3.25rem)] lg:block">
                  Stage {step.index}
                </span>
                {/* Ticks */}
                <span className="absolute left-14 right-4 top-[calc(50%+1.25rem)] hidden h-2 bg-[repeating-linear-gradient(to_right,var(--color-line)_0_1px,transparent_1px_10px)] lg:block" />
                {i === PROCESS.length - 1 && (
                  <span className="absolute -right-1 top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-signal lg:block" />
                )}
              </div>

              <div className="lg:pr-8">
                <h3 className="font-display text-4xl font-semibold tracking-[-0.03em] text-white lg:mt-2">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-silver transition-colors group-hover/stage:text-white lg:min-h-[5.25rem]">
                  {step.description}
                </p>
                <dl className="label mt-6 grid max-w-xs gap-2 border-t border-line pt-4 text-[0.6rem] text-muted">
                  <div className="flex justify-between gap-4">
                    <dt>In</dt>
                    <dd className="text-right text-silver">{step.input}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Out</dt>
                    <dd className="text-right text-white">{step.output}</dd>
                  </div>
                </dl>
                <div aria-hidden className="mt-4 flex max-w-xs gap-1">
                  {PROCESS.map((_, k) => (
                    <span key={k} className={`h-1 flex-1 ${k <= i ? "bg-signal" : "bg-line"}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
