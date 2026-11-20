import { ArrowRight, Check, X } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { HeroVisualPanel } from "@/components/visuals/hero-visual-panel";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { ProcessSteps } from "@/components/sections/process-steps";
import { RelatedLinks } from "@/components/sections/related-links";
import { TechnologyGrid } from "@/components/sections/technology-grid";
import { UseCaseList } from "@/components/sections/use-case-list";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/shared/button-link";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { deliveryProcess } from "@/content/process";
import { getTechGroups } from "@/content/technology";
import { serviceJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/types/content";

/** Shared template for every /services/[slug] page. */
export function ServicePage({ service }: { service: ServiceDetail }) {
  const path = `/services/${service.slug}`;
  const track = `service_${service.slug.replace(/-/g, "_")}`;

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ]}
        eyebrow={service.title}
        title={service.hero.headline}
        intro={service.hero.intro}
        actions={
          <>
            <ButtonLink href="/contact" size="cta-lg" trackAs={`${track}_hero`}>
              {service.cta.primaryLabel}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#capabilities" size="cta-lg" variant="outline">
              See capabilities
            </ButtonLink>
          </>
        }
        aside={service.heroVisual && <HeroVisualPanel variant={service.heroVisual} className="mx-auto w-full max-w-md lg:max-w-none" />}
      />

      <ProblemSolution problem={service.problem} solution={service.solution} />

      {service.models && service.models.length > 0 && (
        <Section aria-labelledby="models-title" className="border-t border-line">
          <Container>
            <SectionHeader
              id="models-title"
              eyebrow="Engagement models"
              title="Choose how you want to work with us"
              description="Pick one model or combine them as your needs change."
            />
            <FeatureGrid features={service.models} className="mt-12" />
          </Container>
        </Section>
      )}

      <Section tone="light" id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-16">
        <Container>
          <SectionHeader
            id="capabilities-title"
            eyebrow="Capabilities"
            title={service.capabilitiesTitle ?? `What our ${service.shortTitle} work covers`}
          />
          <FeatureGrid features={service.capabilities} className="mt-12" />
        </Container>
      </Section>

      <Section aria-labelledby="use-cases-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
          <SectionHeader
            id="use-cases-title"
            eyebrow="Use cases"
            title="Where it makes a difference"
            description="Typical problems this service is used to solve. Every engagement is scoped to your own context."
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <UseCaseList useCases={service.useCases} />
        </Container>
      </Section>

      {service.comparison && (
        <Section tone="light" aria-labelledby="comparison-title">
          <Container>
            <SectionHeader id="comparison-title" eyebrow="Why it works" title={service.comparison.title} />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {[service.comparison.before, service.comparison.after].map((col, i) => (
                <div
                  key={col.label}
                  className={cn(
                    "rounded-2xl border p-6 sm:p-8",
                    i === 0 ? "border-line bg-card" : "border-signal/40 bg-signal-soft",
                  )}
                >
                  <h3 className="font-display text-lg font-semibold text-foreground">{col.label}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {i === 0 ? (
                          <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-subtle" />
                        ) : (
                          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-signal" />
                        )}
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="surface" aria-labelledby="technology-title" className="border-y border-line">
        <Container>
          <SectionHeader
            id="technology-title"
            eyebrow="Technology"
            title="Tools we use for this work"
            description="We choose per project. These are the technologies we most often reach for here."
          />
          <TechnologyGrid groups={getTechGroups(service.technology)} className="mt-12 lg:grid-cols-2 xl:grid-cols-4" />
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="process-title">
        <Container>
          <SectionHeader id="process-title" eyebrow="Process" title="How an engagement runs" />
          <ProcessSteps steps={service.process ?? deliveryProcess} className="mt-12" />
        </Container>
      </Section>

      <Faq faqs={service.faqs} title={`${service.title}: common questions`} />

      <RelatedLinks related={service.related} />

      <CtaBanner
        trackId={track}
        title={service.cta.title}
        description={service.cta.description}
        primary={{ label: service.cta.primaryLabel, href: "/contact" }}
        secondary={{ label: "All services", href: "/services" }}
      />

      <JsonLd data={serviceJsonLd({ name: service.title, description: service.seo.description, path })} />
    </>
  );
}
