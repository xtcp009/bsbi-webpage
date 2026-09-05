import { charlestonNow, ymdInCharleston } from "@/lib/format";
import type { CalendarEntry, NamedTime, ShulcloudSnapshot } from "@/lib/shulcloud";
import { site } from "@/lib/site";

const NOT_A_MINYAN = /earliest candle|latest shema|sof zman/i;
const MINYAN_NAME = /shacharit|mincha|maariv|kabbalat|selichot|havdalah/i;
const POSTED_CLOCK = /shacharit|mincha|maariv|kabbalat|selichot|havdalah|^candle lighting$/i;
const GRACE_MS = 25 * 60 * 1000;

export type NextMinyanInfo = {
  name: string;
  time: string;
  note?: string;
  date: string;
  weekday: string;
  whenLabel: string;
  locationName: string;
  maps: string;
};

export function isMinyanToAttend(name: string) {
  if (NOT_A_MINYAN.test(name) || /^candle lighting$/i.test(name)) return false;
  return MINYAN_NAME.test(name);
}

export function isPostedClockTime(name: string) {
  if (NOT_A_MINYAN.test(name)) return false;
  return POSTED_CLOCK.test(name);
}

export function usefulNote(name: string, note?: string) {
  if (!note) return undefined;
  const n = name.toLowerCase();
  const d = note.toLowerCase();
  if (d === n) return undefined;
  const rest = d.split(n).join(" ").replace(/\s+/g, " ").trim();
  if (!rest || /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday|shabbat|weekday|legal holiday)s?$/.test(rest)) {
    return undefined;
  }
  return note;
}

export function postedTimes(items: NamedTime[]): NamedTime[] {
  return items
    .filter((item) => isPostedClockTime(item.name))
    .map((item) => ({ ...item, note: usefulNote(item.name, item.note) }));
}

function parseClockOnDate(dateYmd: string, time: string): Date | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const mer = match[3].toUpperCase();
  if (mer === "PM" && hour !== 12) hour += 12;
  if (mer === "AM" && hour === 12) hour = 0;
  const [year, month, day] = dateYmd.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, hour, minute, 0, 0);
}

function locationFor(entry: Pick<CalendarEntry, "name" | "note" | "location" | "weekday">) {
  const blob = `${entry.name} ${entry.note ?? ""} ${entry.location ?? ""}`;
  if (/minyan house|lord ashley/i.test(blob) && !/downtown|rutledge|both/i.test(blob)) {
    return {
      locationName: site.locations.minyanHouse.name,
      maps: site.locations.minyanHouse.googleMaps,
    };
  }
  const fridayNight = entry.weekday === "Friday" && /mincha|kabbalat|maariv/i.test(entry.name);
  const shabbat = entry.weekday === "Saturday";
  if (fridayNight || shabbat || /both/i.test(blob)) {
    return {
      locationName: "Downtown and Minyan House",
      maps: site.locations.downtown.googleMaps,
    };
  }
  return {
    locationName: site.locations.downtown.name,
    maps: site.locations.downtown.googleMaps,
  };
}

function toNextInfo(entry: CalendarEntry, whenLabel: string): NextMinyanInfo {
  return {
    name: entry.name,
    time: entry.time,
    note: entry.note,
    date: entry.date,
    weekday: entry.weekday,
    whenLabel,
    ...locationFor(entry),
  };
}

function entriesFromSnapshot(snapshot: ShulcloudSnapshot): CalendarEntry[] {
  const fromWeek = snapshot.week.flatMap((day) => day.items);
  if (fromWeek.length > 0) return fromWeek;
  const todayYmd = ymdInCharleston();
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    weekday: "long",
  }).format(charlestonNow());
  return snapshot.today.map((item) => ({
    ...item,
    date: todayYmd,
    weekday,
    service: true,
  }));
}

export function nextMinyanFromSnapshot(
  snapshot: ShulcloudSnapshot,
  now = charlestonNow(),
): NextMinyanInfo | null {
  const todayYmd = ymdInCharleston(now);
  const upcoming = entriesFromSnapshot(snapshot)
    .filter((item) => item.date >= todayYmd && isMinyanToAttend(item.name))
    .map((item) => ({ item, when: parseClockOnDate(item.date, item.time) }))
    .filter((entry): entry is { item: CalendarEntry; when: Date } => Boolean(entry.when))
    .sort((a, b) => a.when.getTime() - b.when.getTime());

  for (const { item, when } of upcoming) {
    if (when.getTime() + GRACE_MS <= now.getTime()) continue;
    const day = snapshot.week.find((entry) => entry.date === item.date);
    const whenLabel = item.date === todayYmd ? (day?.label ?? "Today") : (day?.label ?? item.weekday);
    return toNextInfo(item, whenLabel);
  }
  return null;
}

export function weekMinyanDays(snapshot: ShulcloudSnapshot, todayYmd: string) {
  return snapshot.week
    .filter((day) => day.date >= todayYmd)
    .slice(0, 7)
    .map((day) => ({
      ...day,
      items: postedTimes(day.items),
    }))
    .filter((day) => day.items.length > 0);
}
