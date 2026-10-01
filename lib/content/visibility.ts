import type { Placeholder } from "@/types/content";

/**
 * Placeholder content (structural examples with no real company data) is
 * visible in development so layouts can be reviewed, and hidden in
 * production unless explicitly enabled for a preview deployment.
 *
 * Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=true to show them in a production build.
 * Even when shown, placeholders are noindexed and excluded from the sitemap.
 */
export const showPlaceholders =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true" || process.env.NODE_ENV === "development";

export function isVisible(item: Placeholder): boolean {
  return !item.placeholder || showPlaceholders;
}

/** Real, publishable content only — use for sitemaps, JSON-LD and homepage features. */
export function isPublished(item: Placeholder): boolean {
  return !item.placeholder;
}
