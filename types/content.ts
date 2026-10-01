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
