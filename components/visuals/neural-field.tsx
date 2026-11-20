"use client";

import { useCanvasAnimation } from "./use-canvas-animation";

/**
 * A wide, light "neural field": scattered nodes linked to their nearest
 * neighbours, with pulses of signal travelling between them. Designed to sit
 * faintly behind hero text on a light background (fade the centre with a CSS
 * mask). Decorative only.
 */

/** Deterministic pseudo-random so the server and every visit look the same. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/** Layout is computed for this aspect ratio; it stretches gently to fit. */
const ASPECT = 2.6;
const COLS = 13;
const ROWS = 5;

interface Node {
  x: number; // 0..1
  y: number; // 0..1
  phase: number;
}

const nodes: Node[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = r * COLS + c;
    nodes.push({
      x: (c + 0.5 + (rand(i) - 0.5) * 0.8) / COLS,
      y: (r + 0.5 + (rand(i + 500) - 0.5) * 0.8) / ROWS,
      phase: rand(i + 900) * Math.PI * 2,
    });
  }
}

/** Link every node to its 3 nearest neighbours (deduplicated). */
const edges: [number, number][] = [];
{
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: Math.hypot((a.x - b.x) * ASPECT, a.y - b.y) }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push(i < j ? [i, j] : [j, i]);
        }
      });
  });
}

const CYCLE = 8;
const PULSE_DURATION = 1.4;
const pulses = Array.from({ length: 34 }, (_, i) => {
  const [a, b] = edges[Math.floor(rand(i + 1300) * edges.length)];
  const forward = rand(i + 1700) > 0.5;
  return { from: forward ? a : b, to: forward ? b : a, start: rand(i + 2100) * CYCLE };
});

const BLUE = "22,104,214";
const CYAN = "34,184,255";

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  const px = (n: Node) => ({ x: n.x * w, y: n.y * h });
  const unit = Math.min(w / ASPECT, h);
  const r = Math.max(2.2, unit / 140);

  // Edges
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${BLUE},0.16)`;
  ctx.beginPath();
  for (const [a, b] of edges) {
    const p = px(nodes[a]);
    const q = px(nodes[b]);
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
  }
  ctx.stroke();

  // Pulses; the destination node lights up when a pulse arrives.
  const heat = new Float32Array(nodes.length);
  const tc = t % CYCLE;
  for (const pulse of pulses) {
    let age = tc - pulse.start;
    if (age < 0) age += CYCLE;
    if (age > PULSE_DURATION) {
      const since = age - PULSE_DURATION;
      if (since < 0.8) heat[pulse.to] = Math.max(heat[pulse.to], 1 - since / 0.8);
      continue;
    }
    const k = age / PULSE_DURATION;
    const a = px(nodes[pulse.from]);
    const b = px(nodes[pulse.to]);
    const fade = Math.sin(Math.PI * k);

    ctx.strokeStyle = `rgba(${CYAN},${(0.45 * fade).toFixed(3)})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    const x = a.x + (b.x - a.x) * k;
    const y = a.y + (b.y - a.y) * k;
    const size = r * 4;
    const g = ctx.createRadialGradient(x, y, 0, x, y, size);
    g.addColorStop(0, `rgba(${CYAN},${(0.9 * fade).toFixed(3)})`);
    g.addColorStop(1, `rgba(${CYAN},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Nodes
  nodes.forEach((n, i) => {
    const { x, y } = px(n);
    const hv = heat[i];
    const idle = 0.5 + 0.5 * Math.sin(t * 1.2 + n.phase);
    if (hv > 0.02) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
      g.addColorStop(0, `rgba(${CYAN},${(0.35 * hv).toFixed(3)})`);
      g.addColorStop(1, `rgba(${CYAN},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, y, r * (1 + 0.5 * hv), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${BLUE},${(0.28 + 0.2 * idle + 0.5 * hv).toFixed(3)})`;
    ctx.fill();
  });
}

export function NeuralField({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useCanvasAnimation(draw);
  return <canvas ref={ref} aria-hidden="true" className={className} style={style} />;
}
