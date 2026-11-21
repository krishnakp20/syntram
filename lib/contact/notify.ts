import "server-only";

import { isEmailConfigured, recipients, sendTeamMail } from "@/lib/mail";
import { siteConfig } from "@/lib/site";

import type { ContactSubmission } from "./schema";

/**
 * Team notification for a new lead. Delivery (GoDaddy SMTP or Resend) and the
 * required settings are described in lib/mail.ts. Enquiries go to the site's
 * contact email (info@zaybx.com); CONTACT_TO_EMAIL, if set, overrides it.
 */

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export { isEmailConfigured, recipients };

export async function sendLeadNotification(lead: ContactSubmission, leadId?: string): Promise<boolean> {
  if (!isEmailConfigured()) return false;

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Phone", lead.phone],
    ["Country", lead.country],
    ["Service", lead.service],
    ["Budget", lead.budget],
    ["Submitted from", lead.sourcePath],
    ["UTM", [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ") || undefined],
    ["Lead ID", leadId],
  ];

  const text = [
    `New enquiry from ${lead.name}`,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    lead.message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;color:#0b0e14;line-height:1.5">
      <h2 style="font-size:18px;margin:0 0 16px">New enquiry from ${escapeHtml(lead.name)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="color:#4a5466;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v!)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="font-size:14px;margin:20px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(lead.message)}</p>
    </div>`;

  return sendTeamMail({
    tag: "contact",
    replyTo: lead.email,
    subject: `New enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ""} — ${siteConfig.shortName}`,
    text,
    html,
  });
}
