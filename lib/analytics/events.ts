/**
 * Analytics event catalogue + a single `track()` function.
 *
 * Events go to the GTM dataLayer (and gtag when GA4 is used directly). Nothing
 * is sent until the visitor has accepted analytics cookies — see consent.ts.
 * Keep event names stable: GTM triggers and GA4 reports depend on them.
 */

import { hasAnalyticsConsent } from "./consent";

export type AnalyticsEvent =
  | "cta_click"
  | "generate_lead"
  | "contact_form_error"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "meeting_click"
  | "product_view"
  | "product_click"
  | "case_study_view"
  | "case_study_click"
  | "article_click"
  | "article_progress"
  | "article_complete";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...clean });
  // When GA4 runs without GTM, gtag is the transport.
  if (window.gtag && !process.env.NEXT_PUBLIC_GTM_ID) window.gtag("event", event, clean);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, clean);
}
