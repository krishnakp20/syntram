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

/** TODO(ZAYBX): confirm location, type and role details for each opening. */
export const jobOpenings: JobOpening[] = [
  {
    slug: "website-development",
    title: "Website Developer",
    department: "Website Development",
    location: "Pune, India",
    type: "Full-time",
    summary:
      "Build fast, accessible and SEO-friendly websites and web apps for our clients and our own products, from first layout to production release.",
    responsibilities: [
      "Build responsive websites and web applications from designs",
      "Write clean, reusable front-end code and connect it to APIs and CMSs",
      "Keep sites fast, accessible and search-friendly",
      "Maintain and improve live client sites",
    ],
    requirements: [
      "Hands-on experience with HTML, CSS and JavaScript",
      "Experience with React or Next.js (TypeScript a plus)",
      "Comfortable with Git and working from designs",
      "A portfolio or links to websites you have built",
    ],
    postedAt: "2026-11-13",
  },
  {
    slug: "ai-tool-development",
    title: "AI Tool Developer",
    department: "AI Tools",
    location: "Pune, India",
    type: "Full-time",
    summary:
      "Design and build AI-powered tools — chatbots, voice agents and automation — that help businesses work faster, using modern LLMs and APIs.",
    responsibilities: [
      "Build AI tools and features using LLM APIs, prompts and retrieval",
      "Integrate AI into client systems such as CRMs, websites and telephony",
      "Test and measure how well AI features work, and improve them",
      "Document what you build so it can be supported and extended",
    ],
    requirements: [
      "Programming experience in Python or JavaScript/TypeScript",
      "Hands-on work with LLM APIs or AI frameworks",
      "Understanding of REST APIs and databases",
      "Projects or examples of AI tools you have built",
    ],
    postedAt: "2026-11-13",
  },
];

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

/** TODO(ZAYBX): add real photos you have permission to publish. */
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
 * TODO(ZAYBX): only list clients who have agreed to be named publicly.
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
 * TODO(ZAYBX): only add figures you can stand behind (projects delivered,
 * years in business, awards, certifications).
 */
export const achievements: Achievement[] = [];

/* ---------- Footer "Popular links" ---------- */

/**
 * Extra links for the footer (e.g. Staffing Services, group companies,
 * learning resources). External URLs open in a new tab.
 * TODO(ZAYBX): confirm labels and URLs before adding.
 */
export const popularLinks: NavLink[] = [];
