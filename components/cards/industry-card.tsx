import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import type { IndustrySummary } from "@/types/content";

export function IndustryCard({ industry }: { industry: IndustrySummary }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group reveal flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong"
    >
      <div className="flex items-center justify-between">
        <Icon name={industry.icon} className="size-6 text-signal" />
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
        />
      </div>
      <h3 className="mt-8 font-display text-lg font-semibold text-foreground">{industry.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{industry.summary}</p>
    </Link>
  );
}
