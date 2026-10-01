import { ArrowRight } from "lucide-react";

import { Icon, type IconName } from "@/components/shared/icon";
import { ButtonLink } from "@/components/shared/button-link";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";

const flow: { step: string; title: string; body: string; icon: IconName }[] = [
  { step: "Trigger", title: "Request arrives", body: "Email, form, call, ticket or a system event.", icon: "inbox" },
  { step: "Understand", title: "AI reads it", body: "Classifies intent and extracts the fields that matter.", icon: "brain" },
  { step: "Decide", title: "Rules & approvals", body: "Your policies run; people approve anything high-stakes.", icon: "list-checks" },
  { step: "Act", title: "Systems update", body: "CRM, ERP, helpdesk and messaging updated via API.", icon: "network" },
  { step: "Observe", title: "Logged & measured", body: "Every run is traceable, with failures surfaced for review.", icon: "activity" },
];

const examples = [
  "Route and pre-fill support tickets before an agent opens them",
  "Extract data from invoices, forms and IDs into your systems",
  "Follow up on leads across email, WhatsApp and calls",
  "Generate reports and summaries on a schedule",
];

export function AutomationSection() {
  return (
    <Section tone="surface" aria-labelledby="automation-title" className="border-y border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeader
            id="automation-title"
            eyebrow="Automation"
            title="Automate the work that happens between your systems"
            description="Most operational drag lives in hand-offs: copying data, checking rules, chasing updates. We design automations that do this reliably — with AI where judgement is needed and clear controls where it is not."
          />
          <ul className="flex flex-col gap-3 lg:pb-1">
            {examples.map((e) => (
              <li key={e} className="flex items-start gap-3 text-[0.9375rem] text-foreground">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Example automated workflow">
          {flow.map((f, i) => (
            <li
              key={f.step}
              className="reveal relative flex gap-4 rounded-2xl border border-line bg-card p-5 lg:flex-col lg:gap-0"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-signal-soft text-signal">
                <Icon name={f.icon} className="size-5" />
              </span>
              <div className="lg:mt-5">
                <p className="font-mono text-[0.6875rem] tracking-wider text-signal uppercase">
                  {String(i + 1).padStart(2, "0")} · {f.step}
                </p>
                <h3 className="mt-1.5 font-display text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
              {i < flow.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-[11px] z-10 hidden size-5 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-background text-signal lg:grid"
                >
                  <ArrowRight className="size-3" />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <ButtonLink href="/solutions/business-process-automation" variant="outline" trackAs="home_automation_cta">
            Our approach to automation
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
