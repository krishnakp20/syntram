"use server";

import { createHash } from "node:crypto";

import { headers } from "next/headers";

import { getDb } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

import { isEmailConfigured, sendLeadNotification } from "./notify";
import { contactSchema, type ContactFormInput, type ContactResult } from "./schema";

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 3_000;
/** Max submissions per IP per window. */
const IP_LIMIT = 5;
const IP_WINDOW_MS = 10 * 60 * 1000;

const GENERIC_ERROR =
  "Sorry — we couldn't send your message right now. Please try again in a few minutes, or email us directly.";

function hashIp(ip: string): string {
  const salt = process.env.LEAD_IP_SALT ?? "syntram-default-salt-change-me";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function clientInfo() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return { ipHash: hashIp(ip), userAgent: h.get("user-agent")?.slice(0, 400) ?? undefined };
}

/**
 * Contact form Server Action. This is the real security boundary: everything
 * is re-validated here regardless of what the browser checked. Next.js also
 * rejects cross-origin action calls (Origin vs Host check) automatically.
 */
export async function submitContact(input: ContactFormInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  // Spam traps: respond with "success" so bots learn nothing, but store nothing.
  if (data.website) return { ok: true };
  if (Date.now() - data.startedAt < MIN_FILL_MS) return { ok: true };

  const { ipHash, userAgent } = await clientInfo();

  // Rate limit — per instance in memory, plus a cross-instance DB check below.
  if (!rateLimit(`contact:${ipHash}`, IP_LIMIT, IP_WINDOW_MS).allowed) {
    return { ok: false, message: "You've sent several messages in a short time. Please wait a few minutes and try again." };
  }

  const db = getDb();
  let leadId: string | undefined;
  let stored = false;

  if (db) {
    try {
      const recent = await db.lead.count({
        where: { ipHash, createdAt: { gte: new Date(Date.now() - IP_WINDOW_MS) } },
      });
      if (recent >= IP_LIMIT) {
        return {
          ok: false,
          message: "You've sent several messages in a short time. Please wait a few minutes and try again.",
        };
      }
      const lead = await db.lead.create({
        data: {
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          country: data.country,
          service: data.service,
          budget: data.budget,
          message: data.message,
          sourcePath: data.sourcePath,
          utmSource: data.utmSource,
          utmMedium: data.utmMedium,
          utmCampaign: data.utmCampaign,
          ipHash,
          userAgent,
        },
        select: { id: true },
      });
      leadId = lead.id;
      stored = true;
    } catch (err) {
      console.error("[contact] Failed to store lead:", err instanceof Error ? err.message : err);
    }
  }

  const notified = await sendLeadNotification(data, leadId);

  if (stored && notified && db && leadId) {
    await db.lead.update({ where: { id: leadId }, data: { notificationSent: true } }).catch(() => undefined);
  }

  if (stored || notified) return { ok: true };

  // Neither a database nor email delivered the lead.
  if (!db && !isEmailConfigured() && process.env.NODE_ENV !== "production") {
    // Local development without services configured: log so the flow can be tested.
    console.info("[contact] (dev) Lead received — configure DATABASE_URL and/or RESEND_API_KEY to deliver it:", {
      name: data.name,
      email: data.email,
      service: data.service,
    });
    return { ok: true };
  }

  console.error("[contact] Lead could not be stored or delivered. Check DATABASE_URL / Resend configuration.");
  return { ok: false, message: GENERIC_ERROR };
}
