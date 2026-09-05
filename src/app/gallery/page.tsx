import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import { ScaledImage } from "@/components/scaled-image";
import { getGalleryPhotos } from "@/lib/cms";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.gallery.title, pages.gallery.description, pages.gallery.path);

export default async function GalleryPage() {
  const gallery = await getGalleryPhotos();

  return (
    <>
      <PageHero
        title="Photo Gallery"
        lede="The synagogue on Rutledge Avenue, photographed today, with Historic American Buildings Survey records of the building and its ironwork."
      />
      <div className="wrap section flex flex-col gap-16">
        <section>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.today.map((photo) => (
              <figure key={photo.src}>
                <ScaledImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center"
                  frameClassName="aspect-[4/5] w-full sm:aspect-[4/3]"
                />
                <figcaption className="museum-caption mt-2">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <h2 className="display text-2xl text-charleston">Historic American Buildings Survey</h2>
          <p className="lede mt-3 text-muted">
            Library of Congress records of the synagogue, including the central double-pass gate by Sabel Iron Works.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.historic.map((photo) => (
              <figure key={photo.src}>
                <ScaledImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover object-center"
                  frameClassName="aspect-[3/4] w-full"
                />
                <figcaption className="museum-caption mt-2">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="max-w-2xl border-t border-line pt-10">
          <h2 className="display text-2xl text-charleston">Congregation photographs</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{gallery.communityNote}</p>
          <p className="mt-6">
            <ActionLink href={site.socials.facebookPhotos}>Photographs on Facebook</ActionLink>
          </p>
        </section>
      </div>
    </>
  );
}
