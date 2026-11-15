import { CONTACT_EMAIL, CONTACT_PATH } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line bg-black py-16 lg:py-24">
      {/* Geometric detail: the mark's diagonal, drawn as construction lines */}
      <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -right-48 top-10 h-[70%] w-auto opacity-50">
        <g fill="none" stroke="#292929">
          <polygon points="510,135 680,135 290,530 120,530" />
          <polygon points="530,115 700,115 310,550 140,550" strokeDasharray="3 7" />
          <path d="M120 560H680M120 105H680" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag index="06" label="Start a Project" />

        <h2
          id="contact-title"
          className="mt-14 text-center font-display text-[clamp(3rem,10vw,10.5rem)] font-bold leading-[0.9] tracking-[-0.055em] text-white lg:mt-20 lg:text-left"
        >
          Have a complex idea?
          <span className="relative mt-[0.12em] block py-[0.08em] text-black">
            {/* Mobile: full-bleed band behind centred text. Desktop: slanted band running off the right edge. */}
            <span
              aria-hidden
              className="absolute inset-y-0 -left-[60vw] -right-[60vw] bg-signal lg:left-[-0.12em] lg:[clip-path:polygon(0.42em_0,100%_0,100%_100%,0_100%)]"
            />
            <span className="relative lg:pl-[0.32em]">Let&rsquo;s engineer it.</span>
          </span>
        </h2>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <p className="mx-auto max-w-md text-center text-xl leading-relaxed text-silver lg:col-span-5 lg:mx-0 lg:text-left">
            Tell us what you&rsquo;re building. We&rsquo;ll help you turn it into a practical digital solution.
          </p>
          <div className="flex flex-col items-center gap-6 lg:col-span-6 lg:col-start-7 lg:items-end">
            <ButtonLink href={CONTACT_PATH} size="lg">
              Start a Project
            </ButtonLink>
            {CONTACT_EMAIL && (
              <a href={`mailto:${CONTACT_EMAIL}`} className="label group flex items-center gap-3 text-muted">
                <span>Direct line</span>
                <span className="h-px w-8 bg-line transition-all duration-500 ease-precise group-hover:w-14 group-hover:bg-cyan" />
                <span className="text-silver transition-colors group-hover:text-white">{CONTACT_EMAIL}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
