import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
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
      <PageHero kicker="Visit Charleston" title={copy.visitLead} lede={copy.visitBody} />
      <PageShell>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/hotels">Hotels</ActionLink>
            <ActionLink href="/kosher" variant="ghost">
              Kosher
            </ActionLink>
          </div>
          <p className="text-sm leading-relaxed">{copy.visitorCenter}</p>
          <p className="text-sm leading-relaxed">{copy.visitCharm}</p>
          <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
            {copy.visitAmenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ScrollReveal
            containerClassName=""
            textClassName="font-[family-name:var(--font-display)] text-xl text-charleston"
          >
            {copy.visitHospitality}
          </ScrollReveal>

          <FadeContent>
            <section className="panel panel-gold p-5 sm:p-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl">Shabbos Hospitality</h2>
              <p className="mt-3 text-sm leading-relaxed">{copy.shabbosHouse}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{copy.shabbosHouseDetails}</p>
              <p className="mt-3 text-sm leading-relaxed">{copy.shabbosHouseReserve}</p>
            </section>
          </FadeContent>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">Kosher Meals to go</h2>
            <p className="mt-3 text-sm leading-relaxed">{copy.chefLinda}</p>
            <p className="mt-2 text-sm text-muted">{copy.chefLindaContact}</p>
            <div className="mt-4">
              <ActionLink href="/kosher" variant="ghost">
                Kosher
              </ActionLink>
            </div>
          </section>
        </div>
      </PageShell>
    </>
  );
}
