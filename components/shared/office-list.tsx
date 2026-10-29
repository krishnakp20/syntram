import { MapPin } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Company offices from lib/site.ts. Renders nothing until addresses are added. */
export function OfficeList({ className, compact = false }: { className?: string; compact?: boolean }) {
  const offices = siteConfig.offices;
  if (offices.length === 0) return null;

  return (
    <ul className={cn("grid gap-4", !compact && "sm:grid-cols-2", className)}>
      {offices.map((office) => (
        <li key={office.label} className={cn(!compact && "rounded-2xl border border-line bg-card p-5")}>
          <p className="flex items-center gap-2 font-medium text-foreground">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-signal" />
            {office.label}
          </p>
          <address className="mt-2 text-sm leading-relaxed not-italic text-muted-foreground">
            {office.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            {office.phone && (
              <a href={`tel:${office.phone}`} className="mt-1 block hover:text-foreground">
                {office.phone}
              </a>
            )}
          </address>
          {office.mapUrl && (
            <a
              href={office.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-signal hover:underline"
            >
              View on map<span className="sr-only"> ({office.label}, opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
