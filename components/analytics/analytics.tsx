"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";

import { ConsentBanner } from "@/components/analytics/consent-banner";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/analytics/consent";
import { track } from "@/lib/analytics/events";

interface AnalyticsProps {
  gtmId?: string;
  ga4Id?: string;
  clarityId?: string;
  meetingUrl?: string;
}

// IDs are interpolated into inline scripts, so only accept their known formats.
const valid = {
  gtm: (id?: string) => (id && /^GTM-[A-Z0-9]+$/.test(id) ? id : undefined),
  ga4: (id?: string) => (id && /^G-[A-Z0-9]+$/.test(id) ? id : undefined),
  clarity: (id?: string) => (id && /^[a-z0-9]+$/i.test(id) ? id : undefined),
};

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
// "unknown" on the server so nothing consent-dependent renders during SSR.
const getServerSnapshot = (): ConsentState | "unknown" => "unknown";

/** Delegated click tracking driven by data attributes and link types. */
function useClickTracking(meetingUrl?: string) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      const label = el.textContent?.trim().slice(0, 80);

      if (el.dataset.trackCta) track("cta_click", { cta_id: el.dataset.trackCta, label, href });
      if (el.dataset.trackProduct) track("product_click", { product: el.dataset.trackProduct });
      if (el.dataset.trackCaseStudy) track("case_study_click", { case_study: el.dataset.trackCaseStudy });
      if (el.dataset.trackArticle) track("article_click", { article: el.dataset.trackArticle });

      if (href.startsWith("tel:")) track("phone_click", { location: window.location.pathname });
      else if (href.startsWith("mailto:")) track("email_click", { location: window.location.pathname });
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track("whatsapp_click", { location: window.location.pathname });
      else if (el.dataset.trackMeeting !== undefined || (meetingUrl && href.startsWith(meetingUrl)))
        track("meeting_click", { location: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [meetingUrl]);
}

/**
 * Loads GTM / GA4 / Clarity only after the visitor accepts analytics.
 * Rendered by the root layout only when at least one ID is configured.
 */
export function Analytics({ gtmId, ga4Id, clarityId, meetingUrl }: AnalyticsProps) {
  const consent = useSyncExternalStore(subscribe, readConsent, getServerSnapshot);
  useClickTracking(meetingUrl);

  const gtm = valid.gtm(gtmId);
  const ga4 = gtm ? undefined : valid.ga4(ga4Id); // with GTM, configure GA4 inside the container
  const clarity = valid.clarity(clarityId);

  if (consent === "unknown") return null;
  if (consent === null) return <ConsentBanner />;
  if (consent === "denied") return null;

  return (
    <>
      {gtm && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      )}
      {ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {clarity && (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}
        </Script>
      )}
    </>
  );
}
