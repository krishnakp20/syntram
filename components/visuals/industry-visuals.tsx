"use client";

import {
  ambient,
  avatar,
  BLUE,
  box,
  check,
  clamp01,
  CYAN,
  DIM,
  ease,
  glow,
  GREEN,
  INK,
  line,
  makeVisual,
  MONO,
  pointAlong,
  type Ctx,
  type Pt,
  rand,
  strokePath,
  text,
  VIOLET,
} from "./service-visuals";

/**
 * Animated hero visuals for the industry pages, one per industry, in the same
 * style as the service visuals. All names, numbers and messages are example
 * content, not customer data or performance claims. Decorative.
 */

const AMBER = "251,191,36";

/** A rounded status pill that switches from neutral to coloured when `on`. */
function pill(
  ctx: Ctx,
  cx: number,
  cy: number,
  w: number,
  R: number,
  label: string,
  on: boolean,
  rgb = GREEN,
) {
  box(
    ctx,
    cx - w / 2,
    cy - R * 0.036,
    w,
    R * 0.072,
    R * 0.036,
    on ? `rgba(${rgb},0.16)` : "rgba(255,255,255,0.04)",
    on ? `rgba(${rgb},0.8)` : "rgba(255,255,255,0.14)",
  );
  text(ctx, label, cx, cy, R / 42, on ? `rgb(${rgb})` : DIM, "center", 700);
}

/* ------------------------------------------------------------ Healthcare */

const ECG: Pt[] = [
  [0, 0],
  [0.36, 0],
  [0.39, 0.2],
  [0.42, -1],
  [0.45, 0.55],
  [0.48, 0],
  [0.6, 0],
  [0.66, -0.2],
  [0.72, 0],
  [1, 0],
];

function ecgAt(p: number) {
  for (let i = 1; i < ECG.length; i++) {
    if (p <= ECG[i][0]) {
      const [x0, y0] = ECG[i - 1];
      const [x1, y1] = ECG[i];
      return y0 + ((y1 - y0) * (p - x0)) / (x1 - x0);
    }
  }
  return 0;
}

function drawHealthcare(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, GREEN, 0.08);
  const R = Math.min(w, h);
  const pad = R * 0.07;
  const cycle = t % 8;

  // Heartbeat line
  const ey = pad + R * 0.04;
  ctx.strokeStyle = `rgba(${GREEN},0.85)`;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let x = pad; x <= w - pad; x += 2) {
    const p = (((((x - pad) / (w - pad * 2)) * 2.5 - t * 0.5) % 1) + 1) % 1;
    const y = ey + ecgAt(p) * R * 0.045;
    if (x === pad) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Week calendar
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["9:00", "10:00", "11:30", "14:00", "15:30", "17:00"];
  const gx = pad + R * 0.08;
  const gy = h * 0.2;
  const gw = w - pad - gx;
  const gh = h * 0.47;
  const cw = gw / days.length;
  const rh = gh / (slots.length + 0.6);
  text(
    ctx,
    "Appointments · this week",
    pad,
    gy - R * 0.035,
    R / 44,
    INK,
    "left",
    700,
  );
  days.forEach((d, c) =>
    text(
      ctx,
      d,
      gx + c * cw + cw / 2,
      gy + rh * 0.3,
      R / 50,
      DIM,
      "center",
      600,
      MONO,
    ),
  );
  const target = { c: 3, r: 2 };
  slots.forEach((s, r) => {
    const y = gy + rh * (r + 0.8);
    text(ctx, s, gx - R * 0.015, y + rh / 2, R / 56, DIM, "right", 500, MONO);
    days.forEach((_, c) => {
      const x = gx + c * cw;
      const isTarget = c === target.c && r === target.r;
      const booked = !isTarget && rand(c * 7 + r) > 0.5;
      let fill = "rgba(255,255,255,0.03)";
      let stroke = "rgba(255,255,255,0.08)";
      if (booked) {
        fill = `rgba(${BLUE},0.35)`;
        stroke = `rgba(${CYAN},0.35)`;
      }
      if (isTarget && cycle > 2) {
        const filled = cycle > 3.6;
        fill = filled
          ? `rgba(${GREEN},0.3)`
          : `rgba(${CYAN},${(0.15 + 0.15 * Math.sin(t * 8)).toFixed(3)})`;
        stroke = filled ? `rgba(${GREEN},0.9)` : `rgba(${CYAN},0.9)`;
      }
      box(
        ctx,
        x + R * 0.006,
        y + R * 0.005,
        cw - R * 0.012,
        rh - R * 0.01,
        R * 0.01,
        fill,
        stroke,
      );
      if (isTarget && cycle > 3.6)
        check(ctx, x + cw / 2, y + rh / 2, R * 0.02, `rgb(${GREEN})`);
    });
  });

  // Incoming call → booked → reminder
  const by = h * 0.78;
  const calling = cycle < 3.6;
  box(
    ctx,
    pad,
    by - R * 0.045,
    w - pad * 2,
    R * 0.09,
    R * 0.045,
    "rgba(10,18,35,0.92)",
    calling ? `rgba(${CYAN},0.6)` : `rgba(${GREEN},0.6)`,
  );
  glow(
    ctx,
    pad + R * 0.05,
    by,
    R * 0.04,
    calling ? 0.5 + 0.3 * Math.sin(t * 6) : 0.4,
    calling ? CYAN : GREEN,
  );
  text(
    ctx,
    calling
      ? "Patient calling · AI booking assistant"
      : "Booked Thu 11:30 · reminder SMS scheduled",
    pad + R * 0.1,
    by,
    R / 40,
    "#ffffff",
    "left",
    600,
  );
  text(
    ctx,
    "Clinical questions are always passed to staff",
    w / 2,
    h * 0.91,
    R / 50,
    DIM,
    "center",
    500,
  );
}

/* ------------------------------------------------------------ E-commerce */

const PRODUCTS = [
  "Sneakers",
  "Backpack",
  "Watch",
  "Headphones",
  "Jacket",
  "Bottle",
];
const ORDER_STAGES = [
  "Placed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

function drawEcommerce(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, VIOLET, 0.12);
  const R = Math.min(w, h);
  const pad = R * 0.07;

  // Catalogue: AI writes product copy one tile at a time
  text(ctx, "CATALOGUE", pad, pad, R / 54, DIM, "left", 700, MONO);
  const cols = 3;
  const tw = (w - pad * 2 - R * 0.04) / cols;
  const th = R * 0.2;
  const active = Math.floor(t / 1.2) % PRODUCTS.length;
  PRODUCTS.forEach((name, i) => {
    const x = pad + (i % cols) * (tw + R * 0.02);
    const y = pad + R * 0.03 + Math.floor(i / cols) * (th + R * 0.02);
    const on = i === active;
    const done = i < active;
    box(
      ctx,
      x,
      y,
      tw,
      th,
      R * 0.02,
      "rgba(255,255,255,0.04)",
      on ? `rgba(${VIOLET},0.85)` : "rgba(255,255,255,0.12)",
      on ? 1.5 : 1,
    );
    const ig = ctx.createLinearGradient(x, y, x + tw, y + th * 0.5);
    ig.addColorStop(0, `rgba(${[VIOLET, CYAN, BLUE][i % 3]},0.45)`);
    ig.addColorStop(1, "rgba(255,255,255,0.03)");
    box(
      ctx,
      x + R * 0.012,
      y + R * 0.012,
      tw - R * 0.024,
      th * 0.42,
      R * 0.012,
      ig,
    );
    text(ctx, name, x + R * 0.015, y + th * 0.6, R / 46, INK, "left", 600);
    // Description lines being written
    const k = on ? clamp01((t % 1.2) / 0.9) : done ? 1 : 0;
    for (let l = 0; l < 2; l++) {
      const lw = (tw - R * 0.03) * (l ? 0.6 : 0.9) * clamp01(k * 2 - l);
      if (lw > 0)
        box(
          ctx,
          x + R * 0.015,
          y + th * (0.74 + l * 0.12),
          lw,
          R * 0.01,
          3,
          on ? `rgba(${VIOLET},0.8)` : "rgba(255,255,255,0.2)",
        );
    }
    if (on)
      text(
        ctx,
        "AI",
        x + tw - R * 0.03,
        y + th * 0.6,
        R / 54,
        `rgb(${VIOLET})`,
        "center",
        800,
        MONO,
      );
  });

  // Order tracking
  const oy = h * 0.66;
  box(
    ctx,
    pad,
    oy - R * 0.06,
    w - pad * 2,
    R * 0.22,
    R * 0.025,
    "rgba(10,18,35,0.92)",
    "rgba(255,255,255,0.14)",
  );
  text(
    ctx,
    "Order #4821 · 2 items",
    pad + R * 0.03,
    oy - R * 0.025,
    R / 42,
    "#ffffff",
    "left",
    700,
  );
  const prog = Math.min(1, (t * 0.28) % 1.35);
  const reached = Math.floor(prog * (ORDER_STAGES.length - 1) + 0.0001);
  text(
    ctx,
    ORDER_STAGES[reached],
    w - pad - R * 0.03,
    oy - R * 0.025,
    R / 46,
    `rgb(${GREEN})`,
    "right",
    700,
    MONO,
  );
  const x0 = pad + R * 0.06;
  const x1 = w - pad - R * 0.06;
  const ly = oy + R * 0.05;
  line(ctx, x0, ly, x1, ly, "rgba(255,255,255,0.12)", 3);
  line(ctx, x0, ly, x0 + (x1 - x0) * prog, ly, `rgba(${GREEN},0.9)`, 3);
  ORDER_STAGES.forEach((s, i) => {
    const x = x0 + ((x1 - x0) * i) / (ORDER_STAGES.length - 1);
    const on = i <= reached;
    ctx.fillStyle = on ? `rgb(${GREEN})` : "#0b1220";
    ctx.strokeStyle = on ? `rgb(${GREEN})` : "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, ly, R * 0.016, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    text(
      ctx,
      s === "Out for delivery" ? "Out" : s,
      x,
      ly + R * 0.05,
      R / 56,
      on ? INK : DIM,
      "center",
      600,
    );
  });
  if (prog < 1) glow(ctx, x0 + (x1 - x0) * prog, ly, R * 0.03, 0.9, GREEN);
  text(
    ctx,
    "“Where’s my order?” answered instantly, 24/7",
    w / 2,
    h * 0.94,
    R / 50,
    DIM,
    "center",
    500,
  );
}

/* --------------------------------------------------------------- FinTech */

const KYC = [
  "ID document verified",
  "Address matched",
  "Sanctions & risk screening",
  "Consent recorded",
];

function drawFintech(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, BLUE, 0.18);
  const R = Math.min(w, h);
  const pad = R * 0.07;
  const cycle = t % 9;

  // Faint market line in the background
  ctx.strokeStyle = `rgba(${CYAN},0.12)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x <= w; x += 6) {
    const y =
      h * 0.55 -
      Math.sin(x * 0.012 + t * 0.4) * R * 0.05 -
      (x / w) * R * 0.12 +
      Math.sin(x * 0.05) * R * 0.01;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // ID card being scanned
  const cx0 = pad;
  const cy0 = pad + R * 0.02;
  const cw = w * 0.42;
  const ch = R * 0.27;
  const cg = ctx.createLinearGradient(cx0, cy0, cx0 + cw, cy0 + ch);
  cg.addColorStop(0, `rgba(${BLUE},0.55)`);
  cg.addColorStop(1, `rgba(${VIOLET},0.35)`);
  box(ctx, cx0, cy0, cw, ch, R * 0.025, cg, "rgba(255,255,255,0.25)");
  text(
    ctx,
    "IDENTITY CARD",
    cx0 + R * 0.025,
    cy0 + R * 0.035,
    R / 60,
    "rgba(255,255,255,0.8)",
    "left",
    700,
    MONO,
  );
  box(
    ctx,
    cx0 + R * 0.025,
    cy0 + R * 0.065,
    R * 0.08,
    R * 0.1,
    R * 0.012,
    "rgba(255,255,255,0.15)",
  );
  avatar(ctx, cx0 + R * 0.065, cy0 + R * 0.12, R * 0.05, "220,235,255", 0.85);
  for (let i = 0; i < 4; i++)
    box(
      ctx,
      cx0 + R * 0.125,
      cy0 + R * (0.075 + i * 0.035),
      (cw - R * 0.16) * (i ? 0.7 : 1),
      R * 0.012,
      3,
      "rgba(255,255,255,0.35)",
    );
  const scan = clamp01(cycle / 1.6);
  if (scan < 1)
    line(
      ctx,
      cx0,
      cy0 + ch * scan,
      cx0 + cw,
      cy0 + ch * scan,
      `rgba(${CYAN},0.95)`,
      2,
    );

  // Checks
  const lx = w * 0.55;
  text(
    ctx,
    "ONBOARDING CHECKS",
    lx,
    cy0 + R * 0.01,
    R / 56,
    DIM,
    "left",
    700,
    MONO,
  );
  KYC.forEach((label, i) => {
    const y = cy0 + R * 0.06 + i * R * 0.058;
    const at = 1.6 + i * 0.8;
    const state = cycle < at ? "wait" : cycle < at + 0.6 ? "run" : "ok";
    if (state === "ok")
      check(ctx, lx + R * 0.012, y, R * 0.022, `rgb(${GREEN})`);
    else {
      ctx.strokeStyle =
        state === "run" ? `rgb(${CYAN})` : "rgba(255,255,255,0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (state === "run")
        ctx.arc(lx + R * 0.012, y, R * 0.012, t * 8, t * 8 + Math.PI * 1.4);
      else ctx.arc(lx + R * 0.012, y, R * 0.012, 0, Math.PI * 2);
      ctx.stroke();
    }
    text(
      ctx,
      label,
      lx + R * 0.04,
      y,
      R / 48,
      state === "wait" ? DIM : INK,
      "left",
      500,
    );
  });

  // Audit trail
  const ay = h * 0.5;
  box(
    ctx,
    pad,
    ay,
    w - pad * 2,
    h * 0.3,
    R * 0.025,
    "rgba(5,10,20,0.9)",
    "rgba(255,255,255,0.12)",
  );
  text(
    ctx,
    "AUDIT TRAIL",
    pad + R * 0.03,
    ay + R * 0.035,
    R / 56,
    `rgb(${CYAN})`,
    "left",
    700,
    MONO,
  );
  const events = [
    "session.start",
    "id.verified",
    "address.matched",
    "risk.screened",
    "consent.recorded",
    "account.approved",
  ];
  const shown = Math.min(events.length, Math.floor(cycle / 0.75) + 1);
  const rows = 4;
  for (let i = 0; i < rows; i++) {
    const idx = shown - rows + i;
    if (idx < 0) continue;
    const y = ay + R * 0.075 + i * R * 0.04;
    const sec = String(3 + idx * 2).padStart(2, "0");
    text(
      ctx,
      `10:42:${sec}  ${events[idx]}`,
      pad + R * 0.03,
      y,
      R / 50,
      i === rows - 1 ? "#ffffff" : DIM,
      "left",
      500,
      MONO,
    );
    text(
      ctx,
      "signed",
      w - pad - R * 0.03,
      y,
      R / 56,
      `rgba(${GREEN},0.8)`,
      "right",
      600,
      MONO,
    );
  }

  const approved = cycle > 1.6 + KYC.length * 0.8 + 0.4;
  pill(
    ctx,
    w / 2,
    h * 0.9,
    w * 0.62,
    R,
    approved ? "✓ Account approved · every step logged" : "Verifying customer…",
    approved,
  );
}

/* ------------------------------------------------------------- Logistics */

function drawLogistics(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, CYAN, 0.12);
  const R = Math.min(w, h);
  const pad = R * 0.07;

  // Dotted "map" background
  for (let i = 0; i < 260; i++) {
    const x = rand(i) * w;
    const y = rand(i + 500) * h * 0.66;
    ctx.fillStyle = `rgba(255,255,255,${(0.04 + rand(i + 900) * 0.06).toFixed(3)})`;
    ctx.fillRect(x, y, 2, 2);
  }

  const stops: { name: string; p: Pt }[] = [
    { name: "Warehouse", p: [w * 0.14, h * 0.18] },
    { name: "Sort hub", p: [w * 0.44, h * 0.3] },
    { name: "City depot", p: [w * 0.66, h * 0.16] },
    { name: "Customer", p: [w * 0.84, h * 0.5] },
  ];
  const route = stops.map((s) => s.p);
  ctx.setLineDash([5, 6]);
  strokePath(ctx, route, `rgba(${CYAN},0.35)`, 2);
  ctx.setLineDash([]);

  const k = (t * 0.12) % 1.15;
  const prog = Math.min(1, k);
  const sub: Pt[] = [];
  for (let s = 0; s <= 40; s++) sub.push(pointAlong(route, (s / 40) * prog));
  strokePath(ctx, sub, `rgba(${CYAN},0.95)`, 2.5);
  const [tx, ty] = pointAlong(route, prog);

  // Which stop has the truck passed? (route segments are roughly equal)
  const passed = Math.min(
    stops.length - 1,
    Math.floor(prog * (stops.length - 1) + 0.02),
  );
  stops.forEach((s, i) => {
    const on = i <= passed;
    glow(ctx, s.p[0], s.p[1], R * 0.05, on ? 0.45 : 0.15, on ? GREEN : CYAN);
    ctx.fillStyle = on ? `rgb(${GREEN})` : "#0b1220";
    ctx.strokeStyle = on ? `rgb(${GREEN})` : `rgba(${CYAN},0.6)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(s.p[0], s.p[1], R * 0.018, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    text(
      ctx,
      s.name,
      s.p[0],
      s.p[1] + R * 0.045,
      R / 48,
      on ? INK : DIM,
      "center",
      600,
    );
  });
  glow(ctx, tx, ty, R * 0.06, 1, AMBER);
  box(
    ctx,
    tx - R * 0.02,
    ty - R * 0.012,
    R * 0.04,
    R * 0.024,
    R * 0.006,
    `rgb(${AMBER})`,
  );

  // Shipment card
  const sy = h * 0.68;
  box(
    ctx,
    pad,
    sy,
    w - pad * 2,
    R * 0.16,
    R * 0.025,
    "rgba(10,18,35,0.94)",
    "rgba(255,255,255,0.14)",
  );
  text(
    ctx,
    "Shipment ZX-2048",
    pad + R * 0.03,
    sy + R * 0.04,
    R / 40,
    "#ffffff",
    "left",
    700,
  );
  const status = ["Picked up", "At sort hub", "Out for delivery", "Delivered"][
    passed
  ];
  text(
    ctx,
    status,
    w - pad - R * 0.03,
    sy + R * 0.04,
    R / 44,
    `rgb(${GREEN})`,
    "right",
    700,
    MONO,
  );
  const eta =
    passed >= 3
      ? "Delivered 15:36"
      : `ETA ${["17:10", "16:20", "15:40"][passed]}`;
  text(ctx, eta, pad + R * 0.03, sy + R * 0.1, R / 44, INK, "left", 500, MONO);
  text(
    ctx,
    passed >= 2 ? "Customer notified ✓" : "Tracking synced with WMS & TMS",
    w - pad - R * 0.03,
    sy + R * 0.1,
    R / 48,
    passed >= 2 ? `rgb(${GREEN})` : DIM,
    "right",
    600,
  );
  text(
    ctx,
    "Status updates flow to customers, drivers and ops automatically",
    w / 2,
    h * 0.93,
    R / 54,
    DIM,
    "center",
    500,
  );
}

/* ----------------------------------------------------------- Real estate */

const LEAD_SOURCES = ["Portal", "Website", "Call", "WhatsApp"];
const LEAD_FIELDS: [string, string][] = [
  ["Budget", "85L – 1.1Cr"],
  ["Location", "Hadapsar, Pune"],
  ["Type", "3 BHK"],
  ["Timeline", "Within 3 months"],
];

function drawRealEstate(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, BLUE, 0.16);
  const R = Math.min(w, h);
  const pad = R * 0.07;
  const cycle = t % 8;

  // Skyline with lit windows
  const base = h;
  let x = 0;
  let b = 0;
  while (x < w) {
    const bw = R * (0.07 + rand(b) * 0.06);
    const bh = R * (0.1 + rand(b + 40) * 0.16);
    ctx.fillStyle = "rgba(20,34,60,0.9)";
    ctx.fillRect(x, base - bh, bw - 3, bh);
    for (
      let wy = base - bh + R * 0.015;
      wy < base - R * 0.01;
      wy += R * 0.025
    ) {
      for (let wx = x + R * 0.01; wx < x + bw - R * 0.015; wx += R * 0.02) {
        const lit =
          rand(wx * 0.37 + wy * 0.11) > 0.62 + 0.1 * Math.sin(t * 0.5 + wx);
        if (lit) {
          ctx.fillStyle = `rgba(${AMBER},0.55)`;
          ctx.fillRect(wx, wy, R * 0.008, R * 0.01);
        }
      }
    }
    x += bw;
    b++;
  }

  // Lead sources → AI → lead card
  const sx = pad + R * 0.07;
  const src = Math.floor(t / 2) % LEAD_SOURCES.length;
  LEAD_SOURCES.forEach((s, i) => {
    const y = pad + R * 0.05 + i * R * 0.085;
    const on = i === src;
    box(
      ctx,
      sx - R * 0.07,
      y - R * 0.028,
      R * 0.14,
      R * 0.056,
      R * 0.028,
      on ? `rgba(${CYAN},0.2)` : "rgba(255,255,255,0.04)",
      on ? `rgba(${CYAN},0.8)` : "rgba(255,255,255,0.12)",
    );
    text(ctx, s, sx, y, R / 46, on ? "#ffffff" : DIM, "center", 600);
  });
  const ax = sx + R * 0.17;
  const ay = pad + R * 0.05 + 1.5 * R * 0.085;
  const sy = pad + R * 0.05 + src * R * 0.085;
  line(ctx, sx + R * 0.07, sy, ax, ay, `rgba(${CYAN},0.35)`, 1.2);
  const f = (t * 0.8) % 1;
  glow(
    ctx,
    sx + R * 0.07 + (ax - sx - R * 0.07) * f,
    sy + (ay - sy) * f,
    R * 0.02,
    0.8,
  );
  glow(ctx, ax, ay, R * 0.07, 0.4, VIOLET);
  ctx.fillStyle = `rgb(${VIOLET})`;
  ctx.beginPath();
  ctx.arc(ax, ay, R * 0.035, 0, Math.PI * 2);
  ctx.fill();
  text(ctx, "AI", ax, ay + 1, R / 40, "#ffffff", "center", 800);

  const lx = ax + R * 0.08;
  const lw = w - pad - lx;
  const ly = pad;
  box(
    ctx,
    lx,
    ly,
    lw,
    R * 0.42,
    R * 0.025,
    "rgba(10,18,35,0.95)",
    `rgba(${VIOLET},0.5)`,
    1.2,
  );
  text(
    ctx,
    "NEW LEAD · QUALIFIED",
    lx + R * 0.025,
    ly + R * 0.035,
    R / 58,
    `rgb(${VIOLET})`,
    "left",
    700,
    MONO,
  );
  LEAD_FIELDS.forEach(([label, value], i) => {
    const y = ly + R * 0.085 + i * R * 0.062;
    const p = clamp01((cycle - 0.6 - i * 0.5) / 0.4);
    text(ctx, label, lx + R * 0.025, y, R / 52, DIM, "left", 500, MONO);
    text(
      ctx,
      value.slice(0, Math.floor(p * value.length)),
      lx + lw - R * 0.025,
      y,
      R / 44,
      "#ffffff",
      "right",
      600,
    );
  });
  const hot = cycle > 3;
  const score = Math.round(86 * ease((cycle - 2.6) / 1.2));
  text(
    ctx,
    "Lead score",
    lx + R * 0.025,
    ly + R * 0.36,
    R / 52,
    DIM,
    "left",
    500,
    MONO,
  );
  text(
    ctx,
    hot ? `${score} · Hot` : "—",
    lx + lw - R * 0.025,
    ly + R * 0.36,
    R / 42,
    hot ? `rgb(${AMBER})` : DIM,
    "right",
    700,
  );

  pill(
    ctx,
    w / 2,
    h * 0.62,
    w * 0.7,
    R,
    cycle > 4.6
      ? "✓ Site visit booked · Sat 11:00"
      : "Answering in seconds, any hour",
    cycle > 4.6,
  );
}

/* ------------------------------------------------------------- Education */

const ADMIT_STAGES = [
  "Enquiry",
  "Applied",
  "Documents",
  "Interview",
  "Enrolled",
];

function drawEducation(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, VIOLET, 0.12);
  const R = Math.min(w, h);
  const pad = R * 0.07;
  const cycle = t % 7;

  // Applicant question answered instantly
  const q = "What are the fees and deadline for BBA?";
  const a = "Fees, scholarships and the 15 March deadline, sent to your email.";
  box(
    ctx,
    w - pad - w * 0.62,
    pad,
    w * 0.62,
    R * 0.07,
    R * 0.03,
    `rgba(${BLUE},0.6)`,
  );
  text(
    ctx,
    q,
    w - pad - w * 0.6,
    pad + R * 0.035,
    R / 48,
    "#ffffff",
    "left",
    500,
  );
  const typed = clamp01((cycle - 1) / 1.6);
  if (cycle > 0.6) {
    box(
      ctx,
      pad,
      pad + R * 0.09,
      w * 0.74,
      R * 0.07,
      R * 0.03,
      `rgba(${VIOLET},0.15)`,
      `rgba(${VIOLET},0.5)`,
    );
    text(
      ctx,
      cycle < 1 ? "…" : a.slice(0, Math.floor(typed * a.length)),
      pad + R * 0.025,
      pad + R * 0.125,
      R / 50,
      "#ffffff",
      "left",
      500,
    );
  }

  // Admissions pipeline with applicants moving through
  const py = h * 0.48;
  const x0 = pad + R * 0.08;
  const x1 = w - pad - R * 0.08;
  const step = (x1 - x0) / (ADMIT_STAGES.length - 1);
  box(
    ctx,
    pad,
    py - R * 0.13,
    w - pad * 2,
    R * 0.29,
    R * 0.025,
    "rgba(10,18,35,0.9)",
    "rgba(255,255,255,0.12)",
  );
  text(
    ctx,
    "ADMISSIONS · PEAK SEASON",
    pad + R * 0.025,
    py - R * 0.095,
    R / 58,
    `rgb(${VIOLET})`,
    "left",
    700,
    MONO,
  );
  line(ctx, x0, py, x1, py, "rgba(255,255,255,0.12)", 2);
  const counts = [0, 0, 0, 0, 0];
  for (let i = 0; i < 16; i++) {
    const p = (t * 0.07 + rand(i)) % 1;
    const stageF = p * (ADMIT_STAGES.length - 1);
    counts[Math.min(ADMIT_STAGES.length - 1, Math.round(stageF))]++;
    const x = x0 + stageF * step;
    const lane = (rand(i + 30) - 0.5) * R * 0.08;
    avatar(ctx, x, py + lane, R * 0.026, [CYAN, VIOLET, GREEN][i % 3], 0.85);
  }
  ADMIT_STAGES.forEach((s, i) => {
    const x = x0 + i * step;
    text(ctx, s, x, py + R * 0.1, R / 54, INK, "center", 600);
  });

  // Channels and always-on support
  const chips = ["Website chat", "WhatsApp", "Phone", "Email"];
  const lit = Math.floor(t * 0.8) % chips.length;
  const cw = (w - pad * 2) / chips.length;
  chips.forEach((c, i) => {
    const x = pad + i * cw + cw / 2;
    const on = i === lit;
    box(
      ctx,
      x - cw * 0.45,
      h * 0.76 - R * 0.028,
      cw * 0.9,
      R * 0.056,
      R * 0.028,
      on ? `rgba(${VIOLET},0.22)` : "rgba(255,255,255,0.04)",
      on ? `rgba(${VIOLET},0.8)` : "rgba(255,255,255,0.12)",
    );
    text(ctx, c, x, h * 0.76, R / 50, on ? "#ffffff" : DIM, "center", 600);
  });
  text(
    ctx,
    "Every applicant answered, even at 2 am",
    w / 2,
    h * 0.9,
    R / 46,
    INK,
    "center",
    600,
  );
}

/* ---------------------------------------------------------------- Travel */

const GREETINGS: [string, string][] = [
  ["EN", "Hello! How can I help with your trip?"],
  ["ES", "¡Hola! ¿Cómo puedo ayudarte?"],
  ["FR", "Bonjour ! Comment puis-je vous aider ?"],
  ["DE", "Hallo! Wie kann ich helfen?"],
  ["HI", "नमस्ते! मैं आपकी कैसे मदद करूँ?"],
  ["TH", "สวัสดีค่ะ ให้ช่วยอะไรคะ"],
];

function drawTravel(ctx: Ctx, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  ambient(ctx, w, h, CYAN, 0.14);
  const R = Math.min(w, h);
  const pad = R * 0.07;
  const cycle = t % 9;

  // Flight arc
  const ax = w * 0.15;
  const bx = w * 0.85;
  const yb = h * 0.34;
  const peak = h * 0.08;
  const arc = (k: number): Pt => {
    const x = ax + (bx - ax) * k;
    const y = yb - 4 * (yb - peak) * k * (1 - k);
    return [x, y];
  };
  ctx.setLineDash([4, 6]);
  const full: Pt[] = [];
  for (let s = 0; s <= 40; s++) full.push(arc(s / 40));
  strokePath(ctx, full, `rgba(${CYAN},0.35)`, 1.6);
  ctx.setLineDash([]);
  const k = (t * 0.11) % 1;
  const flown: Pt[] = [];
  for (let s = 0; s <= 30; s++) flown.push(arc((s / 30) * k));
  strokePath(ctx, flown, `rgba(${CYAN},0.9)`, 2);
  const [px, py] = arc(k);
  glow(ctx, px, py, R * 0.05, 0.9);
  [
    [ax, "BOM"],
    [bx, "BKK"],
  ].forEach(([x, code]) => {
    ctx.fillStyle = `rgb(${CYAN})`;
    ctx.beginPath();
    ctx.arc(x as number, yb, R * 0.014, 0, Math.PI * 2);
    ctx.fill();
    text(
      ctx,
      code as string,
      x as number,
      yb + R * 0.04,
      R / 40,
      "#ffffff",
      "center",
      700,
      MONO,
    );
  });

  // Itinerary change handled automatically
  const iy = h * 0.47;
  box(
    ctx,
    pad,
    iy,
    w - pad * 2,
    R * 0.2,
    R * 0.025,
    "rgba(10,18,35,0.94)",
    "rgba(255,255,255,0.14)",
  );
  const delayed = cycle > 1.5;
  const rebooked = cycle > 3.5;
  text(
    ctx,
    "Flight ZX 214 · BOM → BKK",
    pad + R * 0.03,
    iy + R * 0.04,
    R / 42,
    "#ffffff",
    "left",
    700,
  );
  text(
    ctx,
    rebooked ? "Rebooked 18:40" : delayed ? "Delayed" : "On time",
    w - pad - R * 0.03,
    iy + R * 0.04,
    R / 46,
    rebooked ? `rgb(${GREEN})` : delayed ? `rgb(${AMBER})` : DIM,
    "right",
    700,
    MONO,
  );
  const steps = [
    "New seat confirmed",
    "Hotel check-in moved",
    "Traveller notified",
  ];
  steps.forEach((s, i) => {
    const y = iy + R * 0.085 + i * R * 0.035;
    const ok = cycle > 3.5 + i * 0.5;
    if (ok) check(ctx, pad + R * 0.04, y, R * 0.018, `rgb(${GREEN})`);
    else {
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pad + R * 0.04, y, R * 0.01, 0, Math.PI * 2);
      ctx.stroke();
    }
    text(ctx, s, pad + R * 0.065, y, R / 50, ok ? INK : DIM, "left", 500);
  });

  // Multilingual support
  const g = Math.floor(t / 1.8) % GREETINGS.length;
  const gy = h * 0.8;
  box(
    ctx,
    pad,
    gy - R * 0.045,
    w - pad * 2,
    R * 0.09,
    R * 0.045,
    `rgba(${VIOLET},0.14)`,
    `rgba(${VIOLET},0.5)`,
  );
  box(
    ctx,
    pad + R * 0.02,
    gy - R * 0.025,
    R * 0.07,
    R * 0.05,
    R * 0.025,
    `rgba(${VIOLET},0.6)`,
  );
  text(
    ctx,
    GREETINGS[g][0],
    pad + R * 0.055,
    gy,
    R / 50,
    "#ffffff",
    "center",
    800,
    MONO,
  );
  text(
    ctx,
    GREETINGS[g][1],
    pad + R * 0.11,
    gy,
    R / 44,
    "#ffffff",
    "left",
    500,
  );
  text(
    ctx,
    "24/7 support in your travellers' languages",
    w / 2,
    h * 0.92,
    R / 50,
    DIM,
    "center",
    500,
  );
}

/* ------------------------------------------------------------- exports */

export const HealthcareVisual = makeVisual(drawHealthcare);
export const EcommerceVisual = makeVisual(drawEcommerce);
export const FintechVisual = makeVisual(drawFintech);
export const LogisticsVisual = makeVisual(drawLogistics);
export const RealEstateVisual = makeVisual(drawRealEstate);
export const EducationVisual = makeVisual(drawEducation);
export const TravelVisual = makeVisual(drawTravel);
