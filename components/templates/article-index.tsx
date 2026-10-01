import { ArticleCard } from "@/components/cards/article-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/layout-primitives";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type { ArticleSummary } from "@/types/content";

interface ArticleIndexProps {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  intro: string;
  articles: ArticleSummary[];
  emptyMessage: string;
  trackId: string;
}

/** Listing layout shared by /blog and /guides: newest article featured, then a grid. */
export function ArticleIndex({ breadcrumb, eyebrow, title, intro, articles, emptyMessage, trackId }: ArticleIndexProps) {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHero breadcrumb={breadcrumb} eyebrow={eyebrow} title={title} intro={intro} />

      <Section aria-labelledby="articles-title">
        <Container>
          <h2 id="articles-title" className="sr-only">
            {eyebrow}
          </h2>
          {featured ? (
            <>
              <ArticleCard article={featured} featured />
              {rest.length > 0 && (
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="mx-auto max-w-xl rounded-2xl border border-dashed border-line-strong p-8 text-center text-muted-foreground">
              {emptyMessage}
            </p>
          )}
        </Container>
      </Section>

      <CtaBanner
        trackId={trackId}
        title="Have a question we haven't covered?"
        description="Ask the engineers who build these systems. We'll give you a practical, honest answer."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "All resources", href: "/resources" }}
      />
    </>
  );
}
