import Link from "next/link";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

/** Internal links use next/link; external links open safely in a new tab. */
function Anchor({ href = "", children, ...props }: React.ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Wide tables scroll inside their own box instead of the page. */
function Table(props: React.ComponentProps<"table">) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm [&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-muted-foreground [&_th]:bg-surface [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-foreground" {...props} />
    </div>
  );
}

const calloutStyles = {
  note: { Icon: Info, className: "border-line-strong bg-surface" },
  tip: { Icon: Lightbulb, className: "border-signal/30 bg-signal-soft" },
  warning: { Icon: TriangleAlert, className: "border-amber-400/40 bg-amber-400/10" },
} as const;

/** <Callout type="tip" title="...">…</Callout> — usable in trusted MDX files. */
export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: React.ReactNode;
}) {
  const { Icon, className } = calloutStyles[type];
  return (
    <aside className={cn("not-prose my-8 flex gap-3 rounded-xl border p-5", className)}>
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
      <div className="text-[0.9375rem] leading-relaxed text-foreground [&_p:not(:last-child)]:mb-3">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  table: Table,
  Callout,
};
