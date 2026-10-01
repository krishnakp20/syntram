/**
 * Global company configuration.
 *
 * Values wrapped in `PLACEHOLDER` are not yet confirmed by Syntram. Components
 * check `isPlaceholder()` and hide or flag them instead of publishing
 * invented facts. Replace them here once the real details are available.
 */

export const PLACEHOLDER = "__PLACEHOLDER__" as const;

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value === PLACEHOLDER;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://syntram.com").replace(/\/$/, "");

export const siteConfig = {
  name: "Syntram Technologies",
  shortName: "Syntram",
  url: siteUrl,
  tagline: "AI. Software. Automation. Built for Business.",
  description:
    "Syntram Technologies designs and builds AI-powered software, voice AI agents and automation platforms that help businesses operate smarter and scale faster.",
  locale: "en_US",
  /** Shown as the default OpenGraph image until a branded one is designed. */
  ogImage: "/opengraph-image",

  contact: {
    email: PLACEHOLDER as string, // e.g. hello@syntram.com
    phone: PLACEHOLDER as string, // E.164, e.g. +91XXXXXXXXXX
    whatsapp: PLACEHOLDER as string, // digits only, e.g. 91XXXXXXXXXX
    meetingUrl: PLACEHOLDER as string, // Cal.com / Calendly link
    address: PLACEHOLDER as string,
  },

  social: {
    linkedin: PLACEHOLDER as string,
    x: PLACEHOLDER as string,
    github: PLACEHOLDER as string,
  },

  /** Legal entity details — confirm before launch. */
  legal: {
    entityName: "Syntram Technologies",
    foundingYear: PLACEHOLDER as string,
  },
} as const;

export type SiteConfig = typeof siteConfig;
