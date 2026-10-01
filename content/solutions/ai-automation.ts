import type { SolutionDetail } from "@/types/content";

export const aiAutomation: SolutionDetail = {
  slug: "ai-automation",
  title: "AI Automation",
  summary: "Put AI to work on the repetitive, judgement-light tasks that slow your team down.",
  icon: "sparkles",
  seo: {
    title: "AI Automation Solutions",
    description:
      "Automate document handling, data entry, classification and routine decisions with AI steps built into your existing workflows and systems.",
  },
  hero: {
    headline: "Hand the repetitive work to AI — keep people on what matters",
    intro:
      "Many tasks are too varied for traditional rules-based automation but too routine to deserve a skilled person's time: reading documents, sorting requests, extracting details, drafting replies. AI automation handles that middle ground — inside your existing workflows, with people in control.",
  },
  problem: {
    title: "The work that rules can't automate",
    body: "Classic automation needs perfectly structured inputs. Real work arrives as emails, PDFs, scanned forms, chat messages and free-text notes — so it lands on someone's desk instead.",
    points: [
      "Skilled staff spending hours on reading, sorting and re-typing",
      "Backlogs that grow whenever volume spikes",
      "Inconsistent handling depending on who picks up the task",
      "Slow turnaround that frustrates customers and partners",
      "Previous automation attempts that broke on real-world variation",
    ],
  },
  howItWorks: [
    { title: "Capture", description: "Inputs arrive from email, forms, uploads, chats or system events and are collected in one place." },
    { title: "Understand", description: "AI classifies the request, extracts key fields and checks them against your rules and reference data." },
    { title: "Decide", description: "Straightforward cases proceed automatically; uncertain or high-impact ones go to a person for review." },
    { title: "Act", description: "Approved results are written to your systems, and the right people or customers are notified." },
    { title: "Learn", description: "Corrections and outcomes are tracked, so accuracy is measured and the system improves over time." },
  ],
  outcomes: [
    { title: "Faster turnaround", description: "Routine items are processed as they arrive rather than waiting in a queue.", icon: "timer" },
    { title: "More consistent handling", description: "The same rules and checks are applied to every item, every time.", icon: "list-checks" },
    { title: "People focused on judgement", description: "Staff review exceptions and handle complex cases instead of re-typing data.", icon: "users" },
    { title: "A clear audit trail", description: "Every automated decision is logged with its inputs, so it can be reviewed.", icon: "file-search" },
  ],
  capabilities: [
    { title: "Document understanding", description: "Invoices, forms, IDs, contracts and reports turned into structured data.", icon: "file-text" },
    { title: "Request classification", description: "Emails, tickets and messages categorised and prioritised automatically.", icon: "split" },
    { title: "Drafting & summarisation", description: "Suggested replies, summaries and reports for people to review and send.", icon: "sparkles" },
    { title: "Human-in-the-loop review", description: "Review queues with confidence scores so people check what needs checking.", icon: "user-check" },
  ],
  useCases: [
    { title: "Accounts payable intake", description: "Invoices are read, matched to purchase orders and queued for approval, with mismatches flagged." },
    { title: "Shared inbox triage", description: "A busy inbox is sorted by intent and urgency, with drafts prepared for common requests." },
    { title: "KYC and onboarding documents", description: "Submitted documents are checked for completeness and key details extracted for verification." },
    { title: "Report generation", description: "Weekly operational summaries compiled from several systems and written up for review." },
  ],
  technology: ["ai", "backend", "data"],
  faqs: [
    {
      question: "How is AI automation different from RPA?",
      answer:
        "RPA follows fixed rules and screen steps, which works for structured, predictable tasks. AI automation can interpret unstructured inputs — free text, documents, varied formats — and handle variation. The two are often combined: AI understands the input, conventional automation completes the steps.",
    },
    {
      question: "What if the AI gets something wrong?",
      answer:
        "We design for it. Outputs are validated against rules, low-confidence results are routed to people, and high-impact actions require approval. Accuracy is measured continuously so you know how the system is performing.",
    },
    {
      question: "Do we need to replace our existing systems?",
      answer: "No. AI automation is built around your existing tools and connects through their APIs or other integration options.",
    },
    {
      question: "Where should we start?",
      answer:
        "Pick one high-volume, well-understood process with a clear definition of a correct result. It gives a measurable first win and a pattern you can reuse for the next process.",
    },
  ],
  related: {
    services: ["ai-development", "api-integration", "custom-software-development"],
    solutions: ["business-process-automation", "customer-support-automation"],
    industries: ["fintech", "logistics", "ecommerce"],
  },
  cta: {
    title: "Which task would you automate first?",
    description: "Describe the process and its volume. We'll tell you how much of it AI can reliably handle — and what should stay with people.",
    primaryLabel: "Build Your AI Solution",
  },
};
