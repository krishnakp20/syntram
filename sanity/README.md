# Sanity CMS (optional)

The website reads blog posts and guides through one content layer
(`lib/content/articles`). Two sources are available:

| Source | When | Body format |
| --- | --- | --- |
| Local MDX (default) | `content/blog/*.mdx`, `content/guides/*.mdx` | MDX — trusted, code-reviewed files |
| Sanity | `CONTENT_SOURCE=sanity` | Markdown — never executed as code |

Pages never import a source directly, so switching is an environment change.

## Setting up Sanity

1. Create a Sanity project and a Studio (`npm create sanity@latest`) in a
   separate folder or repository.
2. Install the Markdown input plugin in the Studio (`sanity-plugin-markdown`).
3. Copy `sanity/schemas/` into the Studio and register `schemaTypes`.
4. Set these environment variables for the website:

   ```
   CONTENT_SOURCE=sanity
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   # Only needed if the dataset is private:
   SANITY_READ_TOKEN=...
   ```

5. Migrate existing articles: create a document per `.mdx` file, copying the
   frontmatter into fields and the body into `body`. MDX-only components such
   as `<Callout>` must be rewritten as plain Markdown (for example a
   blockquote).

## Status

The Sanity adapter (`lib/content/articles/sanity-source.ts`) is implemented
against Sanity's documented HTTP query API but has **not yet been tested
against a live project**. Verify it on a preview deployment before switching
production over. Content is cached for 5 minutes (`revalidate: 300`); add a
Sanity webhook that calls `revalidateTag("sanity:blog")` / `("sanity:guide")`
for instant updates.
