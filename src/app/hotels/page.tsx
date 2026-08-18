import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { copy } from "@/content/copy";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.hotels.title, pages.hotels.description, pages.hotels.path);

const hotels = [
  { name: "Hampton Inn Charleston – Historic District", dist: "0.7 mile from shul", addr: "345 Meeting Street", phone: "(843) 723-4000", note: "Congregation rate available; confirm before booking.", eruv: true },
  { name: "Embassy Suites Historic Charleston", dist: "0.8 mile from shul", addr: "337 Meeting Street", phone: "(843) 723-6900", note: "Congregation rate available; confirm before booking.", eruv: true },
  { name: "Francis Marion Hotel", dist: "0.7 miles from shul", addr: "387 King Street", phone: "(843) 722-0600", eruv: true },
  { name: "Hyatt Place Charleston – Historic District", dist: "0.6 mile from shul", addr: "560 King Street", phone: "(843) 414-4900", note: "Stairwells have motion-activated lighting.", eruv: true },
  { name: "Holiday Inn Charleston Historic Downtown", dist: "0.7 mile from shul", addr: "425 Meeting Street", phone: "(843) 718-2327", note: "Main door is electric; a non-electric valet door is sometimes available.", eruv: true },
  { name: "Courtyard Marriott – Historic District", dist: "0.9 mile from shul", addr: "125 Calhoun Street", phone: "(843) 805-7900", eruv: true },
  { name: "The Dewberry", dist: "0.8 miles from shul", addr: "334 Meeting Street", phone: "(843) 558-8000", note: "Stairwells have motion activated lighting", eruv: true },
  { name: "Charleston Place", dist: "1.4 miles from shul", addr: "205 Meeting Street", phone: "(843) 722-4900", eruv: true },
  { name: "Hotel Bennett", dist: "", addr: "404 King Street", phone: "(843) 203-0922", eruv: true },
  { name: "Comfort Inn", dist: "0.5 mile from shul", addr: "144 Bee Street", phone: "(843) 577-2224", note: "Outside the eruv.", eruv: false },
];

export default function HotelsPage() {
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
            <a className="text-link mt-2 inline-block text-sm" href={`tel:+1${hotel.phone.replace(/\D/g, "")}`}>
              {hotel.phone}
            </a>
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
