import { cn } from "@/lib/utils";

type DivProps = React.ComponentProps<"div">;

/** Horizontal page gutter + max width. 16px gutter on phones. */
export function Container({ className, ...props }: DivProps) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

interface SectionProps extends React.ComponentProps<"section"> {
  /** Re-scopes design tokens to the light palette. */
  tone?: "dark" | "light" | "surface";
  /** Vertical rhythm. */
  spacing?: "default" | "tight" | "none";
}

export function Section({ className, tone = "dark", spacing = "default", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        tone === "light" && "theme-light",
        tone === "surface" && "bg-surface",
        spacing === "default" && "py-20 sm:py-24 lg:py-28",
        spacing === "tight" && "py-14 sm:py-16",
        className,
      )}
      {...props}
    />
  );
}

/** Small mono label above section headings. */
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] text-signal uppercase",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
      {children}
    </p>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level — keep one H1 per page; sections default to h2. */
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
  children,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={id} className="text-display-lg font-semibold text-foreground">
        {title}
      </Heading>
      {description && <p className="text-lead text-muted-foreground">{description}</p>}
      {children}
    </div>
  );
}
