import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { RelatedLinks } from "@/components/sections/related-links";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { getIndustry } from "@/content/industries";
import { getServicesBySlugs } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { CaseStudy } from "@/types/content";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "long" }).format(new Date(iso));
}

/** Template for /work/[slug]. Only client-verified results are ever rendered. */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const path = `/work/${study.slug}`;
  const industry = getIndustry(study.industry);
  const services = getServicesBySlugs(study.services);
  const verifiedResults = study.results.filter((r) => r.verified);

  const facts = (
    <dl className="grid gap-5 rounded-2xl border border-line-strong bg-surface/80 p-6 backdrop-blur lg:mt-10">
      <div>
        <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">Client</dt>
        <dd className="mt-1 text-[0.9375rem] text-foreground">{study.client.name}</dd>
      </div>
      {industry && (
        <div>
          <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">Industry</dt>
          <dd className="mt-1 text-[0.9375rem]">
            <Link href={`/industries/${industry.slug}`} className="text-foreground underline-offset-4 hover:underline">
              {industry.title}
            </Link>
          </dd>
        </div>
      )}
      <div>
        <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">Services</dt>
        <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[0.9375rem]">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="text-foreground underline-offset-4 hover:underline">
              {s.shortTitle}
            </Link>
          ))}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">Published</dt>
        <dd className="mt-1 text-[0.9375rem] text-foreground">
          <time dateTime={study.publishedAt}>{formatDate(study.publishedAt)}</time>
        </dd>
      </div>
    </dl>
  );

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "Work", path: "/work" },
          { name: study.title, path },
        ]}
        eyebrow="Case study"
        title={study.title}
        intro={study.summary}
        aside={
          <div className="flex flex-col gap-4">
            {study.placeholder && (
              <PlaceholderNotice className="lg:mt-10">
                This entry previews the case study layout. It describes no real client or project, is hidden in
                production and is excluded from search engines.
              </PlaceholderNotice>
            )}
            {facts}
          </div>
        }
      />

      {/* Challenge & solution */}
      <Section aria-label="Challenge and solution">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow className="text-muted-foreground [&>span]:bg-subtle">The challenge</Eyebrow>
            <h2 className="mt-4 text-display-md font-semibold text-foreground">What needed to change</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{study.challenge}</p>
          </div>
          <div>
            <Eyebrow>The solution</Eyebrow>
            <h2 className="mt-4 text-display-md font-semibold text-foreground">What we built</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{study.solution}</p>
          </div>
        </Container>
      </Section>

      {/* Architecture & technology */}
      <Section tone="surface" aria-labelledby="architecture-title" className="border-y border-line">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <SectionHeader
              id="architecture-title"
              eyebrow="Architecture"
              title="How it fits together"
              description={study.architecture.description}
            />
            <h3 className="mt-10 font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">Technology</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.technology.map((t) => (
                <li key={t} className="rounded-md border border-line bg-card px-2.5 py-1 font-mono text-xs text-foreground">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ol className="flex flex-col items-stretch" aria-label="System components">
            {study.architecture.components.map((c, i) => (
              <li key={c} className="flex flex-col items-center">
                <span className="w-full rounded-xl border border-line-strong bg-card px-5 py-4 text-center text-[0.9375rem] text-foreground">
                  {c}
                </span>
                {i < study.architecture.components.length - 1 && (
                  <ArrowDown aria-hidden="true" className="my-2 size-4 text-signal" />
                )}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Implementation */}
      <Section tone="light" aria-labelledby="implementation-title">
        <Container>
          <SectionHeader id="implementation-title" eyebrow="Implementation" title="How the project ran" />
          <ProcessSteps
            steps={study.implementation}
            className={study.implementation.length < 5 ? "mt-12 lg:grid-cols-3" : "mt-12"}
          />
        </Container>
      </Section>

      {/* Results — verified only */}
      <Section aria-labelledby="results-title">
        <Container>
          <SectionHeader id="results-title" eyebrow="Results" title="Outcomes" />
          {verifiedResults.length > 0 ? (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verifiedResults.map((r) => (
                <li key={r.label} className="rounded-2xl border border-line bg-card p-6">
                  {r.value && <p className="font-display text-display-md font-semibold text-signal">{r.value}</p>}
                  <h3 className="mt-2 font-display text-base font-semibold text-foreground">{r.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 max-w-2xl rounded-2xl border border-dashed border-line-strong p-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Results will be published here once they have been measured and confirmed by the client.
            </p>
          )}
        </Container>
      </Section>

      {/* Screenshots */}
      {study.screenshots.length > 0 && (
        <Section tone="surface" aria-labelledby="screenshots-title" className="border-t border-line">
          <Container>
            <SectionHeader id="screenshots-title" eyebrow="Screenshots" title="Inside the product" />
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {study.screenshots.map((img) => (
                <li key={img.src}>
                  <figure>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="w-full rounded-2xl border border-line"
                    />
                    {img.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{img.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <RelatedLinks
        related={{ services: study.services, solutions: study.solutions, industries: [study.industry] }}
        title="Services and solutions used"
      />

      <CtaBanner
        trackId={`case_study_${study.slug.replace(/-/g, "_")}`}
        title="Facing a similar challenge?"
        description="Tell us about your situation. We'll share how we'd approach it and what a first phase could look like."
        primary={{ label: "Discuss Your Project", href: "/contact" }}
        secondary={{ label: "More work", href: "/work" }}
      />

      {!study.placeholder && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: study.title,
            description: study.summary,
            datePublished: study.publishedAt,
            url: absoluteUrl(path),
            author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
            publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          }}
        />
      )}
    </>
  );
}
