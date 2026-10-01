import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types/content";

export function ProcessSteps({ steps, className }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="reveal relative rounded-2xl border border-line bg-card p-6">
          <span className="font-mono text-xs text-signal">Step {String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-base font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
