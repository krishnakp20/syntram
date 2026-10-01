import type { ServiceDetail } from "@/types/content";

export const aiDevelopment: ServiceDetail = {
  slug: "ai-development",
  title: "AI Development",
  shortTitle: "AI Development",
  summary:
    "LLM applications, AI agents and retrieval systems engineered for production — grounded in your data and connected to your tools.",
  icon: "brain",
  seo: {
    title: "AI Development Services — LLMs & Agents",
    description:
      "Custom AI development by Syntram Technologies: LLM applications, AI agents and RAG systems built for production, with evaluation and guardrails.",
  },
  hero: {
    headline: "AI development that holds up in production",
    intro:
      "We design and build LLM-powered applications, agents and retrieval systems that work on your data, inside your workflows — with the evaluation, security and observability needed to trust them with real users.",
  },
  problem: {
    title: "Why most AI pilots stall",
    body: "Getting a model to produce an impressive demo is easy. Getting it to behave reliably for thousands of real requests — on messy data, within budget, without leaking information — is an engineering problem most teams underestimate.",
    points: [
      "Answers that sound confident but aren't grounded in your actual data",
      "No way to measure whether a prompt or model change made things better or worse",
      "Costs and latency that grow faster than usage",
      "Prototypes that can't connect to the systems where work actually happens",
      "Unclear handling of personal or confidential data",
    ],
  },
  solution: {
    title: "How we build AI systems",
    body: "We treat AI features like any other critical software: clearly scoped, measured against agreed criteria, integrated properly and monitored after launch. The model is one component — the surrounding engineering is what makes it dependable.",
    points: [
      "Start from a specific task and a measurable definition of 'good'",
      "Ground responses in your documents and systems with retrieval and tool use",
      "Build evaluation sets early and run them on every change",
      "Choose models per task based on quality, latency, cost and data requirements",
      "Add guardrails, fallbacks and human review where the stakes require it",
    ],
  },
  capabilities: [
    {
      title: "LLM applications",
      description: "Assistants, copilots and AI features embedded in your web or internal applications.",
      icon: "sparkles",
    },
    {
      title: "AI agents",
      description: "Agents that plan multi-step tasks, call your APIs and tools, and keep an auditable record of what they did.",
      icon: "bot",
    },
    {
      title: "Retrieval-augmented generation",
      description: "Search and answer over your documents, knowledge bases and databases — with citations back to the source.",
      icon: "file-search",
    },
    {
      title: "Document & data extraction",
      description: "Turn unstructured documents, emails and forms into structured, validated data your systems can use.",
      icon: "file-text",
    },
    {
      title: "Evaluation & guardrails",
      description: "Test suites for AI behaviour, output validation, content filtering and safe fallbacks.",
      icon: "shield",
    },
    {
      title: "Model integration & optimisation",
      description: "Hosted or open-weight models, prompt and context design, caching and routing to control cost and latency.",
      icon: "cpu",
    },
  ],
  useCases: [
    {
      title: "Internal knowledge assistant",
      description:
        "Staff ask questions in plain language and get answers drawn from policies, manuals and past tickets — with links to the source documents.",
    },
    {
      title: "Support ticket triage",
      description:
        "Incoming tickets are classified, summarised and routed with the relevant customer context attached before an agent opens them.",
    },
    {
      title: "Sales research agent",
      description:
        "An agent gathers public information about a prospect, checks your CRM history and prepares a concise briefing for the account owner.",
    },
    {
      title: "Contract and document review",
      description:
        "Key clauses, dates and obligations are extracted and flagged for review, so people spend their time on judgement rather than reading.",
    },
  ],
  technology: ["ai", "backend", "data", "cloud"],
  faqs: [
    {
      question: "Which AI models do you work with?",
      answer:
        "We're model-agnostic. We regularly evaluate hosted models from the major providers alongside open-weight models, and choose per task based on quality, latency, cost and where your data is allowed to go. Many systems use more than one model.",
    },
    {
      question: "Can the AI be trained on our company data?",
      answer:
        "In most cases you don't need to train or fine-tune a model. Retrieval — giving the model the right information from your documents and systems at the moment it answers — is usually more accurate, cheaper and easier to keep up to date. We recommend fine-tuning only when there's a clear reason.",
    },
    {
      question: "How do you stop the AI from making things up?",
      answer:
        "We ground answers in retrieved sources, constrain outputs to defined formats, validate them programmatically and instruct the system to say when it doesn't know. We also build evaluation sets so accuracy is measured rather than assumed. No approach removes errors entirely, so high-stakes outputs get human review.",
    },
    {
      question: "What happens to our data?",
      answer:
        "We design data flows with you up front: which data the AI can access, which providers process it, retention settings, and access controls. Where required, we use providers and configurations that don't retain or train on your data, or self-hosted models.",
    },
    {
      question: "How long does an AI project take?",
      answer:
        "A focused proof of concept against your real data can often be scoped in weeks rather than months. Production timelines depend on integrations, data readiness and review requirements — we'll give you a specific estimate after a discovery conversation.",
    },
  ],
  related: {
    services: ["voice-ai", "api-integration", "custom-software-development"],
    solutions: ["ai-automation", "customer-support-automation"],
    industries: ["ecommerce", "fintech", "healthcare"],
  },
  cta: {
    title: "Have an AI use case in mind?",
    description:
      "Tell us about the task you want to improve. We'll help you judge whether AI is the right tool, and what a reliable version would take to build.",
    primaryLabel: "Talk to an AI Engineer",
  },
};
