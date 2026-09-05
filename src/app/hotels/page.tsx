import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getSiteContent } from "@/lib/cms";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.hotels.title, pages.hotels.description, pages.hotels.path);

export const revalidate = 30;

export default async function HotelsPage() {
  const { copy, hotels } = await getSiteContent();

  return (
    <>
      <PageHero title="Hotels" lede={copy.visitBody} />
      <div className="wrap-narrow section">
        {hotels.map((hotel) => (
          <article key={hotel.name} className="border-t border-line py-6">
            <h2 className="display text-xl text-charleston">{hotel.name}</h2>
            <p className="mt-1 text-sm text-muted">
              {hotel.addr}
              {hotel.dist ? ` · ${hotel.dist}` : ""}
              <span aria-hidden> · </span>
              {hotel.eruv ? "Inside the eruv" : "Outside the eruv"}
            </p>
            {hotel.phone ? (
              <a className="text-link mt-2 inline-block text-sm" href={`tel:+1${hotel.phone.replace(/\D/g, "")}`}>
                {hotel.phone}
              </a>
            ) : null}
            {hotel.note ? <p className="mt-2 text-sm text-muted">{hotel.note}</p> : null}
          </article>
        ))}
        <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
          For hotels in the area, also see the{" "}
          <a className="text-link" href="/eruv">
            Eruv
          </a>{" "}
          page. Synagogue:{" "}
          <a className="text-link" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </>
  );
}
