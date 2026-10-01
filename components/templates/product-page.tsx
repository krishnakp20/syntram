import { ArrowRight } from "lucide-react";

import { TrackView } from "@/components/analytics/track-view";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { RelatedLinks } from "@/components/sections/related-links";
import { UseCaseList } from "@/components/sections/use-case-list";
import { ButtonLink } from "@/components/shared/button-link";
import { Icon } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { productStatusLabel } from "@/content/products";
import type { ProductDetail } from "@/types/content";

/**
 * Template for /products/[slug]. Every content section is conditional, so a
 * product page only ever shows information that has actually been provided.
 */
export function ProductPage({ product }: { product: ProductDetail }) {
  const path = `/products/${product.slug}`;
  const track = `product_${product.slug.replace(/-/g, "_")}`;
  const ctaLabel = product.ctaLabel ?? "Talk to Our Team";
  const hasDetails = Boolean(product.overview || product.features?.length || product.useCases?.length);

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "Products", path: "/products" },
          { name: product.name, path },
        ]}
        eyebrow={product.placeholder ? "Product · placeholder" : `Product · ${productStatusLabel[product.status]}`}
        title={product.name}
        intro={product.tagline}
        actions={
          <ButtonLink href="/contact" size="cta-lg" trackAs={`${track}_hero`}>
            {ctaLabel}
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        }
        aside={
          product.placeholder ? (
            <PlaceholderNotice className="lg:mt-10">
              This page reserves the URL for a future product. No features or specifications have been published, so
              none are shown. It is hidden in production and excluded from search engines.
            </PlaceholderNotice>
          ) : undefined
        }
      />

      {product.overview && (
        <Section aria-labelledby="overview-title">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
            <SectionHeader id="overview-title" eyebrow="Overview" title={`About ${product.name}`} />
            <p className="text-lead text-muted-foreground">{product.overview}</p>
          </Container>
        </Section>
      )}

      {product.features && product.features.length > 0 && (
        <Section tone="light" aria-labelledby="features-title">
          <Container>
            <SectionHeader id="features-title" eyebrow="Features" title="What it does" />
            <FeatureGrid features={product.features} className="mt-12" />
          </Container>
        </Section>
      )}

      {product.useCases && product.useCases.length > 0 && (
        <Section aria-labelledby="use-cases-title">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
            <SectionHeader id="use-cases-title" eyebrow="Use cases" title="Who it's for" />
            <UseCaseList useCases={product.useCases} />
          </Container>
        </Section>
      )}

      {product.integrations && product.integrations.length > 0 && (
        <Section tone="surface" aria-labelledby="integrations-title" className="border-y border-line">
          <Container>
            <SectionHeader id="integrations-title" eyebrow="Integrations" title="Works with your stack" />
            <ul className="mt-10 flex flex-wrap gap-2">
              {product.integrations.map((i) => (
                <li key={i} className="rounded-lg border border-line bg-card px-3 py-1.5 font-mono text-sm text-foreground">
                  {i}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {!hasDetails && (
        <Section aria-labelledby="status-title">
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-line-strong bg-surface px-6 py-14 text-center sm:px-12">
              <span className="grid size-12 place-items-center rounded-xl bg-signal-soft text-signal">
                <Icon name="package" className="size-6" />
              </span>
              <h2 id="status-title" className="mt-6 text-display-md font-semibold text-foreground">
                Details coming soon
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                We&apos;ll publish full information about {product.name} when it&apos;s ready. If you&apos;d like to talk
                about early access or a custom deployment in the meantime, our team is happy to help.
              </p>
            </div>
          </Container>
        </Section>
      )}

      {product.faqs && <Faq faqs={product.faqs} title={`${product.name}: common questions`} />}

      {product.related && <RelatedLinks related={product.related} title="Related services and solutions" />}

      <TrackView event="product_view" params={{ product: product.slug }} />
      <CtaBanner
        trackId={track}
        title={`Interested in ${product.name}?`}
        description="Tell us what you're looking to achieve and we'll let you know how we can help — today and as the product develops."
        primary={{ label: ctaLabel, href: "/contact" }}
        secondary={{ label: "All products", href: "/products" }}
      />
    </>
  );
}
