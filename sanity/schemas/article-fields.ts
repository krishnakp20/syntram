/**
 * Shared fields for `post` and `guide` documents.
 *
 * These are plain schema objects in the shape Sanity Studio's `defineType` /
 * `defineField` accept, so they can be copied into a Studio project as-is
 * without adding the `sanity` package to this website.
 *
 * Field names match what lib/content/articles/sanity-source.ts queries, and
 * values are validated against the same rules as local MDX frontmatter.
 */

const serviceSlugs = [
  "ai-development",
  "voice-ai",
  "custom-software-development",
  "web-development",
  "mobile-app-development",
  "cloud-devops",
  "api-integration",
  "qa-testing",
];
const solutionSlugs = ["ai-automation", "customer-support-automation", "voice-ai", "business-process-automation"];
const industrySlugs = ["ecommerce", "healthcare", "fintech", "education", "real-estate", "logistics", "travel"];

type Rule = {
  required: () => Rule;
  min: (n: number) => Rule;
  max: (n: number) => Rule;
};

export const articleFields = [
  { name: "title", type: "string", validation: (r: Rule) => r.required().min(5).max(120) },
  {
    name: "slug",
    type: "slug",
    options: { source: "title", maxLength: 96 },
    description: "Lowercase, hyphenated. Becomes the URL.",
    validation: (r: Rule) => r.required(),
  },
  { name: "excerpt", type: "text", rows: 3, validation: (r: Rule) => r.required().min(40).max(300) },
  {
    name: "body",
    type: "markdown",
    description:
      "Article body in Markdown (requires the sanity-plugin-markdown input). Rendered as plain Markdown — components and scripts are not executed.",
    validation: (r: Rule) => r.required(),
  },
  { name: "publishedAt", type: "date", validation: (r: Rule) => r.required() },
  { name: "category", type: "reference", to: [{ type: "category" }], validation: (r: Rule) => r.required() },
  { name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } },
  { name: "author", type: "reference", to: [{ type: "author" }] },
  {
    name: "featuredImage",
    type: "image",
    options: { hotspot: true },
    fields: [{ name: "alt", type: "string", title: "Alt text", validation: (r: Rule) => r.required().min(5) }],
  },
  {
    name: "seo",
    type: "object",
    fields: [
      { name: "title", type: "string", description: "Max 45 characters; the brand suffix is added.", validation: (r: Rule) => r.max(45) },
      { name: "description", type: "text", rows: 2, validation: (r: Rule) => r.min(110).max(160) },
      { name: "canonical", type: "url", description: "Only if this article was first published elsewhere." },
    ],
  },
  {
    name: "related",
    type: "object",
    description: "Drives in-article CTAs and internal links.",
    fields: [
      { name: "services", type: "array", of: [{ type: "string" }], options: { list: serviceSlugs } },
      { name: "solutions", type: "array", of: [{ type: "string" }], options: { list: solutionSlugs } },
      { name: "industries", type: "array", of: [{ type: "string" }], options: { list: industrySlugs } },
    ],
  },
];
