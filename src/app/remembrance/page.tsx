import type { Metadata } from "next";
import { RemembranceOrnament } from "@/components/decorative/remembrance-ornament";
import { ActionLink, PageHero } from "@/components/page-hero";
import { ScaledImage } from "@/components/scaled-image";
import { getSiteContent } from "@/lib/cms";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  pages.remembrance.title,
  pages.remembrance.description,
  pages.remembrance.path,
);

export const revalidate = 30;

export default async function RemembrancePage() {
  const { copy } = await getSiteContent();
  return (
    <>
      <PageHero title={copy.remembranceWall} lede={copy.remembranceTag} />
      <div className="remembrance-stage relative isolate overflow-hidden">
        <RemembranceOrnament />
        <div className="wrap section ornament-foreground grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="lg:col-span-5">
          <ScaledImage
            src="/images/remembrance-wall.jpg"
            alt="Baker-Bebergal-Karesh Holocaust Remembrance Wall at BSBI, including the Joe Engel exhibit and commemorative plaques"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-top"
            frameClassName="aspect-[3/4] w-full"
          />
          <figcaption className="museum-caption">
            Joe Engel exhibit and commemorative plaques, downtown synagogue
          </figcaption>
        </figure>
        <article className="flex flex-col gap-5 lg:col-span-7 lg:pt-4">
          <p className="max-w-xl text-base leading-relaxed">{copy.remembranceBody}</p>
          <p className="max-w-xl text-base leading-relaxed">{copy.remembranceLegacy}</p>
          <p className="max-w-xl text-base leading-relaxed text-muted">{copy.remembranceNote}</p>
          <p className="max-w-xl text-base leading-relaxed">{copy.remembranceContact}</p>
          <p className="display text-2xl text-charleston">{copy.remembranceWhen}</p>
          <p className="text-base text-muted">
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span aria-hidden> · </span>
            <a className="text-link" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ActionLink href={site.phoneHref}>Call the office</ActionLink>
            <ActionLink href="/donate" variant="ghost">
              {copy.remembranceFund}
            </ActionLink>
          </div>
        </article>
        </div>
      </div>
    </>
  );
}
