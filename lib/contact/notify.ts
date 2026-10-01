import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

import type { ContactSubmission } from "./schema";

/**
 * Team notification for a new lead, sent through Resend.
 *
 * Only ever emails the configured team address — never the submitter — so
 * the form can't be abused to send mail to arbitrary people.
 * Required env: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * (the "from" domain must be verified in Resend).
 */

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

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

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
      replyTo: lead.email,
      subject: `New enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ""} — ${siteConfig.shortName}`,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend rejected notification:", error.name, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Failed to send notification:", err instanceof Error ? err.message : err);
    return false;
  }
}
