import { cn } from "@/lib/utils";
import type { UseCase } from "@/types/content";

export function UseCaseList({ useCases, className }: { useCases: UseCase[]; className?: string }) {
  return (
    <ol className={cn("grid gap-x-10 sm:grid-cols-2", className)}>
      {useCases.map((u, i) => (
        <li key={u.title} className="reveal border-t border-line-strong py-7">
          <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{u.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{u.description}</p>
        </li>
      ))}
    </ol>
  );
}
