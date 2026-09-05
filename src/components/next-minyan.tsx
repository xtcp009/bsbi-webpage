import { ActionLink } from "@/components/page-hero";
import { ServiceTimeList } from "@/components/service-time-list";
import type { NextMinyanInfo } from "@/lib/minyan";
import type { NamedTime } from "@/lib/shulcloud";

export function NextMinyan({
  next,
  todayTimes,
  todayLabel,
  everyday,
  showFullSchedule = true,
}: {
  next: NextMinyanInfo | null;
  todayTimes: NamedTime[];
  todayLabel: string;
  everyday?: string;
  showFullSchedule?: boolean;
}) {
  const nextIsToday = Boolean(next && todayTimes.some((item) => item.name === next.name && item.time === next.time));

  return (
    <section>
      <p className="kicker">{next ? "Next service" : todayTimes.length > 0 ? todayLabel : "Services"}</p>
      {next ? (
        <>
          <p className="display mt-3 text-[clamp(3.1rem,8vw,5.6rem)] leading-none tracking-tight text-charleston tabular-nums">
            {next.time}
          </p>
          <h2 className="display mt-5 text-2xl text-charleston sm:text-3xl">{next.name}</h2>
          <p className="mt-3 max-w-xl text-base text-muted">
            {next.locationName}
            <span aria-hidden> · </span>
            {next.whenLabel}
            {next.note && !next.locationName.toLowerCase().includes(next.note.toLowerCase()) ? (
              <>
                <span aria-hidden> · </span>
                {next.note}
              </>
            ) : null}
          </p>
        </>
      ) : null}

      {todayTimes.length > 0 ? (
        <>
          {next ? <p className="kicker mt-8">{todayLabel}</p> : <h2 className="display mt-3 text-2xl text-charleston sm:text-3xl">{todayLabel}</h2>}
          <ServiceTimeList items={todayTimes} size={next ? "schedule" : "hero"} next={nextIsToday ? next : null} />
        </>
      ) : null}

      {everyday && !next && todayTimes.length === 0 ? (
        <p className="mt-4 max-w-xl text-base text-muted">{everyday}</p>
      ) : everyday ? (
        <p className="mt-5 max-w-xl text-sm text-muted">{everyday}</p>
      ) : null}

      {showFullSchedule ? (
        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          {next ? <ActionLink href={next.maps}>Directions</ActionLink> : null}
          <ActionLink href="/times" variant={next ? "ghost" : "primary"}>
            Full schedule
          </ActionLink>
        </div>
      ) : next ? (
        <div className="mt-7">
          <ActionLink href={next.maps}>Directions</ActionLink>
        </div>
      ) : null}
    </section>
  );
}
