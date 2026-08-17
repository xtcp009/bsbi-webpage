import type { Metadata } from "next";
import FadeContent from "@/components/react-bits/fade-content";
import { ActionLink, PageHero } from "@/components/page-hero";
import { ScaledImage } from "@/components/scaled-image";
import { gallery } from "@/content/gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Photo Gallery of Brith Sholom Beth Israel Synagogue, Charleston.",
  alternates: { canonical: `${site.url}/gallery` },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero kicker="Photo Gallery" title="Photo Albums" lede="(14 Albums)" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6">
        <FadeContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.today.map((photo) => (
              <figure key={photo.src} className="panel overflow-hidden">
                <ScaledImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center"
                  frameClassName="aspect-[3/4] w-full sm:aspect-[4/3]"
                />
                <figcaption className="px-3 py-2 text-xs text-muted">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </FadeContent>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl">Historic American Buildings Survey</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.historic.map((photo) => (
              <figure key={photo.src} className="panel overflow-hidden">
                <ScaledImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center"
                  frameClassName="aspect-[3/4] w-full"
                />
                <figcaption className="px-3 py-2 text-xs text-muted">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl">{gallery.albumsNote}</h2>
          <p className="mt-2 text-sm text-muted">(14 Albums)</p>
          <ul className="mt-4 columns-1 gap-8 text-sm sm:columns-2">
            {gallery.albums.map((album) => (
              <li key={album} className="break-inside-avoid py-1">
                {album}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <ActionLink href="https://www.bsbisynagogue.org/photo_gallery.php">Photo Gallery</ActionLink>
          </div>
        </section>
      </div>
    </>
  );
}
