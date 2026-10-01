import type { IndustryDetail } from "@/types/content";

export const healthcare: IndustryDetail = {
  slug: "healthcare",
  title: "Healthcare",
  summary: "Appointment scheduling, patient communication and administrative workflow automation.",
  icon: "heart-pulse",
  seo: {
    title: "AI & Voice Automation for Healthcare",
    description:
      "Voice and AI automation for clinics: appointment scheduling, patient reminders and admin workflows, designed with privacy and clinical boundaries in mind.",
  },
  hero: {
    headline: "Less time on the phone and paperwork, more time for patients",
    intro:
      "Clinics and healthcare providers spend significant staff time on scheduling, reminders and administration. We build voice and AI automation for those non-clinical tasks — designed around patient privacy and clear boundaries on what AI should and shouldn't do.",
  },
  challenges: [
    { title: "Busy phone lines", description: "Front-desk teams juggle booking calls, walk-ins and questions, so patients wait or give up." },
    { title: "Missed appointments", description: "No-shows waste clinical time; reminders and rescheduling take staff effort." },
    { title: "Administrative load", description: "Forms, referrals, insurance details and records consume hours that could go to patient care." },
    { title: "Sensitive data", description: "Health information demands strict access control, consent and careful vendor choices." },
  ],
  solutionFits: [
    {
      solution: "voice-ai",
      rationale: "Answer booking calls promptly, schedule and reschedule appointments, and send reminders — escalating anything clinical to staff.",
    },
    {
      solution: "business-process-automation",
      rationale: "Automate intake, referral handling and administrative hand-offs between scheduling, records and billing systems.",
    },
    {
      solution: "ai-automation",
      rationale: "Extract details from forms and documents for staff review, reducing manual data entry.",
    },
  ],
  useCases: [
    { title: "Appointment line automation", description: "Patients book, change or cancel appointments by phone, with live availability from your scheduling system." },
    { title: "Reminder and confirmation calls", description: "Automated reminders with options to confirm, reschedule or speak to reception." },
    { title: "Digital intake", description: "Pre-visit forms collected and structured before the appointment, flagged for staff where incomplete." },
    { title: "Administrative call routing", description: "Calls about billing, records and directions routed correctly, without tying up clinical staff." },
  ],
  technology: ["voice", "ai", "backend", "data"],
  considerations: {
    title: "Boundaries we design for in healthcare",
    body: "Automation in healthcare must be conservative. We focus AI on administrative and logistical tasks and make escalation to qualified staff the default for anything clinical.",
    points: [
      "No diagnosis, triage decisions or medical advice from AI agents",
      "Immediate escalation paths for urgent or clinical concerns",
      "Data minimisation, access controls and encryption for patient information",
      "Vendor and hosting choices aligned with applicable health-data regulations in your jurisdiction",
      "Clear disclosure to patients that they are speaking with an automated assistant",
    ],
  },
  faqs: [
    {
      question: "Can an AI voice agent give medical advice?",
      answer: "No. We design healthcare agents for administrative tasks such as scheduling and reminders. Anything clinical, urgent or uncertain is routed to qualified staff or emergency guidance as defined by your policies.",
    },
    {
      question: "Is patient data safe?",
      answer:
        "We design with data minimisation, encryption, access controls and audit logs, and select providers and configurations appropriate to the regulations that apply to you. Your compliance and legal teams should review the final setup.",
    },
    {
      question: "Does it work with our practice management system?",
      answer: "Integration depends on the system's API or integration options. We'll assess your scheduling and records systems early in discovery.",
    },
  ],
  related: {
    services: ["voice-ai", "api-integration", "mobile-app-development"],
    solutions: ["voice-ai", "business-process-automation"],
  },
  cta: {
    title: "Free up your front desk",
    description: "Tell us how patients reach you today. We'll suggest safe, practical automation for scheduling and administration.",
    primaryLabel: "Talk to Our Team",
  },
};
