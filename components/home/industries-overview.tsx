import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { IndustryCard } from "@/components/cards/industry-card";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { industries } from "@/content/industries";

export function IndustriesOverview() {
  return (
    <Section aria-labelledby="industries-title">
      <Container>
        <SectionHeader
          id="industries-title"
          eyebrow="Industries"
          title="Applied to the way your sector works"
          description="The technology is general. The workflows, regulations and customer expectations are not — so we start from the realities of your industry."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <IndustryCard industry={industry} />
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              data-track-cta="home_industry_other"
              className="group flex h-full flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6 transition-colors hover:border-signal"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Another industry?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Tell us about your workflows and we&apos;ll tell you honestly whether AI is the right fit.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
                Talk to our team
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
