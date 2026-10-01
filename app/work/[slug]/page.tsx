import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/templates/case-study-page";
import { getCaseStudy, getVisibleCaseStudies } from "@/content/work";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    ...study.seo,
    noindex: study.placeholder || study.seo.noindex,
    path: `/work/${study.slug}`,
    type: "article",
    publishedTime: study.publishedAt,
  });
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
