import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sisterhood, Brotherhood, and Classes",
  description: copy.facilities,
  alternates: { canonical: `${site.url}/community` },
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        kicker="Community"
        title="Sisterhood, Brotherhood, and Classes"
        lede="BSBI offers a wide range of adult education classes, and its activities also include an active Sisterhood and Men’s Club."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-2">
        <FadeContent>
          <section id="classes" className="panel panel-gold p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Weekly Classes</h2>
            <ul className="mt-3 flex flex-col gap-3 text-sm leading-relaxed">
              <li>{copy.parshaClass}</li>
              <li>{copy.lunchAndLearn}</li>
            </ul>
          </section>
        </FadeContent>
        <FadeContent delay={0.08}>
          <section id="womens-group" className="panel p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Sisterhood</h2>
            <p className="mt-3 text-sm leading-relaxed">{copy.sisterhood}</p>
          </section>
        </FadeContent>
        <FadeContent>
          <section id="mens-group" className="panel p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Brotherhood</h2>
            <p className="mt-3 text-sm leading-relaxed">{copy.brotherhood}</p>
          </section>
        </FadeContent>
        <FadeContent delay={0.08}>
          <section id="burial-society" className="panel p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Chevra Kadisha</h2>
            <p className="mt-3 text-sm leading-relaxed">{copy.chevraKadisha}</p>
            <p className="mt-3 text-sm text-muted">{copy.chevraContact}</p>
          </section>
        </FadeContent>
        <FadeContent>
          <section className="panel p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Jewish Schools</h2>
            <div className="mt-3 flex flex-col gap-4 text-sm leading-relaxed">
              <p>
                <strong>Addlestone Hebrew Academy</strong> — {copy.addlestone}
              </p>
              <p>
                <strong>Preschool of the Arts</strong> — {copy.preschool}
              </p>
            </div>
          </section>
        </FadeContent>
        <FadeContent delay={0.08}>
          <section id="rentals" className="panel p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Rentals</h2>
            <p className="mt-3 text-sm leading-relaxed">{copy.sisterhood}</p>
            <p className="mt-3 text-sm leading-relaxed">{copy.rentalsSanctuary}</p>
            <p className="mt-3 text-sm leading-relaxed">{copy.rentalsHall}</p>
            <p className="mt-3 text-sm text-muted">Office: {site.phoneDisplay}</p>
          </section>
        </FadeContent>
      </div>
    </>
  );
}
