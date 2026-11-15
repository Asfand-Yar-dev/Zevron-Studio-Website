import { ArrowRight, Check } from "lucide-react";
import { CONTACT_PATH, type Service } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceGraphic } from "@/components/visuals/ServiceVisuals";

function BlockTitle({ children }: { children: string }) {
  return (
    <h3 className="label flex items-center gap-4 text-[0.6rem] text-muted">
      <span aria-hidden className="h-px flex-1 bg-line lg:hidden" />
      <span className="text-silver">{children}</span>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </h3>
  );
}

// One service in full detail: summary + visual on the left (sticky on desktop), specifics on the right.
export function ServiceDetail({ service: s, position }: { service: Service; position: number }) {
  const alt = position % 2 === 1;
  const surface = alt ? "bg-surface" : "bg-black";
  return (
    <section id={s.slug} aria-labelledby={`${s.slug}-title`} className={`relative border-t border-line py-16 lg:py-24 ${surface}`}>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag index={String(position + 2).padStart(2, "0")} label={s.title} />

        <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Summary */}
          <div className="flex flex-col items-center text-center lg:sticky lg:top-28 lg:col-span-5 lg:items-start lg:self-start lg:text-left">
            <span
              aria-hidden
              className="text-outline font-display text-[6rem] font-bold leading-[0.8] tracking-[-0.06em] sm:text-[7.5rem]"
            >
              {s.index}
            </span>
            <h2
              id={`${s.slug}-title`}
              className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white"
            >
              {s.title}
              <span className="text-signal">.</span>
            </h2>
            <p className="mt-5 max-w-md font-display text-xl font-medium leading-snug text-white sm:text-2xl">{s.tagline}</p>
            <p className="mt-5 max-w-md leading-relaxed text-silver">{s.overview}</p>

            <div className="group/svc relative mt-8 aspect-[4/3] w-full max-w-md border border-line bg-black transition-colors duration-500 hover:border-silver/40">
              <ServiceGraphic kind={s.visual} />
            </div>

            <div className="mt-8">
              <ButtonLink href={`${CONTACT_PATH}?service=${encodeURIComponent(s.title)}`}>Discuss this service</ButtonLink>
            </div>
          </div>

          {/* Specifics */}
          <div className="flex flex-col gap-14 lg:col-span-6 lg:col-start-7">
            <div>
              <BlockTitle>What we build</BlockTitle>
              <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
                {s.build.map((b, i) => (
                  <li
                    key={b.title}
                    className={`group/item relative p-6 text-center transition-colors duration-300 hover:bg-elevated lg:text-left ${surface}`}
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-precise group-hover/item:scale-x-100"
                    />
                    <span className="label text-[0.6rem] text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-3 font-display text-lg font-semibold leading-snug text-white">{b.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <BlockTitle>What&rsquo;s included</BlockTitle>
              {/* Centred as one block on mobile so the tick column stays aligned. */}
              <ul className="mx-auto mt-6 grid w-fit gap-x-8 gap-y-4 sm:grid-cols-2 lg:mx-0 lg:w-auto">
                {s.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-silver">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-signal/60 text-signal">
                      <Check aria-hidden className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-left leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <BlockTitle>Ideal for</BlockTitle>
              <ul className="mt-6 border-t border-line">
                {s.idealFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-center gap-4 border-b border-line py-4 text-center text-white lg:justify-start lg:text-left"
                  >
                    <ArrowRight aria-hidden className="hidden h-4 w-4 shrink-0 text-signal lg:block" />
                    <span className="font-display text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
