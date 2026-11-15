import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_PATH, FAQ, WHATSAPP_HREF } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden border-t border-line bg-surface py-12 lg:py-16">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag label={FAQ.label} />

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* Intro (stays in view on desktop) */}
          <header className="flex flex-col items-center text-center lg:sticky lg:top-28 lg:col-span-4 lg:items-start lg:self-start lg:text-left">
            <h2
              id="faq-title"
              className="font-display text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white"
            >
              {FAQ.titleLines[0]}
              <span className="block text-metal">
                {FAQ.titleLines[1]}
                <span className="text-signal">.</span>
              </span>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-silver">{FAQ.subtitle}</p>

            <div className="mt-10 w-full max-w-sm border-t border-line pt-6">
              <p className="label text-[0.6rem] text-muted">Still have a question?</p>
              <div className="mt-4 flex flex-col items-center gap-3 lg:items-start">
                {WHATSAPP_HREF && (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/ask inline-flex items-center gap-3 font-display text-base font-semibold text-white transition-colors hover:text-signal"
                  >
                    <SocialIcon name="whatsapp" className="h-5 w-5 text-signal" />
                    Ask us on WhatsApp
                  </a>
                )}
                <Link
                  href={CONTACT_PATH}
                  className="group/ask inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-white"
                >
                  Or send us a message
                  <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 ease-precise group-hover/ask:rotate-45" />
                </Link>
              </div>
            </div>
          </header>

          <div className="lg:col-span-8">
            <FaqAccordion items={FAQ.items} />
          </div>
        </div>
      </div>
    </section>
  );
}
