import type { IndustryDetail } from "@/types/content";

export const ecommerce: IndustryDetail = {
  slug: "ecommerce",
  title: "E-commerce",
  summary: "Order support, returns, catalogue operations and conversational commerce.",
  icon: "shopping-cart",
  seo: {
    title: "AI & Automation for E-commerce",
    description:
      "AI, voice and automation for e-commerce brands: automate order and returns support, catalogue operations and customer communication with Syntram Technologies.",
  },
  hero: {
    headline: "AI and automation for online retail operations",
    intro:
      "E-commerce teams handle high volumes of similar questions, large catalogues and tight delivery expectations. We help brands and retailers automate support and operations so customers get quick answers and teams can focus on growth.",
  },
  challenges: [
    {
      title: "\"Where is my order?\" at scale",
      description: "Order status and delivery questions make up a large share of contacts and spike around sales and holidays.",
    },
    {
      title: "Returns and exchanges",
      description: "Each return involves policy checks, labels, refunds and stock updates across several systems.",
    },
    {
      title: "Catalogue upkeep",
      description: "Writing, translating and enriching product data for thousands of SKUs is slow and inconsistent.",
    },
    {
      title: "Fragmented systems",
      description: "Storefront, marketplace, warehouse, payments and support tools rarely share data cleanly.",
    },
  ],
  solutionFits: [
    {
      solution: "customer-support-automation",
      rationale: "Resolve order-status, delivery and return questions instantly using live order data, across chat, email and messaging.",
    },
    {
      solution: "ai-automation",
      rationale: "Generate and enrich product descriptions, attributes and translations for review, and classify incoming requests.",
    },
    {
      solution: "business-process-automation",
      rationale: "Connect returns, refunds, inventory and fulfilment steps so they run without manual hand-offs.",
    },
  ],
  useCases: [
    { title: "Order tracking assistant", description: "Customers check order and delivery status in chat or by phone, verified against their order details." },
    { title: "Automated returns flow", description: "Eligibility checked against policy, labels issued and refunds triggered once items are received." },
    { title: "Product content generation", description: "Draft descriptions and attributes created from supplier data, reviewed by your team before publishing." },
    { title: "Abandoned-cart and post-purchase messaging", description: "Timely, relevant messages based on behaviour and order events, respecting consent." },
  ],
  technology: ["ai", "backend", "data", "frontend"],
  considerations: {
    title: "What we take into account in e-commerce",
    body: "Retail automation has to cope with peaks, protect customer data and keep the brand voice consistent.",
    points: [
      "Capacity planning for sale events and seasonal peaks",
      "Order-level verification before sharing personal or order details",
      "Brand tone and approved policies enforced in AI responses",
      "Integration with storefront, marketplace and logistics platforms",
      "Consent and opt-out handling for marketing messages",
    ],
  },
  faqs: [
    {
      question: "Can you integrate with our e-commerce platform?",
      answer: "Most major storefront and marketplace platforms offer APIs. We'll review your stack — storefront, OMS, warehouse, helpdesk — and confirm the integration approach during discovery.",
    },
    {
      question: "Will AI-generated product content hurt SEO?",
      answer: "Not if it's accurate, original and reviewed. We design content workflows where AI drafts from your product data and people approve before publishing, avoiding thin or duplicate descriptions.",
    },
    {
      question: "Can the AI process refunds?",
      answer: "It can initiate refunds within rules you define — for example, below a value threshold and within policy — with everything else routed to your team for approval.",
    },
  ],
  related: {
    services: ["ai-development", "api-integration", "web-development"],
    solutions: ["customer-support-automation", "ai-automation"],
  },
  cta: {
    title: "Let's reduce your support load before the next peak",
    description: "Tell us about your platform and contact volume. We'll identify the quickest wins for your customers and team.",
    primaryLabel: "Talk to Our Team",
  },
};
