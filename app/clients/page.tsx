import Image from "next/image";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/layout-primitives";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { clients } from "@/content/company";
import { cn } from "@/lib/utils";
import { showClientsPage } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Clients",
  description:
    "Organisations that work with ZAYBX on AI, voice AI, automation and software projects — listed with their permission.",
  path: "/clients",
  // Not indexed until real, approved clients are listed.
  noindex: clients.length === 0,
});

export default function ClientsPage() {
  if (!showClientsPage) notFound();

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "About", path: "/about" },
          { name: "Our Clients", path: "/clients" },
        ]}
        eyebrow="Our clients"
        title="Organisations we work with"
        intro="We're proud of the teams we build with. Every organisation shown here has agreed to be listed."
      />

      <Section aria-label="Client list">
        <Container>
          {clients.length === 0 ? (
            <PlaceholderNotice>
              No clients have been added yet. Only add organisations that have agreed to be named, in{" "}
              <code>content/company.ts</code>. This page is hidden in production until then.
            </PlaceholderNotice>
          ) : (
            <ul
              className={cn(
                "grid gap-px overflow-hidden rounded-2xl border border-line bg-line",
                // Size the grid to the number of clients so there are no empty filler cells.
                clients.length === 1 && "mx-auto max-w-sm grid-cols-1",
                clients.length === 2 && "mx-auto max-w-2xl grid-cols-2",
                clients.length === 3 && "grid-cols-1 sm:grid-cols-3",
                clients.length >= 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
              )}
            >
              {clients.map((client) => {
                const content = client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={240}
                    height={130}
                    className="h-20 w-auto max-w-[80%] object-contain transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-center font-display text-base font-semibold text-foreground">{client.name}</span>
                );
                return (
                  <li key={client.name} className="group flex min-h-44 flex-col items-center justify-center gap-3 bg-card p-8">
                    {client.url ? (
                      <a href={client.url} target="_blank" rel="noopener noreferrer" className="flex justify-center">
                        {content}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      content
                    )}
                    {client.industry && <span className="text-xs text-subtle">{client.industry}</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </Section>

      <CtaBanner
        trackId="clients"
        title="Let's build something together"
        description="Tell us about your project and we'll explain how we'd approach it."
        primary={{ label: "Discuss Your Project", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
      />
    </>
  );
}
