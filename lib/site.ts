/**
 * Global company configuration.
 *
 * Values wrapped in `PLACEHOLDER` are not yet confirmed by ZAYBX. Components
 * check `isPlaceholder()` and hide or flag them instead of publishing
 * invented facts. Replace them here once the real details are available.
 */

export const PLACEHOLDER = "__PLACEHOLDER__" as const;

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value === PLACEHOLDER;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zaybx.com").replace(/\/$/, "");

export type SocialNetwork = "linkedin" | "facebook" | "instagram" | "youtube" | "freelancer" | "x" | "github";

export interface Office {
  /** e.g. "Headquarters", "India", "UAE". */
  label: string;
  /** Address lines as they should be printed. */
  lines: string[];
  /** Optional phone for this office, E.164 format. */
  phone?: string;
  /** Optional Google Maps link. */
  mapUrl?: string;
  /** Marks the headquarters (shown with an HQ badge). */
  hq?: boolean;
}

export const siteConfig = {
  name: "ZAYBX",
  shortName: "ZAYBX",
  url: siteUrl,
  tagline: "AI. Software. Automation. Built for Business.",
  description:
    "ZAYBX designs and builds AI-powered software, voice AI agents and automation platforms that help businesses operate smarter and scale faster.",
  locale: "en_US",
  /** Shown as the default OpenGraph image until a branded one is designed. */
  ogImage: "/opengraph-image",

  contact: {
    email: "info@zaybx.com" as string,
    phone: "+91 91350 53121" as string,
    whatsapp: "919135053121" as string, // digits only incl. country code
    meetingUrl: PLACEHOLDER as string, // Cal.com / Calendly link
    /** Careers / HR inbox shown on /careers. */
    careersEmail: "info@zaybx.com" as string,
  },

  /**
   * Company offices. TODO(ZAYBX): add real addresses — the "Our offices"
   * blocks on /contact and in the footer stay hidden while this is empty.
   * Example:
   *   { label: "India", lines: ["Street", "City, State PIN", "India"], phone: "+91…" }
   */
  offices: [
    {
      label: "Pune",
      hq: true,
      lines: [
        "Zaybx Globaltech360 Pvt. Ltd.",
        "D1-1002, Dreams Aakruti, S.No-53, Kalepadal",
        "Hadapsar, Pune 411028",
        "Maharashtra, India",
      ],
      phone: "+91 91350 53121",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Dreams Aakruti, Kalepadal, Hadapsar, Pune 411028"),
    },
    {
      label: "New Delhi",
      lines: ["New Delhi, India"], // TODO(ZAYBX): add the full Delhi street address
      phone: "+91 91350 53121",
    },
  ] as Office[],

  /** Social profiles — each icon appears only once its URL is set. */
  social: {
    linkedin: PLACEHOLDER as string, // TODO(ZAYBX): add the LinkedIn company page URL
    facebook: "https://www.facebook.com/profile.php?id=61596034036197" as string,
    instagram: "https://www.instagram.com/zaybxglobaltech360/" as string,
    youtube: "https://www.youtube.com/@Zaybx-j8w" as string,
    freelancer: "https://www.freelancer.com/u/Zaybxglobal" as string,
    x: PLACEHOLDER as string,
    github: PLACEHOLDER as string,
  } satisfies Record<SocialNetwork, string>,

  /** Legal entity details — confirm before launch. */
  legal: {
    entityName: "Zaybx Globaltech360 Pvt. Ltd.",
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
