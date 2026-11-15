import { SocialIcon, type SocialIconName } from "@/components/brand/SocialIcon";
import { SOCIALS, WHATSAPP_HREF } from "@/lib/content";

// Square, chamfered icon buttons: hairline outline at rest, orange fill on hover.
// `withWhatsapp` appends a WhatsApp chat button (only when a number is set in content.ts).
export function SocialLinks({ className = "", withWhatsapp = false }: { className?: string; withWhatsapp?: boolean }) {
  const links: { label: string; href: string; icon: SocialIconName; ariaLabel: string }[] = SOCIALS.map((s) => ({
    label: s.label,
    href: s.href,
    icon: s.icon,
    ariaLabel: `Zevron Studio on ${s.label}`,
  }));
  if (withWhatsapp && WHATSAPP_HREF) {
    links.push({ label: "WhatsApp", href: WHATSAPP_HREF, icon: "whatsapp", ariaLabel: "Chat with Zevron Studio on WhatsApp" });
  }

  return (
    <ul aria-label="Social profiles" className={`flex flex-wrap gap-2.5 ${className}`}>
      {links.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.ariaLabel}
            title={s.label}
            className="group/social relative flex h-11 w-11 items-center justify-center text-silver transition-[color,translate] duration-300 ease-precise hover:-translate-y-0.5 hover:text-black"
          >
            <span aria-hidden className="chamfer absolute inset-0 bg-signal opacity-0 transition-opacity duration-300 group-hover/social:opacity-100" />
            <span aria-hidden className="chamfer-frame absolute inset-0 bg-line transition-colors duration-300 group-hover/social:bg-signal" />
            <SocialIcon name={s.icon} className="relative h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
