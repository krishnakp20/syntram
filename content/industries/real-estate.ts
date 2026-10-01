import type { IndustryDetail } from "@/types/content";

export const realEstate: IndustryDetail = {
  slug: "real-estate",
  title: "Real Estate",
  summary: "Lead qualification, site-visit scheduling and follow-up across every enquiry channel.",
  icon: "building",
  seo: {
    title: "AI Voice Agents for Real Estate",
    description:
      "AI and voice automation for developers, brokers and property managers: instant lead response, qualification, site-visit booking and CRM follow-up.",
  },
  hero: {
    headline: "Respond to every property enquiry while interest is high",
    intro:
      "Property leads arrive from portals, ads, websites and calls — often outside office hours. We help developers, brokerages and property managers respond instantly, qualify buyers and tenants, and keep follow-up consistent.",
  },
  challenges: [
    { title: "Slow lead response", description: "Leads cool quickly; callbacks that take hours lose buyers to faster competitors." },
    { title: "Unqualified enquiries", description: "Sales teams spend time on enquiries that don't match budget, location or timing." },
    { title: "Scheduling back-and-forth", description: "Coordinating site visits between buyers and agents takes many messages and calls." },
    { title: "Inconsistent follow-up", description: "Leads fall through the cracks without disciplined, timely follow-up." },
  ],
  solutionFits: [
    { solution: "voice-ai", rationale: "Call new leads promptly, ask qualification questions and schedule site visits with the right agent." },
    { solution: "business-process-automation", rationale: "Route, deduplicate and assign leads from every source, and trigger follow-up sequences." },
    { solution: "customer-support-automation", rationale: "Handle tenant and owner queries for property management, with maintenance requests logged automatically." },
  ],
  useCases: [
    { title: "Instant lead callback", description: "New portal or ad leads receive a call shortly after enquiring, with answers logged in the CRM." },
    { title: "Site-visit scheduling", description: "Qualified buyers pick a visit slot during the call, synced to the agent's calendar with reminders." },
    { title: "Tenant service desk", description: "Tenants report issues and get updates through chat or phone, with tickets created for maintenance teams." },
    { title: "Lead nurturing", description: "Personalised updates on new projects and price changes for leads who aren't ready yet, with consent." },
  ],
  technology: ["voice", "ai", "backend", "data"],
  considerations: {
    title: "What we account for in real estate",
    body: "Real estate automation should increase speed without making buyers feel processed.",
    points: [
      "Accurate project information sourced from approved inventory data",
      "Consent and do-not-call handling for outbound contact",
      "Fast handoff to a human agent for serious buyers",
      "Multilingual conversations for diverse buyer markets",
      "CRM integration so every interaction is tracked",
    ],
  },
  faqs: [
    {
      question: "Which lead sources can be connected?",
      answer: "Typically website forms, property portals, ad platforms, call tracking numbers and messaging channels — wherever an API, webhook or email feed is available.",
    },
    {
      question: "Can the agent answer questions about specific projects?",
      answer: "Yes, from the project information you approve — locations, configurations, availability and amenities. Pricing and offers can be included or routed to sales, as you prefer.",
    },
    {
      question: "Will this work with our CRM?",
      answer: "Most real estate and general-purpose CRMs offer integration options. We'll confirm the approach for your CRM during discovery.",
    },
  ],
  related: {
    services: ["voice-ai", "api-integration", "web-development"],
    solutions: ["voice-ai", "business-process-automation"],
  },
  cta: {
    title: "Stop losing leads to slow callbacks",
    description: "Share your lead sources and current response process. We'll show how instant qualification could work for you.",
    primaryLabel: "Explore Voice AI",
  },
};
