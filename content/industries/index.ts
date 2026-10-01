import type { IndustryDetail, IndustrySlug } from "@/types/content";

import { ecommerce } from "./ecommerce";
import { education } from "./education";
import { fintech } from "./fintech";
import { healthcare } from "./healthcare";
import { logistics } from "./logistics";
import { realEstate } from "./real-estate";
import { travel } from "./travel";

export const industries: IndustryDetail[] = [ecommerce, healthcare, fintech, education, realEstate, logistics, travel];

export function getIndustry(slug: string): IndustryDetail | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getIndustriesBySlugs(slugs: IndustrySlug[] = []): IndustryDetail[] {
  return slugs.map((slug) => getIndustry(slug)).filter((i): i is IndustryDetail => Boolean(i));
}
