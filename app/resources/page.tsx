import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/shared/button-link";
import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { getArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources — Guides & Articles on AI",
  description:
    "Guides and articles from Syntram Technologies on voice AI, AI agents, customer support automation and building AI systems that work in production.",
  path: "/resources",
});

/** Topic hubs connect reading material to the matching services and solutions. */
const topics: { title: string; body: string; icon: IconName; links: { label: string; href: string }[] }[] = [
  {
    title: "Voice AI",
    body: "How voice agents work, how they compare with IVR, and how to make them fast and reliable.",
    icon: "audio-lines",
    links: [
      { label: "Voice AI development", href: "/services/voice-ai" },
      { label: "AI voice agents", href: "/solutions/voice-ai" },
    ],
  },
  {
    title: "Support & automation",
    body: "Planning automation that customers trust and teams can maintain.",
    icon: "workflow",
    links: [
      { label: "Customer support automation", href: "/solutions/customer-support-automation" },
      { label: "Business process automation", href: "/solutions/business-process-automation" },
    ],
  },
  {
    title: "AI engineering",
    body: "Architecture, evaluation and the engineering practices behind production AI.",
    icon: "brain",
    links: [
      { label: "AI development", href: "/services/ai-development" },
      { label: "QA & AI evaluation", href: "/services/qa-testing" },
    ],
  },
];

export default async function ResourcesPage() {
  const [posts, guides] = await Promise.all([getArticles("blog"), getArticles("guide")]);

  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Resources", path: "/resources" }]}
        eyebrow="Resources"
        title="Practical thinking on AI, voice and automation"
        intro="Guides and articles written by the people who design and build these systems — clear explanations, real trade-offs and no hype."
      />

      <Section aria-labelledby="guides-title">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader id="guides-title" eyebrow="Guides" title="In-depth guides" />
            <ButtonLink href="/guides" variant="outline" className="self-start sm:self-auto">
              All guides
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {guides.slice(0, 2).map((g) => (
              <li key={g.slug}>
                <ArticleCard article={g} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="blog-title" className="border-y border-line">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader id="blog-title" eyebrow="Blog" title="Latest articles" />
            <ButtonLink href="/blog" variant="outline" className="self-start sm:self-auto">
              All articles
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <ArticleCard article={p} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="topics-title">
        <Container>
          <SectionHeader
            id="topics-title"
            eyebrow="Explore by topic"
            title="From reading to building"
            description="Each topic connects to the services and solutions where we put these ideas into practice."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {topics.map((t) => (
              <li key={t.title} className="flex flex-col rounded-2xl border border-line bg-card p-6">
                <Icon name={t.icon} className="size-5 text-signal" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
                  {t.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline"
                      >
                        {l.label}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        trackId="resources_index"
        title="Ready to move from reading to building?"
        description="Bring us your use case. We'll help you work out what's practical and what a first phase would look like."
        primary={{ label: "Talk to an AI Engineer", href: "/contact" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
