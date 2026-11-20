"use client";

import { useEffect } from "react";

import { useCanvasAnimation } from "./use-canvas-animation";

/**
 * A wide, light "neural field" for the homepage hero: drifting nodes at
 * different depths, linked to their nearest neighbours, with glowing comet
 * pulses that travel several hops across the network. Nodes near the mouse
 * light up and link to the cursor, and the layers shift slightly with it
 * (parallax). Fade the centre with a CSS mask so it frames the text.
 * Decorative only; one instance per page.
 */

/** Deterministic pseudo-random so the server and every visit look the same. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/** Layout is computed for this aspect ratio; it stretches gently to fit. */
const ASPECT = 2.6;
const COLS = 14;
const ROWS = 6;

interface Node {
  x: number; // 0..1
  y: number; // 0..1
  /** Depth 0.35 (far) .. 1 (near): size, brightness and parallax. */
  z: number;
  phase: number;
  drift: number;
}

const nodes: Node[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = r * COLS + c;
    nodes.push({
      x: (c + 0.5 + (rand(i) - 0.5) * 0.85) / COLS,
      y: (r + 0.5 + (rand(i + 500) - 0.5) * 0.85) / ROWS,
      z: 0.35 + rand(i + 700) * 0.65,
      phase: rand(i + 900) * Math.PI * 2,
      drift: 0.6 + rand(i + 1100) * 0.8,
    });
  }
}

/** Link every node to its 3 nearest neighbours (deduplicated). */
const edges: [number, number][] = [];
const neighbours: number[][] = nodes.map(() => []);
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
        if (seen.has(key)) return;
        seen.add(key);
        edges.push([i, j]);
        neighbours[i].push(j);
        neighbours[j].push(i);
      });
  });
}

/** Comet pulses: each walks a random multi-hop path through the network. */
const CYCLE = 9;
const HOP_TIME = 0.55;
const comets = Array.from({ length: 16 }, (_, k) => {
  let at = Math.floor(rand(k + 1300) * nodes.length);
  const path = [at];
  const hops = 3 + Math.floor(rand(k + 1500) * 4);
  for (let h = 0; h < hops; h++) {
    const options = neighbours[at].filter((n) => !path.includes(n));
    if (options.length === 0) break;
    at = options[Math.floor(rand(k * 31 + h + 1700) * options.length)];
    path.push(at);
  }
  return { path, start: rand(k + 2100) * CYCLE };
});

/** Pointer position in canvas pixels; null when the mouse isn't over the hero. */
const pointer: { x: number; y: number; active: number } = { x: 0, y: 0, active: 0 };
let pointerTarget: { x: number; y: number } | null = null;
let canvasEl: HTMLCanvasElement | null = null;

const BLUE = "22,104,214";
const CYAN = "34,184,255";
const VIOLET = "124,92,255";

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  const unit = Math.min(w / ASPECT, h);
  const r = Math.max(2, unit / 150);

  // Ease the pointer so links and parallax glide instead of jumping.
  if (pointerTarget) {
    pointer.x += (pointerTarget.x - pointer.x) * 0.12;
    pointer.y += (pointerTarget.y - pointer.y) * 0.12;
    pointer.active = Math.min(1, pointer.active + 0.06);
  } else {
    pointer.active = Math.max(0, pointer.active - 0.04);
  }
  const parX = pointer.active ? (pointer.x / w - 0.5) * pointer.active : 0;
  const parY = pointer.active ? (pointer.y / h - 0.5) * pointer.active : 0;

  // Node positions this frame: slow drift + depth-based parallax.
  const pos = nodes.map((n) => ({
    x: n.x * w + Math.sin(t * 0.25 * n.drift + n.phase) * unit * 0.018 - parX * 26 * n.z,
    y: n.y * h + Math.cos(t * 0.2 * n.drift + n.phase * 1.3) * unit * 0.022 - parY * 18 * n.z,
  }));

  // Edges, fainter for far-away pairs.
  ctx.lineWidth = 1;
  for (const [a, b] of edges) {
    const depth = (nodes[a].z + nodes[b].z) / 2;
    ctx.strokeStyle = `rgba(${BLUE},${(0.06 + 0.14 * depth).toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(pos[a].x, pos[a].y);
    ctx.lineTo(pos[b].x, pos[b].y);
    ctx.stroke();
  }

  // Mouse: link nearby nodes to the cursor and light them up.
  const heat = new Float32Array(nodes.length);
  if (pointer.active > 0.01) {
    const reach = unit * 0.32;
    pos.forEach((p, i) => {
      const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
      if (d > reach) return;
      const k = (1 - d / reach) * pointer.active;
      heat[i] = Math.max(heat[i], k * 0.9);
      const g = ctx.createLinearGradient(pointer.x, pointer.y, p.x, p.y);
      g.addColorStop(0, `rgba(${VIOLET},${(0.5 * k).toFixed(3)})`);
      g.addColorStop(1, `rgba(${CYAN},${(0.35 * k).toFixed(3)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(pointer.x, pointer.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    const halo = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, reach * 0.6);
    halo.addColorStop(0, `rgba(${CYAN},${(0.12 * pointer.active).toFixed(3)})`);
    halo.addColorStop(1, `rgba(${CYAN},0)`);
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, reach * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Comets: a bright head with a fading blue→violet tail, hop by hop.
  const tc = t % CYCLE;
  for (const comet of comets) {
    let age = tc - comet.start;
    if (age < 0) age += CYCLE;
    const hops = comet.path.length - 1;
    const total = hops * HOP_TIME;
    if (age > total + 0.9) continue;

    const progress = Math.min(age / HOP_TIME, hops);
    // Nodes light up as the comet passes and fade afterwards.
    for (let s = 0; s <= Math.floor(progress); s++) {
      const since = age - s * HOP_TIME;
      if (since >= 0 && since < 0.9) heat[comet.path[s]] = Math.max(heat[comet.path[s]], 1 - since / 0.9);
    }
    if (age > total) continue;

    const seg = Math.min(Math.floor(progress), hops - 1);
    const k = progress - seg;
    const a = pos[comet.path[seg]];
    const b = pos[comet.path[seg + 1]];
    const hx = a.x + (b.x - a.x) * k;
    const hy = a.y + (b.y - a.y) * k;

    // Tail along the current and previous segment.
    const prev = seg > 0 ? pos[comet.path[seg - 1]] : a;
    const tail = ctx.createLinearGradient(prev.x, prev.y, hx, hy);
    tail.addColorStop(0, `rgba(${VIOLET},0)`);
    tail.addColorStop(1, `rgba(${CYAN},0.75)`);
    ctx.strokeStyle = tail;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    if (seg > 0) ctx.lineTo(a.x, a.y);
    ctx.lineTo(hx, hy);
    ctx.stroke();

    const size = r * 5;
    const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, size);
    glow.addColorStop(0, "rgba(255,255,255,0.95)");
    glow.addColorStop(0.3, `rgba(${CYAN},0.8)`);
    glow.addColorStop(1, `rgba(${CYAN},0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(hx, hy, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Nodes: size and brightness follow depth; lit nodes get a halo.
  nodes.forEach((n, i) => {
    const { x, y } = pos[i];
    const hv = heat[i];
    const idle = 0.5 + 0.5 * Math.sin(t * 1.1 + n.phase);
    const size = r * (0.6 + 0.7 * n.z) * (1 + 0.6 * hv);
    if (hv > 0.02) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
      g.addColorStop(0, `rgba(${CYAN},${(0.4 * hv).toFixed(3)})`);
      g.addColorStop(1, `rgba(${CYAN},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, size * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle =
      hv > 0.05
        ? `rgba(${CYAN},${(0.55 + 0.45 * hv).toFixed(3)})`
        : `rgba(${BLUE},${(0.15 + 0.3 * n.z + 0.12 * idle).toFixed(3)})`;
    ctx.fill();
  });
}

export function NeuralField({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useCanvasAnimation(draw);

  // Track the mouse over the hero (the canvas itself ignores pointer events).
  useEffect(() => {
    canvasEl = ref.current;
    const host = canvasEl?.parentElement;
    if (!host || !window.matchMedia("(hover: hover)").matches) return;
    const move = (e: PointerEvent) => {
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!pointerTarget && pointer.active === 0) {
        pointer.x = x;
        pointer.y = y;
      }
      pointerTarget = y <= rect.height ? { x, y } : null;
    };
    const leave = () => {
      pointerTarget = null;
    };
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      pointerTarget = null;
      canvasEl = null;
    };
  }, [ref]);

  return <canvas ref={ref} aria-hidden="true" className={className} style={style} />;
}
