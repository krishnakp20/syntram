import type { NavEntry, NavGroup } from "@/types/content";

/**
 * Navigation helpers that are safe to import from Client Components.
 * Keep this module free of content imports: anything imported here ships to
 * the browser (content/navigation.ts pulls in every service/industry page).
 */
export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}
