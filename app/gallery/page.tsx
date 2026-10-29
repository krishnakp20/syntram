import Image from "next/image";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/layout-primitives";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { galleryImages, type GalleryImage } from "@/content/company";
import { showGalleryPage } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery — Life at Syntram",
  description:
    "A look inside Syntram Technologies: our team, workplace and events. Photos from the people building AI, voice agents and software for businesses.",
  path: "/gallery",
  // Not indexed until real photos are published.
  noindex: galleryImages.length === 0,
});

function groupByCategory(images: GalleryImage[]) {
  const groups = new Map<string, GalleryImage[]>();
  for (const img of images) {
    const key = img.category ?? "Gallery";
    groups.set(key, [...(groups.get(key) ?? []), img]);
  }
  return [...groups.entries()];
}

export default function GalleryPage() {
  if (!showGalleryPage) notFound();
  const groups = groupByCategory(galleryImages);

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: "About", path: "/about" },
          { name: "Gallery", path: "/gallery" },
        ]}
        eyebrow="Gallery"
        title="Life at Syntram"
        intro="Our team, our workplace and the moments in between."
      />

      <Section aria-label="Photos">
        <Container>
          {groups.length === 0 ? (
            <PlaceholderNotice>
              No photos have been added yet. Add images to <code>/public/gallery/</code> and list them in{" "}
              <code>content/company.ts</code>. This page is hidden in production until then.
            </PlaceholderNotice>
          ) : (
            <div className="flex flex-col gap-14">
              {groups.map(([category, images]) => (
                <section key={category} aria-labelledby={`gallery-${category}`}>
                  {groups.length > 1 && (
                    <h2 id={`gallery-${category}`} className="font-display text-xl font-semibold text-foreground">
                      {category}
                    </h2>
                  )}
                  <ul className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {images.map((img) => (
                      <li key={img.src} className="mb-4 break-inside-avoid">
                        <figure className="overflow-hidden rounded-2xl border border-line bg-card">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="h-auto w-full"
                          />
                          {img.caption && (
                            <figcaption className="px-4 py-3 text-sm text-muted-foreground">{img.caption}</figcaption>
                          )}
                        </figure>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CtaBanner
        trackId="gallery"
        title="Want to be in the next photo?"
        description="We're always interested in people who care about building useful technology."
        primary={{ label: "See careers", href: "/careers" }}
        secondary={{ label: "About Syntram", href: "/about" }}
      />
    </>
  );
}
