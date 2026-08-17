import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations",
  description: copy.downtownLocation,
  alternates: { canonical: `${site.url}/locations` },
};

export default function LocationsPage() {
  const { downtown, minyanHouse } = site.locations;

  return (
    <>
      <PageHero kicker="Locations" title="Locations" lede={copy.downtownLocation} />
      <PageShell>
        <div className="flex flex-col gap-10">
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

          <FadeContent>
            <section className="panel panel-gold p-5 sm:p-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl">BSBI Cemeteries in Charleston</h2>
              <p className="mt-3 text-sm leading-relaxed">{copy.cemeteryLead}</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed">
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
              <p className="mt-4 text-sm leading-relaxed text-muted">{copy.cemeteryNote}</p>
            </section>
          </FadeContent>
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
        <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">{title}</h2>
        <p className="mt-2 font-medium">{address}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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
