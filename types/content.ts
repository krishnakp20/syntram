/**
 * Content model for the marketing site.
 *
 * Everything here is plain, serialisable data (icons are string keys, not
 * components) so the same shapes can later be served from Sanity without
 * touching page components. See `lib/content` for the read layer.
 */

import type { IconName } from "@/components/shared/icon";

/** Marks content that is not yet backed by real company information. */
export interface Placeholder {
  /**
   * `true` while the item is a structural placeholder. Placeholder items are
   * rendered with a visible notice and excluded from the sitemap and JSON-LD.
   */
  placeholder?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: IconName;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface LinkRef {
  label: string;
  href: string;
}

export interface SeoFields {
  /** <title> — keep under ~60 characters. Brand suffix is added automatically. */
  title: string;
  /** Meta description — aim for 140–160 characters. */
  description: string;
  /** Overrides the auto-generated canonical. Rarely needed. */
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
}

/* ---------- Services ---------- */

export type ServiceSlug =
  | "ai-development"
  | "voice-ai"
  | "custom-software-development"
  | "web-development"
  | "mobile-app-development"
  | "cloud-devops"
  | "api-integration"
  | "qa-testing";

export interface ServiceSummary {
  slug: ServiceSlug;
  title: string;
  /** Short label used in menus and cards. */
  shortTitle: string;
  summary: string;
  icon: IconName;
}

/* ---------- Solutions ---------- */

export type SolutionSlug =
  | "ai-automation"
  | "customer-support-automation"
  | "voice-ai"
  | "business-process-automation";

export interface SolutionSummary {
  slug: SolutionSlug;
  title: string;
  summary: string;
  icon: IconName;
}

/* ---------- Industries ---------- */

export type IndustrySlug =
  | "ecommerce"
  | "healthcare"
  | "fintech"
  | "education"
  | "real-estate"
  | "logistics"
  | "travel";

export interface IndustrySummary {
  slug: IndustrySlug;
  title: string;
  summary: string;
  icon: IconName;
}

/* ---------- Detail-page building blocks ---------- */

/** Keys into `content/technology.ts` groups. */
export type TechGroupKey = "ai" | "voice" | "frontend" | "backend" | "data" | "cloud";

export interface PageHeroContent {
  /** H1. Keep it human — the SEO title can differ. */
  headline: string;
  intro: string;
}

export interface NarrativeBlock {
  title: string;
  body: string;
  points: string[];
}

export interface UseCase {
  title: string;
  description: string;
}

export interface CtaContent {
  title: string;
  description: string;
  /** Contextual CTA label — avoid generic "Contact us". */
  primaryLabel: string;
}

export interface RelatedContent {
  services?: ServiceSlug[];
  solutions?: SolutionSlug[];
  industries?: IndustrySlug[];
}

/* ---------- Detail pages ---------- */

export interface ServiceDetail extends ServiceSummary {
  seo: SeoFields;
  hero: PageHeroContent;
  problem: NarrativeBlock;
  solution: NarrativeBlock;
  capabilities: Feature[];
  useCases: UseCase[];
  technology: TechGroupKey[];
  /** Overrides the shared delivery process where a service works differently. */
  process?: ProcessStep[];
  faqs: FAQItem[];
  related: RelatedContent;
  cta: CtaContent;
}

export interface SolutionDetail extends SolutionSummary {
  seo: SeoFields;
  hero: PageHeroContent;
  problem: NarrativeBlock;
  /** How the solution works, step by step. */
  howItWorks: ProcessStep[];
  /** Qualitative outcomes — never unverified numbers. */
  outcomes: Feature[];
  capabilities: Feature[];
  useCases: UseCase[];
  technology: TechGroupKey[];
  faqs: FAQItem[];
  related: RelatedContent;
  cta: CtaContent;
}

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustrySolutionFit {
  solution: SolutionSlug;
  /** Why this solution matters in this industry specifically. */
  rationale: string;
}

export interface IndustryDetail extends IndustrySummary {
  seo: SeoFields;
  hero: PageHeroContent;
  challenges: IndustryChallenge[];
  solutionFits: IndustrySolutionFit[];
  useCases: UseCase[];
  technology: TechGroupKey[];
  /** Industry-specific considerations shown alongside the shared process. */
  considerations: NarrativeBlock;
  faqs: FAQItem[];
  related: RelatedContent;
  cta: CtaContent;
}

/* ---------- Products ---------- */

export type ProductStatus = "in-development" | "beta" | "available";

export interface ProductSummary extends Placeholder {
  slug: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  icon: IconName;
}

/* ---------- Navigation ---------- */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
}

export interface NavGroup {
  label: string;
  /** Landing page for the group (e.g. /services). */
  href: string;
  intro?: string;
  items: NavLink[];
}

export type NavEntry = NavGroup | NavLink;
