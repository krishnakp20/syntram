import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { Article, ArticleKind } from "@/types/content";

import { toArticle, type ArticleSource } from "./source";

const folders: Record<ArticleKind, string> = { blog: "blog", guide: "guides" };

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Reads `content/blog/*.mdx` and `content/guides/*.mdx`. The filename is the slug. */
export const localSource: ArticleSource = {
  name: "local-mdx",
  async listArticles(kind) {
    const folder = folders[kind];
    let files: string[];
    try {
      // Paths are written out in full (not via a variable) so file tracing stays scoped to /content.
      files = (await fs.readdir(path.join(process.cwd(), "content", folder))).filter((f) => f.endsWith(".mdx"));
    } catch {
      return [];
    }

    const articles: Article[] = [];
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      if (!SLUG_PATTERN.test(slug)) {
        throw new Error(`Article filename must be lowercase-hyphenated: content/${kind}/${file}`);
      }
      const raw = await fs.readFile(path.join(process.cwd(), "content", folder, file), "utf8");
      const { data, content } = matter(raw);
      articles.push(toArticle(kind, slug, data, content, `content/${folder}/${file}`, "mdx"));
    }
    return articles;
  },
};
