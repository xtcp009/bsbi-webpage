import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import { events } from "@/content/copy";
import { formatShortDate } from "@/lib/format";
import { site } from "@/lib/site";
import { getUpcomingCalendar } from "@/lib/zmanim";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Upcoming Programs & Events at BSBI Synagogue in Charleston.",
  alternates: { canonical: `${site.url}/calendar` },
};

export const revalidate = 3600;

export default async function CalendarPage() {
  const items = await getUpcomingCalendar();

  return (
    <>
      <PageHero
        kicker="Calendar"
        title="Upcoming Programs & Events"
        lede="View the calendar for upcoming service times, or see schedule below."
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <ul className="mb-8 divide-y divide-[var(--line)] border border-line bg-cream">
          {events.map((event) => (
            <li key={event.title}>
              <Link href={event.href} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <span>
                  <span className="block font-[family-name:var(--font-display)] text-lg">{event.title}</span>
                  <span className="text-sm text-muted">{event.detail}</span>
                </span>
                <span className="text-sm text-teal">{event.when}</span>
              </Link>
            </li>
          ))}
        </ul>
        <FadeContent>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={`${item.date}-${item.title}`} className="panel flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-medium">{item.title}</span>
                <span className="text-sm text-muted">{formatShortDate(item.date)}</span>
              </li>
            ))}
          </ul>
        </FadeContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted">Call {site.phoneDisplay}.</p>
        ) : null}
      </div>
    </>
  );
}
