import type { IndustryDetail } from "@/types/content";

export const logistics: IndustryDetail = {
  slug: "logistics",
  title: "Logistics",
  summary: "Shipment status, delivery coordination and operations visibility across systems.",
  icon: "truck",
  seo: {
    title: "AI & Automation for Logistics",
    description:
      "AI, voice and automation for logistics: shipment status enquiries, delivery coordination, document processing and visibility across your systems.",
  },
  hero: {
    headline: "Keep shipments, people and systems in step",
    intro:
      "Logistics runs on coordination: shippers, drivers, warehouses and customers all need accurate, timely information. We automate status communication, paperwork and hand-offs so operations teams can focus on exceptions.",
  },
  challenges: [
    { title: "Status enquiries", description: "Customers and partners call and email repeatedly to ask where shipments are." },
    { title: "Document-heavy processes", description: "Bills of lading, delivery proofs and invoices arrive in many formats." },
    { title: "Delivery coordination", description: "Confirming slots, addresses and access details takes repeated calls." },
    { title: "Limited visibility", description: "Data spread across TMS, WMS, telematics and spreadsheets obscures the real picture." },
  ],
  solutionFits: [
    { solution: "customer-support-automation", rationale: "Answer shipment-status questions instantly across channels using live tracking data." },
    { solution: "voice-ai", rationale: "Confirm delivery appointments and addresses by phone, updating schedules automatically." },
    { solution: "ai-automation", rationale: "Extract data from shipping documents and invoices, flagging discrepancies for review." },
  ],
  useCases: [
    { title: "Shipment status assistant", description: "Customers check status by reference number through chat, email or phone, with exceptions escalated." },
    { title: "Delivery confirmation calls", description: "Consignees confirm or reschedule deliveries, reducing failed attempts." },
    { title: "Proof-of-delivery processing", description: "Delivery documents are read, matched to shipments and filed automatically." },
    { title: "Operations dashboard", description: "A unified view of shipments, delays and exceptions drawn from several systems." },
  ],
  technology: ["backend", "data", "ai", "frontend"],
  considerations: {
    title: "What logistics automation needs",
    body: "Logistics data changes by the minute and errors have physical consequences, so reliability and exception handling come first.",
    points: [
      "Real-time integration with TMS, WMS and carrier tracking",
      "Clear exception handling for delays, damages and address issues",
      "Mobile-friendly tools for drivers and field staff",
      "Multi-party communication with shippers, carriers and consignees",
      "Resilience during peak periods and network disruptions",
    ],
  },
  faqs: [
    {
      question: "Can you integrate with our transport management system?",
      answer: "If your TMS, WMS or carrier platforms offer APIs, EDI or data exports, we can usually integrate. We'll assess the options during discovery.",
    },
    {
      question: "How are shipping documents processed?",
      answer: "AI extracts key fields from documents in common formats, validates them against shipment data and routes mismatches or low-confidence results to staff for review.",
    },
    {
      question: "Can drivers use these tools?",
      answer: "Yes. We build mobile-friendly or native apps for field staff, with offline support where connectivity is unreliable.",
    },
  ],
  related: {
    services: ["api-integration", "mobile-app-development", "custom-software-development"],
    solutions: ["business-process-automation", "customer-support-automation"],
  },
  cta: {
    title: "Spend less time answering \"where is it?\"",
    description: "Tell us about your systems and the questions you field every day. We'll suggest where automation would help first.",
    primaryLabel: "Talk to Our Team",
  },
};
