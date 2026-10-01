import { TechnologyGrid } from "@/components/sections/technology-grid";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { technologyGroups } from "@/content/technology";

export function TechnologySection() {
  return (
    <Section tone="light" aria-labelledby="technology-title">
      <Container>
        <SectionHeader
          id="technology-title"
          eyebrow="Technology"
          title="Proven tools, chosen for the job"
          description="We're model- and vendor-agnostic. Each project gets the stack that fits its latency, cost, privacy and maintenance needs — not whatever is newest."
        />
        <TechnologyGrid groups={technologyGroups} className="mt-14" />
      </Container>
    </Section>
  );
}
