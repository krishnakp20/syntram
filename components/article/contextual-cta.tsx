import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/shared/button-link";
import { Icon } from "@/components/shared/icon";
import { getService } from "@/content/services";
import { getSolution } from "@/content/solutions";
import type { RelatedContent } from "@/types/content";

/**
 * In-article call to action pointing at the most relevant service or solution,
 * so readers can move from learning to doing without hunting through the nav.
 */
export function ContextualCta({ related, trackId }: { related?: RelatedContent; trackId: string }) {
  const service = related?.services?.[0] ? getService(related.services[0]) : undefined;
  const solution = !service && related?.solutions?.[0] ? getSolution(related.solutions[0]) : undefined;
  const target = service
    ? { href: `/services/${service.slug}`, title: service.title, summary: service.summary, icon: service.icon }
    : solution
      ? { href: `/solutions/${solution.slug}`, title: solution.title, summary: solution.summary, icon: solution.icon }
      : undefined;

  return (
    <aside
      aria-label="Work with Syntram"
      className="not-prose my-12 flex flex-col gap-5 rounded-2xl border border-signal/25 bg-signal-soft p-6 sm:flex-row sm:items-center sm:p-7"
    >
      {target && (
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-background text-signal">
          <Icon name={target.icon} className="size-6" />
        </span>
      )}
      <div className="flex-1">
        <p className="font-mono text-[0.6875rem] tracking-wider text-signal uppercase">
          {service ? "Related service" : solution ? "Related solution" : "Work with us"}
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-foreground">
          {target ? target.title : "Planning a project like this?"}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {target ? target.summary : "Talk to the engineers who build these systems."}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
        {target && (
          <ButtonLink href={target.href} size="cta" trackAs={`${trackId}_inline_explore`}>
            Learn more
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        )}
        <ButtonLink href="/contact" size="cta" variant="outline" trackAs={`${trackId}_inline_contact`}>
          Talk to an AI Engineer
        </ButtonLink>
      </div>
    </aside>
  );
}
