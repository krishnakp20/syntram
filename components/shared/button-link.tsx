import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    /** Analytics label, read by the global CTA click tracker. */
    trackAs?: string;
  };

/** A Next.js link styled as a button. Use for navigation; use <Button> for actions. */
export function ButtonLink({ className, variant, size = "cta", trackAs, ...props }: ButtonLinkProps) {
  return (
    <Link
      data-track-cta={trackAs}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
