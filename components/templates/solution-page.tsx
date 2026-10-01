import { ArrowRight, X } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { RelatedLinks } from "@/components/sections/related-links";
import { TechnologyGrid } from "@/components/sections/technology-grid";
import { UseCaseList } from "@/components/sections/use-case-list";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/shared/button-link";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { getTechGroups } from "@/content/technology";
import { serviceJsonLd } from "@/lib/jsonld";
import type { SolutionDetail } from "@/types/content";

/** Shared template for every /solutions/[slug] page — focused on problems and outcomes. */
export function SolutionPage({ solution }: { solution: SolutionDetail }) {
  const path = `/solutions/${solution.slug}`;
  const track = `solution_${solution.slug.replace(/-/g, "_")}`;

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "Solutions", path: "/solutions" },
          { name: solution.title, path },
        ]}
        eyebrow={solution.title}
        title={solution.hero.headline}
        intro={solution.hero.intro}
        actions={
          <>
            <ButtonLink href="/contact" size="cta-lg" trackAs={`${track}_hero`}>
              {solution.cta.primaryLabel}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#how-it-works" size="cta-lg" variant="outline">
              How it works
            </ButtonLink>
          </>
        }
      />

      {/* Problem */}
      <Section aria-labelledby="problem-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeader id="problem-title" eyebrow="The problem" title={solution.problem.title} description={solution.problem.body} />
          <ul className="flex flex-col divide-y divide-line self-end rounded-2xl border border-line bg-surface">
            {solution.problem.points.map((p) => (
              <li key={p} className="flex items-start gap-3 p-5 text-[0.9375rem] text-foreground">
                <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-subtle" />
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* How it works */}
      <Section tone="surface" id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-y border-line">
        <Container>
          <SectionHeader id="how-title" eyebrow="How it works" title="From request to resolution" />
          <ProcessSteps steps={solution.howItWorks} className="mt-12" />
        </Container>
      </Section>

      {/* Outcomes */}
      <Section tone="light" aria-labelledby="outcomes-title">
        <Container>
          <SectionHeader
            id="outcomes-title"
            eyebrow="Outcomes"
            title="What changes for your business"
            description="Results depend on your processes, volumes and starting point. We agree how to measure success with you before we build."
          />
          <FeatureGrid features={solution.outcomes} className="mt-12 lg:grid-cols-4" />
        </Container>
      </Section>

      {/* Capabilities + use cases */}
      <Section aria-labelledby="capabilities-title">
        <Container>
          <SectionHeader id="capabilities-title" eyebrow="Capabilities" title="Building blocks of the solution" />
          <FeatureGrid features={solution.capabilities} className="mt-12 lg:grid-cols-4" />
          <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
            <SectionHeader eyebrow="Use cases" title="Examples in practice" className="lg:sticky lg:top-28 lg:self-start" />
            <UseCaseList useCases={solution.useCases} />
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="technology-title" className="border-y border-line">
        <Container>
          <SectionHeader id="technology-title" eyebrow="Technology" title="Under the hood" />
          <TechnologyGrid groups={getTechGroups(solution.technology)} className="mt-12 lg:grid-cols-2 xl:grid-cols-4" />
        </Container>
      </Section>

      <Faq faqs={solution.faqs} title={`${solution.title}: common questions`} />

      <RelatedLinks related={solution.related} title="Services and industries behind this solution" />

      <CtaBanner
        trackId={track}
        title={solution.cta.title}
        description={solution.cta.description}
        primary={{ label: solution.cta.primaryLabel, href: "/contact" }}
        secondary={{ label: "All solutions", href: "/solutions" }}
      />

      <JsonLd data={serviceJsonLd({ name: solution.title, description: solution.seo.description, path })} />
    </>
  );
}
