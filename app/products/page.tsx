import { ProductCard } from "@/components/cards/product-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { getVisibleProducts } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Voice AI & Automation Products",
  description:
    "Syntram Technologies is developing platform products for voice AI and business automation. See what's available and talk to us about early access.",
  path: "/products",
});

/** How products relate to services — principles, not product claims. */
const approach: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Built from real projects",
    body: "Our products grow out of patterns we see repeatedly in client work, so they solve problems businesses actually have.",
    icon: "layers",
  },
  {
    title: "Customisable by design",
    body: "Where a product doesn't fit perfectly, our engineering team can extend or integrate it with your systems.",
    icon: "puzzle",
  },
  {
    title: "Same engineering standards",
    body: "Security, observability and testing practices are the same as for the bespoke systems we build.",
    icon: "shield",
  },
];

export default function ProductsIndexPage() {
  const visible = getVisibleProducts();

  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Products", path: "/products" }]}
        eyebrow="Products"
        title="Platform products for voice AI and automation"
        intro="Alongside custom engineering, we're developing our own products. We publish details here only when a product is ready for customers."
      />

      <Section aria-labelledby="products-list-title">
        <Container>
          <h2 id="products-list-title" className="sr-only">
            Products
          </h2>
          {visible.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-line-strong bg-surface px-6 py-14 text-center sm:px-12">
              <span className="grid size-12 place-items-center rounded-xl bg-signal-soft text-signal">
                <Icon name="package" className="size-6" />
              </span>
              <p className="mt-6 font-display text-display-md font-semibold text-foreground">Products in development</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Our first products aren&apos;t public yet. If you&apos;re interested in early access — or need something
                similar built for you now — we&apos;d be glad to talk.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="approach-title">
        <Container>
          <SectionHeader id="approach-title" eyebrow="Our approach" title="How we think about products" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {approach.map((a) => (
              <li key={a.title} className="rounded-2xl border border-line bg-card p-6">
                <Icon name={a.icon} className="size-5 text-signal" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        trackId="products_index"
        title="Need it before it ships?"
        description="Many of the capabilities behind our products are available today as custom builds. Tell us what you need."
        primary={{ label: "Talk to Our Team", href: "/contact" }}
        secondary={{ label: "Explore Voice AI", href: "/services/voice-ai" }}
      />
    </>
  );
}
