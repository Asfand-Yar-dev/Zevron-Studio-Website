// Legal pages content. Written to match how this website actually works today:
// no cookies or analytics, contact form opens the visitor's own email app, fonts are self-hosted.
// Update these texts if that changes (e.g. when adding analytics or a form backend),
// and have them reviewed by a legal professional before relying on them.
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/content";

export const LEGAL_PATH = "/legal";
export const LEGAL_UPDATED = "9 November 2026";

/** A paragraph is a string; a bullet list is an array of strings. */
export type LegalBlock = string | string[];

export type LegalPage = {
  slug: string;
  title: string;
  /** Short name for footer / side navigation. */
  short: string;
  summary: string;
  sections: { id: string; heading: string; body: LegalBlock[] }[];
};

const contactLine = `You can reach us at ${CONTACT_EMAIL}${WHATSAPP_NUMBER ? ` or on WhatsApp at ${WHATSAPP_NUMBER}` : ""}.`;

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    short: "Privacy Policy",
    summary:
      "How Zevron Studio handles the information you share with us when you visit this website or contact us about a project.",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: [
          "Zevron Studio (“we”, “us”) respects your privacy. This policy explains what information we receive, why we use it and the choices you have.",
          "We only collect what we need to reply to you and to deliver the work you ask us for.",
        ],
      },
      {
        id: "information",
        heading: "Information we receive",
        body: [
          "This website does not store the details you type into it. When you send a project brief, the contact form opens your own email app with the message pre-filled; nothing is sent to us until you choose to send that email.",
          "We receive information only when you contact us directly, for example:",
          [
            "Your name, email address and company name, if you include them.",
            "The project details and files you choose to share.",
            "Messages you send us by email or WhatsApp.",
          ],
        ],
      },
      {
        id: "use",
        heading: "How we use it",
        body: [
          [
            "To reply to your enquiry and discuss your project.",
            "To prepare demos, proposals and deliver the services you agree to.",
            "To provide support, training and revisions after launch.",
            "To meet legal, tax or accounting obligations.",
          ],
          "We do not sell your information, and we do not use it for advertising.",
        ],
      },
      {
        id: "sharing",
        heading: "Sharing",
        body: [
          "We only share information with service providers we need to run our work — such as email, messaging and hosting providers — and only as far as necessary. We may also disclose information if required by law.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        body: [
          "We keep project communication for as long as we are working together and for a reasonable period afterwards for support and record-keeping. You can ask us to delete your information at any time, unless we are required to keep it.",
        ],
      },
      {
        id: "rights",
        heading: "Your choices",
        body: [
          "You can ask us what information we hold about you, ask us to correct or delete it, or ask us to stop contacting you.",
          contactLine,
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        body: ["We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    short: "Terms & Conditions",
    summary: "The terms for using this website and for working with Zevron Studio.",
    sections: [
      {
        id: "website",
        heading: "Using this website",
        body: [
          "By using this website you agree to these terms. The content is provided for general information about Zevron Studio and our services, and may change without notice.",
          "Concept projects shown on this website are examples created to demonstrate our approach. They are not client work unless stated otherwise.",
        ],
      },
      {
        id: "engagements",
        heading: "Projects and engagements",
        body: [
          "Every project is agreed in writing before work starts — covering scope, timeline, price and payment terms. Where a written proposal or agreement exists, it takes priority over these terms.",
          [
            "We build a free demo first so you can review the direction before paying.",
            "Timelines (for example, going live in 2–7 days) depend on the agreed scope and on receiving the content, access and feedback we need on time.",
            "Pricing is available in both Pakistani Rupees (PKR) for local clients and international currencies for overseas clients.",
            "Revisions and training are included as described in your proposal.",
          ],
        ],
      },
      {
        id: "your-responsibilities",
        heading: "Your responsibilities",
        body: [
          [
            "Provide accurate information, content and timely feedback.",
            "Make sure you have the rights to any content, logos or data you give us to use.",
            "Use the systems we build lawfully and in line with our Fair Usage Policy.",
          ],
        ],
      },
      {
        id: "ownership",
        heading: "Ownership",
        body: [
          "Once a project is paid in full, you own the final deliverables created specifically for you, as set out in your agreement. We keep ownership of our own tools, methods and reusable components, and may use general know-how gained from the work.",
          "The content, design and brand of this website belong to Zevron Studio and may not be copied without permission.",
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        body: [
          "We build carefully and test our work, but no software is free of errors. To the extent permitted by law, we are not liable for indirect losses, and our total liability for a project is limited to the amount paid for that project.",
          "Third-party services we integrate with (such as hosting, messaging or AI providers) are governed by their own terms.",
        ],
      },
      {
        id: "law",
        heading: "Governing law",
        body: ["These terms are governed by the laws of Pakistan."],
      },
      {
        id: "contact",
        heading: "Questions",
        body: [contactLine],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    short: "Cookie Policy",
    summary: "How this website uses cookies and similar technologies.",
    sections: [
      {
        id: "summary",
        heading: "The short version",
        body: [
          "This website does not use cookies to track you. We do not run advertising or analytics tracking, and we do not place marketing cookies on your device.",
        ],
      },
      {
        id: "what",
        heading: "What cookies are",
        body: [
          "Cookies are small text files that websites can store in your browser. They are often used to remember preferences or to measure how a site is used.",
        ],
      },
      {
        id: "how",
        heading: "What this website uses",
        body: [
          [
            "No tracking or advertising cookies.",
            "No third-party analytics.",
            "Fonts and images are served from our own website, so loading a page does not share your visit with font or image providers.",
          ],
          "Your browser may keep standard technical data (such as a cached copy of the page) to load the site faster. This is controlled by your browser, not by us.",
        ],
      },
      {
        id: "third-party",
        heading: "Links to other services",
        body: [
          "When you click a link to WhatsApp, LinkedIn, GitHub, Instagram or your email app, you leave this website. Those services have their own cookie and privacy policies.",
        ],
      },
      {
        id: "changes",
        heading: "If this changes",
        body: [
          "If we add analytics or other cookies in the future, we will update this policy first and, where required, ask for your consent.",
          contactLine,
        ],
      },
    ],
  },
  {
    slug: "fair-usage",
    title: "Fair Usage Policy",
    short: "Fair Usage",
    summary:
      "How the systems we build and the support we include are meant to be used, so every client gets reliable service.",
    sections: [
      {
        id: "purpose",
        heading: "Why we have this policy",
        body: [
          "Some of our work — such as AI assistants, automations and included support — runs on shared infrastructure and team time. This policy keeps things fair and reliable for everyone.",
        ],
      },
      {
        id: "ai-automation",
        heading: "AI assistants and automations",
        body: [
          "AI assistants are built to be available around the clock. Usage is expected to stay within the limits agreed for your project, for example:",
          [
            "The expected volume of messages, conversations or workflow runs.",
            "The channels and use cases described in your proposal.",
            "Limits set by the third-party AI and messaging providers your system uses.",
          ],
          "If your usage grows well beyond what was agreed, we will contact you to discuss adjusting the setup or plan before anything changes.",
        ],
      },
      {
        id: "support",
        heading: "Support and revisions",
        body: [
          "Training and revisions are included as described in your proposal. Revisions cover changes within the agreed scope; new features or major changes in direction are treated as new work and quoted separately.",
        ],
      },
      {
        id: "not-allowed",
        heading: "What's not allowed",
        body: [
          [
            "Sending spam or unsolicited bulk messages.",
            "Illegal, harmful, misleading or abusive content.",
            "Attempting to overload, reverse-engineer or misuse the systems we provide.",
            "Using our work to break the terms of third-party platforms such as WhatsApp.",
          ],
          "We may pause a service that is being misused, and will let you know why.",
        ],
      },
      {
        id: "contact",
        heading: "Questions",
        body: [contactLine],
      },
    ],
  },
];

export const legalHref = (slug: string) => `${LEGAL_PATH}/${slug}`;
export const getLegalPage = (slug: string) => LEGAL_PAGES.find((p) => p.slug === slug);
