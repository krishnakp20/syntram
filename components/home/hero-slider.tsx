"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string;
  /** Short label for the dot/tab control, e.g. "Voice AI". */
  label: string;
  /** Server-rendered slide body. */
  content: React.ReactNode;
}

const INTERVAL_MS = 6500;

/**
 * Accessible auto-rotating carousel (WAI-ARIA carousel pattern):
 * - auto-advances, but pauses on hover / keyboard focus and has a visible
 *   Pause/Play button (WCAG 2.2.2);
 * - never auto-rotates for prefers-reduced-motion users;
 * - inactive slides are `inert`, so only the visible slide is focusable;
 * - all slides are in the server HTML, so their content is crawlable.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const count = slides.length;

  const go = useCallback((index: number) => setActive(((index % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const autoplay = playing && !hovered && !focused && !reducedMotion && count > 1;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => go(active + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, active, go]);

  if (count === 0) return null;

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Syntram highlights"
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface/90 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.6)]">
        <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-50" />
        {/* All slides share one grid cell so the box height is the tallest slide — no layout shift. */}
        <div className="relative grid" aria-live={autoplay ? "off" : "polite"}>
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <div
                key={slide.id}
                id={`hero-slide-${slide.id}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${slide.label}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                  isActive ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                {slide.content}
              </div>
            );
          })}
        </div>

        {/* Progress bar for the active slide */}
        {autoplay && (
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
            <div
              key={active}
              className="h-full origin-left bg-signal"
              style={{ animation: `hero-progress ${INTERVAL_MS}ms linear forwards` }}
            />
          </div>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a slide">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-controls={`hero-slide-${slide.id}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "min-h-9 rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors",
                  i === active
                    ? "border-signal bg-signal-soft text-foreground"
                    : "border-line-strong text-muted-foreground hover:text-foreground",
                )}
              >
                {slide.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="grid size-10 place-items-center rounded-full border border-line-strong text-muted-foreground hover:text-foreground"
            >
              {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="grid size-10 place-items-center rounded-full border border-line-strong text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="grid size-10 place-items-center rounded-full border border-line-strong text-muted-foreground hover:text-foreground"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
