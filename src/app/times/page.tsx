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
        <div className="flex flex-col gap-8">
          {todayBoard ? <NextMinyan board={todayBoard} /> : null}

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">Schedule</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{copy.doorsOpen}</p>
            <div className="panel mt-4 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="bg-cream text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Day</th>
                    <th className="px-4 py-3 font-semibold">Shacharit</th>
                    <th className="px-4 py-3 font-semibold">Mincha / Maariv</th>
                    <th className="px-4 py-3 font-semibold">Where</th>
                  </tr>
                </thead>
                <tbody className="bg-parchment">
                  <tr className="border-t border-line">
                    <td className="px-4 py-3 font-medium">Sunday</td>
                    <td className="px-4 py-3">8:00 AM</td>
                    <td className="px-4 py-3">About 15 minutes before sunset</td>
                    <td className="px-4 py-3">Downtown</td>
                  </tr>
                  <tr className="border-t border-line">
                    <td className="px-4 py-3 font-medium">Monday–Friday</td>
                    <td className="px-4 py-3">7:00 AM</td>
                    <td className="px-4 py-3">Moves with sunset</td>
                    <td className="px-4 py-3">Downtown</td>
                  </tr>
                  <tr className="border-t border-line">
                    <td className="px-4 py-3 font-medium">Friday night</td>
                    <td className="px-4 py-3">7:00 AM Shacharit</td>
                    <td className="px-4 py-3">Mincha / Kabbalat Shabbat</td>
                    <td className="px-4 py-3">Downtown and Minyan House</td>
                  </tr>
                  <tr className="border-t border-line">
                    <td className="px-4 py-3 font-medium">Shabbat</td>
                    <td className="px-4 py-3">9:00 AM</td>
                    <td className="px-4 py-3">Mincha ~45 minutes before sunset, then Maariv / Havdalah</td>
                    <td className="px-4 py-3">Both locations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">This week</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {weekBoards.map((day) => (
                <DayCard key={day.date} day={day} highlight={day.date === todayBoard?.date} />
              ))}
            </div>
          </section>

          {today ? (
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">Zmanim</h2>
              <dl className="mt-4 grid grid-cols-2 gap-2">
                {zmanimRows.map((row) => {
                  const value = today[row.key];
                  if (!value) return null;
                  return (
                    <div key={row.key} className="panel px-4 py-3">
                      <dt className="text-xs text-muted">{row.label}</dt>
                      <dd className="mt-1 text-lg font-semibold">{formatTime(value)}</dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ) : null}

          <EruvBanner />
        </div>
      </PageShell>
    </>
  );
}

function DayCard({ day, highlight }: { day: DayBoard; highlight: boolean }) {
  return (
    <article className={`panel p-4 ${highlight ? "panel-gold" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">{day.label}</p>
      <p className="mt-1 text-sm text-muted">{day.date}</p>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {day.services.map((service) => (
          <li key={service.id} className="flex items-baseline justify-between gap-3">
            <span>{service.name}</span>
            <span className="shrink-0 font-semibold">{service.time}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
