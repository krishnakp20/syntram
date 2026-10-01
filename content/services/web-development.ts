import type { ServiceDetail } from "@/types/content";

export const webDevelopment: ServiceDetail = {
  slug: "web-development",
  title: "Web Development",
  shortTitle: "Web Development",
  summary: "Fast, accessible, search-friendly websites and web applications built on a modern, maintainable stack.",
  icon: "globe",
  seo: {
    title: "Web Development — Websites & Web Apps",
    description:
      "Fast, accessible, SEO-friendly websites and web apps built with React, Next.js and TypeScript by Syntram Technologies, designed for Core Web Vitals.",
  },
  hero: {
    headline: "Websites and web apps that are fast, findable and accessible",
    intro:
      "We build marketing websites, web applications and portals on a modern React and Next.js stack — with performance, accessibility and search visibility designed in from the start, not patched on before launch.",
  },
  problem: {
    title: "What holds websites back",
    body: "A slow, hard-to-update website quietly costs leads and search visibility. Many sites are built on heavy templates and plugins that look fine on a fast laptop but struggle on real phones and networks.",
    points: [
      "Slow load times and layout shifts on mobile",
      "Content changes that need a developer every time",
      "Poor accessibility that excludes users and creates risk",
      "Technical SEO issues: duplicate pages, missing metadata, broken structure",
      "Bloated plugins and scripts that are hard to secure and maintain",
    ],
  },
  solution: {
    title: "How we build for the web",
    body: "We use server-first rendering, minimal client-side JavaScript and a component-based design system, so pages are fast by default and consistent as the site grows.",
    points: [
      "Performance budgets for Core Web Vitals, measured before launch",
      "Accessibility built to WCAG principles: semantics, keyboard, contrast, focus",
      "Structured metadata, sitemaps and clean URLs for search engines",
      "Headless CMS options so your team can publish without developers",
      "Analytics and conversion tracking planned with your goals",
    ],
  },
  capabilities: [
    { title: "Marketing websites", description: "Company and product sites designed to explain clearly and convert qualified visitors.", icon: "globe" },
    { title: "Web applications", description: "Interactive, data-driven applications with authentication and real-time features.", icon: "code" },
    { title: "Headless CMS", description: "Structured content in a CMS your team can manage, delivered through a fast frontend.", icon: "file-text" },
    { title: "Technical SEO", description: "Metadata, structured data, sitemaps, internal linking and crawlable architecture.", icon: "file-search" },
    { title: "Performance optimisation", description: "Audits and fixes for load speed, responsiveness and visual stability.", icon: "timer" },
    { title: "Accessibility", description: "Accessible components and audits aligned with WCAG 2.2 AA principles.", icon: "users" },
  ],
  useCases: [
    { title: "Company website rebuild", description: "Replacing a slow, template-based site with a fast, maintainable one and a CMS your team can use." },
    { title: "Customer self-service portal", description: "Account, billing and request management that reduces support load." },
    { title: "Product marketing site", description: "Landing pages, documentation and resources that support a product launch and ongoing content." },
    { title: "Web dashboard for operations", description: "Real-time views of orders, calls, tickets or field activity for internal teams." },
  ],
  technology: ["frontend", "backend", "cloud"],
  faqs: [
    {
      question: "Which technologies do you use for websites?",
      answer:
        "Most of our web work uses React and Next.js with TypeScript, paired with a headless CMS where content editing is needed. We choose this stack for performance, search-friendliness and a large ecosystem — but we'll recommend something simpler when it fits better.",
    },
    {
      question: "Will we be able to edit content ourselves?",
      answer: "Yes. We set up a CMS with structured content types and previews, so marketing and content teams can publish without developer involvement.",
    },
    {
      question: "Do you handle SEO?",
      answer:
        "We handle technical SEO as part of the build: clean URLs, metadata, structured data, sitemaps, performance and accessible markup. Content strategy and copywriting can be added, or we can work alongside your SEO specialists.",
    },
    {
      question: "Can you improve our existing site instead of rebuilding it?",
      answer: "Often, yes. We can audit performance, accessibility and SEO and fix the highest-impact issues. If the underlying platform is the problem, we'll explain why a rebuild may be better value.",
    },
  ],
  related: {
    services: ["custom-software-development", "qa-testing", "cloud-devops"],
    solutions: ["customer-support-automation"],
    industries: ["ecommerce", "real-estate", "education"],
  },
  cta: {
    title: "Planning a new website or web app?",
    description: "Tell us what it needs to achieve. We'll recommend the right structure, stack and scope.",
    primaryLabel: "Start a Conversation",
  },
};
