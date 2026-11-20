import { isVisible } from "@/lib/content/visibility";
import type { ProductDetail } from "@/types/content";

/**
 * Product registry.
 *
 * Entries with `placeholder: true` are hidden in production, noindexed and
 * rendered without features. Published products set `placeholder: false` and
 * fill in only the fields that are confirmed. Empty sections are not rendered.
 */
export const products: ProductDetail[] = [
  {
    slug: "voice-ai-platform",
    name: "Voice AI Platform",
    tagline:
      "AI voice agents that answer, understand and act on every call — connected to your CRM, calendar and team.",
    status: "in-development",
    icon: "audio-lines",
    placeholder: false,
    showcase: "voice-platform",
    ctaLabel: "Request a demo",
    seo: {
      title: "Voice AI Platform — AI Voice Agents for Inbound & Outbound Calls",
      description:
        "The ZAYBX Voice AI Platform runs AI voice agents that answer calls, understand intent, take actions in your systems and hand over to people when needed.",
    },
    overview:
      "The ZAYBX Voice AI Platform lets businesses put AI voice agents on their phone lines. Agents talk naturally with callers, understand what they need, and complete the task — booking an appointment, checking an order, answering a question — by working directly with your CRM, calendar and business systems. When a person is needed, the call is handed over with full context. Every conversation is recorded, transcribed and summarised, so you can see what customers ask for and keep improving.",
    features: [
      { title: "Natural voice conversations", description: "Low-latency speech recognition and lifelike voices that let callers speak normally and interrupt.", icon: "audio-lines" },
      { title: "Inbound and outbound calls", description: "Answer every incoming call, or run outbound reminders, follow-ups and surveys.", icon: "phone-call" },
      { title: "Actions in your systems", description: "Agents look up records, book slots, create tickets and update your CRM during the call.", icon: "plug" },
      { title: "Human handover", description: "Transfer to a live agent at any point, with the transcript and summary passed along.", icon: "headset" },
      { title: "Multilingual", description: "Conversations in English, Hindi and other languages, configured per deployment.", icon: "languages" },
      { title: "Analytics & quality", description: "Transcripts, summaries, intents and outcomes for every call, with dashboards for your team.", icon: "bar-chart" },
      { title: "Guardrails & compliance", description: "Clear rules for what an agent may say or do, consent messages and secure data handling.", icon: "shield" },
      { title: "Flow builder", description: "Configure greetings, intents, actions and escalation rules for each agent.", icon: "workflow" },
    ],
    useCases: [
      { title: "Clinics & healthcare", description: "Book, reschedule and confirm appointments, and answer common questions 24/7." },
      { title: "E-commerce & retail", description: "Order status, returns and delivery queries handled instantly, with escalation for exceptions." },
      { title: "Financial services", description: "Payment reminders, account FAQs and lead qualification with verification steps built in." },
      { title: "Contact centres", description: "Take routine calls off agents' queues and give them summaries for the calls they do handle." },
    ],
    integrations: [
      "SIP / VoIP telephony",
      "Cloud telephony",
      "Contact-centre diallers",
      "CRM systems",
      "Helpdesk & ticketing",
      "Calendars & booking",
      "WhatsApp & SMS",
      "REST APIs & webhooks",
    ],
    faqs: [
      {
        question: "Is the platform available now?",
        answer:
          "The platform is in active development and available for pilot deployments. Request a demo and we'll show you how it works with a use case like yours.",
      },
      {
        question: "Can it work with our existing phone system?",
        answer:
          "In most cases, yes. It connects over SIP/VoIP or through cloud telephony providers, so you can keep your numbers and route calls to the AI agent.",
      },
      {
        question: "What happens if the AI can't help a caller?",
        answer:
          "The agent hands the call to a person — on request, or when rules you set are met — and passes along the transcript and a summary so the caller doesn't need to repeat themselves.",
      },
      {
        question: "How is call data kept secure?",
        answer:
          "Calls and transcripts are stored securely with access controls, and agents follow rules on what they may say or record. We agree data handling and retention with you for each deployment.",
      },
    ],
    related: {
      services: ["voice-ai", "ai-development"],
      solutions: ["voice-ai"],
    },
  },
];

/** Products that may be shown in the current environment. */
export function getVisibleProducts(): ProductDetail[] {
  return products.filter(isVisible);
}

export function getProduct(slug: string): ProductDetail | undefined {
  return getVisibleProducts().find((p) => p.slug === slug);
}

export const productStatusLabel: Record<ProductDetail["status"], string> = {
  "in-development": "In development",
  beta: "Beta",
  available: "Available",
};
