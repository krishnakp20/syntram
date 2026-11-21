import "server-only";

import nodemailer from "nodemailer";
import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

/**
 * Sends the site's notification emails (contact enquiries, job applications)
 * to the team inbox. Two ways to deliver, chosen by environment variables:
 *
 * 1. SMTP, e.g. the GoDaddy mailbox itself (checked first):
 *      SMTP_HOST, SMTP_PORT (587 or 465), SMTP_USER, SMTP_PASS
 *    Microsoft 365 from GoDaddy: smtp.office365.com, port 587
 *    GoDaddy Professional Email:  smtpout.secureserver.net, port 465
 *    The "from" address is SMTP_USER (mail servers reject other senders).
 *
 * 2. Resend: RESEND_API_KEY + CONTACT_FROM_EMAIL (on a verified domain).
 *
 * Only the team inbox is ever emailed — never the visitor — so the forms
 * can't be abused to send mail to other people.
 */

export interface MailMessage {
  /** Used in logs, e.g. "contact" or "careers". */
  tag: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: { filename: string; content: Buffer }[];
}

/** Inboxes that receive enquiries and job applications. */
export function recipients(): string[] {
  const configured = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.contact.email;
  return configured
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function mailTransport(): "smtp" | "resend" | null {
  if (recipients().length === 0) return null;
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) return "smtp";
  if (process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL) return "resend";
  return null;
}

export function isEmailConfigured(): boolean {
  return mailTransport() !== null;
}

/** Sends to the team inbox. Returns false (and logs why) if it couldn't be sent. */
export async function sendTeamMail(message: MailMessage): Promise<boolean> {
  const via = mailTransport();
  if (!via) return false;
  const to = recipients();

  try {
    if (via === "smtp") {
      const port = Number(process.env.SMTP_PORT || 587);
      const user = process.env.SMTP_USER!;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465, // 465 = SSL from the start; 587 = upgrade with STARTTLS
        requireTLS: port !== 465,
        auth: { user, pass: process.env.SMTP_PASS },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      });
      await transporter.sendMail({
        from: { name: `${siteConfig.shortName} Website`, address: user },
        to,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: message.attachments,
      });
      return true;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
      attachments: message.attachments,
    });
    if (error) {
      console.error(`[${message.tag}] Resend rejected the email:`, error.name, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[${message.tag}] Failed to send email via ${via}:`, err instanceof Error ? err.message : err);
    return false;
  }
}
