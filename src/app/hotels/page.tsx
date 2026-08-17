import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hotels",
  description: copy.visitBody,
  alternates: { canonical: `${site.url}/hotels` },
};

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
      <PageHero kicker="Hotels" title="Hotels" lede={copy.visitBody} />
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-8 sm:px-6">
        {hotels.map((hotel, index) => (
          <FadeContent key={hotel.name} delay={index * 0.03}>
            <article className="panel p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="font-[family-name:var(--font-display)] text-xl">{hotel.name}</h2>
                <span className={`px-3 py-1 text-xs font-semibold ${hotel.eruv ? "bg-emerald-700/15 text-emerald-900" : "bg-amber-700/15 text-amber-900"}`}>
                  {hotel.eruv ? "Inside the eruv" : "Outside the eruv"}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {hotel.addr}
                {hotel.dist ? ` · ${hotel.dist}` : ""}
              </p>
              <a className="mt-2 inline-block text-sm font-medium text-teal" href={`tel:${hotel.phone.replace(/\D/g, "")}`}>
                {hotel.phone}
              </a>
              {hotel.note ? <p className="mt-2 text-sm text-muted">{hotel.note}</p> : null}
            </article>
          </FadeContent>
        ))}
        <p className="text-sm text-muted">
          For Hotels in the area — also see the <a className="underline underline-offset-4" href="/eruv">Eruv</a> page. Synagogue: {site.phoneDisplay}.
        </p>
      </div>
    </>
  );
}
