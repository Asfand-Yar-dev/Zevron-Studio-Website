import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary";

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
};

const variants: Record<Variant, { surface: string; text: string }> = {
  primary: {
    surface: "bg-signal group-hover/btn:bg-white",
    text: "text-black",
  },
  secondary: {
    surface: "bg-line group-hover/btn:bg-signal [&>span]:bg-black",
    text: "text-white",
  },
};

// The anchor stays unclipped so focus outlines remain visible; the chamfered
// shape lives on an inner layer. Internal routes use next/link.
export function ButtonLink({ href, variant = "primary", size = "md", className = "", children, ...props }: ButtonLinkProps) {
  const v = variants[variant];
  const pad = size === "lg" ? "h-16 pl-7 pr-5 text-base" : "h-13 pl-6 pr-4 text-sm";
  const classes = `group/btn relative inline-flex items-center gap-4 font-display font-medium tracking-wide ${pad} ${v.text} ${className}`;
  const inner = (
    <>
      <span aria-hidden className={`chamfer absolute inset-0 transition-colors duration-300 ${v.surface}`}>
        {variant === "secondary" && <span className="chamfer absolute inset-px" />}
      </span>
      <span className="relative">{children}</span>
      <span aria-hidden className="relative h-5 w-5 overflow-hidden">
        <ArrowUpRight className="absolute inset-0 h-5 w-5 transition-transform duration-500 ease-precise group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5" />
        <ArrowUpRight className="absolute inset-0 h-5 w-5 -translate-x-5 translate-y-5 transition-transform duration-500 ease-precise group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
      </span>
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} {...props} className={classes}>
      {inner}
    </Link>
  ) : (
    <a href={href} {...props} className={classes}>
      {inner}
    </a>
  );
}
