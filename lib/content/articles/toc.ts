import GithubSlugger from "github-slugger";

import type { TocItem } from "@/types/content";

/**
 * Builds a table of contents from Markdown headings. Uses the same slugger as
 * rehype-slug, so the generated ids match the rendered heading anchors.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const items: TocItem[] = [];

  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1");
    items.push({ id: slugger.slug(text), text, depth: match[1].length as 2 | 3 });
  }
  return items;
}
