import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { MAP_DOT_STEP, MAP_HEIGHT, MAP_WIDTH, mapDotsPath, mapPins } from "./world-map-data";

type PinName = (typeof mapPins)[number]["name"];

/** Where each label sits relative to its pin, chosen so close pins don't collide. */
const labelSide: Record<PinName, "left" | "right" | "bottom"> = {
  Dubai: "left",
  Pune: "bottom",
  Bangkok: "right",
  Ireland: "left",
  Australia: "bottom",
};

const labelPosition = {
  left: "right-full top-1/2 mr-2.5 -translate-y-1/2",
  right: "left-full top-1/2 ml-2.5 -translate-y-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
};

const fullName = (pin: (typeof mapPins)[number]) => (pin.country ? `${pin.name}, ${pin.country}` : pin.name);

/** Dotted world map with ZAYBX locations. Pure server markup, no client JS. */
export function WorldMap({ className }: { className?: string }) {
  return (
    <figure className={cn("flex flex-col gap-6", className)}>
      <div className="relative" style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}>
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="absolute inset-0 size-full"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d={mapDotsPath}
            fill="none"
            strokeLinecap="round"
            strokeWidth={MAP_DOT_STEP * 0.42}
            className="stroke-foreground/15"
          />
        </svg>

        {mapPins.map((pin) => (
          <div
            key={pin.name}
            className="absolute"
            style={{ left: `${(pin.x / MAP_WIDTH) * 100}%`, top: `${(pin.y / MAP_HEIGHT) * 100}%` }}
          >
            <span className="absolute -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 rounded-full bg-signal/40 motion-safe:animate-ping" aria-hidden="true" />
              <span className="relative block size-3 rounded-full border-2 border-white bg-signal shadow-[0_0_0_3px_var(--signal-soft)] sm:size-3.5" />
            </span>
            <span
              className={cn(
                "absolute hidden rounded-md border border-line bg-card px-2 py-0.5 text-xs font-medium whitespace-nowrap text-foreground shadow-sm sm:block",
                labelPosition[labelSide[pin.name]],
              )}
            >
              {pin.name}
            </span>
          </div>
        ))}
      </div>

      <figcaption>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {mapPins.map((pin) => (
            <li key={pin.name} className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4 text-signal" />
              {fullName(pin)}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
