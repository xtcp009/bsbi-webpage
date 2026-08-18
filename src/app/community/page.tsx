import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ScaledImage } from "@/components/scaled-image";
import { copy, weeklyClasses } from "@/content/copy";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.community.title, pages.community.description, pages.community.path);

export default function CommunityPage() {
  return (
    <>
      <PageHero
        title="Sisterhood, Brotherhood, and Classes"
        lede="Adult learning, Sisterhood, Brotherhood, and the Chevra Kadisha — the work that holds the congregation together."
      />
      <div className="wrap section flex flex-col gap-16">
        <section id="classes">
          <h2 className="display text-3xl text-charleston">Weekly Classes</h2>
          <p className="lede mt-3 text-muted">Open to the community. Come as you are.</p>
          <div className="mt-10">
            {weeklyClasses.map((item) => (
              <article key={item.title} className="grid gap-8 border-t border-line py-12 lg:grid-cols-[minmax(18rem,32rem)_minmax(0,1fr)] lg:items-start">
                <ScaledImage
                  src={item.image}
                  alt={item.alt}
                  width={1024}
                  height={1024}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 32rem"
                  frameClassName="w-full bg-cream"
                />
                <div className="md:pt-1">
                  <h3 className="display text-2xl text-charleston">{item.title}</h3>
                  <p className="mt-2 text-base text-muted">
                    {item.when}
                    <span aria-hidden> · </span>
                    {item.where}
                    {item.teacher ? (
                      <>
                        <span aria-hidden> · </span>
                        with {item.teacher}
                      </>
                    ) : null}
                  </p>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="womens-group" className="border-t border-line pt-12">
          <h2 className="display text-2xl">Sisterhood</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.sisterhood}</p>
        </section>
        <section id="mens-group" className="border-t border-line pt-12">
          <h2 className="display text-2xl">Brotherhood</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.brotherhood}</p>
        </section>
        <section id="burial-society" className="border-t border-line pt-12">
          <h2 className="display text-2xl">Chevra Kadisha</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.chevraKadisha}</p>
          <p className="mt-3 max-w-2xl text-base text-muted">{copy.chevraContact}</p>
        </section>
        <section className="border-t border-line pt-12">
          <h2 className="display text-2xl">Jewish Schools</h2>
          <div className="mt-4 flex max-w-2xl flex-col gap-4 text-base leading-relaxed">
            <p>
              <strong>Addlestone Hebrew Academy</strong> — {copy.addlestone}
            </p>
            <p>
              <strong>Preschool of the Arts</strong> — {copy.preschool}
            </p>
          </div>
        </section>
        <section id="rentals" className="border-t border-line pt-12">
          <h2 className="display text-2xl">Rentals</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.rentalsSanctuary}</p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed">{copy.rentalsHall}</p>
          <p className="mt-3 text-base text-muted">
            Office:{" "}
            <a className="text-link" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
