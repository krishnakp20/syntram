import type { Article, ArticleKind } from "@/types/content";

import { articleFrontmatterSchema } from "./schema";

/** Anything that can supply articles: local MDX files today, Sanity later. */
export interface ArticleSource {
  name: string;
  listArticles(kind: ArticleKind): Promise<Article[]>;
}

const WORDS_PER_MINUTE = 220;

export function readingMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Validate raw source data and map it into the shared Article shape. */
export function toArticle(
  kind: ArticleKind,
  slug: string,
  data: unknown,
  content: string,
  origin: string,
  format: Article["format"],
): Article {
  const parsed = articleFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid article frontmatter in ${origin}:\n${issues}`);
  }
  const fm = parsed.data;
  return {
    kind,
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    content,
    format,
    featuredImage: fm.featuredImage,
    author: fm.author,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    category: fm.category,
    tags: fm.tags,
    seo: fm.seo,
    related: fm.related,
    draft: fm.draft,
    readingMinutes: readingMinutes(content),
  };
}
