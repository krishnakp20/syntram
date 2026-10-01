import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { productStatusLabel } from "@/content/products";
import type { ProductSummary } from "@/types/content";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      data-track-product={product.slug}
      className="group reveal flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-colors hover:border-line-strong"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-signal-soft text-signal">
          <Icon name={product.icon} className="size-6" />
        </span>
        <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
          {product.placeholder ? "Placeholder" : productStatusLabel[product.status]}
        </span>
      </div>
      <h3 className="mt-8 font-display text-xl font-semibold text-foreground">{product.name}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{product.tagline}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-signal">
        View product<span className="sr-only">: {product.name}</span>
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </span>
    </Link>
  );
}
