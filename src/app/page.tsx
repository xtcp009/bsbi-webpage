import type { Metadata } from "next";
import Link from "next/link";
import { EruvBanner } from "@/components/eruv-banner";
import { EventList } from "@/components/event-row";
import { NextMinyan } from "@/components/next-minyan";
import { ActionLink } from "@/components/page-hero";
import AnimatedContent from "@/components/react-bits/animated-content";
import FadeContent from "@/components/react-bits/fade-content";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
import SplitText from "@/components/react-bits/split-text";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ScaledImage } from "@/components/scaled-image";
import { SourceNote } from "@/components/source-note";
import { copy, weeklyClasses } from "@/content/copy";
import { calendarEntryToEvent } from "@/lib/events";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { getShulcloudSnapshot, snapshotToBoard } from "@/lib/shulcloud";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta(pages.home.title, pages.home.description, pages.home.path),
  title: { absolute: pages.home.title },
};

export const revalidate = 120;

export default async function HomePage() {
  const live = await getShulcloudSnapshot();
  const board = snapshotToBoard(live);
  const upcoming = live.events.map(calendarEntryToEvent);

  return (
    <>
      <section>
        <HeroSlideshow slides={HERO_SLIDES} />
        <div className="wrap pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
          <SplitText
            text="Brith Sholom Beth Israel"
            tag="h1"
            delay={70}
            duration={0.7}
            className="display max-w-4xl text-[clamp(2.4rem,6.4vw,4.6rem)] leading-[0.94] text-charleston"
          />
          <FadeContent>
            <p className="lede mt-6 text-muted">{copy.homeTagline}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <ActionLink href="/times">Today&apos;s Services</ActionLink>
              <ActionLink href="/visit" variant="secondary">
                Plan a Visit
              </ActionLink>
            </div>
          </FadeContent>
        </div>
      </section>

      <section className="border-t border-line">
        <FadeContent>
          <div className="wrap grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="lg:col-span-7">
            {board ? (
              <NextMinyan board={board} />
            ) : (
              <>
                <h2 className="display text-3xl text-charleston">Services</h2>
                <p className="mt-4 max-w-xl text-base text-muted">{copy.dailyServices}</p>
                <div className="mt-6">
                  <ActionLink href="/times" variant="ghost">
                    Full schedule
                  </ActionLink>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-10 border-t border-line pt-10 lg:col-span-5 lg:border-t-0 lg:pt-0">
            {live.parsha || live.candleLighting || live.fridayNight.length > 0 ? (
              <div>
                <p className="kicker">This Shabbat</p>
                {live.parsha ? (
                  <p className="display mt-3 text-3xl text-charleston">{live.parsha.startsWith("Parshat") ? live.parsha : `Parshat ${live.parsha}`}</p>
                ) : null}
                <p className="mt-3 text-base text-muted">
                  {live.candleLighting ? `Candle lighting ${live.candleLighting}` : null}
                  {live.candleLighting && live.havdalah ? (
                    <>
                      <br />
                    </>
                  ) : null}
                  {live.havdalah ? `Havdalah ${live.havdalah}` : null}
                </p>
                {live.nextHoliday ? (
                  <p className="mt-2 text-sm text-muted">
                    {live.nextHoliday.name}
                    <span aria-hidden> · </span>
                    {live.nextHoliday.when}
                  </p>
                ) : null}
                {live.fridayNight.length > 0 ? (
                  <ul className="mt-4 flex max-w-sm flex-col gap-1 text-base text-muted">
                    {live.fridayNight.map((item) => (
                      <li key={item.name} className="flex justify-between gap-4">
                        <span>{item.name}</span>
                        <span className="tabular-nums">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
            <EruvBanner compact live={live.eruv} />
            <SourceNote ok={live.ok} fetchedAt={live.fetchedAt} sourceUrl={live.sourceUrl} next="/" />
          </div>
          </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap grid items-start gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-5 lg:pt-4">
            <ScrollReveal
              containerClassName="display text-3xl text-charleston sm:text-4xl"
              baseRotation={1}
              blurStrength={2}
            >
              {copy.welcomeClose}
            </ScrollReveal>
            <p className="lede mt-6 text-muted">{copy.historyLead}</p>
            <p className="mt-6">
              <Link href="/about" className="text-link">
                Our story
              </Link>
            </p>
          </div>
          <figure className="lg:col-span-7 lg:mt-10">
            <ScaledImage
              src="/images/entrance-today.jpg"
              alt="Entrance of Brith Sholom Beth Israel Synagogue"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
              frameClassName="aspect-[4/3] w-full"
            />
            <figcaption className="museum-caption">Main entrance, 182 Rutledge Avenue</figcaption>
          </figure>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap py-16 lg:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="display text-3xl text-charleston">Weekly classes</h2>
            <Link href="/community#classes" className="text-link">
              All classes
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {weeklyClasses.map((item) => (
              <Link key={item.title} href="/community#classes" className="min-w-0">
                <ScaledImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center"
                  frameClassName="aspect-[4/3] w-full bg-cream"
                />
                <h3 className="display mt-4 text-xl text-charleston">{item.title}</h3>
                <p className="mt-1 text-base text-muted">
                  {item.when}
                  <span aria-hidden> · </span>
                  {item.where}
                </p>
              </Link>
            ))}
          </div>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap py-14 lg:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="display text-3xl text-charleston">Upcoming events</h2>
            <a className="text-link" href={live.calendarUrl}>
              ShulCloud calendar
            </a>
          </div>
          <div className="mt-8 max-w-3xl">
            {upcoming.length > 0 ? (
              <EventList events={upcoming} />
            ) : (
              <p className="text-base text-muted">
                No upcoming programs were listed on ShulCloud beyond regular services.{" "}
                <Link href="/calendar" className="text-link">
                  See the week&apos;s times
                </Link>
                .
              </p>
            )}
          </div>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap py-16 lg:py-24">
          <figure>
            <ScaledImage
              src="/images/habs-gate.jpg"
              alt="Central double-pass gate by Sabel Iron Works, Historic American Buildings Survey"
              fill
              sizes="100vw"
              className="object-cover object-center"
              frameClassName="aspect-[5/4] w-full sm:aspect-[16/9]"
            />
            <figcaption className="museum-caption">
              Central double-pass gate
              <br />
              Sabel Iron Works, ca. 1947
              <br />
              Historic American Buildings Survey
            </figcaption>
          </figure>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <ScrollReveal
              containerClassName="display text-3xl text-charleston sm:text-4xl"
              baseRotation={1}
              blurStrength={2}
            >
              Our story
            </ScrollReveal>
            <p className="lede mt-6 text-muted">{copy.rabbiWelcome}</p>
          </div>
          <ol className="lg:col-span-7">
            <li className="event-row">
              <div className="pt-1 text-sm font-medium tracking-wide text-muted">1854</div>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Founded by immigrant Polish and Prussian Jews, later strengthened by Eastern European arrivals who made
                their home in Charleston.
              </p>
            </li>
            <li className="event-row">
              <div className="pt-1 text-sm font-medium tracking-wide text-muted">1948</div>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Beth Israel opened the synagogue on Rutledge Avenue, in the historic fabric of the city.
              </p>
            </li>
            <li className="event-row">
              <div className="pt-1 text-sm font-medium tracking-wide text-muted">1956</div>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                The united congregation dedicated the building and launched the Charleston Hebrew Institute, now
                Addlestone Hebrew Academy.
              </p>
            </li>
          </ol>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap grid items-start gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <h2 className="display text-3xl text-charleston">Congregation life</h2>
            <p className="lede mt-5 text-muted">
              {copy.doorsOpen} Photographs from dinners, classes, holidays, and gatherings are kept on Facebook.
            </p>
            <p className="mt-6">
              <a className="text-link" href={site.socials.facebookPhotos}>
                Community photographs on Facebook
              </a>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            <ScaledImage
              src="/images/exterior-street.jpg"
              alt="BSBI synagogue from Rutledge Avenue"
              fill
              sizes="(max-width: 1024px) 50vw, 28vw"
              className="object-cover object-center"
              frameClassName="aspect-[4/5] w-full"
            />
            <ScaledImage
              src="/images/yard-today.jpg"
              alt="Yard and side of Brith Sholom Beth Israel Synagogue"
              fill
              sizes="(max-width: 1024px) 50vw, 28vw"
              className="object-cover object-center"
              frameClassName="mt-8 aspect-[4/5] w-full"
            />
          </div>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap grid gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <AnimatedContent>
          <div>
            <p className="kicker">Downtown</p>
            <h2 className="display mt-3 text-2xl text-charleston sm:text-3xl">
              <a href={site.locations.downtown.googleMaps}>{site.locations.downtown.fullAddress}</a>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{copy.downtownLocation}</p>
            <p className="mt-5">
              <a className="text-link" href={site.locations.downtown.googleMaps}>
                Directions
              </a>
              <span aria-hidden> · </span>
              <Link href="/locations" className="text-link">
                Both locations
              </Link>
            </p>
          </div>
          </AnimatedContent>
          <AnimatedContent delay={0.08}>
          <div>
            <p className="kicker">South Windermere</p>
            <h2 className="display mt-3 text-2xl text-charleston sm:text-3xl">
              <a href={site.locations.minyanHouse.googleMaps}>{site.locations.minyanHouse.fullAddress}</a>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{copy.minyanHouse}</p>
            <p className="mt-5">
              <a className="text-link" href={site.locations.minyanHouse.googleMaps}>
                Directions to the Minyan House
              </a>
            </p>
          </div>
          </AnimatedContent>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap grid items-start gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <figure className="lg:col-span-5">
            <ScaledImage
              src="/images/remembrance-wall.jpg"
              alt="Baker-Bebergal-Karesh Holocaust Remembrance Wall at BSBI, including the Joe Engel exhibit and commemorative plaques"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
              frameClassName="aspect-[3/4] w-full"
            />
            <figcaption className="museum-caption">{copy.remembranceWall}</figcaption>
          </figure>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="kicker">{copy.remembranceFund}</p>
            <h2 className="display mt-3 text-3xl text-charleston sm:text-4xl">{copy.remembranceTitle}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{copy.remembranceBody}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{copy.remembranceWhen}</p>
            <p className="mt-6">
              <Link href="/remembrance" className="text-link">
                Dedicate a commemorative plaque
              </Link>
            </p>
          </div>
        </div>
        </FadeContent>
      </section>
    </>
  );
}
