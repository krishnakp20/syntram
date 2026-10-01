import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getIndustry } from "@/content/industries";
import { getServicesBySlugs } from "@/content/services";
import type { CaseStudy } from "@/types/content";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const industry = getIndustry(study.industry);
  const services = getServicesBySlugs(study.services);

  return (
    <Link
      href={`/work/${study.slug}`}
      data-track-case-study={study.slug}
      className="group reveal flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-line-strong"
    >
      {study.coverImage ? (
        <Image
          src={study.coverImage.src}
          alt={study.coverImage.alt}
          width={study.coverImage.width}
          height={study.coverImage.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div aria-hidden="true" className="bg-grid relative aspect-[16/10] w-full border-b border-line bg-surface">
          <div className="absolute inset-0 grid place-items-center font-mono text-xs tracking-wider text-subtle uppercase">
            {industry?.title ?? "Case study"}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.6875rem] tracking-wider text-signal uppercase">
          {study.placeholder ? "Placeholder · " : ""}
          {industry?.title}
        </p>
        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{study.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Services">
          {services.map((s) => (
            <li key={s.slug} className="rounded-md border border-line px-2 py-0.5 text-xs text-muted-foreground">
              {s.shortTitle}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-signal">
          Read case study
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </Link>
  );
}
