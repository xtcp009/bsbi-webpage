import type { Metadata } from "next";
import { EventList } from "@/components/event-row";
import { PageHero } from "@/components/page-hero";
import { events } from "@/content/copy";
import { upcomingEvents } from "@/lib/events";
import { formatShortDate } from "@/lib/format";
import { site } from "@/lib/site";
import { getUpcomingCalendar } from "@/lib/zmanim";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Upcoming programs and events at BSBI Synagogue in Charleston.",
  alternates: { canonical: `${site.url}/calendar` },
};

export const revalidate = 3600;

export default async function CalendarPage() {
  const items = await getUpcomingCalendar();
  const upcoming = upcomingEvents(events);

  return (
    <>
      <PageHero
        title="Calendar"
        lede="Weekly classes at the synagogue, and the Hebrew calendar for the weeks ahead."
      />
      <div className="wrap-narrow section">
        <h2 className="display text-2xl text-charleston">Weekly at BSBI</h2>
        <div className="mt-6">
          <EventList events={upcoming} />
        </div>
        <h2 className="display mt-14 text-2xl text-charleston">This season</h2>
        {items.length > 0 ? (
          <ul className="mt-6">
            {items.map((item) => {
              const day = new Date(`${item.date.slice(0, 10)}T12:00:00`);
              return (
                <li key={`${item.date}-${item.title}`} className="event-row">
                  <div className="pt-0.5 text-sm leading-tight text-muted">
                    <span className="block font-medium tracking-wide">
                      {day.toLocaleString("en-US", { month: "short" }).toUpperCase()}
                    </span>
                    <span className="display mt-0.5 block text-2xl text-charleston">{day.getDate()}</span>
                  </div>
                  <div>
                    <p className="display text-xl text-charleston">{item.title}</p>
                    <p className="mt-1 text-base text-muted">{formatShortDate(item.date)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-base text-muted">Call {site.phoneDisplay} for the week&apos;s schedule.</p>
        )}
      </div>
    </>
  );
}
