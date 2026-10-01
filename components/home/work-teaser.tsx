import { ArrowRight } from "lucide-react";

import { CaseStudyCard } from "@/components/cards/case-study-card";
import { ButtonLink } from "@/components/shared/button-link";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { getPublishedCaseStudies } from "@/content/work";

/**
 * Case studies are only published with client approval and real results.
 * Shows the latest published (non-placeholder) case studies; until the first
 * ones exist, it says so instead of showing invented projects.
 */
const caseStudyOutline = ["Challenge", "Solution", "Architecture", "Technology", "Results"];

export function WorkTeaser() {
  const published = getPublishedCaseStudies().slice(0, 3);

  if (published.length > 0) {
    return (
      <Section aria-labelledby="work-title">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader id="work-title" eyebrow="Case studies" title="Selected work" />
            <ButtonLink href="/work" variant="outline" className="self-start lg:self-auto" trackAs="home_work_view">
              All case studies
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((study) => (
              <li key={study.slug}>
                <CaseStudyCard study={study} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    );
  }

  return (
    <Section aria-labelledby="work-title">
      <Container>
        <div className="grid gap-10 rounded-3xl border border-line-strong bg-surface p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-14">
          <SectionHeader
            id="work-title"
            eyebrow="Case studies"
            title="Real work, published with permission"
            description="We only publish case studies our clients have approved, with outcomes they have verified. The first detailed write-ups are being prepared now."
          >
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" trackAs="home_work_discuss">
                Discuss Your Project
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/work" variant="outline" trackAs="home_work_view">
                Visit our work page
              </ButtonLink>
            </div>
          </SectionHeader>

          <div aria-hidden="true" className="rounded-2xl border border-line bg-background/60 p-5 sm:p-6">
            <p className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">Every case study covers</p>
            <ol className="mt-4 flex flex-col">
              {caseStudyOutline.map((item, i) => (
                <li key={item} className="flex items-center gap-4 border-b border-line py-3 last:border-b-0">
                  <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.9375rem] text-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
