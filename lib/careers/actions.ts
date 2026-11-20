"use server";

import { createHash } from "node:crypto";

import { headers } from "next/headers";
import { Resend } from "resend";

import { recipients } from "@/lib/contact/notify";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

import {
  applicationSchema,
  RESUME_MAX_BYTES,
  RESUME_TYPES,
  type ApplicationField,
  type ApplicationResult,
} from "./schema";

const MIN_FILL_MS = 3_000;
const GENERIC_ERROR = `Sorry, we couldn't send your application right now. Please try again, or email your CV to ${siteConfig.contact.careersEmail}.`;
const TEXT_FIELDS = ["role", "name", "email", "phone", "experience", "location", "profileUrl", "message", "website", "startedAt"];

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function ipKey(): Promise<string> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const salt = process.env.LEAD_IP_SALT ?? "syntram-default-salt-change-me";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/**
 * Job application Server Action. Re-validates everything on the server and
 * emails the application, with the résumé attached, to the team inbox only.
 */
export async function submitApplication(formData: FormData): Promise<ApplicationResult> {
  const raw = Object.fromEntries(
    TEXT_FIELDS.map((k) => {
      const v = formData.get(k);
      return [k, typeof v === "string" ? v : undefined];
    }),
  );
  const parsed = applicationSchema.safeParse(raw);
  const fieldErrors: Partial<Record<ApplicationField, string>> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ApplicationField;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
  }

  const resume = formData.get("resume");
  const file = resume instanceof File && resume.size > 0 ? resume : undefined;
  if (!file) fieldErrors.resume = "Please attach your CV / résumé.";
  else if (!RESUME_TYPES[file.type]) fieldErrors.resume = "Please upload a PDF or Word document.";
  else if (file.size > RESUME_MAX_BYTES) fieldErrors.resume = "Your file is larger than 3 MB. Please upload a smaller file.";

  if (!parsed.success || !file || Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  // Spam traps: pretend success, send nothing.
  if (data.website) return { ok: true };
  if (Date.now() - data.startedAt < MIN_FILL_MS) return { ok: true };

  if (!rateLimit(`apply:${await ipKey()}`, 5, 30 * 60 * 1000).allowed) {
    return { ok: false, message: "You've sent several applications in a short time. Please wait a while and try again." };
  }

  const to = recipients();
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && to.length > 0);
  if (!configured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[careers] (dev) Application received; configure RESEND_API_KEY and CONTACT_FROM_EMAIL to deliver it:", {
        role: data.role,
        name: data.name,
        email: data.email,
        resume: `${file.name} (${file.size} bytes)`,
      });
      return { ok: true };
    }
    console.error("[careers] Email is not configured; application could not be delivered.");
    return { ok: false, message: GENERIC_ERROR };
  }

  const rows: [string, string | undefined][] = [
    ["Role", data.role],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Experience", data.experience],
    ["Location", data.location],
    ["LinkedIn / portfolio", data.profileUrl],
  ];
  const text = [
    `New application: ${data.role}`,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message ?? "(none)",
  ].join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;color:#0b0e14;line-height:1.5">
      <h2 style="font-size:18px;margin:0 0 16px">New application: ${escapeHtml(data.role)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .filter(([, v]) => v)
          .map(([k, v]) => `<tr><td style="color:#4a5466;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v!)}</td></tr>`)
          .join("")}
      </table>
      <h3 style="font-size:14px;margin:20px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message ?? "(none)")}</p>
    </div>`;

  const ext = RESUME_TYPES[file.type];
  const safeName = data.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 60) || "applicant";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to,
      replyTo: data.email,
      subject: `Application: ${data.role} - ${data.name}`,
      text,
      html,
      attachments: [{ filename: `CV-${safeName}.${ext}`, content: Buffer.from(await file.arrayBuffer()) }],
    });
    if (error) {
      console.error("[careers] Resend rejected application:", error.name, error.message);
      return { ok: false, message: GENERIC_ERROR };
    }
    return { ok: true };
  } catch (err) {
    console.error("[careers] Failed to send application:", err instanceof Error ? err.message : err);
    return { ok: false, message: GENERIC_ERROR };
  }
}
