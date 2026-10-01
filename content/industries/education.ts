import type { IndustryDetail } from "@/types/content";

export const education: IndustryDetail = {
  slug: "education",
  title: "Education",
  summary: "Admissions enquiries, student support and learning platforms that scale with enrolment.",
  icon: "graduation-cap",
  seo: {
    title: "AI & Automation for Education",
    description:
      "AI, voice and software for schools, colleges and edtech: automate admissions and student support, and build learning platforms that scale.",
  },
  hero: {
    headline: "Support every applicant and student, even at peak season",
    intro:
      "Admissions cycles bring waves of enquiries; students need answers at all hours. We help institutions and edtech companies automate communication and build platforms that handle growth without overloading staff.",
  },
  challenges: [
    { title: "Admissions peaks", description: "Enquiry volume spikes around deadlines, and slow responses mean lost applicants." },
    { title: "Repetitive student questions", description: "Fees, schedules, deadlines and procedures are asked about again and again." },
    { title: "Disconnected systems", description: "CRM, student information systems and learning platforms often don't share data." },
    { title: "Engagement and retention", description: "Online learners need timely nudges and support to stay on track." },
  ],
  solutionFits: [
    { solution: "voice-ai", rationale: "Respond to admissions calls immediately, answer common questions and book counselling sessions." },
    { solution: "customer-support-automation", rationale: "Answer student and parent questions across chat and email from approved institutional content." },
    { solution: "business-process-automation", rationale: "Automate application tracking, document checks and status updates across systems." },
  ],
  useCases: [
    { title: "Admissions enquiry agent", description: "Every enquiry gets an immediate response, with qualified applicants booked in with counsellors." },
    { title: "Student help desk assistant", description: "Answers on fees, timetables and procedures, with escalation to the right department." },
    { title: "Application status updates", description: "Applicants are notified automatically as their application moves through each stage." },
    { title: "Learning platform development", description: "Course delivery, assessments and progress tracking built around your teaching model." },
  ],
  technology: ["ai", "voice", "frontend", "backend"],
  considerations: {
    title: "What matters in education",
    body: "Education serves young people and families, so tone, accuracy and data protection matter as much as efficiency.",
    points: [
      "Answers limited to approved, up-to-date institutional information",
      "Appropriate handling of minors' data and parental consent where relevant",
      "Accessible interfaces for students with different needs",
      "Clear routes to human staff for wellbeing or sensitive matters",
      "Multilingual support for diverse student communities, where required",
    ],
  },
  faqs: [
    {
      question: "Can the assistant handle admissions questions accurately?",
      answer: "Yes, when it answers from approved content such as your prospectus, fee schedules and policies. We test it against real enquiries and route anything uncertain to your admissions team.",
    },
    {
      question: "Can you build a full learning platform?",
      answer: "Yes. We build custom learning platforms and also integrate with existing learning management systems, depending on what fits your needs and budget.",
    },
    {
      question: "How is student data protected?",
      answer: "We apply data minimisation, role-based access and encryption, and align data handling with the regulations and policies that apply to your institution.",
    },
  ],
  related: {
    services: ["web-development", "mobile-app-development", "voice-ai"],
    solutions: ["customer-support-automation", "voice-ai"],
  },
  cta: {
    title: "Ready for your next admissions cycle?",
    description: "Tell us how enquiries reach you today. We'll suggest how to respond faster without adding staff.",
    primaryLabel: "Start a Conversation",
  },
};
