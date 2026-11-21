import { z } from "zod";

import { emailTypoMessage, isValidPhone, PHONE_ERROR } from "@/lib/validation";

export const experienceOptions = [
  "Fresher / Intern (0–1 year)",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8–10 years",
  "10+ years",
] as const;

export const RESUME_MAX_BYTES = 3 * 1024 * 1024;
export const RESUME_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

/** Text fields of a job application (the résumé file is checked separately). */
export const applicationSchema = z.object({
  role: z.string().trim().min(1).max(120),
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z
    .string()
    .trim()
    .max(254, "Please enter a valid email address.")
    .email("Please enter a valid email address.")
    .superRefine((v, ctx) => {
      const typo = emailTypoMessage(v);
      if (typo) ctx.addIssue({ code: "custom", message: typo });
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number we can reach you on.")
    .max(40, PHONE_ERROR)
    .refine(isValidPhone, PHONE_ERROR),
  experience: z.enum(experienceOptions, { message: "Please choose your experience." }),
  location: optionalText(120),
  profileUrl: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => !v || /^https?:\/\/\S+$/i.test(v), "Please enter a full link starting with https://"),
  message: optionalText(3000),
  // Spam traps
  website: z.string().max(0).optional(),
  startedAt: z.coerce.number(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export type ApplicationField = keyof ApplicationInput | "resume";

export interface ApplicationResult {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<ApplicationField, string>>;
}
