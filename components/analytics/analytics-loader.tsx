"use client";

import dynamic from "next/dynamic";

/**
 * Code-split entry point for analytics. The consent banner, tag loaders and
 * click tracking live in their own chunk that is only downloaded when an
 * analytics ID is configured (the layout doesn't render this otherwise).
 */
export const AnalyticsLoader = dynamic(() => import("./analytics").then((m) => m.Analytics), { ssr: false });
