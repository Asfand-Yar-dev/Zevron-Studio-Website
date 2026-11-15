import type { Metadata } from "next";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SectionTag } from "@/components/ui/SectionTag";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Zevron Studio what you're building. Share your project brief and we'll help you turn it into a practical digital solution.",
};

const NEXT_STEPS = [
  { title: "Send your brief", text: "Share the problem you're solving and what a good outcome looks like." },
  { title: "We review it", text: "We look at scope, technology and the most practical path forward." },
  { title: "We map the build", text: "You get a clear plan for structure, timeline and next steps." },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section aria-labelledby="contact-page-title" className="relative isolate overflow-hidden bg-black pb-16 pt-28 lg:pb-24 lg:pt-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" />
            <div className="absolute -top-[20vmin] right-[-10vmin] h-[60vmin] w-[60vmin] rounded-full bg-cyan/[0.06] blur-[120px]" />
            <div className="absolute bottom-0 left-[-10vmin] h-[40vmin] w-[70vmin] rounded-full bg-signal/[0.07] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
            <SectionTag index="01" label="Contact" />

            <header className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10">
              <h1
                id="contact-page-title"
                className="text-center font-display text-[clamp(3.25rem,7.2vw,8rem)] font-bold leading-[0.88] tracking-[-0.055em] text-white lg:col-span-9 lg:text-left"
              >
                Tell us what
                <span className="block text-metal lg:pl-[8%]">
                  you&rsquo;re building<span className="text-signal">.</span>
                </span>
              </h1>
              <p className="mx-auto max-w-sm text-center text-lg leading-relaxed text-silver lg:col-span-3 lg:mx-0 lg:pb-4 lg:text-left">
                Share a few details about your project. We&rsquo;ll help you turn it into a practical digital solution.
              </p>
            </header>

            <div className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-12 lg:gap-8">
              {/* Direct details + process */}
              <aside className="flex flex-col gap-14 text-center lg:col-span-4 lg:text-left">
                {CONTACT_EMAIL && (
                  <div>
                    <h2 className="label text-[0.6rem] text-muted">Email us directly</h2>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="group mt-4 inline-flex items-center gap-3 break-all font-display text-2xl font-semibold text-white transition-colors hover:text-cyan sm:text-3xl"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                )}

                <div>
                  <h2 className="label text-[0.6rem] text-muted">What happens next</h2>
                  <ol className="mt-5 border-t border-line">
                    {NEXT_STEPS.map((s, i) => (
                      <li
                        key={s.title}
                        className="group/step relative flex flex-col items-center gap-2 border-b border-line py-5 lg:flex-row lg:items-start lg:gap-5"
                      >
                        <span className="label text-[0.6rem] text-signal lg:pt-1">0{i + 1}</span>
                        <div>
                          <p className="font-display text-lg font-semibold text-white">{s.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                        </div>
                        <span
                          aria-hidden
                          className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-precise group-hover/step:scale-x-100"
                        />
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h2 className="label text-[0.6rem] text-muted">Elsewhere</h2>
                  <SocialLinks className="mt-4 justify-center lg:justify-start" withWhatsapp />
                </div>
              </aside>

              {/* Brief form on a glass panel */}
              <div className="relative lg:col-span-7 lg:col-start-6">
                <div aria-hidden className="chamfer absolute inset-0 bg-surface/80 backdrop-blur-xl" />
                <div aria-hidden className="chamfer-frame absolute inset-0 bg-white/15" />
                <span aria-hidden className="absolute -top-px left-1/2 h-px w-20 -translate-x-1/2 bg-signal lg:left-8 lg:translate-x-0" />
                <div className="relative p-6 sm:p-10 lg:p-12">
                  <h2 className="text-center font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-left">
                    Project brief
                  </h2>
                  <p className="mt-3 text-center text-silver lg:text-left">The more context you share, the faster we can help.</p>
                  <div className="mt-10">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
