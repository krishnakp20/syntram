import type { IndustryDetail } from "@/types/content";

export const fintech: IndustryDetail = {
  slug: "fintech",
  title: "FinTech",
  summary: "Customer onboarding, collections outreach and support built with compliance in mind.",
  icon: "landmark",
  seo: {
    title: "AI & Automation for FinTech",
    description:
      "AI and automation for fintech and financial services: onboarding document processing, compliant outreach, support automation and secure integrations.",
  },
  hero: {
    headline: "Automation for financial services, built with control in mind",
    intro:
      "Fintech and financial services teams need to move fast without compromising security, compliance or customer trust. We build AI and automation for onboarding, outreach and support with the audit trails and controls the sector requires.",
  },
  challenges: [
    { title: "Onboarding friction", description: "Document collection and verification steps slow onboarding and cause drop-off." },
    { title: "Collections and reminders", description: "Outreach must be timely, respectful and compliant with local rules on contact and disclosure." },
    { title: "High support volume", description: "Account, card and transaction queries arrive constantly and require secure verification." },
    { title: "Audit and compliance", description: "Every automated decision needs to be explainable and traceable." },
  ],
  solutionFits: [
    { solution: "ai-automation", rationale: "Classify and extract data from onboarding documents for verification, with exceptions routed to compliance staff." },
    { solution: "voice-ai", rationale: "Run compliant reminder and follow-up calls with consent rules, calling windows and clear escalation." },
    { solution: "customer-support-automation", rationale: "Handle routine account queries after secure verification, handing off sensitive cases to trained staff." },
  ],
  useCases: [
    { title: "Document collection and checks", description: "Applicants are guided to submit complete documents; key details are extracted and checked for consistency." },
    { title: "Payment reminder calls", description: "Automated, polite reminders offering options to pay, reschedule or speak to an agent." },
    { title: "Transaction query assistant", description: "Customers get answers about transactions and statuses after authentication." },
    { title: "Compliance reporting support", description: "Data from several systems compiled into reports for review by compliance teams." },
  ],
  technology: ["ai", "backend", "data", "cloud"],
  considerations: {
    title: "Controls we build in for financial services",
    body: "In regulated environments, automation must be explainable, secure and easy to audit.",
    points: [
      "Strong customer verification before sharing account information",
      "Logged inputs, outputs and decisions for every automated step",
      "Human approval for credit, fraud and other high-impact decisions",
      "Encryption, least-privilege access and secure secrets handling",
      "Outreach rules aligned with the regulations in your markets, reviewed by your compliance team",
    ],
  },
  faqs: [
    {
      question: "Can AI make lending or credit decisions?",
      answer: "We don't recommend fully automated high-impact decisions. AI can prepare and summarise information for decision-makers, while approvals remain with people and your established policies.",
    },
    {
      question: "How do you handle regulatory requirements?",
      answer:
        "We design for auditability, data protection and configurable rules, and work with your compliance team to reflect the requirements that apply to you. We don't provide legal or regulatory advice.",
    },
    {
      question: "Can you integrate with core banking or payment systems?",
      answer: "Where APIs or integration layers are available, yes. We'll assess the systems involved and the security requirements during discovery.",
    },
  ],
  related: {
    services: ["ai-development", "api-integration", "qa-testing"],
    solutions: ["ai-automation", "customer-support-automation"],
  },
  cta: {
    title: "Automate with confidence",
    description: "Tell us which process you'd like to improve. We'll outline an approach with the controls your compliance team will expect.",
    primaryLabel: "Discuss Your Project",
  },
};
