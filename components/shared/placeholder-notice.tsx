import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Highly visible banner for placeholder content. Placeholder pages only
 * render outside production (or in explicit preview builds) — this makes
 * sure nobody mistakes them for real information while they're visible.
 */
export function PlaceholderNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100 theme-light:text-amber-900",
        className,
      )}
    >
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-300 theme-light:text-amber-700" />
      <p>
        <strong className="font-semibold">Placeholder content.</strong> {children}
      </p>
    </div>
  );
}
