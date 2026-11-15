import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SectionTag } from "@/components/ui/SectionTag";
import { ButtonLink } from "@/components/ui/Button";
import { NotFoundMark } from "@/components/not-found/NotFoundMark";
import { RequestedPath } from "@/components/not-found/RequestedPath";
import { CONTACT_PATH, NAV_LINKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative isolate overflow-hidden bg-black pb-24 pt-32 lg:pb-32 lg:pt-40">
        {/* Backdrop: engineering grid + controlled light pools */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,black,transparent)]" />
          <div className="absolute left-1/2 top-[22%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.05] blur-[120px]" />
          <div className="absolute -bottom-[10vmin] left-1/2 h-[30vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[110px]" />
        </div>

        {/* Corner crop marks */}
        <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-6 top-24 hidden sm:block lg:inset-x-6">
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-silver/40" />
          <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-silver/40" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-silver/40" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-silver/40" />
        </div>

        <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
          <SectionTag index="404" label="Route not found" />

          <div className="mt-14 lg:mt-16">
            <NotFoundMark />
          </div>

          <div className="mt-16 grid gap-14 border-t border-line pt-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
            <div className="relative lg:col-span-6">
              <span aria-hidden className="absolute -top-12 left-0 h-px w-16 bg-signal" />
              <h1 className="font-display text-[clamp(2.5rem,5.2vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">
                This page drifted
                <span className="block text-metal">
                  off the grid<span className="text-signal">.</span>
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-silver">
                The page you&rsquo;re looking for doesn&rsquo;t exist, has moved, or the link is broken. Everything
                else is running — head back home or pick a route.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/">Back to Home</ButtonLink>
                <ButtonLink href={CONTACT_PATH} variant="secondary">
                  Contact Us
                </ButtonLink>
              </div>
            </div>

            {/* Request log + route index */}
            <div className="relative lg:col-span-5 lg:col-start-8">
              <div aria-hidden className="chamfer absolute inset-0 bg-surface/80 backdrop-blur-xl" />
              <div aria-hidden className="chamfer-frame absolute inset-0 bg-white/15" />
              <div className="relative p-6 sm:p-8">
                <div className="label flex items-center justify-between text-[0.6rem] text-muted">
                  <span>Request log</span>
                  <span className="flex items-center gap-2 text-signal">
                    <span className="h-1.5 w-1.5 bg-signal" />
                    404
                  </span>
                </div>
                <dl className="mt-5 grid gap-2 border-b border-line pb-6 font-mono text-[0.8rem]">
                  <div className="flex gap-4">
                    <dt className="w-16 shrink-0 text-muted">GET</dt>
                    <dd className="min-w-0 truncate text-white">
                      <RequestedPath />
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-16 shrink-0 text-muted">STATUS</dt>
                    <dd className="text-signal">404 · Not found</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-16 shrink-0 text-muted">NEXT</dt>
                    <dd className="text-cyan">Choose a route below</dd>
                  </div>
                </dl>

                <h2 className="label mt-6 text-[0.6rem] text-muted">Available routes</h2>
                <ul className="mt-3">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="group/route relative flex items-center justify-between border-b border-line py-3.5"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="label text-[0.6rem] text-signal">0{i + 1}</span>
                          <span className="font-display text-lg font-medium text-silver transition-colors group-hover/route:text-white">
                            {link.label}
                          </span>
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="label hidden text-[0.6rem] text-muted sm:inline">{link.href}</span>
                          <ArrowUpRight
                            aria-hidden
                            className="h-4 w-4 text-muted transition-[color,rotate] duration-500 ease-precise group-hover/route:rotate-45 group-hover/route:text-cyan"
                          />
                        </span>
                        <span
                          aria-hidden
                          className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-precise group-hover/route:scale-x-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
