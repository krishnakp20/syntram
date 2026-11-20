import { ArrowDown, BarChart3, GitBranch, Headset, MessageSquare, PhoneCall, Sparkles, UserRound } from "lucide-react";

import { HeroVisual } from "@/components/home/hero-visual";
import { cn } from "@/lib/utils";

/**
 * Illustrated product screens for the Voice AI Platform. They show how the
 * product works; the numbers and conversations are example data, not customer
 * results. Server-rendered HTML/CSS only.
 */

function Frame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line-strong bg-card shadow-[0_30px_80px_-40px_rgb(13_19_32/0.35)]", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="ml-2 truncate font-mono text-[0.6875rem] text-subtle">{title}</span>
      </div>
      {children}
    </div>
  );
}

const kpis = [
  { label: "Calls handled", value: "1,248", Icon: PhoneCall },
  { label: "Resolved by AI", value: "71%", Icon: Sparkles },
  { label: "Avg. handle time", value: "2m 14s", Icon: Headset },
  { label: "Handed to agents", value: "18%", Icon: UserRound },
];
const week = [52, 64, 58, 76, 70, 88, 61];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const intents = [
  { label: "Appointment booking", share: 38 },
  { label: "Order status", share: 24 },
  { label: "Billing questions", share: 17 },
  { label: "Other", share: 21 },
];

function AnalyticsScreen() {
  return (
    <Frame title="app.zaybx.com / analytics">
      <div className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-2 gap-3">
          {kpis.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-xl border border-line bg-surface p-3">
              <Icon aria-hidden="true" className="size-4 text-signal" />
              <p className="mt-2 font-display text-xl font-semibold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs font-medium text-foreground">Calls this week</p>
          <div className="mt-3 flex h-28 gap-2" aria-hidden="true">
            {week.map((v, i) => (
              <div key={days[i]} className="flex h-full flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-1 items-end">
                  <span className="block w-full rounded-t-md bg-signal/80" style={{ height: `${v}%` }} />
                </div>
                <span className="font-mono text-[0.625rem] text-subtle">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-foreground">Top intents</p>
          <ul className="mt-2 flex flex-col gap-2">
            {intents.map((it) => (
              <li key={it.label} className="text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>{it.label}</span>
                  <span className="font-mono">{it.share}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-signal" style={{ width: `${it.share}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

function FlowNode({ label, detail, tone = "default" }: { label: string; detail: string; tone?: "default" | "accent" | "human" }) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3 py-2 text-center",
        tone === "accent" && "border-signal/50 bg-signal-soft",
        tone === "human" && "border-line-strong bg-secondary",
        tone === "default" && "border-line bg-surface",
      )}
    >
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <p className="text-[0.6875rem] text-muted-foreground">{detail}</p>
    </div>
  );
}

function FlowScreen() {
  return (
    <Frame title="app.zaybx.com / agents / clinic-reception">
      <div className="flex flex-col items-center gap-2 p-5">
        <FlowNode label="Greeting" detail="Welcome + consent message" />
        <ArrowDown aria-hidden="true" className="size-4 text-subtle" />
        <FlowNode label="Understand intent" detail="AI · speech + reasoning" tone="accent" />
        <ArrowDown aria-hidden="true" className="size-4 text-subtle" />
        <div className="grid w-full grid-cols-3 gap-2">
          <FlowNode label="Book" detail="Calendar" />
          <FlowNode label="Answer" detail="Knowledge base" />
          <FlowNode label="Transfer" detail="Live agent" tone="human" />
        </div>
        <ArrowDown aria-hidden="true" className="size-4 text-subtle" />
        <FlowNode label="Wrap-up" detail="CRM notes · summary · tags" tone="accent" />
        <div className="mt-3 flex w-full items-center gap-2 rounded-xl border border-dashed border-line-strong px-3 py-2 text-[0.6875rem] text-muted-foreground">
          <MessageSquare aria-hidden="true" className="size-3.5 text-signal" />
          Guardrails: verify caller · never share card data · escalate on request
        </div>
      </div>
    </Frame>
  );
}

const screens = [
  {
    title: "Live call console",
    body: "Watch conversations as they happen: transcript, detected intent and every action the agent takes.",
    Icon: PhoneCall,
    node: (
      <Frame title="app.zaybx.com / live">
        <div className="p-3 sm:p-4">
          <HeroVisual floating={false} />
        </div>
      </Frame>
    ),
  },
  {
    title: "Agent flow builder",
    body: "Design what your voice agent does — greetings, intents, actions and when to hand over to a person.",
    Icon: GitBranch,
    node: <FlowScreen />,
  },
  {
    title: "Call analytics",
    body: "See call volumes, resolution rates and top reasons for calling, so you know what to improve.",
    Icon: BarChart3,
    node: <AnalyticsScreen />,
  },
];

export function VoicePlatformScreens() {
  return (
    <div className="flex flex-col gap-16">
      {screens.map((s, i) => (
        <figure key={s.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className={cn(i % 2 === 1 && "lg:order-2")}>{s.node}</div>
          <figcaption className="flex flex-col items-start">
            <span className="grid size-11 place-items-center rounded-xl bg-signal-soft text-signal">
              <s.Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">{s.title}</h3>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">{s.body}</p>
          </figcaption>
        </figure>
      ))}
      <p className="text-center font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
        Illustrative screens · example data
      </p>
    </div>
  );
}
