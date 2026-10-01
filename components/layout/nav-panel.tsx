import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import type { NavGroup } from "@/types/content";

/**
 * Mega-menu panel content. A Server Component: it's rendered once on the
 * server and handed to the client <DesktopNav> as a prop, so the icon set
 * never ships to the browser.
 */
export function NavPanel({ group }: { group: NavGroup }) {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-2">
      <div className="flex flex-col justify-between rounded-xl bg-secondary/60 p-4">
        <div>
          <p className="font-display text-base font-semibold text-foreground">{group.label}</p>
          {group.intro && <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{group.intro}</p>}
        </div>
        <Link
          href={group.href}
          className="mt-6 inline-flex w-fit items-center gap-1.5 text-[0.8125rem] font-medium text-signal hover:underline"
        >
          View all<span className="sr-only"> {group.label.toLowerCase()}</span>
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid grid-cols-2 content-start gap-1">
        {group.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex h-full items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
            >
              {item.icon && (
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface text-signal">
                  <Icon name={item.icon} className="size-4" />
                </span>
              )}
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                {item.description && (
                  <span className="text-[0.8125rem] leading-snug text-muted-foreground">{item.description}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
