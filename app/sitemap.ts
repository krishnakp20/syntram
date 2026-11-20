import type { MetadataRoute } from "next";

import { clients, galleryImages } from "@/content/company";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { getPublishedCaseStudies } from "@/content/work";
import { articlePath, getArticles } from "@/lib/content/articles";
import { isPublished } from "@/lib/content/visibility";
import { siteConfig } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

const url = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

/**
 * sitemap.xml — every public, indexable page. Placeholders, drafts and
 * noindexed pages are left out, so this matches what Google is allowed to index.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
    url: url(path),
    changeFrequency,
    priority,
  });

  const staticPages: Entry[] = [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    page("/solutions", 0.9),
    page("/industries", 0.8),
    page("/products", 0.8),
    page("/about", 0.7),
    page("/careers", 0.7, "weekly"),
    page("/contact", 0.7),
    page("/work", 0.6),
    page("/resources", 0.5, "weekly"),
    page("/blog", 0.5, "weekly"),
    page("/guides", 0.5, "weekly"),
    ...(clients.length > 0 ? [page("/clients", 0.5)] : []),
    ...(galleryImages.length > 0 ? [page("/gallery", 0.4)] : []),
  ];

  const indexable = <T extends { placeholder?: boolean; seo: { noindex?: boolean } }>(items: T[]) =>
    items.filter((i) => isPublished(i) && !i.seo.noindex);

  const detailPages: Entry[] = [
    ...indexable(services).map((s) => page(`/services/${s.slug}`, 0.8)),
    ...indexable(solutions).map((s) => page(`/solutions/${s.slug}`, 0.8)),
    ...indexable(industries).map((i) => page(`/industries/${i.slug}`, 0.7)),
    ...indexable(products).map((p) => page(`/products/${p.slug}`, 0.7)),
    ...indexable(getPublishedCaseStudies()).map((c) => ({
      ...page(`/work/${c.slug}`, 0.6),
      lastModified: c.publishedAt,
    })),
  ];

  const [posts, guides] = await Promise.all([getArticles("blog"), getArticles("guide")]);
  const articlePages: Entry[] = [...posts, ...guides]
    // Drafts are never indexed; articles canonical to another URL don't belong here either.
    .filter((a) => !a.draft && !a.seo.canonical)
    .map((a) => ({ ...page(articlePath(a), 0.5), lastModified: a.updatedAt ?? a.publishedAt }));

  return [...staticPages, ...detailPages, ...articlePages];
}
