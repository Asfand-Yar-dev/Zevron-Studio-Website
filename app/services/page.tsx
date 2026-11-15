import type { Metadata } from "next";
import { ArrowDownRight } from "lucide-react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SectionTag } from "@/components/ui/SectionTag";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { CONTACT_PATH, PROCESS, SERVICES, WHATSAPP_HREF } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web architecture, custom software, agentic AI systems and AI automation — what Zevron Studio builds, what's included and who each service is for.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Intro + jump links */}
        <section aria-labelledby="services-page-title" className="relative isolate overflow-hidden bg-black pb-16 pt-28 lg:pb-24 lg:pt-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" />
            <div className="absolute -top-[20vmin] right-[-10vmin] h-[60vmin] w-[60vmin] rounded-full bg-cyan/[0.06] blur-[120px]" />
            <div className="absolute bottom-0 left-[-10vmin] h-[40vmin] w-[70vmin] rounded-full bg-signal/[0.07] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
            <SectionTag index="02" label="Services" />

            <header className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10">
              <h1
                id="services-page-title"
                className="text-center font-display text-[clamp(3.25rem,6.2vw,7rem)] font-bold leading-[0.9] tracking-[-0.055em] text-white lg:col-span-9 lg:text-left"
              >
                Services built
                <span className="block text-metal">
                  to move you forward<span className="text-signal">.</span>
                </span>
              </h1>
              <p className="mx-auto max-w-sm text-center text-lg leading-relaxed text-silver lg:col-span-3 lg:mx-0 lg:pb-4 lg:text-left">
                From the first line of architecture to intelligent systems in production — here&rsquo;s exactly what we
                build, what&rsquo;s included and who each service is for.
              </p>
            </header>

            <nav aria-label="Services on this page" className="mt-12 lg:mt-16">
              <ul className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      className="group/jump relative flex h-full flex-col items-center gap-3 bg-black p-5 text-center transition-colors duration-300 hover:bg-elevated sm:p-6 lg:items-start lg:text-left"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-precise group-hover/jump:scale-x-100"
                      />
                      <span className="flex w-full items-center justify-center gap-3 lg:justify-between">
                        <span className="label text-[0.6rem] text-signal">{s.index}</span>
                        <ArrowDownRight
                          aria-hidden
                          className="hidden h-4 w-4 text-muted transition-[color,translate] duration-500 ease-precise group-hover/jump:translate-y-0.5 group-hover/jump:text-cyan lg:block"
                        />
                      </span>
                      <span className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">{s.title}</span>
                      <span className="hidden text-sm leading-relaxed text-muted sm:block">{s.tagline}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {SERVICES.map((s, i) => (
          <ServiceDetail key={s.slug} service={s} position={i} />
        ))}

        {/* How every engagement runs */}
        <section aria-labelledby="delivery-title" className="relative border-t border-line bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
            <SectionTag index={String(SERVICES.length + 2).padStart(2, "0")} label="How we deliver" />
            <header className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
              <h2
                id="delivery-title"
                className="text-center font-display text-[clamp(2.75rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em] text-white lg:col-span-8 lg:text-left"
              >
                One process,
                <span className="block text-metal">
                  every service<span className="text-signal">.</span>
                </span>
              </h2>
              <p className="mx-auto max-w-sm text-center leading-relaxed text-silver lg:col-span-4 lg:mx-0 lg:pb-3 lg:text-left">
                Whichever service you start with, the work follows the same four stages — so you always know what
                happens next.
              </p>
            </header>

            <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {PROCESS.map((step) => (
                <li key={step.index} className="group/stage relative bg-surface p-6 text-center transition-colors duration-300 hover:bg-elevated lg:p-8 lg:text-left">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-precise group-hover/stage:scale-x-100"
                  />
                  <span className="label text-[0.6rem] text-signal">Stage {step.index}</span>
                  <p className="mt-4 font-display text-2xl font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                  <p className="label mt-5 text-[0.6rem] text-silver">
                    <span className="text-muted">Out → </span>
                    {step.output}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing CTA */}
        <section aria-labelledby="services-cta-title" className="relative overflow-hidden border-t border-line bg-black py-16 lg:py-24">
          <div aria-hidden className="pointer-events-none absolute -bottom-[20vmin] left-1/2 h-[40vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-signal/[0.08] blur-[110px]" />
          <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 text-center sm:px-10 lg:px-14">
            <h2
              id="services-cta-title"
              className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white"
            >
              Not sure which service fits<span className="text-signal">?</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver">
              Tell us about the problem you&rsquo;re solving. We&rsquo;ll recommend the right approach — even if
              it&rsquo;s a mix of services.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href={CONTACT_PATH} size="lg">
                Start a Project
              </ButtonLink>
              {WHATSAPP_HREF && (
                <ButtonLink href={WHATSAPP_HREF} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </ButtonLink>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
