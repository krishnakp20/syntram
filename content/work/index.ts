import { isPublished, isVisible } from "@/lib/content/visibility";
import type { CaseStudy } from "@/types/content";

import { caseStudyTemplate } from "./case-study-template";

/**
 * Case study registry. Add one file per case study and list it here.
 *
 * Rules for publishing (enforced by the template, not just convention):
 *   - only results with `verified: true` are rendered
 *   - `placeholder: true` entries are hidden in production, noindexed and
 *     excluded from the sitemap
 *   - anonymised clients use a descriptive label, never an invented name
 */
const allCaseStudies: CaseStudy[] = [caseStudyTemplate];

/** Case studies visible in the current environment, newest first. */
export function getVisibleCaseStudies(): CaseStudy[] {
  return allCaseStudies.filter(isVisible).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Real, client-approved case studies only. */
export function getPublishedCaseStudies(): CaseStudy[] {
  return getVisibleCaseStudies().filter(isPublished);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getVisibleCaseStudies().find((c) => c.slug === slug);
}
