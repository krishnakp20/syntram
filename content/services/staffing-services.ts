import type { ServiceDetail } from "@/types/content";

export const staffingServices: ServiceDetail = {
  slug: "staffing-services",
  title: "IT Staffing Services",
  shortTitle: "Staffing Services",
  summary:
    "Skilled developers, AI engineers and IT specialists who join your team on contract or as a dedicated extension of it.",
  icon: "handshake",
  seo: {
    title: "IT Staffing Services — Developers, AI Engineers & Dedicated Teams",
    description:
      "IT staffing from ZAYBX: contract developers, AI and Python engineers, database administrators and dedicated teams that work as part of yours.",
  },
  hero: {
    headline: "The right engineers, ready to join your team",
    intro:
      "Whether you need one specialist for a few months or a dedicated team for a long-term product, we provide vetted IT professionals who work inside your process and tools.",
  },
  problem: {
    title: "Why hiring tech talent is hard",
    body: "Good engineers are in demand, hiring takes months, and project needs change faster than headcount plans. Gaps in a team slow delivery and put deadlines at risk.",
    points: [
      "Long hiring cycles for niche skills like AI, Python or database administration",
      "Short-term peaks in work that don't justify a permanent hire",
      "Projects stalled while a key role stays vacant",
      "Uncertainty about a candidate's real, hands-on ability",
    ],
  },
  solution: {
    title: "How our staffing works",
    body: "We understand the role and your team first, then propose people whose skills and experience fit — screened technically by our own engineers.",
    points: [
      "Role and skills brief agreed with your team",
      "Technical screening by experienced engineers",
      "Flexible models: contract, contract-to-hire or dedicated team",
      "Remote or on-site, part-time or full-time engagement",
      "A single point of contact for onboarding, reporting and replacements",
    ],
  },
  capabilities: [
    { title: "Web & app developers", description: "Front-end, back-end and full-stack developers for web and mobile products.", icon: "code" },
    { title: "AI & Python engineers", description: "Engineers who build LLM applications, AI tools and data pipelines.", icon: "brain" },
    { title: "Database administrators", description: "DBAs for performance tuning, backups, security and migrations.", icon: "database" },
    { title: "Tech leads & managers", description: "Experienced leads and application managers to guide delivery.", icon: "users" },
    { title: "QA & testing", description: "Manual and automation testers to strengthen release quality.", icon: "clipboard-check" },
    { title: "Cloud & DevOps", description: "Engineers for infrastructure, CI/CD and cloud operations.", icon: "cloud" },
  ],
  useCases: [
    { title: "Fill a critical gap", description: "A specialist joins quickly to keep a project moving while you hire permanently." },
    { title: "Scale for a launch", description: "Extra developers for a release or migration, then scale back when it's done." },
    { title: "Dedicated product team", description: "A stable team that works only on your product, managed with your process." },
    { title: "Contract-to-hire", description: "Work with someone on contract first, then bring them on board permanently." },
  ],
  technology: ["ai", "backend", "frontend", "cloud"],
  faqs: [
    {
      question: "Which engagement models do you offer?",
      answer:
        "Contract staffing, contract-to-hire and dedicated teams. Engagements can be part-time or full-time, remote or on-site, depending on what the role needs.",
    },
    {
      question: "How do you check a candidate's skills?",
      answer:
        "Our engineers run technical screening for each role — practical questions and, where useful, a short task — so you only meet people who can do the work.",
    },
    {
      question: "What happens if someone isn't the right fit?",
      answer: "Tell us early and we'll work with you to resolve it, including proposing a replacement where needed.",
    },
  ],
  related: {
    services: ["custom-software-development", "ai-development", "web-development"],
    solutions: ["business-process-automation"],
    industries: ["fintech", "ecommerce", "healthcare"],
  },
  cta: {
    title: "Need skilled people on your team?",
    description: "Tell us the role, skills and timeline. We'll come back with how we can help and suitable profiles.",
    primaryLabel: "Talk to Our Team",
  },
};
