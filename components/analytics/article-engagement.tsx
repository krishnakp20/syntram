"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics/events";

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Blog engagement: reports read-depth milestones for the article body and an
 * `article_complete` event (reached the end and spent a plausible time
 * reading). Uses a passive, rAF-throttled scroll listener.
 */
export function ArticleEngagement({ slug, kind, targetId }: { slug: string; kind: string; targetId: string }) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const start = performance.now();
    const reached = new Set<number>();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.4;
      if (total <= 0) return;
      const pct = Math.min(100, Math.max(0, ((window.innerHeight * 0.6 - rect.top) / total) * 100));
      for (const m of MILESTONES) {
        if (pct >= m && !reached.has(m)) {
          reached.add(m);
          track("article_progress", { article: slug, kind, percent: m });
          if (m === 100) {
            const seconds = Math.round((performance.now() - start) / 1000);
            if (seconds >= 30) track("article_complete", { article: slug, kind, seconds });
          }
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [slug, kind, targetId]);
  return null;
}
