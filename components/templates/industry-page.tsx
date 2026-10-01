import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { RelatedLinks } from "@/components/sections/related-links";
import { TechnologyGrid } from "@/components/sections/technology-grid";
import { UseCaseList } from "@/components/sections/use-case-list";
import { ButtonLink } from "@/components/shared/button-link";
import { Icon } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { deliveryProcess } from "@/content/process";
import { getSolution } from "@/content/solutions";
import { getTechGroups } from "@/content/technology";
import type { IndustryDetail } from "@/types/content";

/** Shared template for every /industries/[slug] page. */
export function IndustryPage({ industry }: { industry: IndustryDetail }) {
  const path = `/industries/${industry.slug}`;
  const track = `industry_${industry.slug.replace(/-/g, "_")}`;
  const fits = industry.solutionFits
    .map((fit) => ({ fit, solution: getSolution(fit.solution) }))
    .filter((x): x is { fit: typeof x.fit; solution: NonNullable<typeof x.solution> } => Boolean(x.solution));

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "Industries", path: "/industries" },
          { name: industry.title, path },
        ]}
        eyebrow={`${industry.title} industry`}
        title={industry.hero.headline}
        intro={industry.hero.intro}
        actions={
          <ButtonLink href="/contact" size="cta-lg" trackAs={`${track}_hero`}>
            {industry.cta.primaryLabel}
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        }
      />

      {/* Challenges */}
      <Section aria-labelledby="challenges-title">
        <Container>
          <SectionHeader
            id="challenges-title"
            eyebrow="Industry challenges"
            title={`What ${industry.title} teams tell us`}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industry.challenges.map((c) => (
              <li key={c.title} className="reveal rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Relevant solutions */}
      <Section tone="light" aria-labelledby="fits-title">
        <Container>
          <SectionHeader
            id="fits-title"
            eyebrow="Relevant solutions"
            title={`How Syntram helps in ${industry.title}`}
          />
          <ul className="mt-12 grid gap-4 lg:grid-cols-3">
            {fits.map(({ fit, solution }) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-lg bg-signal-soft text-signal">
                      <Icon name={solution.icon} className="size-5" />
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-4 text-subtle transition-colors group-hover:text-signal" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{solution.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fit.rationale}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Use cases */}
      <Section aria-labelledby="use-cases-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
          <SectionHeader
            id="use-cases-title"
            eyebrow="Use cases"
            title="Practical applications"
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <UseCaseList useCases={industry.useCases} />
        </Container>
      </Section>

      {/* Considerations + technology */}
      <Section tone="surface" aria-labelledby="considerations-title" className="border-y border-line">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeader
              id="considerations-title"
              eyebrow="Considerations"
              title={industry.considerations.title}
              description={industry.considerations.body}
            />
            <ul className="mt-8 flex flex-col gap-3">
              {industry.considerations.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-foreground">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-signal" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">Technology</h2>
            <TechnologyGrid groups={getTechGroups(industry.technology)} className="mt-5 lg:grid-cols-2" />
          </div>
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="process-title">
        <Container>
          <SectionHeader id="process-title" eyebrow="Process" title="How we work with you" />
          <ProcessSteps steps={deliveryProcess} className="mt-12" />
        </Container>
      </Section>

      <Faq faqs={industry.faqs} title={`AI and automation in ${industry.title}: FAQ`} />

      <RelatedLinks related={industry.related} title="Related services and solutions" />

      <CtaBanner
        trackId={track}
        title={industry.cta.title}
        description={industry.cta.description}
        primary={{ label: industry.cta.primaryLabel, href: "/contact" }}
        secondary={{ label: "All industries", href: "/industries" }}
      />
    </>
  );
}
