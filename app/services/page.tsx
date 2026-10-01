import { ServiceCard } from "@/components/cards/service-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { deliveryProcess } from "@/content/process";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI, Software & Voice AI Services",
  description:
    "Syntram's services: AI and voice AI development, custom software, web and mobile apps, cloud and DevOps, API integration, and QA and testing.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="Engineering services across AI, software and cloud"
        intro="One team that can take an idea from first prototype to a reliable production system — designing, building, integrating and supporting it along the way."
      />

      <Section aria-labelledby="all-services-title">
        <Container>
          <h2 id="all-services-title" className="sr-only">
            All services
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="process-title">
        <Container>
          <SectionHeader
            id="process-title"
            eyebrow="How we work"
            title="A delivery process built for clarity"
            description="Whatever the service, you'll see working software early, know what's being built and why, and own everything at the end."
          />
          <ProcessSteps steps={deliveryProcess} className="mt-12" />
        </Container>
      </Section>

      <CtaBanner
        trackId="services_index"
        title="Not sure which service you need?"
        description="Describe the problem rather than the solution. We'll recommend the right combination — and tell you if you don't need us."
        primary={{ label: "Talk to Our Team", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />
    </>
  );
}
