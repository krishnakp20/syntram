import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TocItem } from "@/types/content";

function TocList({ items }: { items: TocItem[] }) {
  return (
    <ol className="flex flex-col gap-0.5 border-l border-line">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={cn(
              "-ml-px block border-l border-transparent py-1.5 text-[0.8125rem] leading-snug text-muted-foreground transition-colors hover:border-signal hover:text-foreground",
              item.depth === 2 ? "pl-4" : "pl-7",
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Server-rendered TOC: a collapsible <details> on small screens, a sticky list
 * on large ones. No client JavaScript.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;
  return (
    <>
      <details className="group rounded-xl border border-line bg-surface lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <nav aria-label="Table of contents" className="px-4 pb-4">
          <TocList items={items} />
        </nav>
      </details>
      <nav aria-label="Table of contents" className="sticky top-24 hidden lg:block">
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.14em] text-subtle uppercase">On this page</p>
        <TocList items={items} />
      </nav>
    </>
  );
}
