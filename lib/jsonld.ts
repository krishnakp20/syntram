import { absoluteUrl } from "@/lib/seo";
import { isPlaceholder, siteConfig } from "@/lib/site";
import type { FAQItem } from "@/types/content";

/**
 * Schema.org builders. Only describe what is actually visible on the page —
 * never add ratings, reviews, prices or claims that the page doesn't show.
 */

type JsonLdObject = Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

const organizationId = `${siteConfig.url}/#organization`;

export function organizationJsonLd(): JsonLdObject {
  const sameAs = Object.values(siteConfig.social).filter((url) => !isPlaceholder(url));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.description,
    ...(sameAs.length ? { sameAs } : {}),
    ...(!isPlaceholder(siteConfig.contact.email) ? { email: siteConfig.contact.email } : {}),
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType ?? name,
    provider: { "@id": organizationId, "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function articleJsonLd({
  kind,
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  authorName,
  image,
}: {
  kind: "blog" | "guide";
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  image?: string;
}): JsonLdObject {
  const isOrgAuthor = authorName === siteConfig.name;
  return {
    "@context": "https://schema.org",
    "@type": kind === "blog" ? "BlogPosting" : "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: isOrgAuthor
      ? { "@type": "Organization", "@id": organizationId, name: siteConfig.name, url: siteConfig.url }
      : { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", "@id": organizationId, name: siteConfig.name, url: siteConfig.url },
    ...(image ? { image: absoluteUrl(image) } : {}),
  };
}

/** Only use when the FAQ is rendered visibly on the same page. */
export function faqJsonLd(faqs: FAQItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Serialise safely for a <script> tag (prevents `</script>` injection). */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
