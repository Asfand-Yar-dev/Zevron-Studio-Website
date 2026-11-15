import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SectionTag } from "@/components/ui/SectionTag";
import { LEGAL_PAGES, LEGAL_UPDATED, getLegalPage, legalHref, type LegalBlock } from "@/lib/legal";

type Props = { params: Promise<{ slug: string }> };

// Only the four policy pages exist; anything else under /legal is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getLegalPage((await params).slug);
  return page ? { title: page.title, description: page.summary } : {};
}

function Block({ block }: { block: LegalBlock }) {
  if (Array.isArray(block)) {
    return (
      <ul className="grid gap-3">
        {block.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-silver">
            <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-signal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="leading-relaxed text-silver">{block}</p>;
}

export default async function LegalPageRoute({ params }: Props) {
  const page = getLegalPage((await params).slug);
  if (!page) notFound();
  const others = LEGAL_PAGES.filter((p) => p.slug !== page.slug);

  return (
    <>
      <Navbar />
      <main id="main">
        <section aria-labelledby="legal-title" className="relative isolate overflow-hidden bg-black pb-16 pt-28 lg:pb-24 lg:pt-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black,transparent)]" />
            <div className="absolute -top-[20vmin] left-1/2 h-[50vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-cyan/[0.05] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
            <SectionTag label="Legal" />

            <header className="mx-auto mt-8 flex max-w-3xl flex-col items-center text-center lg:mt-10">
              <h1
                id="legal-title"
                className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white"
              >
                {page.title}
                <span className="text-signal">.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver">{page.summary}</p>
              <p className="label mt-6 text-[0.6rem] text-muted">
                Last updated <span className="text-silver">{LEGAL_UPDATED}</span>
              </p>
            </header>

            <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
              {/* Side navigation */}
              <aside className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
                <nav aria-label="On this page">
                  <h2 className="label text-[0.6rem] text-muted">On this page</h2>
                  <ol className="mt-4 border-t border-line">
                    {page.sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="group/toc flex items-baseline gap-3 border-b border-line py-3 text-sm text-silver transition-colors hover:text-white"
                        >
                          <span className="label text-[0.55rem] text-signal">{String(i + 1).padStart(2, "0")}</span>
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <nav aria-label="Other policies" className="mt-10">
                  <h2 className="label text-[0.6rem] text-muted">Other policies</h2>
                  <ul className="mt-4 grid gap-2">
                    {others.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={legalHref(o.slug)}
                          className="group/other inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-white"
                        >
                          {o.title}
                          <ArrowUpRight
                            aria-hidden
                            className="h-3.5 w-3.5 text-muted transition-[color,rotate] duration-500 ease-precise group-hover/other:rotate-45 group-hover/other:text-signal"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              {/* Policy text */}
              <article className="lg:col-span-8 lg:col-start-5">
                {page.sections.map((s, i) => (
                  <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="border-t border-line py-10 first:border-t-0 first:pt-0">
                    <h2 id={`${s.id}-heading`} className="flex items-baseline gap-4 font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                      <span className="label text-[0.6rem] text-signal">{String(i + 1).padStart(2, "0")}</span>
                      {s.heading}
                    </h2>
                    <div className="mt-5 grid max-w-3xl gap-4">
                      {s.body.map((block, k) => (
                        <Block key={k} block={block} />
                      ))}
                    </div>
                  </section>
                ))}
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
