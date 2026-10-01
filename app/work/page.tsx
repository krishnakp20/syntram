import { CaseStudyCard } from "@/components/cards/case-study-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Icon } from "@/components/shared/icon";
import { Container, Section, SectionHeader } from "@/components/shared/layout-primitives";
import { getVisibleCaseStudies } from "@/content/work";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Work — Case Studies",
  description:
    "Case studies from Syntram Technologies covering AI, voice AI, automation and software projects — published only with client approval and verified results.",
  path: "/work",
});

const publishingPolicy = [
  {
    title: "Client approval first",
    body: "We publish a project only when the client has agreed — and anonymise it when they prefer.",
  },
  {
    title: "Verified results only",
    body: "Any outcome we report has been measured and confirmed by the client. No estimates presented as results.",
  },
  {
    title: "The full picture",
    body: "Each case study covers the challenge, the solution, the architecture, the technology and how the work was delivered.",
  },
];

export default function WorkIndexPage() {
  const studies = getVisibleCaseStudies();

  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Work", path: "/work" }]}
        eyebrow="Work"
        title="Case studies, published with permission"
        intro="How we've approached real problems — the context, the architecture and the outcomes our clients have verified."
      />

      <Section aria-labelledby="case-studies-title">
        <Container>
          <h2 id="case-studies-title" className="sr-only">
            Case studies
          </h2>
          {studies.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <li key={study.slug}>
                  <CaseStudyCard study={study} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-line-strong bg-surface px-6 py-14 text-center sm:px-12">
              <span className="grid size-12 place-items-center rounded-xl bg-signal-soft text-signal">
                <Icon name="file-text" className="size-6" />
              </span>
              <p className="mt-6 font-display text-display-md font-semibold text-foreground">
                First case studies in preparation
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                We&apos;re working with clients to document recent projects. In the meantime, we&apos;re happy to walk
                you through our approach to problems like yours on a call.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="policy-title">
        <Container>
          <SectionHeader id="policy-title" eyebrow="Our standard" title="How we publish case studies" />
          <ol className="mt-12 grid gap-x-10 md:grid-cols-3">
            {publishingPolicy.map((p, i) => (
              <li key={p.title} className="border-t border-line-strong py-7">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBanner
        trackId="work_index"
        title="Let's talk about your project"
        description="Share what you're working on. We'll explain how we'd approach it and what a first phase could deliver."
        primary={{ label: "Discuss Your Project", href: "/contact" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
