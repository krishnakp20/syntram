import { SolutionCard } from "@/components/cards/solution-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { solutions } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Automation & Voice AI Solutions",
  description:
    "AI automation, customer support automation, AI voice agents and business process automation from Syntram Technologies — aimed at real operational problems.",
  path: "/solutions",
});

const principles = [
  {
    title: "Start with the problem",
    body: "We begin with the workflow, the people and the cost of the status quo — not with a technology we want to use.",
  },
  {
    title: "Measure what matters",
    body: "Success criteria are agreed up front, so you can judge results on evidence rather than impressions.",
  },
  {
    title: "Keep people in control",
    body: "Automation handles the routine. Exceptions, high-stakes decisions and sensitive conversations stay with your team.",
  },
];

export default function SolutionsIndexPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Solutions", path: "/solutions" }]}
        eyebrow="Solutions"
        title="AI and automation aimed at real business problems"
        intro="Our solutions start from outcomes — answered calls, resolved requests, faster processes — and combine AI, software and integrations to get there."
      />

      <Section aria-labelledby="all-solutions-title">
        <Container>
          <h2 id="all-solutions-title" className="sr-only">
            All solutions
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <SolutionCard solution={solution} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="principles-title">
        <Container>
          <SectionHeader id="principles-title" eyebrow="Our approach" title="How we approach every solution" />
          <ol className="mt-12 grid gap-x-10 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line-strong py-7">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBanner
        trackId="solutions_index"
        title="Let's find the right starting point"
        description="Tell us where time, calls or requests are piling up. We'll suggest the solution that would make the biggest difference first."
        primary={{ label: "Build Your AI Solution", href: "/contact" }}
        secondary={{ label: "Browse industries", href: "/industries" }}
      />
    </>
  );
}
