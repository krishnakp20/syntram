import { IndustryCard } from "@/components/cards/industry-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/layout-primitives";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI & Automation by Industry",
  description:
    "AI, voice AI and automation for e-commerce, healthcare, fintech, education, real estate, logistics and travel — built around each sector's workflows.",
  path: "/industries",
});

export default function IndustriesIndexPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries"
        title="Technology shaped by the realities of your sector"
        intro="Every industry has its own workflows, regulations and customer expectations. We start from those, then apply AI, voice and software where they genuinely help."
      />

      <Section aria-labelledby="all-industries-title">
        <Container>
          <h2 id="all-industries-title" className="sr-only">
            All industries
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <IndustryCard industry={industry} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        trackId="industries_index"
        title="Working in a different industry?"
        description="The patterns behind good automation carry across sectors. Tell us about your workflows and we'll give you an honest assessment."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />
    </>
  );
}
