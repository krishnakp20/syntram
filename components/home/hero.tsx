import { ArrowRight } from "lucide-react";

import { getHeroSlides } from "@/components/home/hero-slides";
import { HeroSlider } from "@/components/home/hero-slider";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";
import { NeonSign } from "@/components/visuals/neon-sign";

/** Dark "wall" behind the neon sign: faint vertical panel seams over a soft fade. */
const wallStyle = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.018) 0 1px, transparent 1px 140px), linear-gradient(to bottom, #070a12 0%, #000002 100%)",
} as const;

/**
 * Homepage hero: a dark band with a glowing "Grow with AI" neon sign and the
 * centred headline and CTAs beneath it, followed by the large rotating
 * "highlights" box on the light page background.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="theme-dark theme-logo relative overflow-hidden" style={wallStyle}>
        <div className="relative mx-auto max-w-6xl px-2 pt-6 sm:px-6 sm:pt-10 lg:pt-12">
          <NeonSign className="mx-auto h-auto w-full max-w-5xl" />
        </div>

        <Container className="relative pt-4 pb-14 sm:pt-6 sm:pb-16 lg:pb-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 py-1 pr-3 pl-1 text-[0.8125rem] text-muted-foreground">
              <span className="rounded-full bg-signal-soft px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wider text-signal uppercase">
                AI-first
              </span>
              Software engineering &amp; automation
            </p>

            <h1
              id="hero-title"
              className="mt-6 text-[clamp(2.25rem,1.4rem+3.4vw,4rem)] leading-[1.05] font-semibold tracking-[-0.026em] text-foreground"
            >
              Build smarter. Automate faster.
              {/* The neon sign says this visually; keep it in the heading for screen readers and search. */}
              <span className="sr-only"> Grow with AI.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              ZAYBX designs and builds AI-powered software, voice agents and automation
              platforms — so your business can operate smarter and scale without adding friction.
            </p>

            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/contact" size="cta-lg" trackAs="hero_talk_to_expert">
                Talk to an Expert
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/solutions" size="cta-lg" variant="outline" trackAs="hero_explore_solutions">
                Explore Our Solutions
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
        <Container className="relative pt-12 pb-16 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <HeroSlider slides={getHeroSlides()} />
          </div>
        </Container>
      </div>
    </section>
  );
}
