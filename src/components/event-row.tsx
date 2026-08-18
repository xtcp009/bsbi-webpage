import Link from "next/link";
import type { SiteEvent } from "@/content/copy";
import { eventDateParts } from "@/lib/events";

type EventRowItem = Pick<SiteEvent, "title" | "detail" | "when" | "href"> &
  Partial<Pick<SiteEvent, "startDate" | "recurring">>;

export function EventRow({ event }: { event: EventRowItem }) {
  const parts = eventDateParts(event);
  const inner = (
    <>
      <div className="pt-0.5 text-sm leading-tight text-muted">
        <span className="block font-medium tracking-wide">{parts.month}</span>
        {parts.day ? <span className="display mt-0.5 block text-2xl text-charleston">{parts.day}</span> : null}
      </div>
      <div className="min-w-0">
        <p className="display text-xl text-charleston">{event.title}</p>
        <p className="mt-1 text-base text-muted">
          {event.when}
          {event.detail ? (
            <>
              <span aria-hidden> · </span>
              {event.detail}
            </>
          ) : null}
        </p>
      </div>
    </>
  );

  if (event.href) {
    return (
      <li>
        <Link href={event.href} className="event-row">
          {inner}
        </Link>
      </li>
    );
  }

  return <li className="event-row">{inner}</li>;
}

export function EventList({ events }: { events: readonly EventRowItem[] }) {
  if (events.length === 0) return null;
  return (
    <ul>
      {events.map((event) => (
        <EventRow key={`${event.title}-${event.when}`} event={event} />
      ))}
    </ul>
  );
}
