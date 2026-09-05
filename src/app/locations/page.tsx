import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import { getSiteContent } from "@/lib/cms";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.locations.title, pages.locations.description, pages.locations.path);

export const revalidate = 30;

export default async function LocationsPage() {
  const { copy } = await getSiteContent();
  const { downtown, minyanHouse } = site.locations;

  return (
    <>
      <PageHero title="Locations" lede={copy.downtownLocation} />
      <PageShell>
        <div className="flex flex-col gap-14">
          <Place
            title={downtown.name}
            address={downtown.fullAddress}
            body={copy.downtownLocation}
            google={downtown.googleMaps}
            apple={downtown.appleMaps}
            embed={downtown.embed}
          />
          <Place
            title={minyanHouse.name}
            address={minyanHouse.fullAddress}
            body={copy.minyanHouse}
            google={minyanHouse.googleMaps}
            apple={minyanHouse.appleMaps}
            embed={minyanHouse.embed}
          />

          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">Cemeteries in Charleston</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.cemeteryLead}</p>
            <ul className="mt-4 flex max-w-2xl flex-col gap-3 text-base leading-relaxed">
              <li>
                <strong>Maryville Cemetery</strong> — {copy.cemeteryMaryville}
              </li>
              <li>
                <strong>Beth Israel Cemetery</strong> — {copy.cemeteryBethIsrael}
              </li>
              <li>
                <strong>Brith Sholom Cemetery</strong> — {copy.cemeteryBrithSholom}
              </li>
            </ul>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{copy.cemeteryNote}</p>
          </section>
        </div>
      </PageShell>
    </>
  );
}

function Place({
  title,
  address,
  body,
  google,
  apple,
  embed,
}: {
  title: string;
  address: string;
  body: string;
  google: string;
  apple: string;
  embed: string;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="display text-2xl sm:text-3xl">{title}</h2>
        <p className="mt-2 text-lg">
          <a className="text-link" href={google}>
            {address}
          </a>
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{body}</p>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ActionLink href={google}>Google Maps</ActionLink>
          <ActionLink href={apple} variant="ghost">
            Apple Maps
          </ActionLink>
        </div>
      </div>
      <iframe
        title={`Map of ${title}`}
        src={embed}
        className="aspect-[4/3] w-full max-w-full border border-line sm:aspect-video"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
