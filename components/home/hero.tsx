import { ArrowRight } from "lucide-react";

import { getHeroSlides } from "@/components/home/hero-slides";
import { HeroSlider } from "@/components/home/hero-slider";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";
import { NeuralField } from "@/components/visuals/neural-field";

/**
 * Fades the neural field out behind the headline (centre) and towards the
 * slider (bottom), so it frames the text without competing with it.
 */
const fieldMask = {
  maskImage:
    "radial-gradient(ellipse 34% 44% at 50% 44%, transparent 30%, black 95%), linear-gradient(to bottom, black 60%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "radial-gradient(ellipse 34% 44% at 50% 44%, transparent 30%, black 95%), linear-gradient(to bottom, black 60%, transparent 100%)",
  WebkitMaskComposite: "source-in",
} as const;

/**
 * Homepage hero: centred headline and CTAs, with a large rotating "highlights"
 * box beneath (services, products and — once supplied — achievements).
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
      {/* Animated AI "neural field" framing the headline (hidden on phones, where text spans the width). */}
      <NeuralField
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[600px] w-full sm:block lg:h-[640px]"
        style={fieldMask}
      />

      <Container className="relative pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 py-1 pr-3 pl-1 text-[0.8125rem] text-muted-foreground">
            <span className="rounded-full bg-signal-soft px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wider text-signal uppercase">
              AI-first
            </span>
            Software engineering &amp; automation
          </p>

          <h1 id="hero-title" className="mt-6 text-display-xl font-semibold text-foreground">
            Build smarter. Automate faster. <span className="text-signal">Grow with AI.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
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

        <div className="mx-auto mt-12 max-w-6xl lg:mt-14">
          <HeroSlider slides={getHeroSlides()} />
        </div>
      </Container>
    </section>
  );
}
