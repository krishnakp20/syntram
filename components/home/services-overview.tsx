import { ArrowRight } from "lucide-react";

import { ServiceCard } from "@/components/cards/service-card";
import { ButtonLink } from "@/components/shared/button-link";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { services } from "@/content/services";

export function ServicesOverview() {
  return (
    <Section tone="light" aria-labelledby="services-title">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="services-title"
            eyebrow="Services"
            title="Engineering services for every layer of your product"
            description="From the first AI prototype to the platform it runs on — one team that designs, builds, integrates and supports it."
          />
          <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto" trackAs="home_all_services">
            All services
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
