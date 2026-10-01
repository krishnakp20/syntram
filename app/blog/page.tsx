import { ArticleIndex } from "@/components/templates/article-index";
import { getArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog — Voice AI, AI Agents & Automation",
  description:
    "Articles from Syntram Technologies on voice AI, AI agents, automation and software engineering — practical explanations without the hype.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const articles = await getArticles("blog");
  return (
    <ArticleIndex
      breadcrumb={[
        { name: "Resources", path: "/resources" },
        { name: "Blog", path: "/blog" },
      ]}
      eyebrow="Blog"
      title="Notes on voice AI, agents and automation"
      intro="Practical explanations and engineering notes from the team building these systems — focused on what works, what doesn't and why."
      articles={articles}
      emptyMessage="Our first articles are on their way."
      trackId="blog_index"
    />
  );
}
