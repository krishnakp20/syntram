import { notFound } from "next/navigation";

import { SolutionPage } from "@/components/templates/solution-page";
import { getSolution, solutions } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return buildMetadata({ ...solution.seo, path: `/solutions/${solution.slug}` });
}

export default async function Page({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  return <SolutionPage solution={solution} />;
}
