import { AudioLines, BrainCircuit, Check, Database, Volume2 } from "lucide-react";

/**
 * Illustrative "live voice session" panel. It shows how a call becomes
 * structured actions. The transcript and log lines are an example interaction,
 * not customer data or performance claims.
 *
 * Server-rendered HTML/CSS only: no JS, no images, so it never delays LCP. All
 * motion uses `motion-safe:`, so it renders as a complete static composition
 * when reduced motion is requested.
 */

// Deterministic bar heights (percent) so SSR output is stable.
const bars = [28, 46, 64, 38, 72, 90, 56, 34, 62, 84, 48, 30, 58, 76, 92, 66, 40, 54, 80, 60, 36, 50, 70, 44, 26, 52, 68, 42, 32, 24];

const stages = [
  { label: "Speech-to-text", Icon: AudioLines },
  { label: "Reasoning", Icon: BrainCircuit },
  { label: "Actions", Icon: Database },
  { label: "Voice reply", Icon: Volume2 },
];

const log = [
  { kind: "ok", key: "intent", value: "reschedule_appointment" },
  { kind: "ok", key: "calendar", value: "find_slots(day=thu)" },
  { kind: "run", key: "crm", value: "update_contact(notes)" },
] as const;

/** `floating={false}` drops the overhanging side cards (used inside the hero slider). */
export function HeroVisual({ floating = true }: { floating?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end" role="img" aria-label="Illustration: a voice AI agent turning a phone call into transcribed speech, reasoning, system actions and a spoken reply.">
      <div aria-hidden="true" className="relative rounded-2xl border border-line-strong bg-surface/90 shadow-[0_30px_80px_-30px_rgb(15_23_42/0.25)] backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            <span className="font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
              Live session · inbound call
            </span>
          </div>
          <span className="font-mono text-[0.6875rem] text-subtle">example</span>
        </div>

        <div className="flex flex-col gap-5 p-4 sm:p-5">
          {/* Waveform */}
          <div className="flex h-14 items-center gap-[3px] rounded-xl border border-line bg-background/60 px-3">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-full origin-center rounded-full bg-linear-to-t from-signal/40 to-signal motion-safe:animate-wave"
                style={{ height: `${h}%`, animationDelay: `${(i % 10) * 90}ms` }}
              />
            ))}
          </div>

          {/* Transcript */}
          <div className="flex flex-col gap-2.5 text-[0.8125rem] leading-relaxed sm:text-sm">
            <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-line bg-surface-raised px-3.5 py-2.5 text-foreground">
              <span className="mb-0.5 block font-mono text-[0.625rem] tracking-wider text-subtle uppercase">Caller</span>
              Hi — can I move my appointment to Thursday?
            </div>
            <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm border border-signal/25 bg-signal-soft px-3.5 py-2.5 text-foreground">
              <span className="mb-0.5 block font-mono text-[0.625rem] tracking-wider text-signal uppercase">Voice agent</span>
              Of course. Thursday has 11:30 or 3:00 free — which suits you?
            </div>
          </div>

          {/* Pipeline */}
          <div className="relative">
            <svg className="absolute inset-x-6 top-[18px] h-px w-[calc(100%-3rem)] overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100%" y2="0" className="stroke-line-strong" strokeWidth="1" />
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                className="stroke-signal motion-safe:animate-flow"
                strokeWidth="1.25"
                strokeDasharray="4 12"
              />
            </svg>
            <ol className="relative grid grid-cols-4 gap-2">
              {stages.map(({ label, Icon }) => (
                <li key={label} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid size-9 place-items-center rounded-lg border border-line-strong bg-surface-raised text-signal">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.6875rem] leading-tight text-muted-foreground sm:text-xs">{label}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action log */}
          <div className="rounded-xl border border-line bg-background/70 p-3 font-mono text-[0.6875rem] leading-6 sm:text-xs">
            {log.map((line) => (
              <div key={line.key} className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                {line.kind === "ok" ? (
                  <Check className="size-3.5 shrink-0 text-signal" strokeWidth={2.5} />
                ) : (
                  <span className="size-3.5 shrink-0 text-center text-signal motion-safe:animate-pulse-soft">›</span>
                )}
                <span className="text-subtle">{line.key}</span>
                <span className="truncate text-foreground">{line.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating detail cards — larger screens only */}
      {floating && (
        <>
          <div
            aria-hidden="true"
            className="absolute -right-3 -bottom-8 hidden w-48 rounded-xl border border-line-strong bg-surface-raised/95 p-3.5 shadow-xl backdrop-blur sm:block lg:-right-6"
          >
            <p className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">Handoff</p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-foreground">
              Routes to a person with full context when needed
            </p>
          </div>
          <div
            aria-hidden="true"
            className="absolute -top-5 -right-3 hidden rounded-xl border border-line-strong bg-surface-raised/95 px-3.5 py-2.5 shadow-xl backdrop-blur sm:block lg:-right-6"
          >
            <p className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">Integrations</p>
            <p className="mt-1 flex gap-1.5 text-[0.75rem] text-foreground">
              {["CRM", "Calendar", "API"].map((t) => (
                <span key={t} className="rounded-md border border-line px-1.5 py-0.5">
                  {t}
                </span>
              ))}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
