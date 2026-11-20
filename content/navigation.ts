import { clients, galleryImages, popularLinks } from "@/content/company";
import { industries } from "@/content/industries";
import { getVisibleProducts } from "@/content/products";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { showPlaceholders } from "@/lib/content/visibility";
import type { IndustrySlug, NavEntry, NavLink, ServiceSlug } from "@/types/content";

/** Short one-line descriptions for the Services mega-menu (page summaries are too long there). */
const serviceNavBlurbs: Record<ServiceSlug, string> = {
  "ai-development": "LLM apps, AI agents and tools built on your data.",
  "voice-ai": "Voice agents that answer, act and hand off to people.",
  "custom-software-development": "Platforms and business systems built around your team.",
  "web-development": "Fast, search-friendly websites and web apps.",
  "mobile-app-development": "iOS and Android apps with a solid backend.",
  "api-integration": "Connect your CRM, ERP, telephony and other tools.",
  "cloud-devops": "Cloud setup, CI/CD and monitoring you can rely on.",
  "qa-testing": "Automated testing and release checks, AI included.",
  "staffing-services": "Developers and IT specialists on contract or full-time.",
};

/** Short one-line descriptions for the Industries mega-menu. */
const industryNavBlurbs: Record<IndustrySlug, string> = {
  fintech: "Onboarding, collections and compliant support.",
  healthcare: "Appointments, patient calls and admin automation.",
  ecommerce: "Order support, returns and conversational sales.",
  "real-estate": "Lead qualification and site-visit scheduling.",
  education: "Admissions enquiries and student support.",
  logistics: "Shipment updates and delivery coordination.",
  travel: "Booking help, changes and multilingual support.",
};

export const primaryCta: NavLink = { label: "Let's Talk", href: "/contact" };

/** Clients and Gallery appear only once they have real content (or in dev preview). */
export const showClientsPage = clients.length > 0 || showPlaceholders;
export const showGalleryPage = galleryImages.length > 0 || showPlaceholders;

const aboutNavEntry: NavEntry = {
  label: "About",
  href: "/about",
  intro: "Who we are, what we stand for and how to join us.",
  items: [
    { label: "About ZAYBX", href: "/about", description: "Our mission, vision and how we work.", icon: "users" },
    ...(showClientsPage
      ? [{ label: "Our Clients", href: "/clients", description: "Organisations we work with.", icon: "handshake" as const }]
      : []),
    { label: "Careers", href: "/careers", description: "Open roles and life at ZAYBX.", icon: "target" },
    ...(showGalleryPage
      ? [{ label: "Gallery", href: "/gallery", description: "Our team, workplace and events.", icon: "layers" as const }]
      : []),
    { label: "Contact", href: "/contact", description: "Start a conversation with our team.", icon: "messages" },
  ],
};

/** A mega-menu when products are visible; otherwise a plain link to /products. */
function productsNavEntry(): NavEntry {
  const visible = getVisibleProducts();
  if (visible.length === 0) return { label: "Products", href: "/products" };
  return {
    label: "Products",
    href: "/products",
    intro: "Platform products built on the ZAYBX voice and automation stack.",
    items: visible.map((p) => ({
      label: p.name,
      href: `/products/${p.slug}`,
      description: p.placeholder ? "Placeholder — details to be announced" : p.tagline,
      icon: p.icon,
    })),
  };
}

export const mainNav: NavEntry[] = [
  aboutNavEntry,
  {
    label: "Solutions",
    href: "/solutions",
    intro: "Outcome-focused AI and automation for real business workflows.",
    items: solutions.map((s) => ({
      label: s.title,
      href: `/solutions/${s.slug}`,
      description: s.summary,
      icon: s.icon,
    })),
  },
  {
    label: "Services",
    href: "/services",
    intro: "Engineering services across AI, voice, software and cloud.",
    items: services.map((s) => ({
      label: s.shortTitle,
      href: `/services/${s.slug}`,
      description: serviceNavBlurbs[s.slug],
      icon: s.icon,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    intro: "Applied expertise for the sectors we build for.",
    items: industries.map((i) => ({
      label: i.title,
      href: `/industries/${i.slug}`,
      description: industryNavBlurbs[i.slug],
      icon: i.icon,
    })),
  },
  productsNavEntry(),
  { label: "Work", href: "/work" },
  {
    label: "Resources",
    href: "/resources",
    intro: "Practical writing on voice AI, agents and automation.",
    items: [
      { label: "Blog", href: "/blog", description: "Articles and engineering notes.", icon: "newspaper" },
      { label: "Guides", href: "/guides", description: "In-depth, practical how-tos.", icon: "book-open" },
      { label: "All resources", href: "/resources", description: "Everything in one place.", icon: "layers" },
    ],
  },
];

export { isNavGroup } from "@/lib/nav";

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  },
  {
    title: "Solutions",
    links: solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Industries",
    links: industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      ...(showClientsPage ? [{ label: "Our Clients", href: "/clients" }] : []),
      { label: "Careers", href: "/careers" },
      ...(showGalleryPage ? [{ label: "Gallery", href: "/gallery" }] : []),
      { label: "Work", href: "/work" },
      { label: "Products", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  ...(popularLinks.length > 0 ? [{ title: "Popular links", links: popularLinks }] : []),
];
