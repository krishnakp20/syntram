import type { SolutionDetail } from "@/types/content";

export const customerSupportAutomation: SolutionDetail = {
  slug: "customer-support-automation",
  title: "Customer Support Automation",
  summary: "Resolve routine requests instantly across chat, email and voice — and route the rest with context.",
  icon: "headset",
  seo: {
    title: "Customer Support Automation with AI",
    description:
      "AI that resolves routine customer requests across chat, email and phone, routes complex issues with full context and supports your agents.",
  },
  hero: {
    headline: "Faster answers for customers, fewer repetitive tickets for your team",
    intro:
      "A large share of support contacts are routine: order status, account changes, how-to questions. We build AI support that resolves those instantly across channels, and gives your agents full context on everything it hands over.",
  },
  problem: {
    title: "Support teams stuck on repeat",
    body: "As a business grows, support volume grows with it. Hiring alone can't keep up, and agents burn out answering the same questions while complex cases wait.",
    points: [
      "Long waits during peaks, evenings and weekends",
      "Agents answering the same questions many times a day",
      "Customers repeating themselves after every transfer",
      "Knowledge scattered across help articles, docs and people's heads",
      "Little insight into why customers are contacting you",
    ],
  },
  howItWorks: [
    { title: "Unify channels", description: "Chat, email, web forms and phone feed one system, so every request is handled consistently." },
    { title: "Identify & understand", description: "The customer is identified where possible and their intent is recognised from their own words." },
    { title: "Resolve routine requests", description: "Answers come from your knowledge base and live data; simple actions are completed via your systems." },
    { title: "Hand off with context", description: "Complex or sensitive issues go to the right agent with the conversation, summary and customer details." },
    { title: "Improve the loop", description: "Unresolved topics and gaps in knowledge are surfaced so content and flows keep getting better." },
  ],
  outcomes: [
    { title: "Immediate responses", description: "Customers get help at any hour without waiting in a queue for routine requests.", icon: "timer" },
    { title: "Agents on meaningful work", description: "Your team spends time on complex, high-value conversations.", icon: "users" },
    { title: "No repeating themselves", description: "Context travels with the customer from AI to agent and across channels.", icon: "handshake" },
    { title: "Visibility into demand", description: "Clear reporting on contact reasons, resolution paths and knowledge gaps.", icon: "bar-chart" },
  ],
  capabilities: [
    { title: "AI chat & email assistants", description: "Grounded answers and actions across web chat, messaging apps and email.", icon: "messages" },
    { title: "Voice support agents", description: "Phone support that resolves routine calls and transfers the rest.", icon: "phone-call" },
    { title: "Agent assist", description: "Suggested replies, summaries and next steps inside your helpdesk.", icon: "sparkles" },
    { title: "Knowledge base retrieval", description: "Answers drawn from approved content, with sources and freshness controls.", icon: "book-open" },
  ],
  useCases: [
    { title: "Order and delivery questions", description: "Customers check order status, change delivery details or start a return without waiting for an agent." },
    { title: "Account and billing help", description: "Common account changes and billing questions handled securely after verification." },
    { title: "Technical troubleshooting", description: "Step-by-step guidance from your documentation, with escalation when steps don't solve it." },
    { title: "Ticket summarisation", description: "Long threads summarised for agents, with suggested next actions." },
  ],
  technology: ["ai", "voice", "backend", "data"],
  faqs: [
    {
      question: "Will AI replace our support team?",
      answer:
        "That isn't the goal we design for. AI handles repetitive, well-defined requests so your team can focus on complex, sensitive and relationship-building conversations. Customers should always be able to reach a person.",
    },
    {
      question: "Does it work with our helpdesk?",
      answer: "Most modern helpdesk and CRM platforms provide APIs we can integrate with. We'll confirm compatibility for your specific tools during discovery.",
    },
    {
      question: "How do you keep answers accurate?",
      answer:
        "The AI answers from approved knowledge sources and live system data rather than general knowledge, is instructed to escalate when unsure, and is evaluated against real past conversations before launch.",
    },
    {
      question: "Can it handle multiple languages?",
      answer: "Yes, for languages supported by the chosen models. We test quality in each language you need before enabling it for customers.",
    },
  ],
  related: {
    services: ["ai-development", "voice-ai", "api-integration"],
    solutions: ["voice-ai", "ai-automation"],
    industries: ["ecommerce", "travel", "fintech"],
  },
  cta: {
    title: "Let's look at your support volume",
    description: "Share your most common contact reasons. We'll show you which can be resolved automatically and how handoff to your team would work.",
    primaryLabel: "Talk to Our Team",
  },
};
