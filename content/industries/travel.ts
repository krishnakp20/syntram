import type { IndustryDetail } from "@/types/content";

export const travel: IndustryDetail = {
  slug: "travel",
  title: "Travel",
  summary: "Booking assistance, itinerary changes and multilingual traveller support.",
  icon: "plane",
  seo: {
    title: "AI & Voice Automation for Travel",
    description:
      "AI, voice and automation for travel and hospitality: booking assistance, itinerary changes and multilingual traveller support around the clock.",
  },
  hero: {
    headline: "Support travellers wherever and whenever they need it",
    intro:
      "Travellers ask questions across time zones and languages, and disruptions create sudden surges. We help travel and hospitality businesses automate routine requests and keep travellers informed, while specialists handle the complex itineraries.",
  },
  challenges: [
    { title: "Around-the-clock demand", description: "Travellers need help at any hour, often from a different time zone than your team." },
    { title: "Disruption surges", description: "Weather, cancellations and schedule changes trigger sudden spikes in contact volume." },
    { title: "Multilingual customers", description: "Serving travellers in their own language is expected but hard to staff." },
    { title: "Many supplier systems", description: "Bookings span airlines, hotels and activity providers with separate systems." },
  ],
  solutionFits: [
    { solution: "customer-support-automation", rationale: "Answer booking, baggage, policy and itinerary questions instantly in multiple languages." },
    { solution: "voice-ai", rationale: "Handle booking enquiries and change requests by phone, with transfer to specialists for complex trips." },
    { solution: "business-process-automation", rationale: "Automate confirmations, changes and notifications across booking and supplier systems." },
  ],
  useCases: [
    { title: "Booking assistant", description: "Travellers check availability, get quotes and start bookings through chat or phone." },
    { title: "Itinerary change handling", description: "Simple date or name changes processed within policy; complex changes routed to agents." },
    { title: "Proactive disruption updates", description: "Affected travellers are notified quickly with options, reducing inbound calls." },
    { title: "Hotel guest messaging", description: "Pre-arrival information, requests and FAQs handled automatically for guests." },
  ],
  technology: ["ai", "voice", "backend", "data"],
  considerations: {
    title: "What travel automation must handle",
    body: "Travel involves money, tight timelines and stressed customers, so accuracy and empathy matter.",
    points: [
      "Live inventory and booking data rather than static information",
      "Clear policies for changes, refunds and fees",
      "Language quality testing for each supported language",
      "Escalation to specialists for complex or distressed travellers",
      "Secure handling of payment and identity information",
    ],
  },
  faqs: [
    {
      question: "Can the assistant make bookings?",
      answer: "Where your booking engine or supplier APIs allow it, yes — within rules you define. Otherwise it can collect requirements and hand over to an agent to complete the booking.",
    },
    {
      question: "Which languages are supported?",
      answer: "That depends on the models used and your markets. We test response quality in each language before enabling it for travellers.",
    },
    {
      question: "How does it cope with disruption peaks?",
      answer: "The system scales with demand, and proactive notifications reduce the number of travellers who need to contact you in the first place.",
    },
  ],
  related: {
    services: ["voice-ai", "ai-development", "mobile-app-development"],
    solutions: ["customer-support-automation", "voice-ai"],
  },
  cta: {
    title: "Give travellers faster answers",
    description: "Tell us about your booking systems and common requests. We'll outline where automation would make the biggest difference.",
    primaryLabel: "Start a Conversation",
  },
};
