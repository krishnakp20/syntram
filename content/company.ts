/**
 * Company content for /careers, /gallery and /clients, plus footer
 * "Popular links". Everything here must be real and approved for publication.
 *
 * Empty lists are handled gracefully:
 *   - Careers: shows "no open roles" with a way to send a CV.
 *   - Gallery / Clients: hidden from navigation, and the pages return 404 in
 *     production until at least one item exists (visible in development so the
 *     layout can be reviewed).
 */

import type { NavLink } from "@/types/content";

/* ---------- Careers ---------- */

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface JobOpening {
  slug: string;
  title: string;
  department: string;
  location: string; // e.g. "Remote (India)", "Noida, India"
  type: EmploymentType;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** ISO date the role was posted. */
  postedAt: string;
}

/** TODO(Syntram): add current openings. */
export const jobOpenings: JobOpening[] = [];

/* ---------- Gallery ---------- */

export interface GalleryImage {
  src: string; // place files in /public/gallery/
  alt: string; // describe what's in the photo
  width: number;
  height: number;
  caption?: string;
  /** e.g. "Office", "Events", "Team" — used to group photos. */
  category?: string;
}

/** TODO(Syntram): add real photos you have permission to publish. */
export const galleryImages: GalleryImage[] = [];

/* ---------- Clients ---------- */

export interface Client {
  name: string;
  /** Logo in /public/clients/ — SVG or transparent PNG preferred. */
  logo?: string;
  url?: string;
  industry?: string;
}

/**
 * TODO(Syntram): only list clients who have agreed to be named publicly.
 * Never add a logo without permission.
 */
export const clients: Client[] = [];

/* ---------- Achievements ---------- */

export interface Achievement {
  /** Headline figure, e.g. "50+". Must be accurate and verifiable. */
  value: string;
  label: string;
}

/**
 * Shown as an "Achievements" slide in the homepage hero once non-empty.
 * TODO(Syntram): only add figures you can stand behind (projects delivered,
 * years in business, awards, certifications).
 */
export const achievements: Achievement[] = [];

/* ---------- Footer "Popular links" ---------- */

/**
 * Extra links for the footer (e.g. Staffing Services, group companies,
 * learning resources). External URLs open in a new tab.
 * TODO(Syntram): confirm labels and URLs before adding.
 */
export const popularLinks: NavLink[] = [];
