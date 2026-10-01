import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import type { SeoFields } from "@/types/content";

/** Absolute URL for a site path. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BuildMetadataInput extends SeoFields {
  /** Route path, e.g. "/services/voice-ai". Used for canonical + og:url. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Use the title verbatim (no "| Syntram Technologies" suffix). */
  absoluteTitle?: boolean;
}

/**
 * Single source of truth for page metadata. Every route calls this so titles,
 * canonicals, OpenGraph, Twitter and robots stay consistent.
 */
export function buildMetadata({
  title,
  description,
  path,
  canonical,
  noindex,
  ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle,
}: BuildMetadataInput): Metadata {
  const url = canonical ?? absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
