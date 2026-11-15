import { CONTACT_PATH, GUARANTEE } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";
import { ButtonLink } from "@/components/ui/Button";

// Centred "guarantee wall": three headline numbers and a free-demo CTA to the contact page.
export function Guarantee() {
  return (
    <section id="guarantee" aria-labelledby="guarantee-title" className="relative overflow-hidden border-t border-line bg-black py-16 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]" />
        <div className="absolute -bottom-[25vmin] left-1/2 h-[45vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-signal/[0.09] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag label={GUARANTEE.label} />

        <header className="mx-auto mt-12 flex max-w-3xl flex-col items-center text-center lg:mt-16">
          <p className="label flex items-center gap-3 text-signal">
            <span aria-hidden className="h-px w-8 bg-signal" />
            {GUARANTEE.eyebrow}
            <span aria-hidden className="h-px w-8 bg-signal" />
          </p>
          <h2
            id="guarantee-title"
            className="mt-6 font-display text-[clamp(3rem,7.5vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white"
          >
            {GUARANTEE.titleLines[0]}
            <span className="block text-metal">
              {GUARANTEE.titleLines[1]}
              <span className="text-signal">.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-silver">{GUARANTEE.subtitle}</p>
        </header>

        <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3 lg:mt-16">
          {GUARANTEE.stats.map((stat) => (
            <li
              key={stat.title}
              className="group/stat relative flex flex-col items-center bg-black px-6 py-10 text-center transition-colors duration-300 hover:bg-elevated lg:px-10 lg:py-14"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-full origin-center scale-x-0 bg-signal transition-transform duration-500 ease-precise group-hover/stat:scale-x-100"
              />
              <span className="text-metal font-display text-[clamp(4rem,8vw,7rem)] font-bold leading-none tracking-[-0.05em]">
                {stat.value}
              </span>
              <span className="label mt-6 text-signal">{stat.title}</span>
              <p className="mt-3 max-w-xs leading-relaxed text-silver">{stat.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center lg:mt-16">
          <ButtonLink href={CONTACT_PATH} size="lg">
            {GUARANTEE.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
