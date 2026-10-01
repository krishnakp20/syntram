"use client";

import { useEffect } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics/events";

/** Fires a single analytics event when a page mounts (e.g. product_view). */
export function TrackView({ event, params }: { event: AnalyticsEvent; params: Record<string, string> }) {
  const key = JSON.stringify(params);
  useEffect(() => {
    track(event, JSON.parse(key) as Record<string, string>);
  }, [event, key]);
  return null;
}
