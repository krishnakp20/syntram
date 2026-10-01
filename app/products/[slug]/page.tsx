import { notFound } from "next/navigation";

import { ProductPage } from "@/components/templates/product-page";
import { getProduct, getVisibleProducts } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    ...product.seo,
    // Placeholders are never indexed, whatever their seo fields say.
    noindex: product.placeholder || product.seo.noindex,
    path: `/products/${product.slug}`,
  });
}

export default async function Page({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}
