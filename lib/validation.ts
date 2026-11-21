/**
 * Shared field checks for the contact and job application forms. Plain
 * functions (no Zod) so both the browser and the server use the same rules.
 */

/**
 * Phone numbers: digits with optional spaces, brackets, dots or dashes and an
 * optional leading "+".
 * - With "+" (international): 8–15 digits, the E.164 maximum.
 * - Without "+": an Indian number, 10 digits (a 6–9 mobile or a landline
 *   with STD code), optionally written with a leading 0 or 91.
 * Numbers made of one repeated digit (0000000000) are rejected.
 */
export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!/^\+?[0-9\s().-]+$/.test(v)) return false;
  if (v.indexOf("+") > 0) return false;

  const digits = v.replace(/\D/g, "");
  if (/^(\d)\1+$/.test(digits)) return false;

  if (v.startsWith("+")) return digits.length >= 8 && digits.length <= 15 && digits[0] !== "0";

  const local = digits.replace(/^(?:91|0)(?=\d{10}$)/, "");
  return /^[1-9]\d{9}$/.test(local);
}

export const PHONE_ERROR = "Please enter a valid phone number, e.g. +91 98765 43210";

/** Common misspellings of popular email domains → the intended domain. */
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.om": "gmail.com",
  "gnail.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlook.con": "outlook.com",
  "outlok.com": "outlook.com",
  "rediffmail.con": "rediffmail.com",
};

/** Returns the likely intended domain when the address has a known typo. */
export function emailDomainTypo(email: string): string | undefined {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return undefined;
  if (DOMAIN_TYPOS[domain]) return DOMAIN_TYPOS[domain];
  // Any domain ending in ".con" / ".cmo" is almost certainly ".com".
  const fixed = domain.replace(/\.(con|cmo|comm|vom|xom)$/, ".com");
  return fixed !== domain ? fixed : undefined;
}

export const emailTypoMessage = (email: string) => {
  const fix = emailDomainTypo(email);
  return fix ? `Check the address. Did you mean @${fix}?` : undefined;
};
