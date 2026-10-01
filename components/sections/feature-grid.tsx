import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types/content";

export function FeatureGrid({ features, className }: { features: Feature[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {features.map((f) => (
        <li key={f.title} className="reveal rounded-2xl border border-line bg-card p-6">
          {f.icon && (
            <span className="grid size-10 place-items-center rounded-lg bg-signal-soft text-signal">
              <Icon name={f.icon} className="size-5" />
            </span>
          )}
          <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
        </li>
      ))}
    </ul>
  );
}
