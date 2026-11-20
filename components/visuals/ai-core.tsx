"use client";

import { useCanvasAnimation } from "./use-canvas-animation";

/**
 * "AI core" for the homepage hero: a glowing orb with orbiting rings, fed by
 * inputs on the left (voice, text, data) and sending results out to the right
 * (answers, actions, insights). Designed for a light background. Decorative.
 */

/** Deterministic pseudo-random so the server and every visit look the same. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const BLUE = "22,104,214";
const CYAN = "34,184,255";
const VIOLET = "124,92,255";

/** Spokes: inputs flow into the core, outputs flow out of it. Angles in degrees. */
const spokes = [
  { label: "Voice", angle: 148, dir: "in" },
  { label: "Text", angle: 180, dir: "in" },
  { label: "Data", angle: 212, dir: "in" },
  { label: "Answers", angle: 32, dir: "out" },
  { label: "Actions", angle: 0, dir: "out" },
  { label: "Insights", angle: -32, dir: "out" },
] as const;

/** Orbit rings drawn as tilted ellipses (radius as a share of the canvas). */
const rings = [
  { r: 0.2, flat: 0.34, tilt: -0.35, speed: 0.55, dots: 3 },
  { r: 0.26, flat: 0.3, tilt: 0.42, speed: -0.38, dots: 2 },
  { r: 0.31, flat: 0.22, tilt: 1.35, speed: 0.27, dots: 2 },
];

/** Faint background specks. */
const specks = Array.from({ length: 46 }, (_, i) => ({
  x: rand(i),
  y: rand(i + 200),
  s: 0.6 + rand(i + 400) * 1.4,
  p: rand(i + 600) * Math.PI * 2,
}));

function glowDot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, size);
  g.addColorStop(0, `rgba(255,255,255,${alpha.toFixed(3)})`);
  g.addColorStop(0.35, `rgba(${CYAN},${(alpha * 0.85).toFixed(3)})`);
  g.addColorStop(1, `rgba(${CYAN},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h);
  const orb = R * 0.12;
  const breathe = 1 + 0.04 * Math.sin(t * 1.6);

  // Specks
  for (const s of specks) {
    const a = 0.12 + 0.12 * Math.sin(t * 0.9 + s.p);
    ctx.fillStyle = `rgba(${BLUE},${a.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Big ambient glow behind everything
  const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.48);
  ambient.addColorStop(0, `rgba(${CYAN},0.22)`);
  ambient.addColorStop(0.5, `rgba(${BLUE},0.07)`);
  ambient.addColorStop(1, `rgba(${BLUE},0)`);
  ctx.fillStyle = ambient;
  ctx.fillRect(0, 0, w, h);

  // Spokes + data packets
  const nodeR = R * 0.4;
  const nodeSize = Math.max(5, R / 75);
  const labelFont = `500 ${Math.max(11, R / 38).toFixed(1)}px Inter, system-ui, sans-serif`;
  spokes.forEach((sp, i) => {
    const a = (sp.angle * Math.PI) / 180;
    const nx = cx + Math.cos(a) * nodeR;
    const ny = cy - Math.sin(a) * nodeR * 0.82;
    const ex = cx + Math.cos(a) * orb * 1.25;
    const ey = cy - Math.sin(a) * orb * 1.25;

    // Curved link (bends slightly toward the horizontal)
    const mx = (nx + ex) / 2;
    const my = (ny + ey) / 2 + (cy - (ny + ey) / 2) * 0.25;
    const line = ctx.createLinearGradient(nx, ny, ex, ey);
    line.addColorStop(0, `rgba(${BLUE},0.18)`);
    line.addColorStop(1, `rgba(${CYAN},0.4)`);
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.quadraticCurveTo(mx, my, ex, ey);
    ctx.stroke();

    // Two packets per spoke, inward for inputs and outward for outputs
    for (let k = 0; k < 2; k++) {
      let p = (t * 0.42 + i * 0.17 + k * 0.5) % 1;
      if (sp.dir === "out") p = 1 - p;
      const q = 1 - p;
      const px = q * q * nx + 2 * q * p * mx + p * p * ex;
      const py = q * q * ny + 2 * q * p * my + p * p * ey;
      const fade = Math.sin(Math.PI * p);
      glowDot(ctx, px, py, nodeSize * 1.8, 0.9 * fade);
    }

    // Node
    const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i);
    const halo = ctx.createRadialGradient(nx, ny, 0, nx, ny, nodeSize * 4);
    halo.addColorStop(0, `rgba(${sp.dir === "in" ? CYAN : VIOLET},${(0.18 + 0.12 * pulse).toFixed(3)})`);
    halo.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(nx, ny, nodeSize * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = `rgba(${sp.dir === "in" ? BLUE : VIOLET},0.85)`;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(nx, ny, nodeSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Label above the node
    ctx.font = labelFont;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "rgba(51,65,85,0.9)";
    ctx.fillText(sp.label, nx, ny - nodeSize * 2);
  });

  // Rings: back halves first (behind the orb), front halves after.
  const ringPoint = (ring: (typeof rings)[number], ang: number) => {
    const rx = R * ring.r;
    const ry = rx * ring.flat;
    const x0 = Math.cos(ang) * rx;
    const y0 = Math.sin(ang) * ry;
    return {
      x: cx + x0 * Math.cos(ring.tilt) - y0 * Math.sin(ring.tilt),
      y: cy + x0 * Math.sin(ring.tilt) + y0 * Math.cos(ring.tilt),
      front: Math.sin(ang) > 0,
    };
  };
  const drawRings = (front: boolean) => {
    rings.forEach((ring) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ring.tilt);
      ctx.strokeStyle = `rgba(${BLUE},${front ? 0.5 : 0.22})`;
      ctx.lineWidth = front ? 1.6 : 1.1;
      ctx.beginPath();
      ctx.ellipse(0, 0, R * ring.r, R * ring.r * ring.flat, 0, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      for (let d = 0; d < ring.dots; d++) {
        const ang = t * ring.speed + (d / ring.dots) * Math.PI * 2;
        const p = ringPoint(ring, ang);
        if (p.front !== front) continue;
        glowDot(ctx, p.x, p.y, R * (front ? 0.022 : 0.015), front ? 0.95 : 0.45);
      }
    });
  };
  drawRings(false);

  // The orb
  const r = orb * breathe;
  const outer = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 2.6);
  outer.addColorStop(0, `rgba(${CYAN},0.45)`);
  outer.addColorStop(1, `rgba(${CYAN},0)`);
  ctx.fillStyle = outer;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 2.6, 0, Math.PI * 2);
  ctx.fill();

  const body = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
  body.addColorStop(0, "rgba(255,255,255,1)");
  body.addColorStop(0.35, `rgba(${CYAN},0.95)`);
  body.addColorStop(0.8, `rgba(${BLUE},0.95)`);
  body.addColorStop(1, `rgba(${VIOLET},0.9)`);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Swirling "thinking" arcs inside the orb
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.96, 0, Math.PI * 2);
  ctx.clip();
  ctx.lineCap = "round";
  for (let k = 0; k < 3; k++) {
    const rr = r * (0.35 + k * 0.2);
    const start = t * (1.2 - k * 0.3) * (k % 2 ? -1 : 1) + k;
    ctx.strokeStyle = `rgba(255,255,255,${(0.55 - k * 0.12).toFixed(3)})`;
    ctx.lineWidth = Math.max(1.2, r * 0.05);
    ctx.beginPath();
    ctx.arc(cx, cy, rr, start, start + Math.PI * 0.9);
    ctx.stroke();
  }
  ctx.restore();

  // "AI" mark
  ctx.font = `700 ${(r * 0.62).toFixed(1)}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.fillText("AI", cx, cy + r * 0.04);

  drawRings(true);
}

export function AiCore({ className }: { className?: string }) {
  const ref = useCanvasAnimation(draw);
  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
