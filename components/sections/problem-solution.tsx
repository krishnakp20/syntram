import { Check, X } from "lucide-react";

import { Container, Eyebrow, Section } from "@/components/shared/layout-primitives";
import type { NarrativeBlock } from "@/types/content";

/** Side-by-side "the problem" / "our approach" panels. */
export function ProblemSolution({ problem, solution }: { problem: NarrativeBlock; solution: NarrativeBlock }) {
  return (
    <Section aria-label="Challenge and approach">
      <Container className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
          <Eyebrow className="text-muted-foreground [&>span]:bg-subtle">The challenge</Eyebrow>
          <h2 className="mt-4 text-display-md font-semibold text-foreground">{problem.title}</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">{problem.body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {problem.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-foreground">
                <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-subtle" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-signal/25 bg-signal-soft p-6 sm:p-10">
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="mt-4 text-display-md font-semibold text-foreground">{solution.title}</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">{solution.body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {solution.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-foreground">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-signal" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
