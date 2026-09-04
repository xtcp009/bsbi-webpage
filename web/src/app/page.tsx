import type { Metadata } from "next";
import Link from "next/link";
import { EruvBanner } from "@/components/eruv-banner";
import { EventList } from "@/components/event-row";
import { NextMinyan } from "@/components/next-minyan";
import { ActionLink } from "@/components/page-hero";
import AnimatedContent from "@/components/react-bits/animated-content";
import FadeContent from "@/components/react-bits/fade-content";
import ScrollFloat from "@/components/react-bits/scroll-float";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
import SplitText from "@/components/react-bits/split-text";
import { EventsOrnament } from "@/components/decorative/events-ornament";
import { ParshaOrnament } from "@/components/decorative/parsha-ornament";
import { RemembranceOrnament } from "@/components/decorative/remembrance-ornament";
import { ServicesOrnament } from "@/components/decorative/services-ornament";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ScaledImage } from "@/components/scaled-image";
import { SourceNote } from "@/components/source-note";
import { FlyerList } from "@/components/flyer-list";
import { homepageGallery } from "@/content/gallery";
import { getAnnouncements, getFlyers, getSiteContent, getWeeklyClasses } from "@/lib/cms";
import { calendarEntryToEvent } from "@/lib/events";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { getShulcloudSnapshot } from "@/lib/shulcloud";
import { nextMinyanFromSnapshot, postedTimes } from "@/lib/minyan";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";
import { ymdInCharleston } from "@/lib/format";

export const metadata: Metadata = {
  ...pageMeta(pages.home.title, pages.home.description, pages.home.path),
  title: { absolute: pages.home.title },
};

export const revalidate = 30;

export default async function HomePage() {
  const [live, content, announcements, flyers, classes] = await Promise.all([
    getShulcloudSnapshot(),
    getSiteContent(),
    getAnnouncements(),
    getFlyers(),
    getWeeklyClasses(),
  ]);
  const { copy, milestones } = content;
  const next = nextMinyanFromSnapshot(live);
  const todayYmd = ymdInCharleston();
  const todayDay = live.week.find((day) => day.date === todayYmd);
  const todayTimes = postedTimes(todayDay?.items ?? live.today);
  const todayLabel = todayDay?.label ?? "Today";
  const upcoming = live.events.map(calendarEntryToEvent);
  const tagline = copy.homeTagline;
  const welcome = copy.welcomeClose;

  return (
    <>
      <section>
        <HeroSlideshow slides={HERO_SLIDES} />
        <div className="wrap pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12">
          <SplitText
            text="Brith Sholom Beth Israel"
            tag="h1"
            splitType="chars"
            delay={28}
            duration={0.9}
            animateOnMount
            className="display max-w-4xl text-[clamp(2.4rem,6.4vw,4.6rem)] leading-[0.94] text-charleston"
          />
          <ScrollReveal
            tag="p"
            containerClassName="lede mt-6 max-w-3xl text-muted"
            baseRotation={1.5}
            blurStrength={4}
          >
            {tagline}
          </ScrollReveal>
          <FadeContent>
            <div className="mt-8 flex flex-row flex-wrap items-center gap-3 sm:gap-4">
              <ActionLink href="/times">Today&apos;s Services</ActionLink>
              <ActionLink href="/visit" variant="secondary">
                Plan a Visit
              </ActionLink>
            </div>
          </FadeContent>
        </div>
      </section>

      {announcements.length > 0 ? (
        <section className="border-t border-line">
          <div className="wrap py-8">
            <p className="kicker">Announcements</p>
            <ul className="mt-4 flex flex-col gap-4">
              {announcements.map((item) => (
                <li key={item._id} className="max-w-2xl">
                  {item.href ? (
                    <Link href={item.href} className="display text-xl text-charleston">
                      {item.title}
                    </Link>
                  ) : (
                    <p className="display text-xl text-charleston">{item.title}</p>
                  )}
                  {item.body ? <p className="mt-1 text-base text-muted">{item.body}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="relative overflow-hidden border-t border-line">
        <FadeContent>
          <div className="grid items-stretch lg:grid-cols-12">
          <div className="services-stage relative isolate overflow-hidden lg:col-span-7">
            <ServicesOrnament />
            <div className="ornament-foreground stage-pad-start py-12 lg:py-20">
            <NextMinyan
              next={next}
              todayTimes={todayTimes}
              todayLabel={todayLabel}
              everyday={copy.dailyServices}
            />
            </div>
          </div>
          <div className="parsha-stage relative isolate overflow-hidden border-t border-line lg:col-span-5 lg:border-t-0">
            <ParshaOrnament />
            <div className="ornament-foreground stage-pad-end flex flex-col gap-10 py-12 lg:py-20">
            {live.parsha || live.candleLighting || live.fridayNight.length > 0 ? (
              <div className="parsha-copy">
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
                    {postedTimes(live.fridayNight).map((item) => (
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
          </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <FadeContent>
        <div className="wrap py-16 lg:py-24">
          <div className="max-w-3xl">
            <ScrollReveal
              containerClassName="display text-3xl text-charleston sm:text-4xl"
              baseRotation={1}
              blurStrength={2}
            >
              {welcome}
            </ScrollReveal>
            <p className="lede mt-6 text-muted">{copy.historyLead}</p>
            <p className="mt-6">
              <Link href="/about" className="text-link">
                Our story
              </Link>
            </p>
          </div>
        </div>
        </FadeContent>
      </section>

      {flyers.length > 0 ? (
        <section id="this-week" className="border-t border-line">
          <div className="wrap py-16 lg:py-24">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <ScrollFloat className="display text-3xl text-charleston">This week</ScrollFloat>
              <Link href="/community#flyers" className="text-link">
                All flyers
              </Link>
            </div>
            <FlyerList flyers={flyers} />
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="wrap py-16 lg:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <ScrollFloat className="display text-3xl text-charleston">Weekly classes</ScrollFloat>
            <Link href="/community#classes" className="text-link">
              All classes
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {classes.map((item, index) => (
              <AnimatedContent key={item._id} delay={index * 0.1} distance={22}>
                <Link href="/community#classes" className="flex min-w-0 flex-col gap-4">
                  <div>
                    <h3 className="display text-xl text-charleston">{item.title}</h3>
                    {item.when || item.where ? (
                      <p className="mt-1 text-base text-muted">
                        {[item.when, item.where].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  <ScaledImage
                    src={item.image}
                    alt={item.alt}
                    width={1024}
                    height={1024}
                    quality={90}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    frameClassName="w-full bg-cream"
                  />
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="events-stage relative isolate overflow-hidden border-t border-line">
        <EventsOrnament />
        <div className="wrap ornament-foreground py-14 lg:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <ScrollFloat className="display text-3xl text-charleston">Upcoming events</ScrollFloat>
            <a className="text-link" href={live.calendarUrl}>
              ShulCloud calendar
            </a>
          </div>
          <AnimatedContent distance={18}>
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
          </AnimatedContent>
        </div>
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
            {milestones.map((item) => (
              <li key={item.year} className="event-row">
                <div className="pt-1 text-sm font-medium tracking-wide text-muted">{item.year}</div>
                <p className="max-w-xl text-base leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
        </FadeContent>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-16 lg:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <ScrollFloat className="display text-3xl text-charleston">Photo gallery</ScrollFloat>
            <Link href="/gallery" className="text-link">
              Full gallery
            </Link>
          </div>
          <p className="lede mt-5 max-w-2xl text-muted">
            {copy.doorsOpen} Photographs of the synagogue on Rutledge Avenue, including the Historic American Buildings Survey record of the iron gate.
          </p>
          <FadeContent>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {homepageGallery.map((photo) => (
                <figure key={photo.src}>
                  <ScaledImage
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover object-center"
                    frameClassName="aspect-[4/5] w-full sm:aspect-[4/3]"
                  />
                  <figcaption className="museum-caption mt-2">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </FadeContent>
          <p className="mt-8">
            <a className="text-link" href={site.socials.facebookPhotos}>
              Community photographs on Facebook
            </a>
          </p>
        </div>
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

      <section className="remembrance-stage relative isolate overflow-hidden border-t border-line">
        <RemembranceOrnament />
        <div className="wrap ornament-foreground grid items-start gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <AnimatedContent className="lg:col-span-5" distance={20}>
            <figure>
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
          </AnimatedContent>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="kicker">{copy.remembranceFund}</p>
            <ScrollFloat className="display mt-3 text-3xl text-charleston sm:text-4xl">
              {copy.remembranceTitle}
            </ScrollFloat>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{copy.remembranceBody}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{copy.remembranceWhen}</p>
            <p className="mt-6">
              <Link href="/remembrance" className="text-link">
                Dedicate a commemorative plaque
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
