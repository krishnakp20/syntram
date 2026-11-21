"use client";

import { globeLandPoints } from "./globe-data";
import { useCanvasAnimation } from "./use-canvas-animation";

/** Office locations; arcs run from the HQ to each of the others. */
const places = [
  { name: "Pune", lon: 73.86, lat: 18.52, hq: true },
  { name: "Ghaziabad", lon: 77.44, lat: 28.67 },
  { name: "Dubai", lon: 55.27, lat: 25.2 },
  { name: "Bangkok", lon: 100.5, lat: 13.76 },
  { name: "Ireland", lon: -6.26, lat: 53.35 },
  { name: "Melbourne", lon: 145.1, lat: -37.6 },
];

const RAD = Math.PI / 180;
const TILT = 18 * RAD; // view from slightly north
const SPIN = 7; // degrees per second

type Vec = [number, number, number];
const toVec = (lon: number, lat: number): Vec => [
  Math.cos(lat * RAD) * Math.sin(lon * RAD),
  Math.sin(lat * RAD),
  Math.cos(lat * RAD) * Math.cos(lon * RAD),
];

const land: Vec[] = [];
for (let i = 0; i < globeLandPoints.length; i += 2) land.push(toVec(globeLandPoints[i] / 10, globeLandPoints[i + 1] / 10));
const placeVecs = places.map((p) => toVec(p.lon, p.lat));
const hq = placeVecs[0];

/** Points along the great circle between two unit vectors, lifted off the surface. */
function arcPoints(a: Vec, b: Vec, steps = 48): Vec[] {
  const dot = Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  const omega = Math.acos(dot);
  const out: Vec[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const s1 = Math.sin((1 - t) * omega) / Math.sin(omega);
    const s2 = Math.sin(t * omega) / Math.sin(omega);
    const lift = 1 + 0.08 * Math.sin(Math.PI * t) * (0.6 + omega);
    out.push([(a[0] * s1 + b[0] * s2) * lift, (a[1] * s1 + b[1] * s2) * lift, (a[2] * s1 + b[2] * s2) * lift]);
  }
  return out;
}
const arcs = placeVecs.slice(1).map((v) => arcPoints(hq, v));

/** Rotate around the Y axis (spin), then tilt around X. Returns [x, y, depth]. */
function project(v: Vec, spin: number): Vec {
  const cs = Math.cos(spin);
  const sn = Math.sin(spin);
  const x = v[0] * cs - v[2] * sn;
  const z0 = v[0] * sn + v[2] * cs;
  const y = v[1] * Math.cos(TILT) - z0 * Math.sin(TILT);
  const z = v[1] * Math.sin(TILT) + z0 * Math.cos(TILT);
  return [x, y, z];
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  const r = Math.min(w, h) * 0.4;
  const cx = w / 2;
  const cy = h / 2;
  // Start with India facing the viewer, then spin slowly (west to east, like Earth).
  const spin = (76 - t * SPIN) * RAD;

  // Atmosphere glow
  const glow = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.35);
  glow.addColorStop(0, "rgba(34,184,255,0.22)");
  glow.addColorStop(1, "rgba(34,184,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Globe body
  const body = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
  body.addColorStop(0, "#0b2a5c");
  body.addColorStop(1, "#020817");
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();
  ctx.strokeStyle = "rgba(34,184,255,0.35)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Land dots — brighter toward the centre of the visible face
  const dot = Math.max(1, r / 130);
  for (const v of land) {
    const [x, y, z] = project(v, spin);
    if (z <= 0) continue;
    ctx.fillStyle = `rgba(${Math.round(70 + 90 * z)},${Math.round(170 + 60 * z)},255,${(0.25 + 0.7 * z).toFixed(3)})`;
    ctx.fillRect(cx + x * r - dot / 2, cy - y * r - dot / 2, dot, dot);
  }

  // Arcs with a travelling highlight
  ctx.lineCap = "round";
  arcs.forEach((arc, i) => {
    const pts = arc.map((v) => project(v, spin));
    ctx.beginPath();
    let started = false;
    for (const [x, y, z] of pts) {
      if (z <= -0.05) {
        started = false;
        continue;
      }
      const px = cx + x * r;
      const py = cy - y * r;
      if (started) ctx.lineTo(px, py);
      else ctx.moveTo(px, py);
      started = true;
    }
    ctx.strokeStyle = "rgba(34,184,255,0.45)";
    ctx.lineWidth = Math.max(1, r / 180);
    ctx.stroke();

    const head = ((t * 0.35 + i * 0.21) % 1) * (pts.length - 1);
    const [hx, hy, hz] = pts[Math.floor(head)];
    if (hz > -0.05) {
      const g = ctx.createRadialGradient(cx + hx * r, cy - hy * r, 0, cx + hx * r, cy - hy * r, r / 22);
      g.addColorStop(0, "rgba(180,240,255,0.95)");
      g.addColorStop(1, "rgba(34,184,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx + hx * r, cy - hy * r, r / 22, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Location pins
  places.forEach((p, i) => {
    const [x, y, z] = project(placeVecs[i], spin);
    if (z <= 0) return;
    const px = cx + x * r;
    const py = cy - y * r;
    const pulse = (t * 0.8 + i * 0.3) % 1;
    ctx.beginPath();
    ctx.arc(px, py, (p.hq ? 5 : 3.5) + pulse * 10, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(34,184,255,${(0.6 * (1 - pulse)).toFixed(3)})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px, py, p.hq ? 4.5 : 3, 0, Math.PI * 2);
    ctx.fillStyle = p.hq ? "#ffffff" : "#7fd8ff";
    ctx.fill();
    if (z > 0.35) {
      ctx.font = `${p.hq ? 600 : 500} ${Math.max(10, r / 22)}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = `rgba(230,240,255,${Math.min(1, (z - 0.35) * 3).toFixed(3)})`;
      ctx.fillText(p.hq ? `${p.name} · HQ` : p.name, px + 8, py - 6);
    }
  });
}

/** Rotating dotted globe with arcs from Pune HQ to each location. Decorative. */
export function GlobeVisual({ className }: { className?: string }) {
  const ref = useCanvasAnimation(draw);
  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
