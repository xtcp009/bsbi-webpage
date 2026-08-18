import Link from "next/link";
import { EruvBanner } from "@/components/eruv-banner";
import { EventList } from "@/components/event-row";
import { NextMinyan } from "@/components/next-minyan";
import { ActionLink } from "@/components/page-hero";
import { ScaledImage } from "@/components/scaled-image";
import { copy, events } from "@/content/copy";
import { upcomingEvents } from "@/lib/events";
import { site } from "@/lib/site";
import { buildDayBoard, getShabbatInfo, getZmanim } from "@/lib/zmanim";

export const revalidate = 3600;

export default async function HomePage() {
  const [zmanim, shabbat] = await Promise.all([getZmanim(), getShabbatInfo()]);
  const board = zmanim ? buildDayBoard(zmanim, shabbat) : null;
  const upcoming = upcomingEvents(events);

  return (
    <>
      <section>
        <figure>
          <ScaledImage
            src="/images/exterior-facade.jpg"
            alt="Brith Sholom Beth Israel Synagogue on Rutledge Avenue"
            fill
            priority
            sizes="100vw"
            className="historic-image object-cover object-[center_42%]"
            frameClassName="w-full aspect-[5/4] sm:aspect-[2.15/1] lg:aspect-[2.6/1]"
          />
          <figcaption className="museum-caption wrap pt-4">
            Brith Sholom Beth Israel · 182 Rutledge Avenue · Charleston, South Carolina
          </figcaption>
        </figure>
        <div className="wrap pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
          <h1 className="display max-w-4xl text-[clamp(2.4rem,6.4vw,4.6rem)] leading-[0.94] text-charleston">
            Brith Sholom Beth Israel
          </h1>
          <p className="lede mt-6 text-muted">{copy.homeTagline}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <ActionLink href="/times">Today&apos;s Services</ActionLink>
            <ActionLink href="/visit" variant="secondary">
              Plan a Visit
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
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
            {shabbat.parsha || shabbat.candleLighting ? (
              <div>
                <p className="kicker">This Shabbat</p>
                {shabbat.parsha ? (
                  <p className="display mt-3 text-3xl text-charleston">Parshat {shabbat.parsha}</p>
                ) : null}
                <p className="mt-3 text-base text-muted">
                  {shabbat.candleLighting ? `Candle lighting ${shabbat.candleLighting}` : null}
                  {shabbat.candleLighting && shabbat.havdalah ? (
                    <>
                      <br />
                    </>
                  ) : null}
                  {shabbat.havdalah ? `Havdalah ${shabbat.havdalah}` : null}
                </p>
              </div>
            ) : null}
            <EruvBanner compact />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap grid items-start gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-5 lg:pt-4">
            <h2 className="display text-3xl text-charleston sm:text-4xl">{copy.welcomeClose}</h2>
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
              className="historic-image object-cover object-center"
              frameClassName="aspect-[4/3] w-full"
            />
            <figcaption className="museum-caption">Main entrance, 182 Rutledge Avenue</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-14 lg:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="display text-3xl text-charleston">Upcoming events</h2>
            <Link href="/calendar" className="text-link">
              Calendar
            </Link>
          </div>
          <div className="mt-8 max-w-3xl">
            <EventList events={upcoming} />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-16 lg:py-24">
          <figure>
            <ScaledImage
              src="/images/habs-gate.jpg"
              alt="Central double-pass gate by Sabel Iron Works, Historic American Buildings Survey"
              fill
              sizes="100vw"
              className="historic-image object-cover object-center"
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
      </section>

      <section className="border-t border-line">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="display text-3xl text-charleston sm:text-4xl">Our story</h2>
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
      </section>

      <section className="border-t border-line">
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
      </section>

      <section className="border-t border-line">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <div>
            <p className="kicker">Downtown</p>
            <h2 className="display mt-3 text-2xl text-charleston sm:text-3xl">{site.locations.downtown.fullAddress}</h2>
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
          <div>
            <p className="kicker">South Windermere</p>
            <h2 className="display mt-3 text-2xl text-charleston sm:text-3xl">{site.locations.minyanHouse.fullAddress}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{copy.minyanHouse}</p>
            <p className="mt-5">
              <a className="text-link" href={site.locations.minyanHouse.googleMaps}>
                Directions to the Minyan House
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
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
      </section>
    </>
  );
}
