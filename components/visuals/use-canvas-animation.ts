"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a <canvas> animation: sizes it for the device pixel ratio, runs
 * `draw(ctx, width, height, timeSeconds)` every frame while the canvas is on
 * screen, and draws a single still frame when the visitor prefers reduced motion.
 * `draw` should be a stable (module-level) function.
 */
export function useCanvasAnimation(
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number, t: number) => void,
) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const render = (now: number) => {
      if (width && height) draw(ctx, width, height, reduceMotion ? 4 : Math.max(0, (now - start) / 1000));
    };
    const loop = (now: number) => {
      render(now);
      frame = visible && !reduceMotion ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!frame && visible) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    resize();
    kick();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [draw]);

  return ref;
}
