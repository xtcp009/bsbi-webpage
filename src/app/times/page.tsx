import type { Metadata } from "next";
import { EruvBanner } from "@/components/eruv-banner";
import { PageShell } from "@/components/more-info";
import { NextMinyan } from "@/components/next-minyan";
import { PageHero } from "@/components/page-hero";
import { SourceNote } from "@/components/source-note";
import { copy } from "@/content/copy";
import { formatTime, ymdInCharleston } from "@/lib/format";
import { pageMeta, pages } from "@/lib/seo";
import { getShulcloudSnapshot, snapshotToBoard } from "@/lib/shulcloud";
import { site } from "@/lib/site";
import { getZmanim, zmanimRows, type ZmanimTimes } from "@/lib/zmanim";

export const metadata: Metadata = pageMeta(pages.times.title, pages.times.description, pages.times.path);

export const revalidate = 120;

export default async function TimesPage() {
  const [live, todayZmanim] = await Promise.all([getShulcloudSnapshot(), getZmanim()]);
  const todayBoard = snapshotToBoard(live);
  const todayYmd = ymdInCharleston();
  const week = live.week.filter((day) => day.date >= todayYmd).slice(0, 7);

  return (
    <>
      <PageHero title="Services" lede={copy.dailyServices} />
      <PageShell>
        <div className="flex flex-col gap-14">
          {todayBoard ? (
            <NextMinyan board={todayBoard} />
          ) : live.today.length > 0 ? (
            <section>
              <p className="kicker">Today</p>
              <ul className="mt-4 max-w-md">
                {live.today.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
                    <span>{item.name}</span>
                    <span className="display text-2xl tabular-nums">{item.time}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <p className="text-base text-muted">
              Today&apos;s service times could not be loaded from ShulCloud. See the{" "}
              <a className="text-link" href={site.shulcloudPublicUrl}>
                current synagogue website
              </a>
              .
            </p>
          )}

          {live.fridayNight.length > 0 || live.shabbatDay.length > 0 ? (
            <section className="border-t border-line pt-10">
              <h2 className="display text-2xl">This Shabbat</h2>
              {live.parsha ? <p className="mt-3 text-lg">{live.parsha.startsWith("Parshat") ? live.parsha : `Parshat ${live.parsha}`}</p> : null}
              {live.nextHoliday ? (
                <p className="mt-2 text-sm text-muted">
                  Next: {live.nextHoliday.name} · {live.nextHoliday.when}
                </p>
              ) : null}
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="display text-xl">Friday night</h3>
                  <ul className="mt-3">
                    {live.fridayNight.map((item) => (
                      <li key={item.name} className="flex justify-between gap-4 border-t border-line py-2">
                        <span>{item.name}</span>
                        <span className="tabular-nums">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="display text-xl">Shabbat day</h3>
                  <ul className="mt-3">
                    {live.shabbatDay.map((item) => (
                      <li key={item.name} className="flex justify-between gap-4 border-t border-line py-2">
                        <span>{item.name}</span>
                        <span className="tabular-nums">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ) : null}

          {week.length > 0 ? (
            <section className="border-t border-line pt-10">
              <h2 className="display text-2xl">This week</h2>
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
                    <ul className="mt-3 flex flex-col gap-2 text-base">
                      {day.items
                        .filter((item) => item.service)
                        .map((item) => (
                          <li key={`${item.name}-${item.time}`} className="flex items-baseline justify-between gap-3">
                            <span>{item.name}</span>
                            <span className="shrink-0 font-medium tabular-nums">{item.time}</span>
                          </li>
                        ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <ZmanimBlock live={live.zmanim} fallback={todayZmanim} />

          <div className="border-t border-line pt-10">
            <EruvBanner live={live.eruv} />
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
      <p className="mt-2 text-sm text-muted">Astronomical times for Charleston; service times above come from ShulCloud when available.</p>
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
