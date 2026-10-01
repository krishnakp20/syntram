import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/templates/article-page";
import { getArticle, getArticles } from "@/lib/content/articles";
import { articleMetadata } from "@/lib/content/articles/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getArticles("blog")).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getArticle("blog", slug);
  return article ? articleMetadata(article) : {};
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getArticle("blog", slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
