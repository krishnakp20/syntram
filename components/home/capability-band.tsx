import { Icon, type IconName } from "@/components/shared/icon";
import { Container } from "@/components/shared/layout-primitives";

/**
 * "Trust" section. Syntram has no client logos approved for publication yet,
 * so this shows what we engineer instead of an invented logo wall. When real,
 * approved logos exist, render a <LogoCloud> above this band.
 */
const pillars: { title: string; body: string; icon: IconName }[] = [
  { title: "AI & LLM systems", body: "Agents, RAG and AI features built for production use.", icon: "brain" },
  { title: "Voice & telephony", body: "Real-time voice agents over phone and web.", icon: "audio-lines" },
  { title: "Software & cloud", body: "Web, mobile and backend platforms on modern infrastructure.", icon: "layers" },
  { title: "Integrations & data", body: "CRMs, ERPs and APIs connected reliably.", icon: "network" },
];

export function CapabilityBand() {
  return (
    <section aria-labelledby="capability-band-title" className="border-y border-line bg-surface">
      <Container className="py-12 sm:py-14">
        <h2 id="capability-band-title" className="text-center font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          One engineering team across the stack
        </h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <li key={p.title} className="flex gap-4 bg-surface p-5 sm:p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line-strong bg-background text-signal">
                <Icon name={p.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-[0.9375rem] font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
