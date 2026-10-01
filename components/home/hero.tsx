import { ArrowRight } from "lucide-react";

import { HeroVisual } from "@/components/home/hero-visual";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";

const focusAreas = ["Voice AI agents", "LLM applications", "Workflow automation", "Product engineering"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Background: faint grid + a single soft signal glow. Purely decorative. */}
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[620px] rounded-full bg-signal/10 blur-[120px]"
      />

      <Container className="relative grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="flex flex-col items-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 py-1 pr-3 pl-1 text-[0.8125rem] text-muted-foreground">
            <span className="rounded-full bg-signal-soft px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wider text-signal uppercase">
              AI-first
            </span>
            Software engineering &amp; automation
          </p>

          <h1 id="hero-title" className="mt-6 text-display-xl font-semibold text-foreground">
            Build smarter.
            <br />
            Automate faster.
            <br />
            <span className="text-signal">Grow with AI.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lead text-muted-foreground">
            Syntram Technologies designs and builds AI-powered software, voice agents and automation
            platforms — so your business can operate smarter and scale without adding friction.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/contact" size="cta-lg" trackAs="hero_talk_to_expert">
              Talk to an Expert
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/solutions" size="cta-lg" variant="outline" trackAs="hero_explore_solutions">
              Explore Our Solutions
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground" aria-label="Focus areas">
            {focusAreas.map((area) => (
              <li key={area} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-signal" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
