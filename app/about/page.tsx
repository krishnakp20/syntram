import { ArrowRight } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/shared/button-link";
import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Syntram Technologies",
  description:
    "Syntram Technologies is an AI-first software engineering company building voice AI agents, automation platforms and the software that runs them.",
  path: "/about",
});

/*
 * Company facts (founding year, team size, locations, leadership, clients)
 * are deliberately absent until Syntram confirms them — see lib/site.ts.
 */

/** TODO(Syntram): review and approve the wording of both statements. */
const missionVision: { label: string; statement: string; detail: string; icon: IconName }[] = [
  {
    label: "Our mission",
    statement: "Make AI genuinely useful for business.",
    detail:
      "We build AI-powered software, voice agents and automation that work reliably in real operations — accurate, secure, integrated with the systems teams already use, and measured against the job they're meant to do.",
    icon: "target",
  },
  {
    label: "Our vision",
    statement: "Dependable AI for every business, not just the largest.",
    detail:
      "We see a future where organisations of any size can put trustworthy AI to work for their customers and teams — with people firmly in control and technology that keeps earning its place.",
    icon: "radar",
  },
];

const focusAreas: { title: string; body: string; icon: IconName }[] = [
  { title: "Voice AI", body: "Real-time voice agents for inbound and outbound calls, connected to business systems.", icon: "audio-lines" },
  { title: "AI & automation", body: "LLM applications, agents and automated workflows that handle real operational work.", icon: "sparkles" },
  { title: "Software engineering", body: "Web, mobile, cloud and integration work — the foundation AI features depend on.", icon: "code" },
];

const principles = [
  {
    title: "Useful over impressive",
    body: "We measure our work by whether it solves the problem it was built for, not by how advanced it sounds in a demo.",
  },
  {
    title: "Honest advice",
    body: "If AI isn't the right answer, or we aren't the right team, we'll say so. Trust matters more than any single project.",
  },
  {
    title: "Engineering discipline",
    body: "Testing, security, observability and documentation are part of the job — especially for systems that act on their own.",
  },
  {
    title: "People stay in control",
    body: "We design automation that hands over to humans gracefully and makes its decisions visible and reviewable.",
  },
  {
    title: "You own what we build",
    body: "Code, infrastructure and documentation belong to you, so you're never locked in.",
  },
  {
    title: "Long-term partnership",
    body: "Launch is a milestone, not the finish line. We support, measure and improve what we build.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ name: "About", path: "/about" }]}
        eyebrow="About Syntram"
        title="An AI-first engineering company, built for practical results"
        intro="Syntram Technologies designs and builds AI-powered software, voice agents and automation platforms. We combine modern AI with solid software engineering, so what we build works reliably in the real world — not just in a demo."
        actions={
          <ButtonLink href="/contact" size="cta-lg" trackAs="about_hero_talk">
            Talk to Our Team
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        }
      />

      <Section aria-labelledby="mission-vision-title">
        <Container>
          <h2 id="mission-vision-title" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {missionVision.map((block) => (
              <article
                key={block.label}
                className="flex flex-col rounded-3xl border border-line-strong bg-surface p-7 sm:p-10"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-signal-soft text-signal">
                  <Icon name={block.icon} className="size-6" />
                </span>
                <p className="mt-6 font-mono text-xs font-medium tracking-[0.14em] text-signal uppercase">
                  {block.label}
                </p>
                <h3 className="mt-3 text-display-md font-semibold text-foreground">{block.statement}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">{block.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="story-title" className="border-y border-line">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <SectionHeader id="story-title" eyebrow="About the company" title="Why Syntram exists" />
          <div className="flex flex-col gap-5 text-lead text-muted-foreground">
            <p>
              AI has become capable enough to answer calls, read documents, resolve requests and run parts of real
              business processes. The hard part is no longer the model — it&apos;s building the system around it so it
              is accurate, secure, integrated and dependable.
            </p>
            <p>
              That&apos;s the work we focus on: turning AI capability into software that teams rely on every day, and
              that customers find genuinely helpful.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="focus-title">
        <Container>
          <SectionHeader id="focus-title" eyebrow="What we do" title="Three areas, one team" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {focusAreas.map((f) => (
              <li key={f.title} className="rounded-2xl border border-line bg-card p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-signal-soft text-signal">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="principles-title">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.4fr]">
          <SectionHeader
            id="principles-title"
            eyebrow="How we work"
            title="The principles behind our work"
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <ol className="grid gap-x-10 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line-strong py-7">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBanner
        trackId="about"
        title="Let's see if we're a good fit"
        description="Tell us about your goals. We'll be straightforward about what we'd recommend and whether we're the right team to build it."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
