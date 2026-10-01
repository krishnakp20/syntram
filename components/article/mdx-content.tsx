import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/article/mdx-components";
import type { Article } from "@/types/content";

/**
 * Compiles and renders an article body on the server (at build time for static
 * pages) — no MDX runtime is shipped to the browser.
 *
 * `format: "md"` disables JSX/expressions entirely; it's used for CMS content
 * so editors can never execute code. `"mdx"` is for trusted repository files.
 */
export async function MdxContent({ source, format }: { source: string; format: Article["format"] }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    format,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });
  return <Content components={mdxComponents} />;
}
