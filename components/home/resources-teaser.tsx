import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { ButtonLink } from "@/components/shared/button-link";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { getLatestArticles } from "@/lib/content/articles";

/** Latest published guides and articles (drafts are excluded). */
export async function ResourcesTeaser() {
  const latest = await getLatestArticles(3);
  if (latest.length === 0) return null;

  return (
    <Section tone="surface" aria-labelledby="resources-title" className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="resources-title"
            eyebrow="Resources"
            title="Practical thinking on AI and automation"
            description="Clear explanations, architecture notes and honest trade-offs — written by the people who build these systems."
          />
          <ButtonLink href="/resources" variant="outline" className="self-start lg:self-auto" trackAs="home_resources_all">
            All resources
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {latest.map((article) => (
            <li key={`${article.kind}-${article.slug}`}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
