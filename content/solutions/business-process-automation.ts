import type { SolutionDetail } from "@/types/content";

export const businessProcessAutomation: SolutionDetail = {
  slug: "business-process-automation",
  title: "Business Process Automation",
  summary: "Turn manual, multi-system workflows into reliable, observable automated processes.",
  icon: "workflow",
  seo: {
    title: "Business Process Automation Solutions",
    description:
      "Automate approvals, data flows and multi-system workflows with reliable integrations, AI where it helps and full visibility into every step.",
  },
  hero: {
    headline: "Processes that run themselves — and show you how they're running",
    intro:
      "Approvals, onboarding, order handling, reporting: most organisations run on processes that cross several systems and several people. We automate them end to end, combining integrations, rules and AI, with dashboards that make every step visible.",
  },
  problem: {
    title: "When processes depend on people chasing people",
    body: "Multi-step processes slow down at every hand-off. Work waits in inboxes, steps are skipped under pressure and nobody can say exactly where a request is.",
    points: [
      "Requests stuck waiting for approvals or information",
      "Manual steps that are skipped or done differently each time",
      "No clear status for customers or internal stakeholders",
      "Data re-entered between systems at every stage",
      "Compliance evidence assembled by hand after the fact",
    ],
  },
  howItWorks: [
    { title: "Map the process", description: "We document the real process — steps, roles, systems, exceptions — with the people who run it." },
    { title: "Redesign before automating", description: "Unnecessary steps are removed and rules made explicit, so you don't automate inefficiency." },
    { title: "Automate the flow", description: "Integrations, rules, AI steps and approval tasks are orchestrated in a reliable workflow." },
    { title: "Make it visible", description: "Dashboards show where every item is, how long steps take and what's blocked." },
    { title: "Refine continuously", description: "Bottlenecks and exceptions are reviewed regularly, and the process is improved." },
  ],
  outcomes: [
    { title: "Shorter cycle times", description: "Less waiting between steps as hand-offs happen automatically.", icon: "timer" },
    { title: "Fewer errors", description: "Data moves between systems without re-typing, and rules are applied consistently.", icon: "shield" },
    { title: "Real-time status", description: "Everyone can see where a request is and what it's waiting for.", icon: "activity" },
    { title: "Built-in audit trail", description: "Each step is recorded automatically for compliance and review.", icon: "file-search" },
  ],
  capabilities: [
    { title: "Workflow orchestration", description: "Multi-step processes with branching, retries, timeouts and escalations.", icon: "workflow" },
    { title: "Approvals & tasks", description: "Approval steps routed to the right people, with reminders and delegation.", icon: "list-checks" },
    { title: "System integrations", description: "CRM, ERP, finance, HR and communication tools connected end to end.", icon: "network" },
    { title: "Process dashboards", description: "Live operational views and reports on throughput and bottlenecks.", icon: "bar-chart" },
  ],
  useCases: [
    { title: "Customer onboarding", description: "From signed contract to configured account, with checks, documents and notifications automated." },
    { title: "Purchase approvals", description: "Requests routed by amount and category, with policy checks and ERP updates." },
    { title: "Employee onboarding", description: "Accounts, equipment, training and paperwork coordinated across HR and IT." },
    { title: "Order-to-cash", description: "Orders, invoicing, payment matching and reminders connected across systems." },
  ],
  technology: ["backend", "data", "ai", "cloud"],
  faqs: [
    {
      question: "Should we use a low-code automation platform?",
      answer:
        "For simple workflows between popular tools, low-code platforms can be a quick, cost-effective choice. For complex logic, high volumes, sensitive data or custom systems, a purpose-built workflow is usually more reliable and easier to govern. We'll recommend the right mix.",
    },
    {
      question: "How do you choose which process to automate first?",
      answer: "We look for processes with high volume, clear rules, measurable delays or errors and a supportive process owner. That combination produces a visible win and a reusable foundation.",
    },
    {
      question: "What about exceptions?",
      answer: "Exceptions are designed in, not ignored. Each automated process has defined paths for missing data, failed integrations and unusual cases — usually routing them to a person with full context.",
    },
    {
      question: "Where does AI fit in?",
      answer: "AI is used for steps that involve unstructured inputs or judgement-light decisions — reading documents, classifying requests, drafting messages. Deterministic steps stay deterministic.",
    },
  ],
  related: {
    services: ["api-integration", "custom-software-development", "ai-development"],
    solutions: ["ai-automation", "customer-support-automation"],
    industries: ["logistics", "fintech", "education"],
  },
  cta: {
    title: "Which process slows your team down most?",
    description: "Walk us through it. We'll map what can be automated, what should be simplified and what a first phase would involve.",
    primaryLabel: "Discuss Your Project",
  },
};
