import { ArticleIndex } from "@/components/templates/article-index";
import { getArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guides — Voice AI & Automation in Depth",
  description:
    "In-depth guides from Syntram Technologies on planning and building AI voice agents, support automation and AI systems that work in production.",
  path: "/guides",
});

export default async function GuidesIndexPage() {
  const articles = await getArticles("guide");
  return (
    <ArticleIndex
      breadcrumb={[
        { name: "Resources", path: "/resources" },
        { name: "Guides", path: "/guides" },
      ]}
      eyebrow="Guides"
      title="In-depth guides for planning AI projects"
      intro="Longer, structured guides for technical and product leaders — architecture, planning decisions and rollout practices, explained step by step."
      articles={articles}
      emptyMessage="Our first guides are on their way."
      trackId="guides_index"
    />
  );
}
