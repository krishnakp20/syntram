import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { ArticleSummary } from "@/types/content";

function hrefFor(article: ArticleSummary) {
  return article.kind === "blog" ? `/blog/${article.slug}` : `/guides/${article.slug}`;
}

export function ArticleCard({ article, featured = false }: { article: ArticleSummary; featured?: boolean }) {
  return (
    <Link
      href={hrefFor(article)}
      data-track-article={`${article.kind}:${article.slug}`}
      className={cn(
        "group reveal flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-line-strong",
        featured && "lg:flex-row",
      )}
    >
      {article.featuredImage && (
        <Image
          src={article.featuredImage.src}
          alt={article.featuredImage.alt}
          width={article.featuredImage.width}
          height={article.featuredImage.height}
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={cn("aspect-[16/9] w-full object-cover", featured && "lg:aspect-auto lg:w-1/2")}
        />
      )}
      <div className={cn("flex flex-1 flex-col p-6", featured && "sm:p-8")}>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6875rem] tracking-wider text-signal uppercase">
          <span>{article.kind === "guide" ? "Guide" : "Article"}</span>
          <span aria-hidden="true" className="text-subtle">
            ·
          </span>
          <span className="text-muted-foreground">{article.category}</span>
          {article.draft && <span className="rounded bg-amber-400/20 px-1.5 text-amber-800">Draft</span>}
        </p>
        <h3
          className={cn(
            "mt-3 font-display font-semibold text-foreground group-hover:underline group-hover:underline-offset-4",
            featured ? "text-display-md" : "text-lg",
          )}
        >
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <p className="mt-auto pt-6 text-[0.8125rem] text-subtle">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.readingMinutes} min read
        </p>
      </div>
    </Link>
  );
}
