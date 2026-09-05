import type { Metadata } from "next";
import { ParshaOrnament } from "@/components/decorative/parsha-ornament";
import { ServicesOrnament } from "@/components/decorative/services-ornament";
import { EruvBanner } from "@/components/eruv-banner";
import { PageShell } from "@/components/more-info";
import { NextMinyan } from "@/components/next-minyan";
import { PageHero } from "@/components/page-hero";
import { ServiceTimeList } from "@/components/service-time-list";
import { SourceNote } from "@/components/source-note";
import { getSiteContent } from "@/lib/cms";
import { formatTime, ymdInCharleston } from "@/lib/format";
import { nextMinyanFromSnapshot, postedTimes, weekMinyanDays } from "@/lib/minyan";
import { pageMeta, pages } from "@/lib/seo";
import { getShulcloudSnapshot } from "@/lib/shulcloud";
import { getZmanim, zmanimRows, type ZmanimTimes } from "@/lib/zmanim";

export const metadata: Metadata = pageMeta(pages.times.title, pages.times.description, pages.times.path);

export const revalidate = 30;

export default async function TimesPage() {
  const [live, todayZmanim, { copy }] = await Promise.all([
    getShulcloudSnapshot(),
    getZmanim(),
    getSiteContent(),
  ]);
  const todayYmd = ymdInCharleston();
  const todayDay = live.week.find((day) => day.date === todayYmd);
  const todayTimes = postedTimes(todayDay?.items ?? live.today);
  const todayLabel = todayDay?.label ?? "Today";
  const next = nextMinyanFromSnapshot(live);
  const week = weekMinyanDays(live, todayYmd);
  const fridayNight = postedTimes(live.fridayNight);
  const shabbatDay = postedTimes(live.shabbatDay);

  return (
    <>
      <PageHero kicker="Every day" title="Services" lede={copy.dailyServices} />
      <PageShell>
        <div className="flex flex-col gap-14">
          <div className="services-stage services-stage-panel relative isolate overflow-hidden">
            <ServicesOrnament />
            <div className="ornament-foreground">
              <NextMinyan
                next={next}
                todayTimes={todayTimes}
                todayLabel={todayLabel}
                showFullSchedule={false}
              />
            </div>
          </div>

          {fridayNight.length > 0 || shabbatDay.length > 0 ? (
            <section className="parsha-stage parsha-stage-panel relative isolate overflow-hidden border-t border-line">
              <ParshaOrnament />
              <div className="ornament-foreground pt-10">
                <h2 className="display text-2xl">This Shabbat</h2>
                {live.parsha ? (
                  <p className="mt-3 text-lg">
                    {live.parsha.startsWith("Parshat") ? live.parsha : `Parshat ${live.parsha}`}
                  </p>
                ) : null}
                {live.nextHoliday ? (
                  <p className="mt-2 text-sm text-muted">
                    Next: {live.nextHoliday.name} · {live.nextHoliday.when}
                  </p>
                ) : null}
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  {fridayNight.length > 0 ? (
                    <div>
                      <h3 className="display text-xl">Friday night</h3>
                      <ServiceTimeList items={fridayNight} />
                    </div>
                  ) : null}
                  {shabbatDay.length > 0 ? (
                    <div>
                      <h3 className="display text-xl">Shabbat day</h3>
                      <ServiceTimeList items={shabbatDay} />
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          {week.length > 0 ? (
            <section className="border-t border-line pt-10">
              <h2 className="display text-2xl">This week</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">Posted minyan times from ShulCloud, including candle lighting.</p>
              <div className="mt-2">
                {week.map((day) => (
                  <article
                    key={day.date}
                    className={`border-t border-line py-5 ${day.date === todayYmd ? "border-t-2 border-t-gold" : ""}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="display text-xl text-charleston">{day.label}</h3>
                      {day.hebrew ? <p className="text-sm text-muted">{day.hebrew}</p> : null}
                    </div>
                    <ServiceTimeList
                      items={day.items}
                      next={next?.date === day.date ? next : null}
                    />
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <ZmanimBlock live={live.zmanim} fallback={todayZmanim} />

          <div className="border-t border-line pt-10">
            <EruvBanner live={live.eruv} contactNote={copy.eruvRabbi} />
            <SourceNote ok={live.ok} fetchedAt={live.fetchedAt} sourceUrl={live.sourceUrl} next="/times" />
          </div>
        </div>
      </PageShell>
    </>
  );
}

function ZmanimBlock({
  live,
  fallback,
}: {
  live: { label: string; time: string }[];
  fallback: ZmanimTimes | null;
}) {
  if (live.length > 0) {
    return (
      <section className="border-t border-line pt-10">
        <h2 className="display text-2xl">Zmanim</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Astronomical times for Charleston. These are not the minyan times above.
        </p>
        <dl className="mt-2">
          {live.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
              <dt className="text-base text-muted">{row.label}</dt>
              <dd className="text-lg font-medium tabular-nums">{row.time}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  if (!fallback) return null;

  return (
    <section className="border-t border-line pt-10">
      <h2 className="display text-2xl">Zmanim</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Astronomical times for Charleston. These are not the minyan times above.
      </p>
      <dl className="mt-2">
        {zmanimRows.map((row) => {
          const value = fallback[row.key];
          if (!value) return null;
          return (
            <div key={row.key} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
              <dt className="text-base text-muted">{row.label}</dt>
              <dd className="text-lg font-medium tabular-nums">{formatTime(value)}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
