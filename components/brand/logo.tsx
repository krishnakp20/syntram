import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER MARK — a simple, original "signal" glyph (a waveform folding
 * into an S) used until Syntram's final logo is supplied. Swap the <svg>
 * below for the real mark; the wordmark and link wrapper can stay.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" className="fill-surface-raised stroke-line-strong" />
      <path
        d="M22 10.5c-1.2-1.3-3.1-2-5.4-2-3.3 0-5.6 1.7-5.6 4.1 0 2.3 1.8 3.2 5 3.9 3.3.7 5.4 1.6 5.4 4.1 0 2.4-2.4 4.4-6 4.4-2.5 0-4.6-.9-5.9-2.4"
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="stroke-signal"
      />
      <circle cx="22" cy="10.5" r="1.6" className="fill-foreground" />
      <circle cx="9.5" cy="22.6" r="1.6" className="fill-foreground" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}
      aria-label="Syntram Technologies — home"
    >
      <LogoMark />
      <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-foreground">
        Syntram
      </span>
    </Link>
  );
}
