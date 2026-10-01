import type { SolutionDetail } from "@/types/content";

/**
 * Business-outcome counterpart to /services/voice-ai (which covers how we
 * engineer voice agents). Keep the two pages' content distinct.
 */
export const voiceAiSolution: SolutionDetail = {
  slug: "voice-ai",
  title: "Voice AI Agents",
  summary: "Answer, qualify, book and follow up on calls with agents that speak naturally and act in your systems.",
  icon: "phone-call",
  seo: {
    title: "AI Voice Agents for Business Calls",
    description:
      "AI voice agents that answer every call, qualify leads, book appointments and follow up — integrated with your CRM, with handoff to your team.",
  },
  hero: {
    headline: "Never miss a call that matters",
    intro:
      "Phone calls are still where many customers go when something is important — and missed or delayed calls are missed business. AI voice agents answer immediately, handle routine conversations end to end and bring your team in when a human touch is needed.",
  },
  problem: {
    title: "What happens to your calls today?",
    body: "Call volume rarely matches staffing. Peaks, lunch breaks, evenings and weekends leave callers on hold or in voicemail, while staff spend much of their day on calls that follow the same few patterns.",
    points: [
      "Calls going unanswered outside business hours or during peaks",
      "New leads waiting hours or days for a callback",
      "Staff time consumed by booking, confirming and status calls",
      "Inconsistent information depending on who answers",
      "Call details that never make it into the CRM",
    ],
  },
  howItWorks: [
    { title: "Answer instantly", description: "Every call is picked up promptly, at any hour, by an agent that introduces itself clearly." },
    { title: "Understand the need", description: "The caller explains in their own words; the agent identifies intent and gathers the details required." },
    { title: "Take action", description: "It checks availability, books, updates records or looks up information in your systems during the call." },
    { title: "Escalate when needed", description: "Complex, sensitive or out-of-scope calls are transferred to your team with a summary." },
    { title: "Log everything", description: "Transcripts, outcomes and next steps are recorded in your CRM automatically." },
  ],
  outcomes: [
    { title: "Every call answered", description: "Callers reach a helpful response instead of hold music or voicemail.", icon: "phone-incoming" },
    { title: "Faster lead response", description: "New enquiries are contacted and qualified while interest is high.", icon: "target" },
    { title: "Consistent caller experience", description: "Accurate information and the same process on every call.", icon: "list-checks" },
    { title: "Complete call records", description: "Structured notes and outcomes captured without manual data entry.", icon: "database" },
  ],
  capabilities: [
    { title: "Inbound reception", description: "Answer, route and resolve common calls 24/7.", icon: "phone-incoming" },
    { title: "Outbound campaigns", description: "Reminders, confirmations, renewals and follow-ups — with consent rules respected.", icon: "phone-outgoing" },
    { title: "Appointment scheduling", description: "Live calendar checks, bookings, changes and cancellations.", icon: "calendar-check" },
    { title: "Lead qualification", description: "Structured qualification questions and hand-off to sales.", icon: "user-check" },
  ],
  useCases: [
    { title: "Clinic and service bookings", description: "Patients or customers book and reschedule by phone without waiting for reception." },
    { title: "Property enquiries", description: "Callers about listings are qualified and site visits are scheduled with the right agent." },
    { title: "Payment and renewal reminders", description: "Polite, compliant outbound reminders with options to pay, reschedule or speak to someone." },
    { title: "Overflow and after-hours cover", description: "The agent takes calls your team can't, so no caller is left without a response." },
  ],
  technology: ["voice", "ai", "backend"],
  faqs: [
    {
      question: "How natural do AI voice agents sound?",
      answer:
        "Modern speech synthesis sounds natural, and agents can handle interruptions and follow-up questions. What makes a call feel good, though, is conversation design: short turns, clear confirmations and knowing when to hand over. We'll let you hear test calls before anything goes live.",
    },
    {
      question: "Can we start small?",
      answer: "Yes — and we recommend it. Start with one call type or after-hours calls only, review real transcripts, then expand once you're comfortable with the results.",
    },
    {
      question: "Are outbound AI calls allowed?",
      answer:
        "Rules on automated and AI calling vary by country and use case, including consent, disclosure and calling hours. We build those controls in, but you should confirm requirements for your market with your legal advisers.",
    },
    {
      question: "What do we need to provide?",
      answer: "Access to the calls or call types you want to automate, your scheduling or CRM system details, and a team member who can review and approve conversation flows.",
    },
  ],
  related: {
    services: ["voice-ai", "ai-development", "api-integration"],
    solutions: ["customer-support-automation", "business-process-automation"],
    industries: ["healthcare", "real-estate", "travel"],
  },
  cta: {
    title: "Find out which calls an AI agent could handle",
    description: "Tell us about your call volume and common call types. We'll suggest where a voice agent would help most — and where it wouldn't.",
    primaryLabel: "Explore Voice AI",
  },
};
