import "server-only";

import { cache } from "react";

import { showPlaceholders } from "@/lib/content/visibility";
import type { Article, ArticleKind, ArticleSummary } from "@/types/content";

import { localSource } from "./local-source";
import { sanitySource } from "./sanity-source";
import type { ArticleSource } from "./source";

/**
 * Single entry point for articles. Pages call these functions and never touch
 * a specific source, so switching to Sanity is an environment change:
 *   CONTENT_SOURCE=sanity  (plus SANITY_PROJECT_ID / SANITY_DATASET)
 */
function activeSource(): ArticleSource {
  return process.env.CONTENT_SOURCE === "sanity" ? sanitySource : localSource;
}

/** Drafts follow the same rule as placeholders: dev / preview builds only. */
const isVisibleArticle = (a: Article) => !a.draft || showPlaceholders;

const loadAll = cache(async (kind: ArticleKind): Promise<Article[]> => {
  const articles = await activeSource().listArticles(kind);
  return articles
    .filter(isVisibleArticle)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
});

function summarize(article: Article): ArticleSummary {
  const { content, format, ...summary } = article;
  void content;
  void format;
  return summary;
}

export async function getArticles(kind: ArticleKind): Promise<ArticleSummary[]> {
  return (await loadAll(kind)).map(summarize);
}

export async function getArticle(kind: ArticleKind, slug: string): Promise<Article | undefined> {
  return (await loadAll(kind)).find((a) => a.slug === slug);
}

/** Latest across blog and guides — used on /resources and the homepage. */
export async function getLatestArticles(limit = 3): Promise<ArticleSummary[]> {
  const [posts, guides] = await Promise.all([getArticles("blog"), getArticles("guide")]);
  return [...posts, ...guides]
    .filter((a) => !a.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

/** Score other articles by shared services/solutions, category and tags. */
export async function getRelatedArticles(article: ArticleSummary, limit = 3): Promise<ArticleSummary[]> {
  const [posts, guides] = await Promise.all([getArticles("blog"), getArticles("guide")]);
  const keyset = (a: ArticleSummary) =>
    new Set([...(a.related?.services ?? []), ...(a.related?.solutions ?? []), ...a.tags.map((t) => `tag:${t}`)]);
  const mine = keyset(article);

  return [...posts, ...guides]
    .filter((a) => !(a.slug === article.slug && a.kind === article.kind) && !a.draft)
    .map((a) => {
      let score = a.category === article.category ? 2 : 0;
      for (const k of keyset(a)) if (mine.has(k)) score += 1;
      return { a, score };
    })
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt))
    .slice(0, limit)
    .map(({ a }) => a);
}

export function articlePath(article: Pick<ArticleSummary, "kind" | "slug">): string {
  return article.kind === "blog" ? `/blog/${article.slug}` : `/guides/${article.slug}`;
}
