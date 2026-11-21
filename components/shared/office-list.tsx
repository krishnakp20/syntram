import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { isPlaceholder, siteConfig, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const formatWhatsapp = (digits: string) =>
  digits.startsWith("91") && digits.length === 12 ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}` : `+${digits}`;

/** Company offices from lib/site.ts. The HQ card also lists email and WhatsApp. */
export function OfficeList({ className, compact = false }: { className?: string; compact?: boolean }) {
  const offices = siteConfig.offices;
  if (offices.length === 0) return null;
  const { email, whatsapp: whatsappNumber } = siteConfig.contact;
  const whatsapp = whatsappUrl();

  return (
    <ul className={cn("grid gap-4", !compact && "sm:grid-cols-2", className)}>
      {offices.map((office) => (
        <li
          key={office.label}
          className={cn(!compact && "rounded-2xl border bg-card p-5", !compact && (office.hq ? "border-signal/40" : "border-line"))}
        >
          <p className="flex items-center gap-2 font-medium text-foreground">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-signal" />
            {office.label}
            {office.hq && (
              <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[0.625rem] font-semibold tracking-wider text-primary-foreground uppercase">
                HQ<span className="sr-only"> (headquarters)</span>
              </span>
            )}
          </p>
          {office.note && (
            <p className="mt-2 font-mono text-[0.6875rem] font-medium tracking-wider text-signal uppercase">{office.note}</p>
          )}
          <address className="mt-2 flex flex-col gap-1 text-sm leading-relaxed not-italic text-muted-foreground">
            <span>
              {office.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            {office.phone && (
              <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Phone aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
                {office.phone}
              </a>
            )}
            {office.hq && !isPlaceholder(email) && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Mail aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
                {email}
              </a>
            )}
            {office.hq && whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <MessageCircle aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />
                WhatsApp {formatWhatsapp(whatsappNumber)}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </address>
        </li>
      ))}
    </ul>
  );
}
