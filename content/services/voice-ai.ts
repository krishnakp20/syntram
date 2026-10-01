import type { ServiceDetail } from "@/types/content";

export const voiceAi: ServiceDetail = {
  slug: "voice-ai",
  title: "Voice AI Development",
  shortTitle: "Voice AI",
  summary:
    "Inbound and outbound voice agents that understand callers, take action in your systems and hand off to people when it matters.",
  icon: "audio-lines",
  seo: {
    title: "Voice AI Development Services",
    description:
      "Real-time AI voice agents for inbound and outbound calls, with telephony, CRM integration, call analytics and human handoff, by Syntram Technologies.",
  },
  hero: {
    headline: "Voice AI agents, engineered for real phone calls",
    intro:
      "We build real-time voice agents that answer and place calls, understand what callers need, act in your business systems and transfer to a person with full context — designed around latency, reliability and the realities of telephony.",
  },
  problem: {
    title: "Why voice is harder than chat",
    body: "A voice agent has a fraction of a second to respond, can't show a menu, and has to cope with background noise, accents, interruptions and people who change their mind mid-sentence. Generic chatbot approaches rarely survive contact with real callers.",
    points: [
      "Noticeable delays that make conversations feel robotic",
      "Mis-heard names, numbers and addresses that break the task",
      "Agents that can talk but can't actually do anything in your systems",
      "No graceful path to a human when the call goes off-script",
      "Little visibility into what callers asked and how calls ended",
    ],
  },
  solution: {
    title: "Our approach to voice AI",
    body: "We engineer the full real-time pipeline — telephony, streaming speech recognition, reasoning, business logic, integrations and speech synthesis — and tune each part against the conversations your callers actually have.",
    points: [
      "Streaming architecture designed to keep response latency low",
      "Speech recognition tuned with your vocabulary, product names and common phrases",
      "Structured conversation design with clear goals, confirmations and recovery paths",
      "Tool calls into your CRM, calendar, ticketing or order systems",
      "Warm transfer to people, with transcript and summary attached",
    ],
  },
  capabilities: [
    {
      title: "Inbound voice agents",
      description: "Answer calls around the clock, resolve common requests and route the rest correctly the first time.",
      icon: "phone-incoming",
    },
    {
      title: "Outbound voice agents",
      description: "Reminders, confirmations, follow-ups and qualification calls — with consent and calling rules built in.",
      icon: "phone-outgoing",
    },
    {
      title: "Telephony integration",
      description: "Connect to your numbers and contact-centre stack over SIP, cloud telephony providers or WebRTC.",
      icon: "phone-call",
    },
    {
      title: "Multilingual conversations",
      description: "Agents that handle more than one language and switch when the caller does, where supported by the models used.",
      icon: "languages",
    },
    {
      title: "Call analytics & QA",
      description: "Transcription, tagging, outcome tracking and quality scoring across every call — AI-handled or human.",
      icon: "bar-chart",
    },
    {
      title: "Human handoff",
      description: "Rules for when to escalate, and a warm transfer that passes the transcript and context to the person picking up.",
      icon: "handshake",
    },
  ],
  useCases: [
    {
      title: "Appointment booking and rescheduling",
      description:
        "Callers book, move or cancel appointments in natural conversation; the agent checks live availability and updates your calendar.",
    },
    {
      title: "Lead qualification",
      description:
        "New enquiries get an immediate call that captures requirements, budget and timing, then books a meeting with the right person.",
    },
    {
      title: "Order and delivery status",
      description:
        "The agent identifies the caller, looks up the order and answers status questions — escalating exceptions to your team.",
    },
    {
      title: "After-hours support",
      description:
        "Calls outside business hours are handled consistently, urgent issues are escalated, and everything else is logged for the morning.",
    },
  ],
  technology: ["voice", "ai", "backend", "cloud"],
  process: [
    {
      title: "Call discovery",
      description: "We listen to real calls (or review call logs), map intents and outcomes, and pick the highest-value flows to automate first.",
    },
    {
      title: "Conversation design",
      description: "Goals, required information, confirmations, edge cases and escalation rules are designed and agreed before build.",
    },
    {
      title: "Pipeline build",
      description: "Telephony, speech, reasoning and integrations are built and tested end to end, with latency measured at each stage.",
    },
    {
      title: "Controlled launch",
      description: "We start with a limited share of calls or hours, review transcripts closely and tune before expanding.",
    },
    {
      title: "Monitor & improve",
      description: "Ongoing review of outcomes, failure points and new caller needs, with regular updates to flows and prompts.",
    },
  ],
  faqs: [
    {
      question: "Will callers know they're speaking with an AI?",
      answer:
        "We recommend that they do, and design agents to identify themselves clearly. Transparency builds trust, and in many places it is a legal or regulatory expectation. The goal is a helpful conversation, not a deception.",
    },
    {
      question: "Can a voice agent work with our existing phone system?",
      answer:
        "Usually, yes. Voice agents can connect through SIP trunks, cloud telephony providers or call forwarding, and can sit in front of or alongside your existing contact centre. We'll confirm the best option once we understand your setup.",
    },
    {
      question: "How fast does the agent respond?",
      answer:
        "Responsiveness depends on the models, network path and how much work happens during a turn. We design for low latency with streaming at every stage and measure it throughout development, so you'll see real numbers for your configuration before launch.",
    },
    {
      question: "What happens when the agent can't help?",
      answer:
        "Every agent we build has explicit escalation rules. When a request is out of scope, the caller asks for a person or the agent isn't confident, it transfers the call — passing along the transcript and a summary — or takes a message if no one is available.",
    },
    {
      question: "Are calls recorded and stored?",
      answer:
        "That's your decision, guided by your legal requirements. We can configure recording, transcription, redaction of sensitive data and retention periods to match your policies, and inform callers appropriately.",
    },
  ],
  related: {
    services: ["ai-development", "api-integration", "cloud-devops"],
    solutions: ["voice-ai", "customer-support-automation"],
    industries: ["healthcare", "real-estate", "ecommerce"],
  },
  cta: {
    title: "Let's design your first voice agent",
    description:
      "Share the calls you'd like to automate. We'll map the conversation, the systems it needs to touch and a realistic path to launch.",
    primaryLabel: "Explore Voice AI with us",
  },
};
