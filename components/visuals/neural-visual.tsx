"use client";

import { useCanvasAnimation } from "./use-canvas-animation";

/** Layer sizes of the illustrated network (input → hidden → output). */
const LAYERS = [4, 6, 7, 6, 3];
const LABELS_IN = ["Text", "Voice", "Docs", "Data"];
const LABELS_OUT = ["Answer", "Action", "Insight"];

interface Pulse {
  layer: number; // edge goes from `layer` to `layer + 1`
  from: number;
  to: number;
  start: number; // seconds
}

/** Deterministic pseudo-random so the server and every visit look the same. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const PULSE_DURATION = 0.9;
const pulses: Pulse[] = [];
for (let i = 0; i < 90; i++) {
  const layer = Math.floor(rand(i) * (LAYERS.length - 1));
  pulses.push({
    layer,
    from: Math.floor(rand(i + 100) * LAYERS[layer]),
    to: Math.floor(rand(i + 200) * LAYERS[layer + 1]),
    start: rand(i + 300) * 6,
  });
}
const CYCLE = 6;

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  const padX = w * 0.16;
  const padY = h * 0.14;
  const nodes = LAYERS.map((n, li) =>
    Array.from({ length: n }, (_, ni) => ({
      x: padX + ((w - padX * 2) * li) / (LAYERS.length - 1),
      y: padY + ((h - padY * 2) * (ni + 0.5)) / n,
    })),
  );
  const base = Math.min(w, h);

  // Background glow
  const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, base * 0.7);
  glow.addColorStop(0, "rgba(22,104,214,0.28)");
  glow.addColorStop(1, "rgba(22,104,214,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Edges
  ctx.lineWidth = 1;
  for (let li = 0; li < LAYERS.length - 1; li++) {
    for (const a of nodes[li]) {
      for (const b of nodes[li + 1]) {
        ctx.strokeStyle = "rgba(34,184,255,0.10)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // Pulses travelling along edges; nodes light up as pulses arrive
  const heat = nodes.map((layer) => layer.map(() => 0));
  const tc = t % CYCLE;
  for (const p of pulses) {
    let age = tc - p.start;
    if (age < 0) age += CYCLE;
    if (age > PULSE_DURATION) {
      const since = age - PULSE_DURATION;
      if (since < 0.5) heat[p.layer + 1][p.to] = Math.max(heat[p.layer + 1][p.to], 1 - since / 0.5);
      continue;
    }
    const k = age / PULSE_DURATION;
    const a = nodes[p.layer][p.from];
    const b = nodes[p.layer + 1][p.to];
    ctx.strokeStyle = `rgba(34,184,255,${(0.35 * Math.sin(Math.PI * k)).toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    const x = a.x + (b.x - a.x) * k;
    const y = a.y + (b.y - a.y) * k;
    const g = ctx.createRadialGradient(x, y, 0, x, y, base / 40);
    g.addColorStop(0, "rgba(200,245,255,0.95)");
    g.addColorStop(1, "rgba(34,184,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, base / 40, 0, Math.PI * 2);
    ctx.fill();
  }

  // Nodes
  const r = Math.max(3, base / 70);
  nodes.forEach((layer, li) =>
    layer.forEach((n, ni) => {
      const hv = heat[li][ni];
      const idle = 0.5 + 0.5 * Math.sin(t * 1.6 + li * 1.3 + ni);
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * (1 + 0.6 * hv), 0, Math.PI * 2);
      ctx.fillStyle = hv > 0.05 ? `rgba(160,230,255,${(0.6 + 0.4 * hv).toFixed(3)})` : "#0b2a5c";
      ctx.fill();
      ctx.strokeStyle = `rgba(34,184,255,${(0.45 + 0.35 * idle).toFixed(3)})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }),
  );

  // Input / output labels
  ctx.font = `500 ${Math.max(10, base / 34)}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "rgba(200,220,245,0.85)";
  ctx.textBaseline = "middle";
  ctx.textAlign = "right";
  nodes[0].forEach((n, i) => ctx.fillText(LABELS_IN[i], n.x - r - 8, n.y));
  ctx.textAlign = "left";
  nodes[LAYERS.length - 1].forEach((n, i) => ctx.fillText(LABELS_OUT[i], n.x + r + 8, n.y));
}

/** Animated neural network: inputs flow through layers to outcomes. Decorative. */
export function NeuralVisual({ className }: { className?: string }) {
  const ref = useCanvasAnimation(draw);
  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
