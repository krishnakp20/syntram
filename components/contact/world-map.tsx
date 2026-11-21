import { Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

import { MAP_DOT_STEP, MAP_HEIGHT, MAP_WIDTH, mapDotsPath, mapPins } from "./world-map-data";

type PinName = (typeof mapPins)[number]["name"];

/** Where each label sits relative to its pin, chosen so close pins don't collide. */
const labelSide: Record<PinName, "left" | "right" | "top" | "bottom"> = {
  Dubai: "left",
  Pune: "bottom",
  Ghaziabad: "top",
  Bangkok: "right",
  Ireland: "left",
  Melbourne: "bottom",
};

const labelPosition = {
  left: "right-full top-1/2 mr-2.5 -translate-y-1/2",
  right: "left-full top-1/2 ml-2.5 -translate-y-1/2",
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
};

/** Where the hover card opens, so it stays inside the map and the screen. */
const tipPosition: Record<PinName, string> = {
  Pune: "bottom-full left-1/2 mb-4 -translate-x-3/4 sm:-translate-x-1/2",
  Ghaziabad: "top-full left-1/2 mt-4 -translate-x-3/4 sm:-translate-x-1/2",
  Bangkok: "bottom-full right-0 mb-4 translate-x-6",
  Dubai: "bottom-full left-1/2 mb-4 -translate-x-1/2",
  Ireland: "top-full left-1/2 mt-4 -translate-x-1/2",
  Melbourne: "bottom-full right-0 mb-4 translate-x-6",
};

/** Office details for a pin, matched by city name against siteConfig.offices. */
const officeFor = (name: string) => siteConfig.offices.find((o) => o.label === name);

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
            className="absolute hover:z-30 focus-within:z-30"
            style={{ left: `${(pin.x / MAP_WIDTH) * 100}%`, top: `${(pin.y / MAP_HEIGHT) * 100}%` }}
          >
            <button
              type="button"
              aria-label={`${fullName(pin)}${pin.hq ? " (headquarters)" : ""}: show address`}
              className="peer absolute size-4 -translate-x-1/2 sm:size-8 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-signal"
            />
            <span className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 rounded-full bg-signal/40 motion-safe:animate-ping" aria-hidden="true" />
              <span
                className={cn(
                  "relative block rounded-full border-2 border-white bg-signal shadow-[0_0_0_3px_var(--signal-soft)]",
                  pin.hq ? "size-4 sm:size-[1.125rem]" : "size-3 sm:size-3.5",
                )}
              />
            </span>
            <span
              className={cn(
                "pointer-events-none absolute hidden rounded-md border border-line bg-card px-2 py-0.5 text-xs font-medium whitespace-nowrap text-foreground shadow-sm sm:block",
                labelPosition[labelSide[pin.name]],
              )}
            >
              {pin.name}
              {pin.hq && <span className="ml-1 font-mono text-[0.625rem] font-semibold text-signal">HQ</span>}
            </span>
            <PinTooltip pin={pin} />
          </div>
        ))}
      </div>

      <figcaption>
        <ul className="relative flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {mapPins.map((pin) => (
            <li key={pin.name}>
              <button
                type="button"
                aria-label={`${fullName(pin)}${pin.hq ? " (headquarters)" : ""}: show address`}
                className="peer inline-flex cursor-pointer items-center gap-1.5 rounded-md transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-signal"
              >
                <MapPin aria-hidden="true" className="size-4 text-signal" />
                {fullName(pin)}
                {pin.hq && <span className="font-mono text-[0.625rem] font-semibold text-signal">HQ</span>}
              </button>
              <PinTooltip pin={pin} position="bottom-full left-1/2 mb-3 -translate-x-1/2" />
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

/** Address card shown while the pin is hovered or focused (tap on touch screens). */
function PinTooltip({ pin, position }: { pin: (typeof mapPins)[number]; position?: string }) {
  const office = officeFor(pin.name);
  const lines = office?.lines.filter((l) => l !== siteConfig.legal.entityName) ?? [fullName(pin)];
  return (
    <div
      role="tooltip"
      className={cn(
        "pointer-events-none invisible absolute z-20 w-56 rounded-xl border border-line-strong bg-card p-3.5 text-left opacity-0 shadow-lg transition-opacity duration-150 sm:w-64",
        "peer-hover:visible peer-hover:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100 peer-focus:visible peer-focus:opacity-100",
        position ?? tipPosition[pin.name],
      )}
    >
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <MapPin aria-hidden="true" className="size-4 text-signal" />
        {pin.name}
        {pin.hq && (
          <span className="rounded bg-signal-soft px-1.5 font-mono text-[0.625rem] font-semibold text-signal">HQ</span>
        )}
      </p>
      <address className="mt-2 text-xs leading-relaxed text-muted-foreground not-italic">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <p className="mt-2.5 flex flex-col gap-1 border-t border-line pt-2.5 text-xs text-muted-foreground">
        {office?.phone && (
          <span className="flex items-center gap-1.5">
            <Phone aria-hidden="true" className="size-3.5 text-signal" />
            {office.phone}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Mail aria-hidden="true" className="size-3.5 text-signal" />
          {siteConfig.contact.email}
        </span>
      </p>
    </div>
  );
}
