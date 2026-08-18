import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit Charleston",
  description: copy.visitBody,
  alternates: { canonical: `${site.url}/visit` },
};

export default function VisitPage() {
  return (
    <>
      <PageHero title={copy.visitLead} lede={copy.visitBody} />
      <PageShell>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ActionLink href="/hotels">Hotels</ActionLink>
            <ActionLink href="/kosher" variant="ghost">
              Kosher
            </ActionLink>
          </div>
          <p className="max-w-2xl text-base leading-relaxed">{copy.visitorCenter}</p>
          <p className="max-w-2xl text-base leading-relaxed">{copy.visitCharm}</p>
          <ul className="flex max-w-2xl flex-col gap-2 text-base leading-relaxed text-muted">
            {copy.visitAmenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="display text-2xl text-charleston">{copy.visitHospitality}</p>

          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">Shabbos Hospitality</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.shabbosHouse}</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{copy.shabbosHouseDetails}</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed">{copy.shabbosHouseReserve}</p>
          </section>

          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">Kosher meals to go</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.chefLinda}</p>
            <p className="mt-2 text-base text-muted">{copy.chefLindaContact}</p>
            <p className="mt-5">
              <ActionLink href="/kosher" variant="ghost">
                Kosher in Charleston
              </ActionLink>
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
