import type { ServiceDetail } from "@/types/content";

export const customSoftwareDevelopment: ServiceDetail = {
  slug: "custom-software-development",
  title: "Custom Software Development",
  shortTitle: "Custom Software",
  summary:
    "Internal platforms, SaaS products and line-of-business systems designed around how your team actually works.",
  icon: "code",
  seo: {
    title: "Custom Software Development Services",
    description:
      "Custom software development by Syntram Technologies: SaaS products, internal platforms and business systems with clean architecture and automated testing.",
  },
  hero: {
    headline: "Custom software, built around how you actually work",
    intro:
      "When off-the-shelf tools force your team into workarounds and spreadsheets, purpose-built software can remove the friction. We design and build SaaS products, internal platforms and business systems that fit your processes — and that your team can own and evolve.",
  },
  problem: {
    title: "When generic tools stop fitting",
    body: "Growing businesses often end up stitching together tools that were never meant to work together. The cost shows up as manual effort, inconsistent data and processes that only a few people understand.",
    points: [
      "Critical processes living in spreadsheets and email threads",
      "The same data entered into several systems by hand",
      "Licensing costs for features you don't use, and missing ones you need",
      "Legacy systems that are risky to change and hard to hire for",
      "No single view of operations for decision-makers",
    ],
  },
  solution: {
    title: "How we approach custom builds",
    body: "We start with the workflow and the people using it, not the technology. Then we build in small, demonstrable increments on a mainstream, well-supported stack — so the software is useful early and maintainable for years.",
    points: [
      "Discovery workshops to map processes, roles and data before design",
      "Clear domain models and architecture decisions, documented as we go",
      "Incremental delivery with regular demos and feedback",
      "Automated testing and CI/CD from the first sprint",
      "Code and infrastructure delivered into your own accounts",
    ],
  },
  capabilities: [
    { title: "SaaS product development", description: "Multi-tenant products with authentication, billing, roles and admin tooling.", icon: "layers" },
    { title: "Internal tools & portals", description: "Operations dashboards, admin panels and staff portals that replace spreadsheets.", icon: "wrench" },
    { title: "Workflow & business systems", description: "Order, inventory, case, scheduling and approval systems modelled on your processes.", icon: "workflow" },
    { title: "Legacy modernisation", description: "Incremental replacement of ageing systems without a risky big-bang rewrite.", icon: "git-branch" },
    { title: "Data platforms & reporting", description: "Clean data models, reporting and dashboards that give teams a shared view.", icon: "database" },
    { title: "AI-ready architecture", description: "Systems designed so AI features can be added safely as your needs evolve.", icon: "brain" },
  ],
  useCases: [
    {
      title: "Operations platform",
      description: "A single system replacing several spreadsheets and tools to manage orders, assignments, approvals and reporting.",
    },
    {
      title: "Customer portal",
      description: "A secure portal where customers track requests, upload documents and communicate — reducing email back-and-forth.",
    },
    {
      title: "SaaS MVP",
      description: "A focused first version of a product with the core workflow, authentication and billing, ready for early customers.",
    },
    {
      title: "Legacy system replacement",
      description: "A phased migration from an outdated system, running old and new side by side until the switch is safe.",
    },
  ],
  technology: ["frontend", "backend", "data", "cloud"],
  faqs: [
    {
      question: "Should we build custom software or buy an existing product?",
      answer:
        "Buy when a product fits your process well and isn't a source of competitive advantage. Build when the workflow is specific to you, integrations are critical, or licensing and workarounds cost more than ownership. We'll give you an honest view — sometimes the answer is configuring an existing tool.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You do. Code lives in your repositories and infrastructure in your cloud accounts, with documentation to support your team or another partner in the future.",
    },
    {
      question: "How do you estimate cost and timeline?",
      answer:
        "After discovery we break the work into scoped milestones with estimates and assumptions stated clearly. We prefer to deliver a valuable first release early and plan subsequent phases with what we learn.",
    },
    {
      question: "Can you work with our existing development team?",
      answer:
        "Yes. We can lead delivery, work as part of a blended team, or take ownership of specific components — with shared repositories, reviews and documentation.",
    },
  ],
  related: {
    services: ["web-development", "api-integration", "qa-testing"],
    solutions: ["business-process-automation", "ai-automation"],
    industries: ["logistics", "fintech", "education"],
  },
  cta: {
    title: "Let's scope the software you need",
    description: "Walk us through the workflow that's causing friction. We'll suggest what to build, what to buy and what to leave alone.",
    primaryLabel: "Discuss Your Project",
  },
};
