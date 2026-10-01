import * as z from "zod/mini";

import { budgetOptions, serviceOptions } from "@/content/contact";

/**
 * Contact form schema — shared by the client (instant feedback via React Hook
 * Form) and the server action (the real security boundary). Never trust the
 * client-side check alone.
 *
 * Uses `zod/mini` (tree-shakable functional API) rather than full Zod because
 * this schema ships to the browser: same validation, a fraction of the bundle.
 */

// Same pattern Zod uses for its built-in email check.
const EMAIL = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;
const PHONE = /^\+?[0-9\s().-]{6,40}$/;

const emptyToUndefined = <T,>(v: T | "" | undefined) => (v ? v : undefined);

const optionalText = (max: number) =>
  z.pipe(
    z.optional(z.string().check(z.trim(), z.maxLength(max, `Please keep this under ${max} characters`))),
    z.transform(emptyToUndefined),
  );

const optionalChoice = <const T extends readonly [string, ...string[]]>(options: T) =>
  z.pipe(z.optional(z.union([z.enum(options), z.literal("")])), z.transform(emptyToUndefined));

export const contactSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Please enter your name"),
      z.maxLength(120, "Please keep this under 120 characters"),
    ),
  company: optionalText(160),
  email: z
    .string()
    .check(z.trim(), z.toLowerCase(), z.maxLength(254), z.regex(EMAIL, "Please enter a valid email address")),
  phone: z.pipe(
    z.optional(
      z
        .string()
        .check(z.trim(), z.maxLength(40), z.refine((v) => !v || PHONE.test(v), "Please enter a valid phone number")),
    ),
    z.transform(emptyToUndefined),
  ),
  country: optionalText(80),
  service: optionalChoice(serviceOptions),
  budget: optionalChoice(budgetOptions),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(20, "Please tell us a little more (at least 20 characters)"),
      z.maxLength(5000, "Please keep your message under 5,000 characters"),
    ),

  // --- Anti-spam & attribution (hidden fields) ---
  /** Honeypot: humans never see or fill this field. */
  website: z.optional(z.string().check(z.maxLength(200))),
  /** Epoch ms when the form was rendered; used to reject instant bot submits. */
  startedAt: z.number().check(z.gte(0)),
  sourcePath: z.optional(z.string().check(z.maxLength(300))),
  utmSource: z.optional(z.string().check(z.maxLength(120))),
  utmMedium: z.optional(z.string().check(z.maxLength(120))),
  utmCampaign: z.optional(z.string().check(z.maxLength(160))),
});

/** Values as typed in the form (before transforms). */
export type ContactFormInput = z.input<typeof contactSchema>;
/** Values after validation and normalisation. */
export type ContactSubmission = z.output<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      /** Safe, human-readable message for the form. */
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFormInput, string>>;
    };
