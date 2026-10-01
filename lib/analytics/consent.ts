/**
 * Analytics consent, stored in the visitor's browser only.
 *
 * Default is "no decision" → no analytics scripts load and no events are sent.
 * This "basic" consent approach is the privacy-preserving choice; review it
 * with your legal adviser for the markets you serve (e.g. DPDP Act, GDPR).
 */

export type ConsentState = "granted" | "denied" | null;

const STORAGE_KEY = "syntram-analytics-consent";
export const CONSENT_EVENT = "syntram:consent-change";

export function readConsent(): ConsentState {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null; // storage blocked: treat as no consent
  }
}

export function writeConsent(state: Exclude<ConsentState, null>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Storage unavailable — the choice applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
}

export function hasAnalyticsConsent(): boolean {
  return typeof window !== "undefined" && readConsent() === "granted";
}
