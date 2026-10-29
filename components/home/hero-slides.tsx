import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { HeroSlide } from "@/components/home/hero-slider";
import { HeroVisual } from "@/components/home/hero-visual";
import { Icon, type IconName } from "@/components/shared/icon";
import { achievements } from "@/content/company";
import { products, productStatusLabel } from "@/content/products";

/**
 * Slides for the homepage hero box. Rendered on the server and passed to the
 * client <HeroSlider>, so icons and copy never add to the client bundle.
 * The Achievements slide appears only when real figures exist in
 * content/company.ts.
 */

function SlideLayout({
  eyebrow,
  title,
  body,
  href,
  linkLabel,
  visual,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  visual: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-12">
      <div className="flex flex-col items-start">
        <p className="font-mono text-xs font-medium tracking-[0.14em] text-signal uppercase">{eyebrow}</p>
        <h2 className="mt-3 text-display-md font-semibold text-foreground">{title}</h2>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">{body}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-signal hover:underline"
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <div className="min-w-0">{visual}</div>
    </div>
  );
}

function StepVisual({ steps }: { steps: { label: string; icon: IconName }[] }) {
  return (
    <ol aria-hidden="true" className="flex flex-col gap-2.5">
      {steps.map((s, i) => (
        <li
          key={s.label}
          className="flex items-center gap-4 rounded-xl border border-line-strong bg-background/60 px-4 py-3"
          style={{ marginLeft: `${i * 6}%` }}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-signal-soft text-signal">
            <Icon name={s.icon} className="size-[1.125rem]" />
          </span>
          <span className="text-[0.9375rem] text-foreground">{s.label}</span>
          <span className="ml-auto font-mono text-[0.6875rem] text-subtle">{String(i + 1).padStart(2, "0")}</span>
        </li>
      ))}
    </ol>
  );
}

function ChipVisual({ chips }: { chips: { label: string; icon: IconName }[] }) {
  return (
    <ul aria-hidden="true" className="grid grid-cols-2 gap-3">
      {chips.map((c) => (
        <li key={c.label} className="flex flex-col gap-3 rounded-xl border border-line-strong bg-background/60 p-4">
          <Icon name={c.icon} className="size-5 text-signal" />
          <span className="text-sm text-foreground">{c.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function getHeroSlides(): HeroSlide[] {
  const slides: HeroSlide[] = [
    {
      id: "voice-ai",
      label: "Voice AI",
      content: (
        <SlideLayout
          eyebrow="Voice AI agents"
          title="Every call answered, understood and acted on"
          body="Real-time voice agents that book, qualify, resolve and hand over to your team — connected to your CRM and calendar."
          href="/services/voice-ai"
          linkLabel="Explore Voice AI"
          visual={<HeroVisual floating={false} />}
        />
      ),
    },
    {
      id: "automation",
      label: "AI Automation",
      content: (
        <SlideLayout
          eyebrow="AI automation"
          title="The work between your systems, done automatically"
          body="AI reads, classifies and routes requests and documents, applies your rules and updates your systems — with people approving what matters."
          href="/solutions/ai-automation"
          linkLabel="See AI automation"
          visual={
            <StepVisual
              steps={[
                { label: "Request arrives", icon: "inbox" },
                { label: "AI understands it", icon: "brain" },
                { label: "Rules & approvals", icon: "list-checks" },
                { label: "Systems updated", icon: "network" },
              ]}
            />
          }
        />
      ),
    },
    {
      id: "engineering",
      label: "Software",
      content: (
        <SlideLayout
          eyebrow="Software engineering"
          title="Web, mobile and cloud — built to last"
          body="Production-grade products and platforms with clean architecture, automated testing and infrastructure you can operate with confidence."
          href="/services"
          linkLabel="View all services"
          visual={
            <ChipVisual
              chips={[
                { label: "Web applications", icon: "globe" },
                { label: "Mobile apps", icon: "smartphone" },
                { label: "Cloud & DevOps", icon: "cloud" },
                { label: "APIs & integrations", icon: "plug" },
              ]}
            />
          }
        />
      ),
    },
  ];

  const published = products.filter((p) => !p.placeholder);
  slides.push({
    id: "products",
    label: "Products",
    content: (
      <SlideLayout
        eyebrow="Products"
        title={published.length > 0 ? "Platforms built on our own stack" : "Our own products, in development"}
        body={
          published.length > 0
            ? "Ready-to-use platforms for voice AI and automation, extendable by our engineering team."
            : "We're building platform products for voice AI and automation from patterns proven in client work. Details will be published as each becomes available."
        }
        href="/products"
        linkLabel="View products"
        visual={
          published.length > 0 ? (
            <ul aria-hidden="true" className="flex flex-col gap-3">
              {published.slice(0, 4).map((p) => (
                <li key={p.slug} className="flex items-center gap-4 rounded-xl border border-line-strong bg-background/60 p-4">
                  <Icon name={p.icon} className="size-5 shrink-0 text-signal" />
                  <span className="flex flex-col">
                    <span className="text-[0.9375rem] font-medium text-foreground">{p.name}</span>
                    <span className="text-sm text-muted-foreground">{p.tagline}</span>
                  </span>
                  <span className="ml-auto font-mono text-[0.6875rem] text-subtle uppercase">
                    {productStatusLabel[p.status]}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div aria-hidden="true" className="grid place-items-center rounded-2xl border border-dashed border-line-strong p-10">
              <span className="grid size-16 place-items-center rounded-2xl bg-signal-soft text-signal">
                <Icon name="package" className="size-8" />
              </span>
              <span className="mt-4 rounded-full border border-line-strong px-3 py-1 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
                In development
              </span>
            </div>
          )
        }
      />
    ),
  });

  if (achievements.length > 0) {
    slides.push({
      id: "achievements",
      label: "Achievements",
      content: (
        <SlideLayout
          eyebrow="Achievements"
          title="Results we're proud of"
          body="A few milestones from our work so far."
          href="/about"
          linkLabel="About Syntram"
          visual={
            <ul className="grid grid-cols-2 gap-3">
              {achievements.slice(0, 4).map((a) => (
                <li key={a.label} className="rounded-xl border border-line-strong bg-background/60 p-5">
                  <p className="font-display text-display-md font-semibold text-signal">{a.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.label}</p>
                </li>
              ))}
            </ul>
          }
        />
      ),
    });
  }

  return slides;
}
