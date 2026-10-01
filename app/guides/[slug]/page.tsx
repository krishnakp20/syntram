import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/templates/article-page";
import { getArticle, getArticles } from "@/lib/content/articles";
import { articleMetadata } from "@/lib/content/articles/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getArticles("guide")).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const article = await getArticle("guide", slug);
  return article ? articleMetadata(article) : {};
}

export default async function Page({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const article = await getArticle("guide", slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
