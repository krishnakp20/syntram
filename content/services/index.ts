import type { ServiceDetail, ServiceSlug } from "@/types/content";

import { aiDevelopment } from "./ai-development";
import { apiIntegration } from "./api-integration";
import { cloudDevops } from "./cloud-devops";
import { customSoftwareDevelopment } from "./custom-software-development";
import { mobileAppDevelopment } from "./mobile-app-development";
import { qaTesting } from "./qa-testing";
import { voiceAi } from "./voice-ai";
import { webDevelopment } from "./web-development";

/** Order here is the display order across the site. */
export const services: ServiceDetail[] = [
  aiDevelopment,
  voiceAi,
  customSoftwareDevelopment,
  webDevelopment,
  mobileAppDevelopment,
  cloudDevops,
  apiIntegration,
  qaTesting,
];

export function getService(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesBySlugs(slugs: ServiceSlug[] = []): ServiceDetail[] {
  return slugs.map((slug) => getService(slug)).filter((s): s is ServiceDetail => Boolean(s));
}
