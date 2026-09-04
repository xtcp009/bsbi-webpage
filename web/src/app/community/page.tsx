import type { Metadata } from "next";
import { FlyerList } from "@/components/flyer-list";
import { PageHero } from "@/components/page-hero";
import AnimatedContent from "@/components/react-bits/animated-content";
import FadeContent from "@/components/react-bits/fade-content";
import ScrollFloat from "@/components/react-bits/scroll-float";
import { ScaledImage } from "@/components/scaled-image";
import { getFlyers, getSiteContent, getWeeklyClasses } from "@/lib/cms";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.community.title, pages.community.description, pages.community.path);

export const revalidate = 30;

export default async function CommunityPage() {
  const [{ copy }, flyers, weeklyClasses] = await Promise.all([
    getSiteContent(),
    getFlyers(),
    getWeeklyClasses(),
  ]);

  return (
    <>
      <PageHero title={copy.communityHeroTitle} lede={copy.communityHeroLede} />
      <div className="wrap section flex flex-col gap-16">
        {flyers.length > 0 ? (
          <section id="flyers">
            <ScrollFloat className="display text-3xl text-charleston">This week</ScrollFloat>
            <p className="lede mt-3 text-muted">{copy.communityFlyersLede}</p>
            <FlyerList flyers={flyers} />
          </section>
        ) : null}

        <section id="classes">
          <ScrollFloat className="display text-3xl text-charleston">Weekly Classes</ScrollFloat>
          <p className="lede mt-3 text-muted">{copy.communityClassesLede}</p>
          <div className="mt-10">
            {weeklyClasses.map((item, index) => (
              <AnimatedContent key={item._id} delay={index * 0.08} distance={24}>
              <article className="flex flex-col gap-6 border-t border-line py-12">
                <div>
                  <h3 className="display text-2xl text-charleston">{item.title}</h3>
                  {item.when || item.where || item.teacher ? (
                    <p className="mt-2 text-base text-muted">
                      {[item.when, item.where, item.teacher ? `with ${item.teacher}` : ""]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  ) : null}
                </div>
                <ScaledImage
                  src={item.image}
                  alt={item.alt}
                  width={1024}
                  height={1024}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 32rem"
                  frameClassName="w-full max-w-xl bg-cream"
                />
                {item.body ? (
                  <p className="max-w-xl text-base leading-relaxed text-muted">{item.body}</p>
                ) : null}
              </article>
              </AnimatedContent>
            ))}
          </div>
        </section>

        <FadeContent>
        <section id="womens-group" className="border-t border-line pt-12">
          <ScrollFloat className="display text-2xl">Sisterhood</ScrollFloat>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.sisterhood}</p>
        </section>
        <section id="mens-group" className="border-t border-line pt-12">
          <ScrollFloat className="display text-2xl">Brotherhood</ScrollFloat>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.brotherhood}</p>
        </section>
        <section id="burial-society" className="border-t border-line pt-12">
          <ScrollFloat className="display text-2xl">Chevra Kadisha</ScrollFloat>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.chevraKadisha}</p>
          <p className="mt-3 max-w-2xl text-base text-muted">{copy.chevraContact}</p>
        </section>
        <section className="border-t border-line pt-12">
          <ScrollFloat className="display text-2xl">Jewish Schools</ScrollFloat>
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
          <ScrollFloat className="display text-2xl">Rentals</ScrollFloat>
          <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.rentalsSanctuary}</p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed">{copy.rentalsHall}</p>
          <p className="mt-3 text-base text-muted">
            Office:{" "}
            <a className="text-link" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </p>
        </section>
        </FadeContent>
      </div>
    </>
  );
}
