/** Contact form options — edit here to change what the form offers. */

export const serviceOptions = [
  "AI Development",
  "Voice AI",
  "Software Development",
  "Web Development",
  "Mobile Development",
  "Cloud & DevOps",
  "Automation",
  "Other",
] as const;

/**
 * Budget ranges in USD. TODO(Syntram): confirm currency and bands for your
 * market (e.g. switch to INR if most leads are domestic).
 */
export const budgetOptions = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
] as const;

/** What happens after someone submits — shown beside the form. */
export const nextSteps = [
  { title: "We read every message", body: "A member of our team reviews your enquiry — not an automated filter." },
  { title: "We reply with next steps", body: "Usually questions to understand your context, or times for a call." },
  { title: "A focused first conversation", body: "We discuss your goals and constraints and give you an honest view on approach and fit." },
];
