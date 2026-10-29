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

export type SocialNetwork = "linkedin" | "facebook" | "instagram" | "youtube" | "x" | "github";

export interface Office {
  /** e.g. "Headquarters", "India", "UAE". */
  label: string;
  /** Address lines as they should be printed. */
  lines: string[];
  /** Optional phone for this office, E.164 format. */
  phone?: string;
  /** Optional Google Maps link. */
  mapUrl?: string;
}

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
    whatsapp: PLACEHOLDER as string, // digits only incl. country code, e.g. 91XXXXXXXXXX
    meetingUrl: PLACEHOLDER as string, // Cal.com / Calendly link
    /** Careers / HR inbox shown on /careers. */
    careersEmail: PLACEHOLDER as string,
  },

  /**
   * Company offices. TODO(Syntram): add real addresses — the "Our offices"
   * blocks on /contact and in the footer stay hidden while this is empty.
   * Example:
   *   { label: "India", lines: ["Street", "City, State PIN", "India"], phone: "+91…" }
   */
  offices: [] as Office[],

  /** Social profiles — each icon appears only once its URL is set. */
  social: {
    linkedin: PLACEHOLDER as string,
    facebook: PLACEHOLDER as string,
    instagram: PLACEHOLDER as string,
    youtube: PLACEHOLDER as string,
    x: PLACEHOLDER as string,
    github: PLACEHOLDER as string,
  } satisfies Record<SocialNetwork, string>,

  /** Legal entity details — confirm before launch. */
  legal: {
    entityName: "Syntram Technologies",
    foundingYear: PLACEHOLDER as string,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** WhatsApp click-to-chat URL, or undefined while the number is a placeholder. */
export function whatsappUrl(message?: string): string | undefined {
  const number = siteConfig.contact.whatsapp;
  if (isPlaceholder(number)) return undefined;
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
