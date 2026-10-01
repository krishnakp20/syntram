import { articleFields } from "./article-fields";

/**
 * Sanity schema types for the Syntram website content.
 * Register these in a Sanity Studio project: `schema: { types: schemaTypes }`.
 * Case studies, products and marketing pages stay in typed files in /content
 * until there's a clear editorial need to move them.
 */

const post = {
  name: "post",
  title: "Blog post",
  type: "document",
  fields: articleFields,
  orderings: [{ title: "Newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
};

const guide = {
  name: "guide",
  title: "Guide",
  type: "document",
  fields: articleFields,
};

const author = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "role", type: "string" },
  ],
};

const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "description", type: "text", rows: 2 },
  ],
};

export const schemaTypes = [post, guide, author, category];
