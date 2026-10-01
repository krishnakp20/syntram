import { z } from "zod";

// YAML parses unquoted dates into Date objects — normalise both forms to "YYYY-MM-DD".
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
);
const slugList = <T extends string>(values: readonly [T, ...T[]]) => z.array(z.enum(values)).optional();

/**
 * Frontmatter contract for blog posts and guides. Every content source
 * (local MDX, Sanity) is validated against this before it reaches a page, so a
 * malformed article fails the build instead of rendering broken.
 */
export const articleFrontmatterSchema = z.object({
  title: z.string().min(5).max(120),
  excerpt: z.string().min(40).max(300),
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  category: z.string().min(2),
  tags: z.array(z.string()).default([]),
  author: z
    .object({ name: z.string(), role: z.string().optional() })
    .default({ name: "Syntram Technologies" }),
  featuredImage: z
    .object({ src: z.string(), alt: z.string().min(5), width: z.number(), height: z.number() })
    .optional(),
  seo: z
    .object({
      title: z.string().max(45, "Keep under 45 chars — the brand suffix is added").optional(),
      description: z.string().min(110).max(160).optional(),
      canonical: z.string().url().optional(),
    })
    .default({}),
  related: z
    .object({
      services: slugList([
        "ai-development",
        "voice-ai",
        "custom-software-development",
        "web-development",
        "mobile-app-development",
        "cloud-devops",
        "api-integration",
        "qa-testing",
      ] as const),
      solutions: slugList([
        "ai-automation",
        "customer-support-automation",
        "voice-ai",
        "business-process-automation",
      ] as const),
      industries: slugList([
        "ecommerce",
        "healthcare",
        "fintech",
        "education",
        "real-estate",
        "logistics",
        "travel",
      ] as const),
    })
    .optional(),
  draft: z.boolean().default(false),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
