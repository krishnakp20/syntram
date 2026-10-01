import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import type { ServiceSummary } from "@/types/content";

/** Whole card is one link; the visible "Learn more" names the service for screen readers. */
export function ServiceCard({ service }: { service: ServiceSummary }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group reveal flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong"
    >
      <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-signal">
        <Icon name={service.icon} className="size-5" />
      </span>
      <h3 className="mt-6 font-display text-lg font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 mb-6 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-signal">
        Learn more<span className="sr-only"> about {service.title}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
