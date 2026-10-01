import "server-only";

import type { Article, ArticleKind } from "@/types/content";

import { toArticle, type ArticleSource } from "./source";

/**
 * Sanity adapter (opt-in). Reads published documents over Sanity's HTTP query
 * API — no SDK dependency — and maps them through the same validation as local
 * MDX, so pages render identically whichever source is active.
 *
 * Expected document types are defined in /sanity/schemas. The body is stored
 * as Markdown/MDX text (field `body`), keeping a single rendering path.
 *
 * Status: written against Sanity's documented query API but NOT yet tested
 * against a live project. Verify with real credentials before switching
 * CONTENT_SOURCE to "sanity" in production.
 */

const API_VERSION = "2025-01-01";

const documentType: Record<ArticleKind, string> = { blog: "post", guide: "guide" };

interface SanityArticleDoc {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  author?: { name: string; role?: string };
  featuredImage?: { src: string; alt: string; width: number; height: number };
  seo?: { title?: string; description?: string; canonical?: string };
  related?: { services?: string[]; solutions?: string[]; industries?: string[] };
}

function config() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET ?? "production";
  if (!projectId) throw new Error("CONTENT_SOURCE=sanity requires SANITY_PROJECT_ID");
  return { projectId, dataset, token: process.env.SANITY_READ_TOKEN };
}

const projection = `{
  "slug": slug.current,
  title,
  excerpt,
  body,
  "publishedAt": publishedAt,
  "updatedAt": _updatedAt,
  "category": category->title,
  tags,
  "author": author->{name, role},
  "featuredImage": featuredImage{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
  seo,
  related
}`;

export const sanitySource: ArticleSource = {
  name: "sanity",
  async listArticles(kind) {
    const { projectId, dataset, token } = config();
    // Only published documents: drafts live under the "drafts." id prefix.
    const query = `*[_type == $type && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc) ${projection}`;
    const params = new URLSearchParams({ query, $type: JSON.stringify(documentType[kind]) });
    const url = `https://${projectId}.apicdn.sanity.io/v${API_VERSION}/data/query/${dataset}?${params}`;

    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      next: { revalidate: 300, tags: [`sanity:${kind}`] },
    });
    if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${res.statusText}`);
    const { result } = (await res.json()) as { result: SanityArticleDoc[] };

    return result.map(
      (doc): Article =>
        toArticle(
          kind,
          doc.slug,
          {
            ...doc,
            updatedAt: doc.updatedAt?.slice(0, 10),
            category: doc.category ?? "General",
            tags: doc.tags ?? [],
            seo: doc.seo ?? {},
          },
          doc.body ?? "",
          `sanity:${documentType[kind]}/${doc.slug}`,
          // CMS content is never executed as MDX.
          "md",
        ),
    );
  },
};
