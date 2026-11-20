import { ArrowRight } from "lucide-react";

import { getHeroSlides } from "@/components/home/hero-slides";
import { HeroSlider } from "@/components/home/hero-slider";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";
import { AiCore } from "@/components/visuals/ai-core";

/**
 * Homepage hero: headline and CTAs on the left, an animated "AI core" on the
 * right (stacked on phones), and a large rotating "highlights" box beneath.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Background: faint grid + soft signal glows. Purely decorative. */}
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-signal/10 blur-[130px]"
      />

      <Container className="relative pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 py-1 pr-3 pl-1 text-[0.8125rem] text-muted-foreground">
              <span className="rounded-full bg-signal-soft px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wider text-signal uppercase">
                AI-first
              </span>
              Software engineering &amp; automation
            </p>

            <h1
              id="hero-title"
              className="mt-6 text-[clamp(2.375rem,1.5rem+3.2vw,4rem)] leading-[1.04] font-semibold tracking-[-0.026em] text-foreground"
            >
              Build smarter. Automate faster. <span className="text-signal">Grow with AI.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lead text-muted-foreground">
              ZAYBX designs and builds AI-powered software, voice agents and automation
              platforms — so your business can operate smarter and scale without adding friction.
            </p>

            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
              <ButtonLink href="/contact" size="cta-lg" trackAs="hero_talk_to_expert">
                Talk to an Expert
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/solutions" size="cta-lg" variant="outline" trackAs="hero_explore_solutions">
                Explore Our Solutions
              </ButtonLink>
            </div>
          </div>

          {/* Animated "AI core": inputs flow into the orb, results flow out. Decorative. */}
          <AiCore className="mx-auto aspect-[1/0.86] w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[560px]" />
        </div>

        <div className="mx-auto mt-12 max-w-6xl lg:mt-14">
          <HeroSlider slides={getHeroSlides()} />
        </div>
      </Container>
    </section>
  );
}
