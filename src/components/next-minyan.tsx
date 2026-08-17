"use client";

import { useMemo } from "react";
import type { DayBoard, Service } from "@/lib/zmanim";
import { charlestonNow } from "@/lib/format";
import { site } from "@/lib/site";

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

  return (
    <section className="panel panel-gold p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Services</p>
      {next ? (
        <>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-charleston sm:text-2xl">
            {next.name}
          </h2>
          <p className="mt-1 text-lg font-semibold text-ink sm:text-xl">{next.time}</p>
          <p className="mt-3 text-sm text-muted">
            {board.label} · {location}
            {next.note ? ` · ${next.note}` : ""}
          </p>
        </>
      ) : (
        <>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-charleston">
            {board.label}
          </h2>
          <p className="mt-3 text-sm text-muted">
            We hold services every day, weekdays, Shabboses, and Yom Tovim, for shacharis, mincha &amp; ma&apos;ariv.
          </p>
        </>
      )}
    </section>
  );
}
