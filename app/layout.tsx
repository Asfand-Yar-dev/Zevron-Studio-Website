import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ScrollManager } from "@/components/nav/ScrollManager";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Zevron Studio is an independent technology and AI engineering studio building digital products, custom software, agentic systems and AI automation.";

export const metadata: Metadata = {
  title: {
    default: "Zevron Studio — Technology & AI Engineering",
    template: "%s — Zevron Studio",
  },
  description,
  applicationName: "Zevron Studio",
  keywords: ["AI engineering", "custom software", "web architecture", "agentic systems", "AI automation", "Next.js"],
  openGraph: {
    type: "website",
    title: "Zevron Studio — Build what comes next.",
    description,
    siteName: "Zevron Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zevron Studio — Build what comes next.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zevron Studio",
  slogan: "Speed. Structure. Scale.",
  description,
  knowsAbout: ["Web Architecture", "Custom Software Development", "Agentic Systems", "AI Automation"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // No data-scroll-behavior on purpose: page changes keep the smooth scroll-to-top.
    // (Next.js logs a dev-only note about this; it is expected.)
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        {/* Runs before hydration: opening or refreshing the site always starts at the top. */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`history.scrollRestoration="manual";`}
        </Script>
        <a
          href="#main"
          className="label sr-only z-[60] bg-signal px-4 py-3 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <ScrollManager />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
