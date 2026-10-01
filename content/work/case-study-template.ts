import type { CaseStudy } from "@/types/content";

/**
 * PLACEHOLDER — structural template only. Contains no real client, project or
 * result. Visible in development so the case study layout can be reviewed;
 * hidden in production builds. Copy this file to create a real case study.
 */
export const caseStudyTemplate: CaseStudy = {
  slug: "case-study-template",
  placeholder: true,
  title: "[Placeholder] Case study layout preview",
  summary:
    "This entry demonstrates the case study layout. Replace it with a real, client-approved project before publishing.",
  client: {
    name: "[Client name, or an anonymised description such as \"A regional clinic network\"]",
    anonymised: true,
  },
  industry: "healthcare",
  services: ["voice-ai", "api-integration"],
  solutions: ["voice-ai"],
  publishedAt: "2026-10-01",
  seo: {
    title: "Case Study Layout Preview (Placeholder)",
    description:
      "Placeholder entry used to preview the case study layout. It does not describe a real client or project and is not indexed by search engines.",
    noindex: true,
  },
  challenge:
    "[Describe the client's situation and the problem in their own terms: what was happening, who was affected and why it mattered. Avoid numbers the client has not confirmed.]",
  solution:
    "[Explain what was built and why this approach was chosen over alternatives. Link the solution back to the challenge described above.]",
  architecture: {
    description:
      "[Summarise how the system fits together: entry points, core services, integrations and where data flows. A diagram or screenshot can be added below.]",
    components: [
      "[Entry point, e.g. telephony or web app]",
      "[Core processing service]",
      "[Integration, e.g. CRM or scheduling system]",
      "[Data store / analytics]",
    ],
  },
  technology: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
  implementation: [
    { title: "[Phase 1]", description: "[What happened in this phase and what was learned.]" },
    { title: "[Phase 2]", description: "[What happened in this phase and what was learned.]" },
    { title: "[Phase 3]", description: "[What happened in this phase and what was learned.]" },
  ],
  results: [
    {
      label: "[Result]",
      description: "[Unverified results are never rendered. Set verified: true only after the client confirms the result in writing.]",
      verified: false,
    },
  ],
  screenshots: [],
};
