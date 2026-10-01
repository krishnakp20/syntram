import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";

/**
 * Phase 1 links to the resource hubs. Phase 4 swaps this for the latest
 * published BlogCards from the content layer.
 */
const hubs: { title: string; body: string; href: string; icon: IconName }[] = [
  {
    title: "Blog",
    body: "Engineering notes and explainers on voice AI, agents and automation.",
    href: "/blog",
    icon: "newspaper",
  },
  {
    title: "Guides",
    body: "In-depth, practical guides for teams planning an AI or automation project.",
    href: "/guides",
    icon: "book-open",
  },
  {
    title: "All resources",
    body: "Everything we publish, organised by topic.",
    href: "/resources",
    icon: "layers",
  },
];

export function ResourcesTeaser() {
  return (
    <Section tone="surface" aria-labelledby="resources-title" className="border-t border-line">
      <Container>
        <SectionHeader
          id="resources-title"
          eyebrow="Resources"
          title="Practical thinking on AI and automation"
          description="Clear explanations, architecture notes and honest trade-offs — written by the people who build these systems."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {hubs.map((hub) => (
            <li key={hub.href}>
              <Link
                href={hub.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <Icon name={hub.icon} className="size-5 text-signal" />
                  <ArrowUpRight aria-hidden="true" className="size-4 text-subtle transition-colors group-hover:text-signal" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">{hub.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{hub.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
