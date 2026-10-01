import { ArrowRight } from "lucide-react";

import { Icon, type IconName } from "@/components/shared/icon";
import { ButtonLink } from "@/components/shared/button-link";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";

const pipeline: { title: string; body: string; icon: IconName }[] = [
  { title: "Customer", body: "Calls your number or starts a voice session on the web.", icon: "phone-incoming" },
  { title: "Voice AI gateway", body: "Streams audio in real time, detects speech and handles interruptions.", icon: "audio-lines" },
  { title: "Speech recognition", body: "Transcribes as the caller speaks, tuned for names, accents and your terminology.", icon: "mic" },
  { title: "LLM reasoning", body: "Understands intent, keeps context across the call and decides the next step.", icon: "brain" },
  { title: "Business logic", body: "Applies your rules — eligibility, availability, policies and escalation paths.", icon: "split" },
  { title: "CRM · API · Database", body: "Reads and writes real records: bookings, tickets, orders and notes.", icon: "database" },
  { title: "Voice response", body: "Replies in natural speech, streamed back while the conversation continues.", icon: "messages" },
];

const capabilities: { label: string; icon: IconName }[] = [
  { label: "Inbound AI agents", icon: "phone-incoming" },
  { label: "Outbound AI agents", icon: "phone-outgoing" },
  { label: "Customer support", icon: "headset" },
  { label: "Sales calls", icon: "target" },
  { label: "Appointment booking", icon: "calendar-check" },
  { label: "Lead qualification", icon: "user-check" },
  { label: "Call routing", icon: "route" },
  { label: "Call analytics", icon: "bar-chart" },
  { label: "Call quality monitoring", icon: "radar" },
  { label: "Human handoff", icon: "handshake" },
  { label: "CRM integration", icon: "plug" },
  { label: "Multilingual voice AI", icon: "languages" },
];

const STEP_SECONDS = 1.1;

export function VoiceAiFeature() {
  const cycle = pipeline.length * STEP_SECONDS;

  return (
    <Section aria-labelledby="voice-ai-title" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-[420px] w-[520px] rounded-full bg-signal/8 blur-[120px]"
      />

      <Container className="relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeader
            id="voice-ai-title"
            eyebrow="Voice AI"
            title="Voice agents that listen, reason and get things done"
            description="A good voice agent is more than speech in and speech out. It is a real-time system that understands the caller, works inside your business rules and updates your systems before the call ends — and knows when to bring in a person."
          />

          <h3 className="mt-12 font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
            What we build
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 min-[420px]:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.label} className="flex items-center gap-3 text-[0.9375rem] text-foreground">
                <Icon name={c.icon} className="size-4 shrink-0 text-signal" />
                {c.label}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services/voice-ai" size="cta-lg" trackAs="home_explore_voice_ai">
              Explore Voice AI
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" size="cta-lg" variant="outline" trackAs="home_voice_talk_engineer">
              Talk to an AI Engineer
            </ButtonLink>
          </div>
        </div>

        {/* Pipeline */}
        <figure className="relative rounded-3xl border border-line-strong bg-surface/80 p-5 backdrop-blur sm:p-8">
          <figcaption className="flex items-center justify-between gap-4 border-b border-line pb-5">
            <span className="font-display text-base font-semibold text-foreground">How a voice agent handles a call</span>
            <span className="hidden font-mono text-[0.6875rem] tracking-wider text-subtle uppercase sm:inline">
              Real-time loop
            </span>
          </figcaption>

          <ol className="relative mt-6 flex flex-col">
            {/* connector */}
            <span aria-hidden="true" className="absolute top-5 bottom-5 left-5 w-px bg-line-strong" />
            {pipeline.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 pb-5 last:pb-0 sm:gap-5">
                <span
                  aria-hidden="true"
                  className="relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-surface-raised text-signal motion-safe:[animation:stage-glow_var(--cycle)_ease-in-out_infinite]"
                  style={
                    {
                      "--cycle": `${cycle}s`,
                      animationDelay: `${i * STEP_SECONDS}s`,
                    } as React.CSSProperties
                  }
                >
                  <Icon name={step.icon} className="size-[1.125rem]" />
                </span>
                <div className="pt-1.5">
                  <p className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.6875rem] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[0.9875rem] font-semibold text-foreground">{step.title}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-line bg-background/60 p-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
            <Icon name="handshake" className="mt-0.5 size-4 shrink-0 text-signal" />
            At any step, the agent can transfer to a human with the transcript and context attached — so callers never
            repeat themselves.
          </p>
        </figure>
      </Container>
    </Section>
  );
}
