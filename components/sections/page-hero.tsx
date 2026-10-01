import { Container, Eyebrow } from "@/components/shared/layout-primitives";
import { Breadcrumb } from "@/components/sections/breadcrumb";
import type { BreadcrumbItem } from "@/lib/jsonld";

interface PageHeroProps {
  breadcrumb: BreadcrumbItem[];
  eyebrow?: string;
  /** Rendered as the page's single H1. */
  title: string;
  intro: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
}

export function PageHero({ breadcrumb, eyebrow, title, intro, actions, aside }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-15%] h-[460px] w-[560px] rounded-full bg-signal/10 blur-[120px]"
      />
      <Container className="relative pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pb-24">
        <Breadcrumb items={breadcrumb} />
        <div className={aside ? "mt-10 grid items-start gap-12 lg:grid-cols-[1.25fr_1fr]" : "mt-10"}>
          <div className="flex max-w-3xl flex-col items-start">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 id="page-title" className="mt-4 text-display-lg font-semibold text-foreground">
              {title}
            </h1>
            <p className="mt-5 text-lead text-muted-foreground">{intro}</p>
            {actions && <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">{actions}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}
