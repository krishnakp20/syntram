import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";

const capabilities: { title: string; body: string; example: string; icon: IconName }[] = [
  {
    title: "Generative AI",
    body: "Drafting, summarising and transforming content inside the tools your team already uses.",
    example: "Turn call notes into CRM-ready summaries.",
    icon: "sparkles",
  },
  {
    title: "AI Agents",
    body: "Goal-driven agents that plan steps, call tools and report back — with guardrails and audit trails.",
    example: "Research a lead and prepare a briefing.",
    icon: "bot",
  },
  {
    title: "Voice AI",
    body: "Natural phone and web conversations that understand intent and complete tasks in real time.",
    example: "Answer, qualify and book inbound calls.",
    icon: "audio-lines",
  },
  {
    title: "LLM Integration",
    body: "The right model for each job, wired into your product with sensible cost, latency and privacy controls.",
    example: "Add AI search to an existing web app.",
    icon: "plug",
  },
  {
    title: "Retrieval (RAG)",
    body: "Answers grounded in your documents, policies and data — with sources, not guesses.",
    example: "Support answers cited from your help centre.",
    icon: "file-search",
  },
  {
    title: "AI Automation",
    body: "AI steps inside real workflows: classify, extract, decide, then hand off to systems or people.",
    example: "Read invoices and route exceptions for review.",
    icon: "workflow",
  },
  {
    title: "Call Analytics",
    body: "Transcribe, tag and score conversations so trends and quality issues surface on their own.",
    example: "Flag calls that need a supervisor's attention.",
    icon: "bar-chart",
  },
  {
    title: "Intelligent Workflows",
    body: "Event-driven processes that adapt to context, with human approval where the stakes are high.",
    example: "Escalate high-value tickets automatically.",
    icon: "route",
  },
];

export function AiCapabilities() {
  return (
    <Section aria-labelledby="ai-capabilities-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="ai-capabilities-title"
            eyebrow="AI capabilities"
            title="AI that works beyond the chat window"
            description="We build AI into the places work actually happens — calls, tickets, documents and back-office systems — and measure it against the job it is meant to do."
          />
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <li
              key={c.title}
              className="reveal group flex flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-signal-soft text-signal">
                <Icon name={c.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <p className="mt-auto border-t border-line pt-4 text-[0.8125rem] leading-snug text-foreground/85">
                <span className="mr-1.5 font-mono text-[0.6875rem] tracking-wider text-signal uppercase">e.g.</span>
                {c.example}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
