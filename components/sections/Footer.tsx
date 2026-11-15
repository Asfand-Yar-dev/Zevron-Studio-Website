import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FooterWordmark } from "@/components/brand/FooterWordmark";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { LEGAL_PAGES, legalHref } from "@/lib/legal";
import { CONTACT_EMAIL, CONTACT_PATH, NAV_LINKS, SERVICES, SERVICES_PATH, WHATSAPP_HREF } from "@/lib/content";

function Column({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="label text-[0.6rem] text-muted">{title}</h2>
      <ul className="mt-5 grid gap-3">{children}</ul>
    </div>
  );
}

const linkClass = "text-sm text-silver transition-colors duration-300 hover:text-white";

// Icon tile + caption + value, used for the direct contact rows.
function ContactRow({ icon, caption, value }: { icon: React.ReactNode; caption: string; value: string }) {
  return (
    <>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center text-silver transition-colors duration-300 group-hover/row:text-black">
        <span aria-hidden className="chamfer absolute inset-0 bg-signal opacity-0 transition-opacity duration-300 group-hover/row:opacity-100" />
        <span aria-hidden className="chamfer-frame absolute inset-0 bg-line transition-colors duration-300 group-hover/row:bg-signal" />
        {icon}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="label text-[0.55rem] text-muted">{caption}</span>
        <span className="text-sm text-silver transition-colors duration-300 group-hover/row:text-white">{value}</span>
      </span>
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-black">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-10 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:block lg:text-left xl:col-span-3">
            <Logo />
            <p className="label mt-6 text-signal">Speed. Structure. Scale.</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A technology and AI engineering studio building digital products, custom software, intelligent AI
              systems, and business automation.
            </p>
            <div className="mt-10">
              <h2 className="label text-[0.6rem] text-muted">Follow</h2>
              <SocialLinks className="mt-4 justify-center lg:justify-start" />
            </div>
          </div>

          {/* Mobile/laptop: 2 columns. Large screens: Navigation · Services · Legal · Contact in one row. */}
          <div className="grid grid-cols-2 gap-10 text-center lg:col-span-8 lg:col-start-5 lg:text-left xl:col-span-9 xl:col-start-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.3fr)] xl:gap-8">
            <Column title="Navigation">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Services">
              {SERVICES.map((s) => (
                <li key={s.index}>
                  <Link href={`${SERVICES_PATH}#${s.slug}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Legal" className="col-span-2 lg:col-span-1">
              {LEGAL_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link href={legalHref(p.slug)} className={linkClass}>
                    {p.short}
                  </Link>
                </li>
              ))}
            </Column>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="label text-[0.6rem] text-muted">Contact</h2>
              {/* Centred as one block on mobile so the icon column stays aligned. */}
              <ul className="mx-auto mt-5 grid w-fit gap-4 lg:mx-0">
                {CONTACT_EMAIL && (
                  <li>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="group/row flex items-center gap-4 text-left">
                      <ContactRow icon={<Mail aria-hidden className="relative h-[18px] w-[18px]" />} caption="Email" value={CONTACT_EMAIL} />
                    </a>
                  </li>
                )}
                {WHATSAPP_HREF && (
                  <li>
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/row flex items-center gap-4 text-left"
                    >
                      <ContactRow
                        icon={<SocialIcon name="whatsapp" className="relative h-[18px] w-[18px]" />}
                        caption="WhatsApp"
                        value="Chat with us"
                      />
                    </a>
                  </li>
                )}
                <li>
                  <Link href={CONTACT_PATH} className="group/row flex items-center gap-4 text-left">
                    <ContactRow
                      icon={<ArrowUpRight aria-hidden className="relative h-[18px] w-[18px]" />}
                      caption="New project"
                      value="Start a project"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="label mt-20 flex flex-col items-center gap-4 border-t border-line py-6 text-center text-[0.6rem] text-muted sm:flex-row sm:justify-between sm:text-left">
          <span>© {year} Zevron Studio. All rights reserved.</span>
          <a href="#main" className="group flex items-center gap-2 text-silver hover:text-white">
            Back to top
            <ArrowUp aria-hidden className="h-3.5 w-3.5 transition-transform duration-500 ease-precise group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
