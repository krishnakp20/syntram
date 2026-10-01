"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { LogoMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/shared/button-link";
import { isNavGroup } from "@/content/navigation";
import type { NavEntry, NavLink } from "@/types/content";

/**
 * Mobile menu on the native <dialog> element: showModal() provides the focus
 * trap, Escape-to-close, inert background and top-layer stacking with no
 * library code. Groups use <details> so they work without JS state.
 */
function setScrollLock(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
const unlock = () => setScrollLock(false);

export function MobileNav({ items, cta }: { items: NavEntry[]; cta: NavLink }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const open = () => {
    dialogRef.current?.showModal();
    setScrollLock(true);
  };
  // Unlock directly rather than relying only on the dialog's async `close` event.
  const close = () => {
    dialogRef.current?.close();
    unlock();
  };

  // Close after client-side navigation.
  useEffect(() => {
    dialogRef.current?.close();
    unlock();
  }, [pathname]);

  // Never leave the page scroll-locked if this unmounts while open.
  useEffect(() => unlock, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="grid size-11 place-items-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        // `cancel` fires synchronously on Escape; `close` covers every other path.
        onCancel={unlock}
        onClose={unlock}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-black/60 open:flex open:flex-col sm:ml-auto sm:max-w-md sm:border-l sm:border-line lg:hidden"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
          <span className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-base font-semibold">Syntram</span>
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-lg hover:bg-secondary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-2">
          <ul>
            {items.map((entry) =>
              isNavGroup(entry) ? (
                <li key={entry.label} className="border-b border-line">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-medium [&::-webkit-details-marker]:hidden">
                      {entry.label}
                      <ChevronDown
                        aria-hidden="true"
                        className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <ul className="flex flex-col gap-0.5 pb-3">
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="block rounded-md px-3 py-2.5 text-[0.9375rem] text-muted-foreground hover:bg-secondary hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={entry.href}
                          onClick={close}
                          className="block rounded-md px-3 py-2.5 text-[0.9375rem] font-medium text-signal"
                        >
                          View all {entry.label.toLowerCase()}
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={entry.label} className="border-b border-line">
                  <Link href={entry.href} onClick={close} className="block py-4 text-base font-medium">
                    {entry.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-line p-4">
          <ButtonLink href={cta.href} onClick={close} size="cta-lg" className="w-full" trackAs="mobile_nav_lets_talk">
            {cta.label}
          </ButtonLink>
        </div>
      </dialog>
    </>
  );
}
