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
  location: string; // e.g. "Remote", "Pune, India"
  /** One or more, shown joined with " / ". */
  type: EmploymentType[];
  /** e.g. "5–8 years". */
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** ISO date the role was posted. */
  postedAt: string;
}

/** TODO(ZAYBX): review role details for each opening. */
const remote = "Remote";
const flexible: EmploymentType[] = ["Full-time", "Part-time"];

export const jobOpenings: JobOpening[] = [
  {
    slug: "app-tech-manager",
    title: "Application Technology Manager",
    department: "Engineering Leadership",
    location: remote,
    type: flexible,
    experience: "8–10 years",
    summary:
      "Lead the delivery of our client applications and AI products — owning architecture, engineering quality and the teams that build them.",
    responsibilities: [
      "Own technical delivery across multiple application and AI projects",
      "Set architecture, coding standards and release practices",
      "Lead, mentor and grow developers and team leads",
      "Work with clients to shape scope, estimates and roadmaps",
      "Manage risks, timelines and engineering quality",
    ],
    requirements: [
      "8–10 years in software development, including team or delivery leadership",
      "Strong background in web or mobile application architecture",
      "Experience with cloud platforms, APIs and databases",
      "Exposure to AI/ML or LLM-based products is a strong plus",
      "Excellent communication with clients and teams",
    ],
    postedAt: "2026-11-20",
  },
  {
    slug: "app-lead-python-ai",
    title: "Application Lead — Python & AI",
    department: "AI Engineering",
    location: remote,
    type: flexible,
    experience: "5–8 years",
    summary:
      "Lead a team building Python back-ends and AI features — LLM applications, voice agents and automation — from design to production.",
    responsibilities: [
      "Design and build Python services and AI features",
      "Lead a small team through design, code review and delivery",
      "Build LLM applications with retrieval, tools and evaluation",
      "Integrate AI into client systems through APIs",
      "Keep services secure, observable and well tested",
    ],
    requirements: [
      "5–8 years of software development, mostly in Python",
      "Experience with FastAPI, Django or Flask",
      "Hands-on work with LLM APIs, embeddings or ML frameworks",
      "Solid SQL/NoSQL database and REST API skills",
      "Experience leading or mentoring developers",
    ],
    postedAt: "2026-11-20",
  },
  {
    slug: "database-administrator",
    title: "Database Administrator (DBA)",
    department: "Infrastructure",
    location: remote,
    type: flexible,
    experience: "3–6 years",
    summary:
      "Keep our and our clients' databases fast, secure and reliable — from performance tuning and backups to migrations and monitoring.",
    responsibilities: [
      "Administer, monitor and tune production databases",
      "Plan and test backups, recovery and high availability",
      "Manage access, security and data protection",
      "Support developers with schema design and query optimisation",
      "Run upgrades and migrations with minimal downtime",
    ],
    requirements: [
      "3–6 years as a DBA or in a database-focused role",
      "Strong experience with MySQL and/or PostgreSQL",
      "Backup, replication and performance tuning skills",
      "Scripting for automation (Shell, Python or similar)",
      "Cloud database experience (AWS RDS, GCP or Azure) is a plus",
    ],
    postedAt: "2026-11-20",
  },
  {
    slug: "website-development",
    title: "Website Developer",
    department: "Website Development",
    location: remote,
    type: flexible,
    experience: "1–5 years · Freshers & interns (0–1 year) welcome",
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
      "Freshers and interns: projects or a portfolio that show your skills",
    ],
    postedAt: "2026-11-13",
  },
  {
    slug: "ai-tool-development",
    title: "AI Tool Developer",
    department: "AI Tools",
    location: remote,
    type: flexible,
    experience: "1–5 years · Freshers & interns (0–1 year) welcome",
    summary:
      "Design and build AI-powered tools — chatbots, voice agents and automation — that help businesses work faster, using modern LLMs and APIs.",
    responsibilities: [
      "Build AI tools and features using LLM APIs, prompts and retrieval",
      "Integrate AI into client systems such as CRMs, websites and telephony",
      "Test and measure how well AI features work, and improve them",
      "Document what you build so it can be supported and extended",
    ],
    requirements: [
      "Programming in Python or JavaScript/TypeScript",
      "Hands-on work with LLM APIs or AI frameworks",
      "Understanding of REST APIs and databases",
      "Freshers and interns: projects or examples of AI tools you have built",
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
export const clients: Client[] = [{ name: "Gujarat Sales" }];

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
export const popularLinks: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Staffing Services", href: "/services/staffing-services" },
  { label: "Now taking projects", href: "/contact" },
];
