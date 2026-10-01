import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";
import type { LinkRef } from "@/types/content";

interface CtaBannerProps {
  title: string;
  description: string;
  primary: LinkRef;
  secondary?: LinkRef;
  /** Analytics prefix, e.g. "home_final". */
  trackId: string;
}

/** Closing call-to-action used at the end of most pages. Copy is contextual per page. */
export function CtaBanner({ title, description, primary, secondary, trackId }: CtaBannerProps) {
  return (
    <section aria-labelledby={`${trackId}-cta-title`} className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface px-6 py-14 text-center sm:px-12 lg:py-20">
          <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-signal/15 blur-[110px]"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 id={`${trackId}-cta-title`} className="text-display-lg font-semibold text-foreground">
              {title}
            </h2>
            <p className="mt-5 text-lead text-muted-foreground">{description}</p>
            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={primary.href} size="cta-lg" trackAs={`${trackId}_primary`}>
                {primary.label}
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} size="cta-lg" variant="outline" trackAs={`${trackId}_secondary`}>
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
