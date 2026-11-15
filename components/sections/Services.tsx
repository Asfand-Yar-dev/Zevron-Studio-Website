import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, SERVICES_PATH } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";
import { ServiceGraphic } from "@/components/visuals/ServiceVisuals";

// Ascending offsets form a stepped rail: foundations → intelligent systems.
const STEP = ["lg:mt-[4.5rem]", "lg:mt-12", "lg:mt-6", "lg:mt-0"];
const LAYER = ["Foundation", "Operations", "Intelligence", "Autonomy"];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden border-t border-line bg-surface py-16 lg:py-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag index="02" label="Services" />

        <header className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:self-end lg:pb-6 lg:text-left">
            <p className="max-w-sm text-lg leading-relaxed text-silver">
              From digital foundations to intelligent systems, we build technology that moves businesses forward.
            </p>
            <Link
              href={SERVICES_PATH}
              className="group/all mt-6 inline-flex items-center gap-3 font-display text-sm font-semibold text-signal transition-colors hover:text-white"
            >
              View all services
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 ease-precise group-hover/all:rotate-45" />
            </Link>
          </div>
          <h2
            id="services-title"
            className="text-center font-display text-[clamp(3.25rem,9vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.05em] text-white lg:col-span-8 lg:text-right"
          >
            What We
            <span className="block">
              Engineer<span className="text-signal">.</span>
            </span>
          </h2>
        </header>

        <div className="relative mt-14 lg:mt-12">
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <li
                key={s.index}
                className={`group/svc relative border-t border-line ${STEP[i]} sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0`}
              >
                {/* Rail highlight + junction node */}
                <span aria-hidden className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-precise group-hover/svc:scale-x-100" />
                <span aria-hidden className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 border border-silver bg-black transition-colors duration-300 group-hover/svc:border-signal group-hover/svc:bg-signal" />

                <div className="flex h-full flex-col items-center px-0 pb-14 pt-8 text-center sm:px-6 lg:items-stretch lg:px-7 lg:text-left">
                  <span className="label text-[0.6rem] text-muted transition-colors group-hover/svc:text-cyan">{LAYER[i]}</span>

                  <span
                    aria-hidden
                    className="text-outline mt-6 font-display text-[7rem] font-bold leading-[0.8] tracking-[-0.06em] transition-[-webkit-text-stroke-color] duration-500 group-hover/svc:[-webkit-text-stroke-color:var(--color-signal)]"
                  >
                    {s.index}
                  </span>

                  <div className="relative mt-6 aspect-[4/3] w-full border border-line bg-black transition-colors duration-500 group-hover/svc:border-silver/40">
                    <ServiceGraphic kind={s.visual} />
                  </div>

                  <h3 className="mt-8 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-silver">{s.description}</p>
                  <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label={`${s.title} focus areas`}>
                    {s.labels.map((l) => (
                      <li key={l} className="label border border-line px-2.5 py-1.5 text-[0.6rem] text-muted">
                        {l}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${SERVICES_PATH}#${s.slug}`}
                    className="group/more mt-7 inline-flex items-center gap-2.5 self-center font-display text-sm font-medium text-white lg:self-start"
                  >
                    <span className="relative">
                      Explore service
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-line" />
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-precise group-hover/more:scale-x-100" />
                    </span>
                    <ArrowUpRight aria-hidden className="h-4 w-4 text-signal transition-transform duration-500 ease-precise group-hover/more:rotate-45" />
                    <span className="sr-only">: {s.title}</span>
                  </Link>
                </div>
              </li>
            ))}
          </ol>

          {/* Axis caption */}
          <div aria-hidden className="label mt-4 hidden items-center gap-4 text-[0.6rem] text-muted lg:flex">
            <span>Digital foundations</span>
            <span className="relative h-px flex-1 bg-line">
              <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-r border-t border-silver" />
            </span>
            <span className="text-silver">Intelligent systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
