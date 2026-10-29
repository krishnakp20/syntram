import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/shared/button-link";
import { Icon, type IconName } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { jobOpenings } from "@/content/company";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { isPlaceholder, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Careers — Join Syntram Technologies",
  description:
    "Careers at Syntram Technologies: work on AI, voice AI, automation and software engineering. See open roles or send us your CV for future opportunities.",
  path: "/careers",
});

/** How we work — principles, not perks we haven't confirmed. */
const culture: { title: string; body: string; icon: IconName }[] = [
  { title: "Real problems", body: "Build AI and software that people rely on in day-to-day operations.", icon: "target" },
  { title: "Engineering craft", body: "Code review, testing and good architecture are part of the job, not optional extras.", icon: "code" },
  { title: "Learn continuously", body: "AI moves fast. We share what we learn and give each other room to grow.", icon: "book-open" },
  { title: "Ownership", body: "Small teams, clear responsibilities and direct contact with the people we build for.", icon: "user-check" },
];

export default function CareersPage() {
  const careersEmail = siteConfig.contact.careersEmail;
  const cvHref = isPlaceholder(careersEmail)
    ? "/contact"
    : `mailto:${careersEmail}?subject=${encodeURIComponent("Application — Syntram Technologies")}`;

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "About", path: "/about" },
          { name: "Careers", path: "/careers" },
        ]}
        eyebrow="Careers"
        title="Build AI that people actually rely on"
        intro="We're an engineering-led team working on voice AI, automation and software for real businesses. If that sounds like your kind of work, we'd like to hear from you."
        actions={
          <ButtonLink href="#open-roles" size="cta-lg" trackAs="careers_view_roles">
            View open roles
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        }
      />

      <Section id="open-roles" aria-labelledby="roles-title" className="scroll-mt-16">
        <Container>
          <SectionHeader id="roles-title" eyebrow="Open roles" title="Current openings" />
          {jobOpenings.length > 0 ? (
            <ul className="mt-10 flex flex-col gap-4">
              {jobOpenings.map((job) => (
                <li key={job.slug}>
                  <article className="rounded-2xl border border-line bg-card p-6 sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-mono text-[0.6875rem] tracking-wider text-signal uppercase">{job.department}</p>
                        <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{job.title}</h3>
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                          <li className="inline-flex items-center gap-1.5">
                            <MapPin aria-hidden="true" className="size-4 text-subtle" />
                            {job.location}
                          </li>
                          <li className="inline-flex items-center gap-1.5">
                            <Briefcase aria-hidden="true" className="size-4 text-subtle" />
                            {job.type}
                          </li>
                          <li className="inline-flex items-center gap-1.5">
                            <Clock aria-hidden="true" className="size-4 text-subtle" />
                            Posted <time dateTime={job.postedAt}>{formatDate(job.postedAt)}</time>
                          </li>
                        </ul>
                      </div>
                      <ButtonLink href={cvHref} size="cta" className="self-start" trackAs={`careers_apply_${job.slug}`}>
                        Apply
                        <span className="sr-only"> for {job.title}</span>
                      </ButtonLink>
                    </div>
                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">{job.summary}</p>
                    <details className="group mt-5 border-t border-line pt-4">
                      <summary className="cursor-pointer text-sm font-medium text-signal">Role details</summary>
                      <div className="mt-4 grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">What you&apos;ll do</h4>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-signal">
                            {job.responsibilities.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">What we&apos;re looking for</h4>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-signal">
                            {job.requirements.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-line-strong bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <p className="font-display text-xl font-semibold text-foreground">No open roles right now</p>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                  We&apos;re always glad to hear from talented engineers, designers and AI specialists. Send us your CV
                  and tell us what you&apos;d like to work on — we&apos;ll get in touch when a suitable role opens.
                </p>
              </div>
              <ButtonLink href={cvHref} size="cta-lg" className="shrink-0" trackAs="careers_send_cv">
                Send your CV
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </div>
          )}
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="culture-title">
        <Container>
          <SectionHeader id="culture-title" eyebrow="How we work" title="What working here is about" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {culture.map((c) => (
              <li key={c.title} className="rounded-2xl border border-line bg-card p-6">
                <Icon name={c.icon} className="size-5 text-signal" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        trackId="careers"
        title="Don't see the right role?"
        description="Tell us about yourself and the work you're excited by. Good people don't always arrive on schedule."
        primary={{ label: "Send your CV", href: cvHref }}
        secondary={{ label: "About Syntram", href: "/about" }}
      />
    </>
  );
}
