import { isVisible } from "@/lib/content/visibility";
import type { ProductDetail } from "@/types/content";

/**
 * Product registry.
 *
 * PLACEHOLDER: Syntram has not yet published product details. The entry below
 * only reserves the URL structure (/products/[slug]) so the template can be
 * reviewed. It is flagged as a placeholder, so it is:
 *   - hidden in production builds (see lib/content/visibility.ts)
 *   - noindexed and excluded from the sitemap whenever it is shown
 *   - rendered without any features, claims or specifications
 *
 * To publish a real product: add an entry with `placeholder: false` and fill
 * in only the fields you can confirm. Empty sections are not rendered.
 */
export const products: ProductDetail[] = [
  {
    slug: "voice-ai-platform",
    name: "Voice AI Platform",
    tagline: "Product details to be announced.",
    status: "in-development",
    icon: "audio-lines",
    placeholder: true,
    seo: {
      title: "Voice AI Platform (Placeholder)",
      description:
        "Placeholder page reserving the URL for a future Syntram product. Product details will be published here once they are confirmed and available.",
      noindex: true,
    },
    related: {
      services: ["voice-ai", "ai-development"],
      solutions: ["voice-ai"],
    },
  },
];

/** Products that may be shown in the current environment. */
export function getVisibleProducts(): ProductDetail[] {
  return products.filter(isVisible);
}

export function getProduct(slug: string): ProductDetail | undefined {
  return getVisibleProducts().find((p) => p.slug === slug);
}

export const productStatusLabel: Record<ProductDetail["status"], string> = {
  "in-development": "In development",
  beta: "Beta",
  available: "Available",
};
