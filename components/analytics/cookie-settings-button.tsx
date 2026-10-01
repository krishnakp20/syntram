"use client";

import { CONSENT_EVENT } from "@/lib/analytics/consent";

/** Lets visitors reopen the consent choice at any time (footer link). */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem("syntram-analytics-consent");
        } catch {
          // ignore — storage unavailable
        }
        window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
      }}
      className="hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
