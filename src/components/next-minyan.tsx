"use client";

import { useMemo } from "react";
import type { DayBoard, Service } from "@/lib/zmanim";
import { charlestonNow } from "@/lib/format";
import { site } from "@/lib/site";
import { ActionLink } from "@/components/page-hero";

function pickNext(board: DayBoard): Service | null {
  const now = charlestonNow();
  const upcoming = board.services.filter((s) => {
    if (s.id === "shema" || s.id === "candles") return false;
    if (!s.iso) {
      const [time, mer] = s.time.split(" ");
      const [hRaw, mRaw] = time.split(":");
      let h = Number(hRaw);
      const m = Number(mRaw);
      if (mer === "PM" && h !== 12) h += 12;
      if (mer === "AM" && h === 12) h = 0;
      const candidate = new Date(now);
      candidate.setHours(h, m, 0, 0);
      return candidate.getTime() + 25 * 60 * 1000 > now.getTime();
    }
    return new Date(s.iso).getTime() + 25 * 60 * 1000 > Date.now();
  });
  return upcoming[0] ?? null;
}

export function NextMinyan({ board }: { board: DayBoard }) {
  const next = useMemo(() => pickNext(board), [board]);
  const location =
    next?.location === "minyanHouse"
      ? site.locations.minyanHouse.name
      : next?.location === "both"
        ? "Downtown and Minyan House"
        : site.locations.downtown.name;
  const maps =
    next?.location === "minyanHouse"
      ? site.locations.minyanHouse.googleMaps
      : site.locations.downtown.googleMaps;

  return (
    <section>
      <p className="kicker">Next service</p>
      {next ? (
        <>
          <p className="display mt-3 text-[clamp(3.1rem,8vw,5.6rem)] leading-none tracking-tight text-charleston tabular-nums">
            {next.time}
          </p>
          <h2 className="display mt-5 text-2xl text-charleston sm:text-3xl">{next.name}</h2>
          <p className="mt-3 max-w-xl text-base text-muted">
            {location}
            <span aria-hidden> · </span>
            {board.label}
            {next.note && !location.toLowerCase().includes(next.note.toLowerCase()) ? (
              <>
                <span aria-hidden> · </span>
                {next.note}
              </>
            ) : null}
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <ActionLink href={maps}>Directions</ActionLink>
            <ActionLink href="/times" variant="ghost">
              Full schedule
            </ActionLink>
          </div>
        </>
      ) : (
        <>
          <h2 className="display mt-3 text-2xl text-charleston">{board.label}</h2>
          <p className="mt-4 max-w-xl text-base text-muted">
            We hold services every day, weekdays, Shabboses, and Yom Tovim, for shacharis, mincha &amp; ma&apos;ariv.
          </p>
          <div className="mt-6">
            <ActionLink href="/times" variant="ghost">
              Full schedule
            </ActionLink>
          </div>
        </>
      )}
    </section>
  );
}
