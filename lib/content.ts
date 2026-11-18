// Single source of truth for site copy and structured content.

// Placeholder contact details replace with the studio's real address and profiles.
export const CONTACT_EMAIL = "zevronstudio@gmail.com";

// Replace each href with the studio's real profile URL.
export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zevron-studio", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/zevronstudio", icon: "github" },
  { label: "Instagram", href: "https://www.instagram.com/zevronstudio/", icon: "instagram" },
] as const;

// WhatsApp: put your number here with country code — digits, spaces or "+" are all fine,
// e.g. "+92 300 1234567". While it's empty the WhatsApp button stays hidden.
export const WHATSAPP_NUMBER = "+92 331 0329489";
export const WHATSAPP_MESSAGE = "Hi Zevron Studio, I'd like to discuss a project.";

// wa.me link with a pre-filled first message, or null when no number is set.
const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/\D/g, "");
export const whatsappLink = (message: string) =>
  WHATSAPP_DIGITS ? `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(message)}` : null;
export const WHATSAPP_HREF = whatsappLink(WHATSAPP_MESSAGE);

export const CONTACT_PATH = "/contact";
export const SERVICES_PATH = "/services";

// Section links are root-relative so they also work from other pages.
// "Services" opens the detailed services page; on the homepage it still tracks the Services section.
export const NAV_LINKS = [
  { id: "home", label: "Home", href: "/#home" },
  // { id: "work", label: "Work", href: "/#work" },
  { id: "services", label: "Services", href: SERVICES_PATH },
  { id: "about", label: "About", href: "/#about" },
  { id: "team", label: "Team", href: "/#team" },
  { id: "contact", label: "Contact", href: CONTACT_PATH },
] as const;

export type ProjectVisual = "platform" | "software" | "agent" | "automation";

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  scope: string[];
  visual: ProjectVisual;
};

// All projects are concept builds no client names, outcomes or metrics.
export const PROJECTS: Project[] = [
  {
    id: "meridian",
    index: "01",
    name: "Meridian",
    category: "Digital Platforms",
    summary:
      "A composable web platform where marketing pages, product content and campaigns are assembled from one typed component system.",
    stack: ["Next.js", "TypeScript", "Headless CMS", "Edge Rendering"],
    scope: [
      "Typed, reusable section library",
      "Content modelling for non-technical editors",
      "Performance budget enforced at build time",
      "Multi-locale routing architecture",
    ],
    visual: "platform",
  },
  {
    id: "ledgerline",
    index: "02",
    name: "Ledgerline",
    category: "Business Software",
    summary:
      "An operations console that brings orders, inventory and approvals into a single workspace designed around how teams actually work.",
    stack: ["React", "FastAPI", "PostgreSQL", "REST APIs"],
    scope: [
      "Role-based dashboards and approval flows",
      "Real-time order and inventory views",
      "Audit trail for every operational change",
      "Integration layer for existing tools",
    ],
    visual: "software",
  },
  {
    id: "atlas",
    index: "03",
    name: "Atlas",
    category: "AI-Powered Applications",
    summary:
      "A knowledge agent that reads internal documentation, reasons over it and answers with cited sources or hands off to a human.",
    stack: ["LangGraph", "RAG", "Vector Database", "Python"],
    scope: [
      "Retrieval pipeline with source citations",
      "Multi-step reasoning with tool use",
      "Confidence checks and human hand-off",
      "Evaluation harness for answer quality",
    ],
    visual: "agent",
  },
  {
    id: "relay",
    index: "04",
    name: "Relay",
    category: "Intelligent Automation",
    summary:
      "An intake workflow that classifies incoming requests, extracts the details that matter and routes each one to the right system.",
    stack: ["n8n", "LLMs", "Node.js", "MongoDB"],
    scope: [
      "Inbox and form triggers",
      "LLM classification and field extraction",
      "Rule-based routing to CRM and team channels",
      "Exception queue with manual review",
    ],
    visual: "automation",
  },
];

export type ServiceVisual = "web" | "software" | "agentic" | "automation";

export type Service = {
  index: string;
  slug: string;
  title: string;
  /** Short line used on the homepage card. */
  description: string;
  labels: string[];
  visual: ServiceVisual;
  /** Detail page content. */
  tagline: string;
  overview: string;
  build: { title: string; text: string }[];
  included: string[];
  stack: string[];
  idealFor: string[];
};

// Homepage shows index/title/description/labels; the /services page shows everything.
export const SERVICES: Service[] = [
  {
    index: "01",
    slug: "web-architecture",
    title: "Web Architecture",
    description:
      "High-performance websites and scalable web applications engineered for modern businesses.",
    labels: ["Websites", "Web Apps", "Performance"],
    visual: "web",
    tagline: "Fast, scalable websites and web applications built on a solid foundation.",
    overview:
      "We design and engineer websites and web applications that load fast, are easy to find and stay easy to grow. Every build starts with architecture — content structure, performance and the integrations your business depends on — so the site keeps working as you scale.",
    build: [
      { title: "Company & marketing websites", text: "High-performance sites that present your brand clearly and turn visitors into enquiries." },
      { title: "Web applications", text: "Customer portals, SaaS products and interactive platforms that run in the browser." },
      { title: "Online stores & booking flows", text: "Product catalogues, checkout and scheduling built around how you sell." },
      { title: "CMS-powered platforms", text: "Content your team can update themselves, without touching code." },
      { title: "Landing pages & campaigns", text: "Focused pages for launches, ads and product announcements." },
      { title: "Redesigns & migrations", text: "Rebuilding slow or outdated sites on a modern, maintainable stack." },
    ],
    included: [
      "Responsive design for every screen size",
      "Performance optimisation and fast load times",
      "SEO-ready structure and metadata",
      "Accessibility best practices",
      "Analytics and tracking setup",
      "Deployment and hosting setup",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs", "Cloud Infrastructure"],
    idealFor: [
      "Businesses launching or relaunching their online presence",
      "Teams that need a fast, maintainable web application",
      "Companies outgrowing a template or no-code website",
    ],
  },
  {
    index: "02",
    slug: "custom-software",
    title: "Custom Software",
    description:
      "Purpose-built software, dashboards, and business systems designed around business operations.",
    labels: ["Dashboards", "Internal Tools", "Systems"],
    visual: "software",
    tagline: "Software shaped around how your business actually works.",
    overview:
      "Off-the-shelf tools make you work their way. We build dashboards, internal tools and business systems around your operations — connecting your data, removing busywork and giving your team one place to get things done.",
    build: [
      { title: "Dashboards & analytics", text: "Clear, real-time views of the numbers that run your business." },
      { title: "Internal tools", text: "Workflow apps for operations, sales, support and finance teams." },
      { title: "Client & partner portals", text: "Secure self-service access for the people you work with." },
      { title: "Business management systems", text: "Orders, inventory, approvals and records together in one system." },
      { title: "APIs & integrations", text: "Connecting your software with payments, email, CRMs and third-party services." },
      { title: "Spreadsheet & legacy replacement", text: "Moving critical work off spreadsheets and outdated tools into reliable software." },
    ],
    included: [
      "Requirements and workflow mapping",
      "Role-based access and user management",
      "Database design and data modelling",
      "Secure authentication",
      "Testing and quality assurance",
      "Documentation and handover",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "REST APIs"],
    idealFor: [
      "Teams running on spreadsheets and disconnected tools",
      "Companies with processes no ready-made software fits",
      "Businesses that need one reliable source of truth",
    ],
  },
  {
    index: "03",
    slug: "agentic-systems",
    title: "Agentic Systems",
    description:
      "Intelligent AI agents and LLM-powered applications that can understand, reason, and execute tasks.",
    labels: ["AI Agents", "LLM Apps", "RAG"],
    visual: "agentic",
    tagline: "AI agents that understand, reason and get real work done.",
    overview:
      "We build AI agents and LLM-powered applications that go beyond chat. They read your knowledge, use your tools and complete multi-step tasks — with guardrails, quality checks and a human hand-off wherever it matters.",
    build: [
      { title: "AI assistants on your knowledge", text: "Answer customer and team questions from your own content, with sources." },
      { title: "Knowledge agents (RAG)", text: "Search and reason over documents, policies and internal data." },
      { title: "Task-executing agents", text: "Agents that call your tools and APIs to complete real work end to end." },
      { title: "Multi-agent workflows", text: "Specialised agents coordinating on complex, multi-step processes." },
      { title: "AI features in your product", text: "Summaries, data extraction, classification and smart search inside existing software." },
      { title: "Evaluation & guardrails", text: "Answer-quality testing, safety checks and human review built in." },
    ],
    included: [
      "Use-case discovery and feasibility check",
      "Data preparation and retrieval pipeline",
      "Prompt and agent design",
      "Tool and API integration",
      "Evaluation harness for answer quality",
      "Monitoring and iteration after launch",
    ],
    stack: ["LLMs", "RAG", "AI Agents", "LangChain", "LangGraph", "Vector Databases", "Python", "FastAPI"],
    idealFor: [
      "Support teams answering the same questions every day",
      "Companies with large amounts of internal knowledge",
      "Products that want to add useful, reliable AI features",
    ],
  },
  {
    index: "04",
    slug: "ai-automation",
    title: "AI Automation",
    description:
      "Connected workflows and intelligent automation that reduce repetitive work and improve efficiency.",
    labels: ["Workflows", "Integrations", "Ops"],
    visual: "automation",
    tagline: "Connected workflows that take repetitive work off your team's plate.",
    overview:
      "We map the manual steps in your operations and replace them with reliable automated workflows — connecting your apps, using AI where judgement is needed, and keeping a person in the loop for the exceptions.",
    build: [
      { title: "Lead & enquiry handling", text: "Capture, qualify and route new leads to the right person automatically." },
      { title: "Document processing", text: "Pull the data you need out of emails, forms, invoices and PDFs." },
      { title: "Reporting automation", text: "Scheduled reports and alerts assembled from the tools you already use." },
      { title: "App & CRM sync", text: "Keep your systems in sync without copy-and-paste." },
      { title: "Customer communication flows", text: "Follow-ups, reminders and notifications sent at the right moment." },
      { title: "Approval & back-office workflows", text: "Requests, sign-offs and hand-offs that move on their own." },
    ],
    included: [
      "Process mapping and opportunity review",
      "Workflow design and build",
      "AI classification and extraction steps",
      "Error handling and exception queues",
      "Monitoring and alerts",
      "Team training and documentation",
    ],
    stack: ["n8n", "LLMs", "AI Agents", "Node.js", "Python", "REST APIs", "MongoDB"],
    idealFor: [
      "Teams losing hours every week to repetitive admin",
      "Businesses juggling many disconnected apps",
      "Growing companies that want to scale without adding busywork",
    ],
  },
];

export const PROCESS = [
  {
    index: "01",
    title: "Discover",
    description: "Understand the business, identify challenges, and define objectives.",
    input: "Business context",
    output: "Defined objectives",
  },
  {
    index: "02",
    title: "Architect",
    description: "Plan the structure, technology, integrations, and system architecture.",
    input: "Objectives",
    output: "System blueprint",
  },
  {
    index: "03",
    title: "Engineer",
    description: "Design, develop, integrate, and test the solution.",
    input: "Blueprint",
    output: "Tested solution",
  },
  {
    index: "04",
    title: "Deploy",
    description: "Launch, optimize, and prepare the solution for growth.",
    input: "Tested solution",
    output: "Live system",
  },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  roleShort: string;
  bio: string;
  focus: string[];
  photo: string;
  cta: string;
};

// Edit the bios / focus areas to match how each person describes their role.
export const TEAM: TeamMember[] = [
  {
    name: "Muhammad Balach",
    role: "Chief Executive Officer",
    roleShort: "CEO",
    bio: "Leads Zevron Studio setting the company's direction, building client partnerships and making sure every engagement turns complex challenges into practical, lasting results.",
    focus: ["Company direction", "Client partnerships", "Delivery & growth"],
    photo: "/team/CEO-Balach.webp",
    cta: "Start a Conversation",
  },
  {
    name: "Asfand Yar",
    role: "Chief Technology Officer",
    roleShort: "Co-Founder & CTO",
    bio: "Leads engineering at Zevron Studio setting the technical direction, shaping system architecture and holding every build to the same standard of speed, structure and scale.",
    focus: ["System architecture", "AI & agentic systems", "Engineering standards"],
    photo: "/team/CTO-Asfand_Yar.webp",
    cta: "Talk Engineering With Us",
  },
];

// "Why People Trust Us" section (homepage, below Team).
export type TrustIcon = "demo" | "speed" | "local" | "ai" | "code" | "support";

export const TRUST = {
  label: "Why Choose Us",
  titleLines: ["Why Clients", "Choose Us"],
  subtitle: "Straightforward, honest, and made for how real businesses work.",
  points: [
    { icon: "demo", title: "See it before you pay", text: "We build a working demo first, so you judge results, not promises." },
    { icon: "speed", title: "Launch in days, not months", text: "Your project can be live in just 2–7 days." },
    {
      icon: "local",
      title: "Local roots, global reach",
      text: "Serving Pakistan and the world, with trusted service and support.",
    },
    { icon: "ai", title: "AI that actually helps", text: "Automation shaped around your real, day-to-day work." },
    { icon: "code", title: "Engineers, not templates", text: "Everything custom-built by real developers, without shortcuts or hype." },
    { icon: "support", title: "We stay after launch", text: "Team training and revisions come with every project." },
  ] as { icon: TrustIcon; title: string; text: string }[],
};

// "Guarantee Wall" section (homepage, below Services).
export const GUARANTEE = {
  label: "Our Guarantee",
  eyebrow: "Backed by results",
  titleLines: ["The Zevron", "Guarantee"],
  subtitle: "Real numbers, honest timelines and nothing hidden.",
  stats: [
    { value: "24/7", title: "Always-On AI", text: "Your AI assistant answers customers around the clock." },
    { value: "2–7", title: "Days to Launch", text: "A quick, focused setup with no unnecessary extras." },
    { value: "100%", title: "Demo Before Payment", text: "You see a working version before paying anything." },
  ],
  cta: "Get Your Free Demo",
};

// FAQ section (homepage, between "Why Choose Us" and "Start a Project").
// Q5/Q6: add your real price range and payment methods when you're ready.
export const FAQ = {
  label: "FAQ",
  titleLines: ["Questions,", "answered"],
  subtitle: "Everything you need to know before we start working together.",
  items: [
    {
      q: "What does Zevron Studio do?",
      a: "We build websites and web apps, custom business software, AI agents and assistants, and automated workflows — technology that saves you time and helps your business grow.",
    },
    {
      q: "How does the free demo work?",
      a: "Tell us what you need and we'll build a working demo before you pay anything. You see real results first, then decide whether to go ahead.",
    },
    {
      q: "I'm not sure what I need. Can you still help?",
      a: "Yes. Tell us the problem you're trying to solve and we'll recommend the right approach — even if it's a mix of services.",
    },
    {
      q: "How long does a project take?",
      a: "Most projects can go live in 2–7 days. Larger systems take longer, and we'll give you a clear timeline before we start. Timing also depends on receiving your content and feedback quickly.",
    },
    {
      q: "How much does it cost?",
      a: "Every project is quoted after we understand your needs — in PKR for clients in Pakistan and in international currencies for overseas clients. Because we build a free demo first, you'll know exactly what you're getting before you commit.",
    },
    {
      q: "How do I pay?",
      a: "Payment terms are agreed in your proposal before any work begins, and you only pay after you've seen and approved your demo. We'll confirm the payment method that works best for you.",
    },
    {
      q: "Is AI actually useful for a small business?",
      a: "Yes — when it's built around your real work. For example, an AI assistant that answers customer questions on WhatsApp around the clock, or automation that handles enquiries, follow-ups and reports so your team spends less time on repetitive tasks.",
    },
    {
      q: "Do I need technical knowledge to use what you build?",
      a: "Not at all. We set everything up, train your team and make sure you can manage it confidently. If you get stuck, we're just a WhatsApp message away.",
    },
    {
      q: "What happens after my project goes live?",
      a: "Support doesn't end at launch. Training and revisions are included, and we stay available for questions, fixes and improvements as your business grows.",
    },
    {
      q: "Who owns the website or software?",
      a: "You do. Once the project is paid in full, the final work built for you belongs to you.",
    },
  ],
};
