"use client";

import { useCanvasAnimation } from "./use-canvas-animation";

/**
 * Animated hero visuals for the service pages, drawn on <canvas> for a dark
 * panel. Each one illustrates what the service does; all text in them is
 * example content, not customer data or performance claims. Decorative.
 */

type Ctx = CanvasRenderingContext2D;

const CYAN = "34,184,255";
const BLUE = "22,104,214";
const VIOLET = "124,92,255";
const GREEN = "52,211,153";
const INK = "rgba(200,220,245,0.88)";
const DIM = "rgba(160,185,220,0.55)";

const FONT = "Inter, system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

/* ---------------------------------------------------------------- helpers */

function glow(ctx: Ctx, x: number, y: number, r: number, alpha: number, rgb = CYAN) {
  if (alpha <= 0.01) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(255,255,255,${(alpha * 0.95).toFixed(3)})`);
  g.addColorStop(0.3, `rgba(${rgb},${(alpha * 0.8).toFixed(3)})`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function ambient(ctx: Ctx, w: number, h: number, rgb = CYAN, strength = 0.16) {
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
  g.addColorStop(0, `rgba(${rgb},${strength})`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function box(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string | CanvasGradient,
  stroke?: string,
  lw = 1,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

function text(
  ctx: Ctx,
  value: string,
  x: number,
  y: number,
  size: number,
  color = INK,
  align: CanvasTextAlign = "left",
  weight = 500,
  family = FONT,
) {
  ctx.font = `${weight} ${size.toFixed(1)}px ${family}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(value, x, y);
}

function line(ctx: Ctx, x1: number, y1: number, x2: number, y2: number, stroke: string, lw = 1) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function check(ctx: Ctx, x: number, y: number, s: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.6, s * 0.18);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x - s * 0.4, y);
  ctx.lineTo(x - s * 0.1, y + s * 0.3);
  ctx.lineTo(x + s * 0.45, y - s * 0.35);
  ctx.stroke();
}

const ease = (k: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, k)), 3);
const clamp01 = (k: number) => Math.min(1, Math.max(0, k));

/** Deterministic pseudo-random so the server and every visit look the same. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/* ------------------------------------------------------------- Voice AI */

const VOICE_LINES = [
  { who: "Caller", text: "Hi, can I move my booking to Thursday?" },
  { who: "Agent", text: "Sure! Thursday has 11:30 or 3:00 free." },
  { who: "Caller", text: "11:30 works, thanks." },
  { who: "Agent", text: "Done. You'll get an SMS confirmation." },
];

function drawVoice(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h);
  const cx = w / 2;
  const cy = h * 0.42;
  const R = Math.min(w, h);
  const core = R * 0.11;

  // Speaking state alternates with the transcript line.
  const turn = Math.floor(t / 3.2) % VOICE_LINES.length;
  const speaking = VOICE_LINES[turn].who === "Agent" ? VIOLET : CYAN;

  // Ripples
  for (let k = 0; k < 3; k++) {
    const p = (t * 0.45 + k / 3) % 1;
    ctx.strokeStyle = `rgba(${speaking},${(0.35 * (1 - p)).toFixed(3)})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, core * (1.6 + p * 2.6), 0, Math.PI * 2);
    ctx.stroke();
  }

  // Radial audio bars
  const bars = 72;
  for (let i = 0; i < bars; i++) {
    const a = (i / bars) * Math.PI * 2;
    const amp =
      0.35 +
      0.65 *
        Math.abs(
          Math.sin(t * 3.1 + i * 0.45) * 0.6 + Math.sin(t * 5.3 + i * 0.21) * 0.3 + Math.sin(t * 1.7 + i) * 0.2,
        );
    const r1 = core * 1.35;
    const r2 = r1 + R * 0.11 * amp;
    const grad = ctx.createLinearGradient(
      cx + Math.cos(a) * r1,
      cy + Math.sin(a) * r1,
      cx + Math.cos(a) * r2,
      cy + Math.sin(a) * r2,
    );
    grad.addColorStop(0, `rgba(${speaking},0.9)`);
    grad.addColorStop(1, `rgba(${BLUE},0.15)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(2, R / 160);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }

  // Core
  glow(ctx, cx, cy, core * 2.2, 0.55, speaking);
  const body = ctx.createRadialGradient(cx - core * 0.3, cy - core * 0.3, core * 0.1, cx, cy, core);
  body.addColorStop(0, "#ffffff");
  body.addColorStop(0.45, `rgba(${speaking},1)`);
  body.addColorStop(1, `rgba(${BLUE},1)`);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(cx, cy, core, 0, Math.PI * 2);
  ctx.fill();
  text(ctx, VOICE_LINES[turn].who === "Agent" ? "AI" : "◉", cx, cy + 1, core * 0.62, "#ffffff", "center", 700);

  // Status chip
  const chipW = R * 0.34;
  box(ctx, cx - chipW / 2, R * 0.06, chipW, R * 0.06, R * 0.03, "rgba(255,255,255,0.05)", "rgba(255,255,255,0.12)");
  glow(ctx, cx - chipW / 2 + R * 0.035, R * 0.09, R * 0.018, 0.6 + 0.4 * Math.sin(t * 4), "239,68,68");
  text(ctx, "LIVE CALL · 00:" + String(Math.floor(t % 60)).padStart(2, "0"), cx + R * 0.015, R * 0.09, R / 40, INK, "center", 600, MONO);

  // Transcript bubble with typing effect
  const line0 = VOICE_LINES[turn];
  const shown = Math.floor(clamp01((t % 3.2) / 1.6) * line0.text.length);
  const bw = w * 0.84;
  const bx = (w - bw) / 2;
  const by = h * 0.74;
  const isAgent = line0.who === "Agent";
  box(
    ctx,
    bx,
    by,
    bw,
    R * 0.16,
    R * 0.03,
    isAgent ? `rgba(${VIOLET},0.12)` : "rgba(255,255,255,0.05)",
    isAgent ? `rgba(${VIOLET},0.45)` : "rgba(255,255,255,0.14)",
  );
  text(ctx, line0.who.toUpperCase(), bx + R * 0.035, by + R * 0.045, R / 46, isAgent ? `rgb(${VIOLET})` : `rgb(${CYAN})`, "left", 700, MONO);
  const caret = Math.sin(t * 8) > 0 && shown < line0.text.length ? "▍" : "";
  text(ctx, line0.text.slice(0, shown) + caret, bx + R * 0.035, by + R * 0.105, R / 30, INK);

  // Pipeline under the bubble
  const steps = ["Speech", "Understand", "Act", "Reply"];
  const active = Math.floor((t * 1.25) % steps.length);
  steps.forEach((s, i) => {
    const x = bx + (bw * (i + 0.5)) / steps.length;
    const y = h * 0.95;
    text(ctx, s, x, y, R / 42, i === active ? `rgb(${CYAN})` : DIM, "center", i === active ? 700 : 500);
    if (i < steps.length - 1) line(ctx, x + R * 0.07, y, x + bw / steps.length - R * 0.07, y, "rgba(255,255,255,0.12)");
  });
}

/* ------------------------------------------------------ Custom software */

const CODE = [
  [["kw", 3], ["fn", 7], ["p", 2]],
  [["sp", 2], ["kw", 4], ["v", 6], ["p", 1], ["s", 9]],
  [["sp", 2], ["kw", 2], ["v", 5], ["p", 2]],
  [["sp", 4], ["fn", 8], ["p", 1], ["v", 4], ["p", 2]],
  [["sp", 4], ["kw", 5], ["v", 7]],
  [["sp", 2], ["p", 1]],
  [["sp", 2], ["kw", 6], ["fn", 6], ["p", 2], ["s", 6], ["p", 1]],
  [["p", 1]],
] as const;
const TOKEN: Record<string, string> = {
  kw: `rgba(${VIOLET},0.95)`,
  fn: `rgba(${CYAN},0.95)`,
  v: "rgba(220,230,245,0.75)",
  s: `rgba(${GREEN},0.85)`,
  p: "rgba(160,185,220,0.5)",
};

function drawCode(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, VIOLET, 0.12);
  const R = Math.min(w, h);
  const pad = R * 0.08;

  // Editor window
  const ex = pad;
  const ey = pad;
  const ew = w - pad * 2;
  const eh = h * 0.5;
  box(ctx, ex, ey, ew, eh, R * 0.03, "rgba(255,255,255,0.035)", "rgba(255,255,255,0.12)");
  ["239,68,68", "245,158,11", GREEN].forEach((c, i) => {
    ctx.fillStyle = `rgba(${c},0.8)`;
    ctx.beginPath();
    ctx.arc(ex + R * (0.04 + i * 0.03), ey + R * 0.035, R * 0.009, 0, Math.PI * 2);
    ctx.fill();
  });
  text(ctx, "orders/service.ts", ex + ew / 2, ey + R * 0.035, R / 46, DIM, "center", 500, MONO);
  line(ctx, ex, ey + R * 0.07, ex + ew, ey + R * 0.07, "rgba(255,255,255,0.08)");

  const unit = (ew - R * 0.14) / 34;
  const lh = (eh - R * 0.11) / CODE.length;
  const typed = (t * 14) % (CODE.length * 12 + 20);
  CODE.forEach((tokens, li) => {
    const y = ey + R * 0.1 + li * lh + lh / 2;
    text(ctx, String(li + 1), ex + R * 0.035, y, R / 52, "rgba(160,185,220,0.35)", "center", 500, MONO);
    let x = ex + R * 0.07;
    const visibleChars = typed - li * 12;
    let used = 0;
    for (const [kind, len] of tokens) {
      const show = Math.max(0, Math.min(len, visibleChars - used));
      used += len;
      if (kind !== "sp" && show > 0) box(ctx, x, y - lh * 0.17, unit * show - 2, lh * 0.34, 2, TOKEN[kind]);
      x += unit * len;
      if (show < len && kind !== "sp" && show >= 0 && visibleChars - used + len > 0 && Math.sin(t * 8) > 0) {
        box(ctx, x - unit * (len - show), y - lh * 0.28, 2, lh * 0.56, 1, `rgb(${CYAN})`);
      }
    }
  });

  // Architecture: UI → API → Services → Database, with packets
  const nodes = [
    { label: "Web & app", x: 0.17 },
    { label: "API", x: 0.39 },
    { label: "Services", x: 0.61 },
    { label: "Database", x: 0.83 },
  ];
  const ny = h * 0.78;
  const nw = R * 0.17;
  const nh = R * 0.11;
  nodes.forEach((n, i) => {
    const x = w * n.x;
    if (i < nodes.length - 1) {
      const x2 = w * nodes[i + 1].x;
      line(ctx, x + nw / 2, ny, x2 - nw / 2, ny, `rgba(${CYAN},0.3)`, 1.2);
      for (let k = 0; k < 2; k++) {
        const p = (t * 0.6 + k * 0.5 + i * 0.2) % 1;
        const dir = k === 0 ? p : 1 - p;
        glow(ctx, x + nw / 2 + (x2 - x - nw) * dir, ny, R * 0.022, 0.85 * Math.sin(Math.PI * p), k === 0 ? CYAN : VIOLET);
      }
    }
    const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i);
    box(ctx, x - nw / 2, ny - nh / 2, nw, nh, R * 0.02, `rgba(${BLUE},${(0.18 + 0.1 * pulse).toFixed(3)})`, `rgba(${CYAN},0.55)`, 1.2);
    text(ctx, n.label, x, ny, R / 40, INK, "center", 600);
  });
  text(ctx, "Clean architecture · tested · documented", w / 2, h * 0.93, R / 42, DIM, "center");
}

/* -------------------------------------------------------- Web development */

function ring(ctx: Ctx, x: number, y: number, r: number, k: number, rgb: string) {
  ctx.lineWidth = r * 0.22;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = `rgb(${rgb})`;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k);
  ctx.stroke();
}

function drawWeb(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h);
  const R = Math.min(w, h);
  const cycle = t % 8;
  const step = (start: number) => ease((cycle - start) / 0.6);

  // Browser
  const bx = R * 0.08;
  const by = R * 0.07;
  const bw = w - bx * 2;
  const bh = h * 0.62;
  box(ctx, bx, by, bw, bh, R * 0.03, "rgba(255,255,255,0.035)", "rgba(255,255,255,0.13)");
  box(ctx, bx + R * 0.13, by + R * 0.02, bw - R * 0.2, R * 0.035, R * 0.018, "rgba(255,255,255,0.06)");
  text(ctx, "🔒 yourcompany.com", bx + R * 0.15, by + R * 0.038, R / 48, DIM, "left", 500, MONO);
  ["239,68,68", "245,158,11", GREEN].forEach((c, i) => {
    ctx.fillStyle = `rgba(${c},0.8)`;
    ctx.beginPath();
    ctx.arc(bx + R * (0.035 + i * 0.028), by + R * 0.038, R * 0.008, 0, Math.PI * 2);
    ctx.fill();
  });
  const ix = bx + R * 0.03;
  const iw = bw - R * 0.06;
  let y = by + R * 0.085;

  // Nav
  const a1 = step(0.2);
  box(ctx, ix, y, iw * a1, R * 0.04, R * 0.01, `rgba(${BLUE},0.35)`);
  y += R * 0.06;
  // Hero
  const a2 = step(0.8);
  ctx.globalAlpha = a2;
  box(ctx, ix, y + (1 - a2) * 12, iw * 0.55, R * 0.035, 4, "rgba(255,255,255,0.75)");
  box(ctx, ix, y + R * 0.05 + (1 - a2) * 12, iw * 0.4, R * 0.035, 4, `rgba(${CYAN},0.9)`);
  box(ctx, ix, y + R * 0.11 + (1 - a2) * 12, iw * 0.5, R * 0.018, 3, "rgba(255,255,255,0.25)");
  box(ctx, ix, y + R * 0.15 + (1 - a2) * 12, R * 0.16, R * 0.045, R * 0.022, `rgba(${CYAN},0.95)`);
  ctx.globalAlpha = 1;
  // Hero image block
  const a3 = step(1.3);
  ctx.globalAlpha = a3;
  const img = ctx.createLinearGradient(ix + iw * 0.6, y, ix + iw, y + R * 0.2);
  img.addColorStop(0, `rgba(${BLUE},0.5)`);
  img.addColorStop(1, `rgba(${VIOLET},0.45)`);
  box(ctx, ix + iw * 0.62, y, iw * 0.38, R * 0.2, R * 0.02, img);
  ctx.globalAlpha = 1;
  y += R * 0.25;
  // Cards
  for (let i = 0; i < 3; i++) {
    const a = step(1.9 + i * 0.35);
    const cw = (iw - R * 0.04) / 3;
    const cx = ix + i * (cw + R * 0.02);
    ctx.globalAlpha = a;
    box(ctx, cx, y + (1 - a) * 16, cw, bh - (y - by) - R * 0.03, R * 0.015, "rgba(255,255,255,0.05)", "rgba(255,255,255,0.1)");
    box(ctx, cx + R * 0.02, y + R * 0.025 + (1 - a) * 16, R * 0.04, R * 0.04, R * 0.01, `rgba(${CYAN},0.6)`);
    box(ctx, cx + R * 0.02, y + R * 0.085 + (1 - a) * 16, cw * 0.6, R * 0.015, 3, "rgba(255,255,255,0.4)");
    ctx.globalAlpha = 1;
  }

  // Scores
  const labels = ["Performance", "Accessibility", "SEO"];
  const target = [0.98, 1, 1];
  labels.forEach((l, i) => {
    const x = w * (0.25 + i * 0.25);
    const yy = h * 0.82;
    const k = ease((cycle - 3.2 - i * 0.2) / 1.2) * target[i];
    ring(ctx, x, yy, R * 0.06, k, GREEN);
    text(ctx, String(Math.round(k * 100)), x, yy + 1, R / 30, "#ffffff", "center", 700);
    text(ctx, l, x, yy + R * 0.11, R / 44, DIM, "center");
  });
}

/* ----------------------------------------------------- Mobile app development */

function drawMobile(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, VIOLET, 0.14);
  const R = Math.min(w, h);
  const pw = R * 0.42;
  const ph = R * 0.8;
  const px = (w - pw) / 2;
  const py = (h - ph) / 2 + Math.sin(t * 0.8) * R * 0.01;

  // Orbiting platform chips
  ["iOS", "Android", "Offline", "Push"].forEach((label, i) => {
    const a = t * 0.35 + (i / 4) * Math.PI * 2;
    const x = w / 2 + Math.cos(a) * R * 0.38;
    const y = h / 2 + Math.sin(a) * R * 0.16;
    const front = Math.sin(a) > 0;
    if (front) return;
    box(ctx, x - R * 0.07, y - R * 0.025, R * 0.14, R * 0.05, R * 0.025, "rgba(255,255,255,0.04)", `rgba(${CYAN},0.25)`);
    text(ctx, label, x, y, R / 44, DIM, "center", 600);
  });

  // Phone
  glow(ctx, w / 2, h / 2, R * 0.45, 0.18, BLUE);
  box(ctx, px, py, pw, ph, R * 0.06, "#05080f", "rgba(255,255,255,0.22)", 2);
  box(ctx, px + pw * 0.36, py + R * 0.02, pw * 0.28, R * 0.022, R * 0.011, "rgba(255,255,255,0.12)");
  const sx = px + R * 0.025;
  const sw = pw - R * 0.05;
  let y = py + R * 0.07;
  text(ctx, "Good morning 👋", sx + R * 0.01, y, R / 36, "#ffffff", "left", 700);
  y += R * 0.05;
  // Balance / hero card
  const card = ctx.createLinearGradient(sx, y, sx + sw, y + R * 0.15);
  card.addColorStop(0, `rgba(${BLUE},0.9)`);
  card.addColorStop(1, `rgba(${VIOLET},0.85)`);
  ctx.beginPath();
  ctx.roundRect(sx, y, sw, R * 0.15, R * 0.025);
  ctx.fillStyle = card;
  ctx.fill();
  text(ctx, "Orders this week", sx + R * 0.025, y + R * 0.035, R / 50, "rgba(255,255,255,0.8)");
  text(ctx, String(120 + Math.floor((t * 3) % 40)), sx + R * 0.025, y + R * 0.085, R / 22, "#ffffff", "left", 700);
  // Mini chart
  for (let i = 0; i < 7; i++) {
    const bh = R * 0.02 + R * 0.05 * (0.5 + 0.5 * Math.sin(t * 1.5 + i));
    box(ctx, sx + sw * 0.55 + i * sw * 0.055, y + R * 0.12 - bh, sw * 0.035, bh, 2, "rgba(255,255,255,0.7)");
  }
  y += R * 0.18;
  // List rows with shimmer
  for (let i = 0; i < 4; i++) {
    const ry = y + i * R * 0.07;
    box(ctx, sx, ry, sw, R * 0.058, R * 0.015, "rgba(255,255,255,0.045)");
    ctx.fillStyle = `rgba(${[CYAN, VIOLET, GREEN, CYAN][i]},0.8)`;
    ctx.beginPath();
    ctx.arc(sx + R * 0.03, ry + R * 0.029, R * 0.014, 0, Math.PI * 2);
    ctx.fill();
    box(ctx, sx + R * 0.06, ry + R * 0.015, sw * 0.45, R * 0.011, 3, "rgba(255,255,255,0.55)");
    box(ctx, sx + R * 0.06, ry + R * 0.033, sw * 0.3, R * 0.009, 3, "rgba(255,255,255,0.22)");
    const sh = ((t * 0.5 + i * 0.15) % 1.4) - 0.2;
    if (sh > 0 && sh < 1) {
      const g = ctx.createLinearGradient(sx + sw * sh - 30, 0, sx + sw * sh + 30, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,0.07)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(sx, ry, sw, R * 0.058);
    }
  }
  // Tab bar
  const tby = py + ph - R * 0.075;
  for (let i = 0; i < 4; i++) {
    const x = sx + (sw * (i + 0.5)) / 4;
    ctx.fillStyle = i === Math.floor(t / 2) % 4 ? `rgb(${CYAN})` : "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.roundRect(x - R * 0.014, tby, R * 0.028, R * 0.028, R * 0.008);
    ctx.fill();
  }
  // Push notification slides in
  const n = t % 6;
  const k = n < 0.6 ? ease(n / 0.6) : n < 3.2 ? 1 : n < 3.8 ? 1 - ease((n - 3.2) / 0.6) : 0;
  if (k > 0) {
    const ny = py + R * 0.035 + (k - 1) * R * 0.1;
    ctx.globalAlpha = k;
    box(ctx, sx - R * 0.01, ny, sw + R * 0.02, R * 0.07, R * 0.02, "rgba(30,40,60,0.95)", `rgba(${CYAN},0.5)`);
    ctx.fillStyle = `rgb(${CYAN})`;
    ctx.beginPath();
    ctx.roundRect(sx + R * 0.008, ny + R * 0.017, R * 0.036, R * 0.036, R * 0.01);
    ctx.fill();
    text(ctx, "Order #2041 shipped", sx + R * 0.055, ny + R * 0.026, R / 50, "#ffffff", "left", 700);
    text(ctx, "Arriving tomorrow", sx + R * 0.055, ny + R * 0.048, R / 56, DIM);
    ctx.globalAlpha = 1;
  }

  // Front chips (over the phone)
  ["iOS", "Android", "Offline", "Push"].forEach((label, i) => {
    const a = t * 0.35 + (i / 4) * Math.PI * 2;
    if (Math.sin(a) <= 0) return;
    const x = w / 2 + Math.cos(a) * R * 0.38;
    const y = h / 2 + Math.sin(a) * R * 0.16;
    box(ctx, x - R * 0.07, y - R * 0.025, R * 0.14, R * 0.05, R * 0.025, "rgba(15,25,45,0.92)", `rgba(${CYAN},0.6)`);
    text(ctx, label, x, y, R / 42, "#ffffff", "center", 600);
  });
}

/* ------------------------------------------------------ API & integration */

const SYSTEMS = ["CRM", "ERP", "Payments", "Telephony", "WhatsApp", "Email", "Calendar", "Analytics"];

function drawApi(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h);
  const orbit = R * 0.36;
  const nodes = SYSTEMS.map((label, i) => {
    const a = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: cx + Math.cos(a) * orbit, y: cy + Math.sin(a) * orbit * 0.9 };
  });

  // Dashed orbit
  ctx.setLineDash([3, 6]);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.ellipse(cx, cy, orbit, orbit * 0.9, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  const heat = new Array(nodes.length).fill(0);
  nodes.forEach((n, i) => {
    line(ctx, cx, cy, n.x, n.y, `rgba(${CYAN},0.22)`, 1.2);
    // Request out (cyan) and response back (violet)
    const p = (t * 0.5 + rand(i) ) % 1;
    const out = p < 0.5;
    const k = out ? p * 2 : (p - 0.5) * 2;
    const x = out ? cx + (n.x - cx) * k : n.x + (cx - n.x) * k;
    const y = out ? cy + (n.y - cy) * k : n.y + (cy - n.y) * k;
    glow(ctx, x, y, R * 0.024, 0.9 * Math.sin(Math.PI * k), out ? CYAN : VIOLET);
    if (out && k > 0.85) heat[i] = (k - 0.85) / 0.15;
    if (!out && k < 0.2) heat[i] = 1 - k / 0.2;
  });

  // Hub
  const hub = R * 0.12;
  glow(ctx, cx, cy, hub * 2.4, 0.4 + 0.1 * Math.sin(t * 2));
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = cx + Math.cos(a) * hub;
    const y = cy + Math.sin(a) * hub;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const hg = ctx.createLinearGradient(cx - hub, cy - hub, cx + hub, cy + hub);
  hg.addColorStop(0, `rgba(${CYAN},1)`);
  hg.addColorStop(1, `rgba(${BLUE},1)`);
  ctx.fillStyle = hg;
  ctx.fill();
  text(ctx, "API", cx, cy - R * 0.012, R / 22, "#ffffff", "center", 800);
  text(ctx, "your hub", cx, cy + R * 0.035, R / 52, "rgba(255,255,255,0.8)", "center", 500, MONO);

  // System nodes
  nodes.forEach((n, i) => {
    const bw = R * 0.17;
    const bh = R * 0.065;
    const hv = heat[i];
    if (hv > 0) glow(ctx, n.x, n.y, R * 0.1, 0.35 * hv);
    box(ctx, n.x - bw / 2, n.y - bh / 2, bw, bh, bh / 2, `rgba(15,25,45,0.95)`, `rgba(${CYAN},${(0.35 + 0.5 * hv).toFixed(3)})`, 1.3);
    text(ctx, n.label, n.x, n.y, R / 40, INK, "center", 600);
  });
}

/* ---------------------------------------------------------- Cloud & DevOps */

function drawCloud(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, BLUE, 0.2);
  const R = Math.min(w, h);

  // Pipeline
  const stages = ["Commit", "Build", "Test", "Deploy", "Monitor"];
  const py = h * 0.2;
  const x0 = w * 0.1;
  const x1 = w * 0.9;
  const progress = (t * 0.32) % 1.25;
  line(ctx, x0, py, x1, py, "rgba(255,255,255,0.1)", 3);
  const gx = x0 + (x1 - x0) * Math.min(1, progress);
  const pg = ctx.createLinearGradient(x0, 0, gx, 0);
  pg.addColorStop(0, `rgba(${BLUE},0.6)`);
  pg.addColorStop(1, `rgba(${CYAN},1)`);
  ctx.strokeStyle = pg;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x0, py);
  ctx.lineTo(gx, py);
  ctx.stroke();
  if (progress < 1) glow(ctx, gx, py, R * 0.04, 0.9);
  stages.forEach((s, i) => {
    const x = x0 + ((x1 - x0) * i) / (stages.length - 1);
    const done = progress >= i / (stages.length - 1);
    ctx.fillStyle = done ? `rgb(${GREEN})` : "#0b1220";
    ctx.strokeStyle = done ? `rgb(${GREEN})` : "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, py, R * 0.026, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (done) check(ctx, x, py, R * 0.026, "#04211a");
    text(ctx, s, x, py + R * 0.06, R / 42, done ? INK : DIM, "center", 600);
  });

  // Cloud outline
  const cy = h * 0.58;
  const cx = w / 2;
  ctx.strokeStyle = `rgba(${CYAN},0.35)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx - R * 0.2, cy, R * 0.12, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(cx - R * 0.06, cy - R * 0.1, R * 0.14, Math.PI * 1.05, Math.PI * 1.85);
  ctx.arc(cx + R * 0.15, cy - R * 0.03, R * 0.12, Math.PI * 1.3, Math.PI * 0.5);
  ctx.closePath();
  ctx.stroke();

  // Instances scaling with load
  const load = 0.5 + 0.5 * Math.sin(t * 0.45);
  const active = 3 + Math.round(load * 5);
  for (let i = 0; i < 8; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const bx = cx - R * 0.25 + col * R * 0.13;
    const by = cy - R * 0.07 + row * R * 0.09;
    const on = i < active;
    box(ctx, bx, by, R * 0.1, R * 0.065, R * 0.012, on ? `rgba(${BLUE},0.35)` : "rgba(255,255,255,0.03)", on ? `rgba(${CYAN},0.6)` : "rgba(255,255,255,0.1)");
    if (on) {
      const u = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.3 + i));
      box(ctx, bx + R * 0.012, by + R * 0.045, (R * 0.076) * u, R * 0.01, 2, `rgba(${GREEN},0.9)`);
      ctx.fillStyle = `rgba(${GREEN},${(0.6 + 0.4 * Math.sin(t * 3 + i)).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(bx + R * 0.018, by + R * 0.02, R * 0.006, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Footer stats (example)
  text(ctx, `instances ${active}/8`, w * 0.2, h * 0.9, R / 40, INK, "center", 600, MONO);
  text(ctx, `cpu ${Math.round(35 + load * 40)}%`, w * 0.5, h * 0.9, R / 40, INK, "center", 600, MONO);
  text(ctx, "status ● healthy", w * 0.8, h * 0.9, R / 40, `rgb(${GREEN})`, "center", 600, MONO);
}

/* ------------------------------------------------------------- QA & testing */

const TESTS = [
  "Login & sign-up flow",
  "Checkout and payments",
  "API contract tests",
  "AI answer accuracy",
  "Mobile layouts",
  "Load test · 1k users",
  "Security scan",
];

function drawQa(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, GREEN, 0.1);
  const R = Math.min(w, h);
  const cycle = t % 9;
  const per = 0.7;
  const pad = R * 0.08;

  box(ctx, pad, pad, w - pad * 2, h * 0.66, R * 0.03, "rgba(255,255,255,0.035)", "rgba(255,255,255,0.12)");
  text(ctx, "Test suite · release 2.4", pad + R * 0.035, pad + R * 0.045, R / 40, INK, "left", 700);
  const passed = Math.max(0, Math.min(TESTS.length, Math.floor((cycle - 0.4) / per)));
  text(ctx, `${passed}/${TESTS.length} passed`, w - pad - R * 0.035, pad + R * 0.045, R / 44, `rgb(${GREEN})`, "right", 700, MONO);
  line(ctx, pad, pad + R * 0.085, w - pad, pad + R * 0.085, "rgba(255,255,255,0.08)");

  const rh = (h * 0.66 - R * 0.11) / TESTS.length;
  TESTS.forEach((name, i) => {
    const y = pad + R * 0.1 + i * rh + rh / 2;
    const start = 0.4 + i * per;
    const state = cycle < start ? "wait" : cycle < start + per ? "run" : "pass";
    const ix = pad + R * 0.05;
    if (state === "pass") {
      ctx.fillStyle = `rgba(${GREEN},0.18)`;
      ctx.beginPath();
      ctx.arc(ix, y, R * 0.02, 0, Math.PI * 2);
      ctx.fill();
      check(ctx, ix, y, R * 0.022, `rgb(${GREEN})`);
    } else if (state === "run") {
      ctx.strokeStyle = `rgb(${CYAN})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ix, y, R * 0.016, t * 8, t * 8 + Math.PI * 1.4);
      ctx.stroke();
    } else {
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ix, y, R * 0.016, 0, Math.PI * 2);
      ctx.stroke();
    }
    text(ctx, name, ix + R * 0.045, y, R / 38, state === "wait" ? DIM : INK, "left", 500);
    const ms = 40 + Math.floor(rand(i) * 300);
    if (state === "pass") text(ctx, `${ms}ms`, w - pad - R * 0.035, y, R / 48, DIM, "right", 500, MONO);
  });

  // Coverage + quality gate
  const k = clamp01((cycle - 0.4) / (TESTS.length * per));
  const gx = w * 0.3;
  const gy = h * 0.86;
  ring(ctx, gx, gy, R * 0.065, k * 0.92, GREEN);
  text(ctx, `${Math.round(k * 92)}%`, gx, gy + 1, R / 34, "#ffffff", "center", 700);
  text(ctx, "coverage", gx + R * 0.1, gy, R / 40, DIM, "left");
  const ready = passed === TESTS.length;
  box(ctx, w * 0.58, gy - R * 0.04, w * 0.3, R * 0.08, R * 0.04, ready ? `rgba(${GREEN},0.18)` : "rgba(255,255,255,0.04)", ready ? `rgba(${GREEN},0.8)` : "rgba(255,255,255,0.15)");
  text(ctx, ready ? "✓ Ready to release" : "Running checks…", w * 0.73, gy, R / 40, ready ? `rgb(${GREEN})` : DIM, "center", 700);
}

/* ------------------------------------------------------------ Staffing */

const ROLES = ["Python", "React", "AI/ML", "DevOps", "QA", "DBA", "Flutter", "UI/UX"];

function avatar(ctx: Ctx, x: number, y: number, s: number, rgb: string, alpha: number) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `rgba(${rgb},0.9)`;
  ctx.beginPath();
  ctx.arc(x, y - s * 0.35, s * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.42, s * 0.55, s * 0.38, 0, Math.PI, 0);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawTeam(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, VIOLET, 0.12);
  const cx = w / 2;
  const cy = h * 0.48;
  const R = Math.min(w, h);

  // Screening ring
  const ringR = R * 0.26;
  ctx.setLineDash([4, 7]);
  ctx.lineDashOffset = -t * 12;
  ctx.strokeStyle = `rgba(${CYAN},0.45)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  text(ctx, "TECHNICAL SCREENING", cx, cy - ringR - R * 0.03, R / 52, `rgb(${CYAN})`, "center", 700, MONO);

  // Candidates travelling in; most pass, some are filtered out at the ring.
  for (let i = 0; i < 14; i++) {
    const a = rand(i) * Math.PI * 2;
    const p = (t * 0.14 + rand(i + 50)) % 1;
    const passes = rand(i + 90) > 0.35;
    const r = R * 0.48 - p * (passes ? R * 0.4 : R * 0.22);
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.92;
    const atRing = Math.abs(r - ringR) < R * 0.02;
    if (!passes && p > 0.95) continue;
    const alpha = passes ? Math.min(1, p * 3) * (p > 0.9 ? (1 - p) * 10 : 1) : Math.min(1, p * 3) * (1 - p);
    avatar(ctx, x, y, R * 0.035, passes ? CYAN : "160,175,200", alpha * 0.85);
    if (atRing) glow(ctx, x, y, R * 0.05, 0.6, passes ? GREEN : "239,68,68");
  }

  // Team in the middle
  glow(ctx, cx, cy, R * 0.18, 0.35, BLUE);
  box(ctx, cx - R * 0.13, cy - R * 0.1, R * 0.26, R * 0.2, R * 0.03, "rgba(10,18,35,0.95)", `rgba(${CYAN},0.55)`, 1.3);
  text(ctx, "Your team", cx, cy - R * 0.06, R / 40, "#ffffff", "center", 700);
  for (let i = 0; i < 4; i++) {
    avatar(ctx, cx - R * 0.075 + i * R * 0.05, cy + R * 0.02, R * 0.04, [CYAN, VIOLET, GREEN, CYAN][i], 0.95);
  }

  // Role chips that light up in turn
  const lit = Math.floor(t * 0.8) % ROLES.length;
  const cw = (w * 0.86) / 4;
  ROLES.forEach((role, i) => {
    const x = w * 0.07 + (i % 4) * cw + cw / 2;
    const y = h * 0.86 + Math.floor(i / 4) * R * 0.07;
    const on = i === lit;
    box(ctx, x - cw * 0.42, y - R * 0.025, cw * 0.84, R * 0.05, R * 0.025, on ? `rgba(${CYAN},0.2)` : "rgba(255,255,255,0.04)", on ? `rgba(${CYAN},0.8)` : "rgba(255,255,255,0.12)");
    text(ctx, role, x, y, R / 44, on ? "#ffffff" : DIM, "center", 600);
  });
}

/* ------------------------------------------------------------- exports */

function makeVisual(draw: (ctx: Ctx, w: number, h: number, t: number) => void) {
  return function ServiceVisual({ className }: { className?: string }) {
    const ref = useCanvasAnimation(draw);
    return <canvas ref={ref} aria-hidden="true" className={className} />;
  };
}

export const VoiceVisual = makeVisual(drawVoice);
export const CodeVisual = makeVisual(drawCode);
export const WebVisual = makeVisual(drawWeb);
export const MobileVisual = makeVisual(drawMobile);
export const ApiVisual = makeVisual(drawApi);
export const CloudVisual = makeVisual(drawCloud);
export const QaVisual = makeVisual(drawQa);
export const TeamVisual = makeVisual(drawTeam);
