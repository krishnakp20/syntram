/** Public analytics IDs. Each integration is off unless its env var is set. */
export const analyticsConfig = {
  /** Google Tag Manager container, e.g. GTM-XXXXXXX. Preferred: manage GA4 inside GTM. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  /** GA4 measurement ID, e.g. G-XXXXXXXXXX. Only used directly when GTM is not set. */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  /** Microsoft Clarity project ID. */
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
};

export const analyticsEnabled = Boolean(analyticsConfig.gtmId || analyticsConfig.ga4Id || analyticsConfig.clarityId);
