import Image from "next/image";

import { ContextualCta } from "@/components/article/contextual-cta";
import { MdxContent } from "@/components/article/mdx-content";
import { TableOfContents } from "@/components/article/table-of-contents";
import { ArticleCard } from "@/components/cards/article-card";
import { Breadcrumb } from "@/components/sections/breadcrumb";
import { CtaBanner } from "@/components/sections/cta-banner";
import { RelatedLinks } from "@/components/sections/related-links";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { articlePath, getRelatedArticles } from "@/lib/content/articles";
import { extractToc } from "@/lib/content/articles/toc";
import { formatDate } from "@/lib/format";
import { articleJsonLd } from "@/lib/jsonld";
import type { Article } from "@/types/content";

/** Shared layout for /blog/[slug] and /guides/[slug]. */
export async function ArticlePage({ article }: { article: Article }) {
  const path = articlePath(article);
  const toc = extractToc(article.content);
  const related = await getRelatedArticles(article);
  const section =
    article.kind === "blog" ? { name: "Blog", path: "/blog" } : { name: "Guides", path: "/guides" };
  const trackId = `${article.kind}_${article.slug.replace(/-/g, "_")}`;

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-50" />
          <Container className="relative pt-10 pb-14 sm:pt-12 sm:pb-16">
            <Breadcrumb
              items={[
                { name: "Resources", path: "/resources" },
                section,
                { name: article.title, path },
              ]}
            />
            <div className="mt-10 max-w-3xl">
              {article.draft && (
                <PlaceholderNotice className="mb-6">
                  This article is a draft. It&apos;s hidden in production and excluded from search engines.
                </PlaceholderNotice>
              )}
              <Eyebrow>
                {article.kind === "guide" ? "Guide" : "Article"} · {article.category}
              </Eyebrow>
              <h1 className="mt-4 text-display-lg font-semibold text-foreground">{article.title}</h1>
              <p className="mt-5 text-lead text-muted-foreground">{article.excerpt}</p>
              <p className="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-sm text-subtle">
                <span>By {article.author.name}</span>
                <span aria-hidden="true">·</span>
                <span>
                  Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </span>
                {article.updatedAt && article.updatedAt !== article.publishedAt && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{article.readingMinutes} min read</span>
              </p>
            </div>
          </Container>
        </header>

        {article.featuredImage && (
          <Container className="mt-10">
            <Image
              src={article.featuredImage.src}
              alt={article.featuredImage.alt}
              width={article.featuredImage.width}
              height={article.featuredImage.height}
              priority
              sizes="(min-width: 1280px) 1176px, 100vw"
              className="w-full rounded-2xl border border-line"
            />
          </Container>
        )}

        <Container className="grid gap-10 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <div>
            <TableOfContents items={toc} />
          </div>
          <div className="prose prose-syntram max-w-[72ch] min-w-0">
            <MdxContent source={article.content} format={article.format} />
            <ContextualCta related={article.related} trackId={trackId} />
            {article.tags.length > 0 && (
              <ul className="not-prose flex flex-wrap gap-2" aria-label="Tags">
                {article.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section tone="surface" aria-labelledby="related-articles-title" className="border-t border-line">
          <Container>
            <SectionHeader id="related-articles-title" eyebrow="Keep reading" title="Related articles" />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={`${a.kind}-${a.slug}`}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {article.related && <RelatedLinks related={article.related} title="Put this into practice" tone="dark" />}

      <CtaBanner
        trackId={trackId}
        title="Want to discuss this for your business?"
        description="We'll give you a straight answer on what's practical, what it would take and where to start."
        primary={{ label: "Talk to an AI Engineer", href: "/contact" }}
        secondary={{ label: "More resources", href: "/resources" }}
      />

      {!article.draft && (
        <JsonLd
          data={articleJsonLd({
            kind: article.kind,
            title: article.title,
            description: article.seo.description ?? article.excerpt,
            path,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            authorName: article.author.name,
            image: article.featuredImage?.src,
          })}
        />
      )}
    </>
  );
}
