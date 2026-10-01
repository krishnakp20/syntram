import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import type { Article } from "@/types/content";

import { articlePath } from "./index";

/** Metadata for an article page, with the same rules for every source. */
export function articleMetadata(article: Article): Metadata {
  const seoTitle = article.seo.title;
  return buildMetadata({
    // Without an explicit short SEO title, use the headline alone (no brand
    // suffix) so long headlines aren't truncated in search results.
    title: seoTitle ?? article.title,
    absoluteTitle: !seoTitle,
    description: article.seo.description ?? article.excerpt,
    canonical: article.seo.canonical,
    noindex: article.draft,
    path: articlePath(article),
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    ogImage: article.featuredImage?.src,
  });
}
