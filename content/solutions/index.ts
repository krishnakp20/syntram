import type { SolutionDetail, SolutionSlug } from "@/types/content";

import { aiAutomation } from "./ai-automation";
import { businessProcessAutomation } from "./business-process-automation";
import { customerSupportAutomation } from "./customer-support-automation";
import { voiceAiSolution } from "./voice-ai";

export const solutions: SolutionDetail[] = [
  aiAutomation,
  customerSupportAutomation,
  voiceAiSolution,
  businessProcessAutomation,
];

export function getSolution(slug: string): SolutionDetail | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getSolutionsBySlugs(slugs: SolutionSlug[] = []): SolutionDetail[] {
  return slugs.map((slug) => getSolution(slug)).filter((s): s is SolutionDetail => Boolean(s));
}
