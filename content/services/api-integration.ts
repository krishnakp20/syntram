import type { ServiceDetail } from "@/types/content";

export const apiIntegration: ServiceDetail = {
  slug: "api-integration",
  title: "API & System Integration",
  shortTitle: "API Integration",
  summary: "Connect CRMs, ERPs, telephony and third-party platforms with reliable, well-documented integrations.",
  icon: "plug",
  seo: {
    title: "API & System Integration Services",
    description:
      "Connect CRMs, ERPs, telephony, payment and third-party platforms with reliable, secure and well-documented integrations from Syntram Technologies.",
  },
  hero: {
    headline: "Integrations that keep your systems in sync",
    intro:
      "Your CRM, ERP, helpdesk, telephony and payment platforms each hold part of the picture. We connect them with reliable APIs and event-driven integrations, so data flows where it's needed without manual re-entry.",
  },
  problem: {
    title: "The cost of disconnected systems",
    body: "When systems don't talk to each other, people become the integration layer — copying data, reconciling records and chasing updates. Fragile point-to-point scripts make things worse when they fail silently.",
    points: [
      "Duplicate data entry across tools",
      "Records that disagree between systems",
      "Integrations that break silently when a vendor changes an API",
      "No clear record of what synced, when and why it failed",
      "Automation and AI projects blocked by inaccessible data",
    ],
  },
  solution: {
    title: "How we build integrations",
    body: "We design integrations as products: documented contracts, error handling, retries and monitoring — so they keep working and you know when they don't.",
    points: [
      "Clear data mapping and ownership rules between systems",
      "Event-driven sync with webhooks and queues where possible",
      "Idempotent operations, retries and dead-letter handling",
      "Authentication and secrets handled securely server-side",
      "Dashboards and alerts for integration health",
    ],
  },
  capabilities: [
    { title: "CRM & ERP integration", description: "Two-way sync of contacts, deals, orders and inventory across business systems.", icon: "database" },
    { title: "Telephony & messaging", description: "Connect calls, SMS, WhatsApp and email platforms to your CRM and workflows.", icon: "phone-call" },
    { title: "Custom API development", description: "Well-designed REST or GraphQL APIs with documentation, versioning and access control.", icon: "code" },
    { title: "Webhooks & event pipelines", description: "Reliable event processing with queues, retries and replay.", icon: "network" },
    { title: "Payment & third-party services", description: "Payments, identity, maps, logistics and other provider integrations.", icon: "plug" },
    { title: "Integration monitoring", description: "Visibility into sync status, failures and data quality.", icon: "activity" },
  ],
  useCases: [
    { title: "Call-to-CRM logging", description: "Every call — human or AI — is logged against the right contact with recording links, notes and outcome." },
    { title: "Order sync", description: "Orders flow from storefront to ERP and fulfilment, with status updates pushed back to customers." },
    { title: "Lead routing", description: "Leads from web forms, ads and calls are deduplicated, enriched and assigned automatically." },
    { title: "Unified customer view", description: "Data from support, billing and sales combined into one profile for your team." },
  ],
  technology: ["backend", "data", "cloud"],
  faqs: [
    {
      question: "Can you integrate with a system that has no public API?",
      answer:
        "Sometimes. Options include database-level integration, file exchange, vendor partner APIs or, as a last resort, carefully controlled automation of the user interface. We'll explain the trade-offs in reliability and maintenance for each.",
    },
    {
      question: "Should we use an integration platform or custom code?",
      answer:
        "Low-code integration platforms work well for simple, standard connections. Custom integrations are better when logic is complex, volumes are high or reliability is critical. Many organisations use both.",
    },
    {
      question: "How do you handle failures?",
      answer: "Integrations we build log every operation, retry transient failures, quarantine bad records for review and alert the right people — so problems are visible and recoverable.",
    },
    {
      question: "How do you secure API credentials?",
      answer: "Credentials are stored in a secrets manager, never in client-side code or repositories, scoped to the minimum permissions required and rotated where providers support it.",
    },
  ],
  related: {
    services: ["custom-software-development", "cloud-devops", "ai-development"],
    solutions: ["business-process-automation", "ai-automation"],
    industries: ["ecommerce", "logistics", "real-estate"],
  },
  cta: {
    title: "Which systems need to talk to each other?",
    description: "List the tools you use and where data gets stuck. We'll outline an integration approach that's reliable and maintainable.",
    primaryLabel: "Discuss Your Integration",
  },
};
