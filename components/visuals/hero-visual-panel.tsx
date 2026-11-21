import { cn } from "@/lib/utils";
import type { HeroVisualVariant } from "@/types/content";

import { GlobeVisual } from "./globe-visual";
import { NeuralVisual } from "./neural-visual";
import {
  ApiVisual,
  CloudVisual,
  CodeVisual,
  MobileVisual,
  QaVisual,
  TeamVisual,
  VoiceVisual,
  WebVisual,
} from "./service-visuals";

const visuals: Record<HeroVisualVariant, React.ComponentType<{ className?: string }>> = {
  globe: GlobeVisual,
  neural: NeuralVisual,
  voice: VoiceVisual,
  code: CodeVisual,
  web: WebVisual,
  mobile: MobileVisual,
  api: ApiVisual,
  cloud: CloudVisual,
  qa: QaVisual,
  team: TeamVisual,
};

/** Dark, glowing frame (logo black) for an animated hero visual. */
export function HeroVisualPanel({
  variant,
  caption,
  className,
}: {
  variant: HeroVisualVariant;
  caption?: string;
  className?: string;
}) {
  const Visual = visuals[variant];
  return (
    <figure
      className={cn(
        "theme-dark theme-logo relative overflow-hidden rounded-3xl border border-line shadow-[0_40px_100px_-40px_rgb(22_104_214/0.55)]",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-40" />
      <Visual className="relative block aspect-square w-full" />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pt-10 pb-4 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
