import { Plus } from "lucide-react";

import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/jsonld";
import type { FAQItem } from "@/types/content";

/**
 * FAQ with native <details>: zero JavaScript, keyboard accessible, and every
 * answer is in the HTML — so the FAQPage structured data matches visible content.
 */
export function Faq({
  faqs,
  title = "Frequently asked questions",
  tone = "dark",
}: {
  faqs: FAQItem[];
  title?: string;
  tone?: "dark" | "light" | "surface";
}) {
  if (faqs.length === 0) return null;
  return (
    <Section tone={tone} aria-labelledby="faq-title">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
        <SectionHeader
          id="faq-title"
          eyebrow="FAQ"
          title={title}
          className="lg:sticky lg:top-28 lg:self-start [&_h2]:text-display-md"
        />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-lg py-5 text-left font-display text-[1.0625rem] font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-signal transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
      <JsonLd data={faqJsonLd(faqs)} />
    </Section>
  );
}
