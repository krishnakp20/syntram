import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/cards/product-card";
import { ButtonLink } from "@/components/shared/button-link";
import { Icon } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { products } from "@/content/products";

/**
 * Products are not yet public. This section states that plainly rather than
 * describing features that do not exist. Once a product is published
 * (placeholder: false), it renders as a ProductCard here automatically.
 */
export function ProductsTeaser() {
  const published = products.filter((p) => !p.placeholder);

  return (
    <Section tone="surface" aria-labelledby="products-title" className="border-y border-line">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SectionHeader
          id="products-title"
          eyebrow="Products"
          title="Products built on the same stack"
          description="Alongside client work, we're developing our own platform products for voice AI and automation. Details will be published here as each product becomes available."
        />

        <div className="rounded-2xl border border-line-strong bg-card p-6 sm:p-8">
          {published.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-signal-soft text-signal">
                  <Icon name="package" className="size-5" />
                </span>
                <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
                  In development
                </span>
              </div>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-foreground">
                Interested in early access or a custom deployment? We&apos;re happy to talk about what we&apos;re
                building and whether it fits your needs.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/products" variant="outline" trackAs="home_products_view">
                  View products
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost" trackAs="home_products_talk">
                  Talk to our team
                  <ArrowRight aria-hidden="true" />
                </ButtonLink>
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-4">
              {published.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Section>
  );
}
