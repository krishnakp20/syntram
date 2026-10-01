import type { ProductSummary } from "@/types/content";

/**
 * Product registry.
 *
 * PLACEHOLDER: Syntram has not yet published product details. The entry below
 * only reserves the URL structure (/products/[slug]). It is flagged as a
 * placeholder, so it is rendered with a notice, excluded from the sitemap and
 * never described with features. Replace with real product data when ready.
 */
export const products: ProductSummary[] = [
  {
    slug: "voice-ai-platform",
    name: "Voice AI Platform",
    tagline: "Product details to be announced.",
    status: "in-development",
    icon: "audio-lines",
    placeholder: true,
  },
];
