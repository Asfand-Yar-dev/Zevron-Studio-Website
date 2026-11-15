"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CONTACT_EMAIL, CONTACT_PATH, NAV_LINKS } from "@/lib/content";

function RollText({ children }: { children: string }) {
  return (
    <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
      <span className="block transition-transform duration-500 ease-precise group-hover/link:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 top-full block text-white transition-transform duration-500 ease-precise group-hover/link:-translate-y-full"
      >
        {children}
      </span>
    </span>
  );
}

type Tone = "clear" | "scrolled" | "solid";

// Frosted-glass surface shared by every header piece: blurred translucent fill,
// soft top sheen and a hollow chamfered hairline.
function GlassShell({ tone, frame = "bg-white/15" }: { tone: Tone; frame?: string }) {
  const fill = tone === "solid" ? "bg-black/85" : tone === "scrolled" ? "bg-black/55" : "bg-black/30";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={`chamfer absolute inset-0 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${fill}`} />
      <span className="chamfer absolute inset-0 bg-linear-to-b from-white/[0.07] to-transparent" />
      <span className={`chamfer-frame absolute inset-0 transition-colors duration-300 ${frame}`} />
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const pathname = usePathname();
  const tone: Tone = open ? "solid" : scrolled ? "scrolled" : "clear";
  // A link to the current page (e.g. /services, /contact) is active there; on the homepage the
  // section in view is active; other pages (e.g. 404) highlight nothing.
  const pageLink = NAV_LINKS.find((l) => l.href === pathname);
  const current = pageLink ? pageLink.id : pathname === "/" ? active : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Homepage sections matching a nav item take part in scroll tracking (Services included,
    // even though its link opens the services page). Contact's section is the closing CTA, so it's skipped.
    const sections = NAV_LINKS.filter((l) => l.href !== CONTACT_PATH)
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Three detached pieces: logo (left), menu capsule (centre of the screen), CTA (right). */}
      <nav aria-label="Primary" className="relative mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3">
        <Link
          href="/#home"
          aria-label="Zevron Studio home"
          className="relative flex h-full shrink-0 items-center px-4 sm:px-5"
          onClick={() => setOpen(false)}
        >
          <GlassShell tone={tone} />
          <span className="relative">
            <Logo markClassName="h-8 w-auto" />
          </span>
        </Link>

        <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 lg:block">
          <GlassShell tone={tone} />
          <ul className="relative flex h-full items-center px-2">
            {NAV_LINKS.map((link, i) => {
              const isActive = current === link.id;
              return (
                <li key={link.id} className="flex items-center">
                  {i > 0 && <span aria-hidden className="h-3 w-px rotate-[20deg] bg-line" />}
                  <Link
                    href={link.href}
                    aria-current={isActive ? (link.href === pathname ? "page" : "true") : undefined}
                    className="group/link relative flex items-center gap-2 px-4 py-2 xl:px-5"
                  >
                    <span
                      aria-hidden
                      className={`label hidden text-[0.55rem] transition-colors duration-300 xl:inline ${
                        isActive ? "text-signal" : "text-muted group-hover/link:text-cyan"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-[0.95rem] font-medium transition-colors ${
                        isActive ? "text-white" : "text-silver"
                      }`}
                    >
                      <RollText>{link.label}</RollText>
                    </span>
                    <span
                      aria-hidden
                      className={`absolute bottom-0.5 left-4 right-4 h-px origin-left transition-transform duration-500 ease-precise xl:left-5 xl:right-5 ${
                        isActive ? "scale-x-100 bg-signal" : "scale-x-0 bg-cyan group-hover/link:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex h-full items-center gap-2">
            {/* Glass like the logo and menu (same size), set apart by an orange outline and text;
                fills solid orange on hover. */}
            <Link
              href={CONTACT_PATH}
              className="group/cta relative hidden h-full min-w-[11rem] items-center justify-center gap-3 px-6 font-display text-sm font-semibold text-signal transition-colors duration-300 hover:text-black sm:inline-flex"
            >
              <GlassShell tone={tone} frame="bg-signal/80 group-hover/cta:bg-signal" />
              <span
                aria-hidden
                className="chamfer absolute inset-0 bg-signal opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100"
              />
              <span className="relative">Let&rsquo;s Build</span>
              <ArrowUpRight
                aria-hidden
                className="relative h-4 w-4 transition-transform duration-500 ease-precise group-hover/cta:rotate-45"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex h-full items-center gap-3 px-4 lg:hidden"
            >
              <GlassShell tone={tone} />
              <span className="label relative text-silver">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-white transition-transform duration-500 ease-precise ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute right-0 h-px bg-signal transition-all duration-500 ease-precise ${
                    open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                  }`}
                />
              </span>
            </button>
        </div>
      </nav>

      {/* Mobile / tablet full-screen menu */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 -z-10 flex flex-col bg-black px-5 pb-8 pt-24 transition-[clip-path,visibility] duration-700 ease-precise lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <ul className="relative overflow-y-auto border-t border-line">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id} className="border-b border-line">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={current === link.id ? "page" : undefined}
                className="group flex items-baseline justify-between py-3"
              >
                <span className="flex items-baseline gap-4">
                  <span className="label text-signal">0{i + 1}</span>
                  <span className="font-display text-[clamp(2rem,9.5vw,2.75rem)] font-semibold tracking-tight text-white sm:text-6xl">
                    {link.label}
                  </span>
                </span>
                <ArrowUpRight aria-hidden className="h-6 w-6 text-muted transition-colors group-hover:text-cyan" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative mt-auto flex flex-col gap-6 pt-6">
          <Link
            href={CONTACT_PATH}
            onClick={() => setOpen(false)}
            className="relative flex h-16 items-center justify-between px-6 font-display text-lg font-semibold text-black"
          >
            <span aria-hidden className="chamfer absolute inset-0 bg-signal" />
            <span className="relative">Let&rsquo;s Build</span>
            <ArrowUpRight aria-hidden className="relative h-5 w-5" />
          </Link>
          <div className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-muted">
            {CONTACT_EMAIL && (
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-silver hover:text-cyan">
                {CONTACT_EMAIL}
              </a>
            )}
            <span>Speed. Structure. Scale.</span>
          </div>
        </div>
      </div>
    </header>
  );
}
