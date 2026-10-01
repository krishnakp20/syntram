import type { ServiceSummary } from "@/types/content";

/** Order here is the display order across the site. */
export const services: ServiceSummary[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    shortTitle: "AI Development",
    summary:
      "LLM applications, AI agents and retrieval systems engineered for production — grounded in your data and connected to your tools.",
    icon: "brain",
  },
  {
    slug: "voice-ai",
    title: "Voice AI Development",
    shortTitle: "Voice AI",
    summary:
      "Inbound and outbound voice agents that understand callers, take action in your systems and hand off to people when it matters.",
    icon: "audio-lines",
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    summary:
      "Internal platforms, SaaS products and line-of-business systems designed around how your team actually works.",
    icon: "code",
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Development",
    summary:
      "Fast, accessible, search-friendly websites and web applications built on a modern, maintainable stack.",
    icon: "globe",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    summary:
      "iOS and Android apps with clean architecture, offline-aware data and the backend services to support them.",
    icon: "smartphone",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud & DevOps",
    summary:
      "Infrastructure as code, CI/CD pipelines, observability and cost-aware cloud architecture you can operate with confidence.",
    icon: "cloud",
  },
  {
    slug: "api-integration",
    title: "API & System Integration",
    shortTitle: "API Integration",
    summary:
      "Connect CRMs, ERPs, telephony and third-party platforms with reliable, well-documented integrations.",
    icon: "plug",
  },
  {
    slug: "qa-testing",
    title: "QA & Testing",
    shortTitle: "QA & Testing",
    summary:
      "Automated test suites, release quality gates and evaluation pipelines for both conventional software and AI behaviour.",
    icon: "clipboard-check",
  },
];
