import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { getIndustriesBySlugs } from "@/content/industries";
import { getServicesBySlugs } from "@/content/services";
import { getSolutionsBySlugs } from "@/content/solutions";
import type { RelatedContent } from "@/types/content";

interface RelatedItem {
  href: string;
  title: string;
  summary: string;
  icon: IconName;
  kind: string;
}

/** Contextual internal links to related services, solutions and industries. */
export function RelatedLinks({
  related,
  title = "Related services and solutions",
  tone = "surface",
}: {
  related: RelatedContent;
  title?: string;
  tone?: "dark" | "light" | "surface";
}) {
  const items: RelatedItem[] = [
    ...getServicesBySlugs(related.services).map((s) => ({
      href: `/services/${s.slug}`,
      title: s.title,
      summary: s.summary,
      icon: s.icon,
      kind: "Service",
    })),
    ...getSolutionsBySlugs(related.solutions).map((s) => ({
      href: `/solutions/${s.slug}`,
      title: s.title,
      summary: s.summary,
      icon: s.icon,
      kind: "Solution",
    })),
    ...getIndustriesBySlugs(related.industries).map((i) => ({
      href: `/industries/${i.slug}`,
      title: i.title,
      summary: i.summary,
      icon: i.icon,
      kind: "Industry",
    })),
  ];

  if (items.length === 0) return null;

  return (
    <Section tone={tone} aria-labelledby="related-title" className="border-t border-line">
      <Container>
        <SectionHeader id="related-title" eyebrow="Explore further" title={title} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    <Icon name={item.icon} className="size-4 text-signal" />
                    {item.kind}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-subtle transition-colors group-hover:text-signal"
                  />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
