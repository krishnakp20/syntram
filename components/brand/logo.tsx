import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The official ZAYBX logo, used exactly as supplied (931×458 JPEG on black).
 * Only resize it — do not recolour, crop or split the artwork.
 */
export function LogoImage({
  eager = false,
  className,
}: {
  /** Set for above-the-fold placements such as the header. */
  eager?: boolean;
  /** Set the height (e.g. `h-12`); width follows the logo's aspect ratio. */
  className?: string;
}) {
  return (
    <Image
      src="/brand/zaybx-logo.jpg"
      alt="ZAYBX"
      width={931}
      height={458}
      // Serve the original file untouched (no re-compression); the browser only scales it.
      unoptimized
      loading={eager ? "eager" : "lazy"}
      className={cn("h-12 w-auto shrink-0", className)}
    />
  );
}

export function Logo({ eager, className }: { eager?: boolean; className?: string }) {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="ZAYBX — home">
      <LogoImage eager={eager} className={className} />
    </Link>
  );
}
