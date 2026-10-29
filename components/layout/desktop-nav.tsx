"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Mega-menu on the WAI-ARIA disclosure pattern (button + aria-expanded +
 * panel) instead of a menu library, so the header's client JS stays tiny.
 * Panel content is server-rendered and passed in as `panel`.
 *
 * - Click / Enter / Space toggles; hover opens on mouse devices.
 * - Escape closes and returns focus to the trigger.
 * - Clicking outside, tabbing out, following a link or navigating closes it.
 */

export interface DesktopNavEntry {
  label: string;
  href: string;
  panel?: React.ReactNode;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const itemClass =
  "inline-flex h-10 items-center gap-1 rounded-lg px-3 text-[0.875rem] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

export function DesktopNav({ entries }: { entries: DesktopNavEntry[] }) {
  const pathname = usePathname();
  const baseId = useId();
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [open, setOpen] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close on route change (derived during render — no effect needed).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerRefs.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const hoverTo = (label: string | null) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(label), label ? 80 : 200);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative hidden lg:block"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
      }}
      onPointerLeave={hoverTo(null)}
    >
      <ul className="flex items-center gap-0.5">
        {entries.map((entry) => {
          const active = isActive(pathname, entry.href);

          if (!entry.panel) {
            return (
              <li key={entry.label} onPointerEnter={hoverTo(null)}>
                <Link
                  href={entry.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(itemClass, active && "text-foreground")}
                >
                  {entry.label}
                </Link>
              </li>
            );
          }

          const panelId = `${baseId}-panel-${entry.label.toLowerCase()}`;
          const isOpen = open === entry.label;
          return (
            <li key={entry.label} onPointerEnter={hoverTo(entry.label)}>
              <button
                ref={(el) => {
                  triggerRefs.current[entry.label] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : entry.label)}
                className={cn(itemClass, (active || isOpen) && "text-foreground", isOpen && "bg-secondary")}
              >
                {entry.label}
                <ChevronDown aria-hidden="true" className={cn("size-3.5 transition-transform", isOpen && "rotate-180")} />
              </button>
              {/* Always in the DOM (hidden when closed) so links are in the server HTML for crawlers. */}
              <div
                id={panelId}
                hidden={!isOpen}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a")) setOpen(null);
                }}
                className="absolute top-full left-1/2 z-50 mt-2 w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-line-strong bg-popover p-2 shadow-[0_24px_60px_-20px_rgb(15_23_42/0.2)] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
              >
                {entry.panel}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
