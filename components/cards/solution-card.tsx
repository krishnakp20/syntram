import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import type { SolutionSummary } from "@/types/content";

export function SolutionCard({ solution }: { solution: SolutionSummary }) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group reveal flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-colors hover:border-line-strong sm:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-signal-soft text-signal">
          <Icon name={solution.icon} className="size-6" />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 text-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
        />
      </div>
      <h3 className="mt-8 font-display text-xl font-semibold text-foreground">{solution.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{solution.summary}</p>
    </Link>
  );
}
