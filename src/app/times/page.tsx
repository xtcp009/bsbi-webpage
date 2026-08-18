import type { Metadata } from "next";
import { EruvBanner } from "@/components/eruv-banner";
import { PageShell } from "@/components/more-info";
import { NextMinyan } from "@/components/next-minyan";
import { PageHero } from "@/components/page-hero";
import { copy } from "@/content/copy";
import { formatTime } from "@/lib/format";
import { site } from "@/lib/site";
import {
  buildDayBoard,
  getShabbatInfo,
  getWeekZmanim,
  getZmanim,
  zmanimRows,
  type DayBoard,
} from "@/lib/zmanim";

export const metadata: Metadata = {
  title: "Services",
  description: copy.dailyServices,
  alternates: { canonical: `${site.url}/times` },
};

export const revalidate = 1800;

export default async function TimesPage() {
  const [today, week, shabbat] = await Promise.all([getZmanim(), getWeekZmanim(), getShabbatInfo()]);
  const todayBoard = today ? buildDayBoard(today, shabbat) : null;
  const weekBoards = week.map((day) => buildDayBoard(day, shabbat));

  return (
    <>
      <PageHero title="Services" lede={copy.dailyServices} />
      <PageShell>
        <div className="flex flex-col gap-14">
          {todayBoard ? <NextMinyan board={todayBoard} /> : null}

          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">Schedule</h2>
            <p className="mt-3 max-w-2xl text-base text-muted">{copy.doorsOpen}</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-base">
                <thead className="border-b border-line text-sm text-muted">
                  <tr>
                    <th className="py-3.5 pr-4 font-medium">Day</th>
                    <th className="py-3.5 pr-4 font-medium">Shacharit</th>
                    <th className="py-3.5 pr-4 font-medium">Mincha / Maariv</th>
                    <th className="py-3.5 font-medium">Where</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-line">
                    <td className="py-3.5 pr-4 font-medium">Sunday</td>
                    <td className="py-3.5 pr-4 tabular-nums">8:00 AM</td>
                    <td className="py-3.5 pr-4">About 15 minutes before sunset</td>
                    <td className="py-3.5">Downtown</td>
                  </tr>
                  <tr className="border-t border-line">
                    <td className="py-3.5 pr-4 font-medium">Monday–Friday</td>
                    <td className="py-3.5 pr-4 tabular-nums">7:00 AM</td>
                    <td className="py-3.5 pr-4">Moves with sunset</td>
                    <td className="py-3.5">Downtown</td>
                  </tr>
                  <tr className="border-t border-line">
                    <td className="py-3.5 pr-4 font-medium">Friday night</td>
                    <td className="py-3.5 pr-4">7:00 AM Shacharit</td>
                    <td className="py-3.5 pr-4">Mincha / Kabbalat Shabbat</td>
                    <td className="py-3.5">Downtown and Minyan House</td>
                  </tr>
                  <tr className="border-t border-line">
                    <td className="py-3.5 pr-4 font-medium">Shabbat</td>
                    <td className="py-3.5 pr-4 tabular-nums">9:00 AM</td>
                    <td className="py-3.5 pr-4">Mincha ~45 minutes before sunset, then Maariv / Havdalah</td>
                    <td className="py-3.5">Both locations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">This week</h2>
            <div className="mt-2">
              {weekBoards.map((day) => (
                <DayRow key={day.date} day={day} highlight={day.date === todayBoard?.date} />
              ))}
            </div>
          </section>

          {today ? (
            <section className="border-t border-line pt-10">
              <h2 className="display text-2xl">Zmanim</h2>
              <dl className="mt-2">
                {zmanimRows.map((row) => {
                  const value = today[row.key];
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
          ) : null}

          <div className="border-t border-line pt-10">
            <EruvBanner />
          </div>
        </div>
      </PageShell>
    </>
  );
}

function DayRow({ day, highlight }: { day: DayBoard; highlight: boolean }) {
  return (
    <article className={`border-t border-line py-5 ${highlight ? "border-t-2 border-t-gold" : ""}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="display text-xl text-charleston">{day.label}</h3>
        <p className="text-sm text-muted">{day.date}</p>
      </div>
      <ul className="mt-3 flex flex-col gap-2 text-base">
        {day.services.map((service) => (
          <li key={service.id} className="flex items-baseline justify-between gap-3">
            <span>{service.name}</span>
            <span className="shrink-0 font-medium tabular-nums">{service.time}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
