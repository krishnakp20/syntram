"use client";

import { writeConsent } from "@/lib/analytics/consent";

/**
 * Non-blocking consent prompt. Both choices are equally prominent, and
 * declining is remembered just like accepting.
 */
export function ConsentBanner() {
  return (
    <section
      aria-label="Analytics cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line-strong bg-popover/95 p-5 shadow-2xl backdrop-blur sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-sm leading-relaxed text-foreground">
        We&apos;d like to use analytics cookies to understand how this site is used and improve it. They&apos;re only
        set if you agree.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className="min-h-11 flex-1 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => writeConsent("denied")}
          className="min-h-11 flex-1 rounded-xl border border-line-strong px-4 text-sm font-medium text-foreground hover:bg-secondary"
        >
          Decline
        </button>
      </div>
    </section>
  );
}
