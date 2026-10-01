import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";

/** Working principles — commitments about how we work, not performance claims. */
const reasons = [
  {
    title: "AI-first, not AI-washed",
    body: "We recommend AI where it measurably helps and say so plainly when a simpler solution is better.",
  },
  {
    title: "One team, end to end",
    body: "Strategy, AI, software, integrations and infrastructure handled together — no gaps between vendors.",
  },
  {
    title: "Voice AI depth",
    body: "Real-time voice is a specialist discipline. It's a core focus for us, not an add-on.",
  },
  {
    title: "Transparent delivery",
    body: "Clear scopes, regular demos and direct access to the engineers building your product.",
  },
  {
    title: "Built to be owned",
    body: "Documented code in your repositories and infrastructure in your accounts. No lock-in.",
  },
  {
    title: "Support after launch",
    body: "Monitoring, iteration and model updates as your usage grows and the technology changes.",
  },
];

export function WhySyntram() {
  return (
    <Section aria-labelledby="why-title">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.4fr]">
        <SectionHeader
          id="why-title"
          eyebrow="Why Syntram"
          title="A partner that builds for the long run"
          description="How we work matters as much as what we build. These are the commitments behind every engagement."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <ol className="grid gap-x-10 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <li key={r.title} className="reveal border-t border-line-strong py-7">
              <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{r.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
