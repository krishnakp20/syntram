import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";

const principles: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Architecture first",
    body: "Clear boundaries, documented decisions and data models designed for where the product is going.",
    icon: "layers",
  },
  {
    title: "Security by design",
    body: "Least-privilege access, encrypted data, secrets kept server-side and dependencies kept current.",
    icon: "shield",
  },
  {
    title: "Tested, not hoped",
    body: "Automated tests and CI quality gates — plus evaluation suites for AI behaviour, not just code.",
    icon: "flask",
  },
  {
    title: "Observable in production",
    body: "Logging, tracing and alerting from day one, so issues are found by dashboards, not customers.",
    icon: "activity",
  },
  {
    title: "Performance budgets",
    body: "Fast pages, efficient APIs and low-latency voice pipelines, measured against explicit targets.",
    icon: "timer",
  },
  {
    title: "Yours to own",
    body: "Clean, documented code in your repositories, with a handover your team can actually run with.",
    icon: "git-branch",
  },
];

const deliverables = ["Web applications", "Mobile apps", "SaaS platforms", "Internal tools", "APIs & microservices", "Cloud infrastructure"];

export function EngineeringSection() {
  return (
    <Section tone="light" aria-labelledby="engineering-title">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeader
            id="engineering-title"
            eyebrow="Software engineering"
            title="Production software, not just prototypes"
            description="AI features are only as good as the software around them. We build the full product — interfaces, APIs, data and infrastructure — to the same engineering standard."
          />
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="What we build">
            {deliverables.map((d) => (
              <li key={d} className="rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm text-foreground">
                {d}
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="bg-surface p-6 sm:p-7">
              <Icon name={p.icon} className="size-5 text-signal" />
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
