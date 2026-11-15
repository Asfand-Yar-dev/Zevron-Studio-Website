import { BrainCircuit, CodeXml, Globe, Headset, Presentation, Rocket, type LucideIcon } from "lucide-react";
import { TRUST, type TrustIcon } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";

const ICONS: Record<TrustIcon, LucideIcon> = {
  demo: Presentation,
  speed: Rocket,
  local: Globe,
  ai: BrainCircuit,
  code: CodeXml,
  support: Headset,
};

export function Trust() {
  return (
    <section id="trust" aria-labelledby="trust-title" className="relative overflow-hidden border-t border-line bg-black py-16 lg:py-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_65%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag label={TRUST.label} />

        <header className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2
            id="trust-title"
            className="text-center font-display text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white lg:col-span-8 lg:text-left"
          >
            {TRUST.titleLines[0]}
            <span className="block text-metal">
              {TRUST.titleLines[1]}
              <span className="text-signal">.</span>
            </span>
          </h2>
          <p className="mx-auto max-w-sm text-center font-display text-xl font-medium leading-snug text-silver lg:col-span-4 lg:mx-0 lg:pb-4 lg:text-left">
            {TRUST.subtitle}
          </p>
        </header>

        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {TRUST.points.map((point, i) => {
            const Icon = ICONS[point.icon];
            return (
              <li
                key={point.title}
                className="group/trust relative flex flex-col items-center bg-black p-8 text-center transition-colors duration-300 hover:bg-elevated lg:items-start lg:p-10 lg:text-left"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-precise group-hover/trust:scale-x-100"
                />
                <div className="flex w-full items-center justify-center lg:justify-between">
                  <span className="relative flex h-12 w-12 items-center justify-center text-silver transition-colors duration-300 group-hover/trust:text-black">
                    <span aria-hidden className="chamfer absolute inset-0 bg-signal opacity-0 transition-opacity duration-300 group-hover/trust:opacity-100" />
                    <span aria-hidden className="chamfer-frame absolute inset-0 bg-line transition-colors duration-300 group-hover/trust:bg-signal" />
                    <Icon aria-hidden className="relative h-5 w-5" />
                  </span>
                  <span aria-hidden className="label hidden text-[0.6rem] text-signal lg:inline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.02em] text-white">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-silver">{point.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
