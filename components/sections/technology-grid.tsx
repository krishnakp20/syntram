import { Icon } from "@/components/shared/icon";
import type { TechGroup } from "@/content/technology";
import { cn } from "@/lib/utils";

/** Reusable on the homepage and on service pages (pass a subset of groups). */
export function TechnologyGrid({ groups, className }: { groups: TechGroup[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {groups.map((group) => (
        <li key={group.title} className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center gap-3">
            <Icon name={group.icon} className="size-5 text-signal" />
            <h3 className="font-display text-base font-semibold text-foreground">{group.title}</h3>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-md border border-line bg-muted/60 px-2.5 py-1 font-mono text-xs text-foreground/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
