import type { Metadata } from "next";
import { EventsOrnament } from "@/components/decorative/events-ornament";
import { EventList } from "@/components/event-row";
import { PageHero } from "@/components/page-hero";
import { SourceNote } from "@/components/source-note";
import { calendarEntryToEvent } from "@/lib/events";
import { ymdInCharleston } from "@/lib/format";
import { pageMeta, pages } from "@/lib/seo";
import { getShulcloudSnapshot } from "@/lib/shulcloud";

export const metadata: Metadata = pageMeta(pages.calendar.title, pages.calendar.description, pages.calendar.path);

export const revalidate = 30;

export default async function CalendarPage() {
  const live = await getShulcloudSnapshot();
  const upcoming = live.events.map(calendarEntryToEvent);
  const todayYmd = ymdInCharleston();
  const week = live.week.filter((day) => day.date >= todayYmd).slice(0, 8);

  return (
    <>
      <PageHero
        title="Calendar"
        lede="Times and programs as they appear on the synagogue’s ShulCloud calendar."
      />
      <div className="events-stage relative isolate overflow-hidden">
        <EventsOrnament />
        <div className="wrap-narrow section ornament-foreground">
        <h2 className="display text-2xl text-charleston">Upcoming programs</h2>
        <div className="mt-6">
          {upcoming.length > 0 ? (
            <EventList events={upcoming} />
          ) : (
            <p className="text-base text-muted">
              No separate programs are currently listed beyond daily services. Registration, when offered, is on the
              ShulCloud event page.
            </p>
          )}
        </div>

        {week.length > 0 ? (
          <>
            <h2 className="display mt-14 text-2xl text-charleston">This week&apos;s services</h2>
            <ul className="mt-6">
              {week.map((day) => (
                <li key={day.date} className="border-t border-line py-5">
                  <p className="display text-xl text-charleston">{day.label}</p>
                  {day.hebrew ? <p className="mt-1 text-sm text-muted">{day.hebrew}</p> : null}
                  <ul className="mt-3 flex flex-col gap-2 text-base">
                    {day.items.map((item) => (
                      <li key={`${item.name}-${item.time}`} className="flex items-baseline justify-between gap-3">
                        <span>
                          {item.href ? (
                            <a className="text-link" href={item.href}>
                              {item.name}
                            </a>
                          ) : (
                            item.name
                          )}
                        </span>
                        <span className="shrink-0 tabular-nums">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <SourceNote ok={live.ok} fetchedAt={live.fetchedAt} sourceUrl={live.calendarUrl} next="/calendar" />
        <p className="mt-3 text-sm text-muted">
          Event registration stays on ShulCloud.{" "}
          <a className="text-link" href={live.calendarUrl}>
            Open the live calendar
          </a>
          .
        </p>
      </div>
      </div>
    </>
  );
}
