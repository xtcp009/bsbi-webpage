import { charlestonNow, formatTime, ymdInCharleston } from "@/lib/format";
import { site } from "@/lib/site";

const HEBCAL_GEO = `latitude=${site.coordinates.latitude}&longitude=${site.coordinates.longitude}&tzid=${encodeURIComponent(site.timezone)}`;

export type ZmanimTimes = {
  date: string;
  alotHaShachar?: string;
  misheyakir?: string;
  sunrise?: string;
  sofZmanShma?: string;
  sofZmanTfilla?: string;
  chatzot?: string;
  minchaGedola?: string;
  minchaKetana?: string;
  plagHaMincha?: string;
  sunset?: string;
  tzeit?: string;
};

export type CalendarItem = {
  title: string;
  category: string;
  date: string;
  hebrew?: string;
  memo?: string;
};

export type Service = {
  id: string;
  name: string;
  plain: string;
  time: string;
  iso?: string;
  note?: string;
  location: "downtown" | "minyanHouse" | "both";
};

export type DayBoard = {
  date: string;
  weekday: string;
  label: string;
  isShabbat: boolean;
  isFriday: boolean;
  isSunday: boolean;
  services: Service[];
};

export type ShabbatInfo = {
  parsha?: string;
  candleLighting?: string;
  candleLightingIso?: string;
  havdalah?: string;
  havdalahIso?: string;
};

type HebcalZmanim = {
  date?: string;
  times?: Record<string, string>;
};

type HebcalItem = {
  title?: string;
  category?: string;
  date?: string;
  hebrew?: string;
  memo?: string;
};

function roundToFiveMinutes(date: Date): Date {
  const ms = 5 * 60 * 1000;
  return new Date(Math.round(date.getTime() / ms) * ms);
}

function minusMinutes(iso: string, minutes: number): Date {
  return new Date(new Date(iso).getTime() - minutes * 60 * 1000);
}

async function fetchJson<T>(url: string, revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getZmanim(date?: string): Promise<ZmanimTimes | null> {
  const day = date ?? ymdInCharleston();
  const data = await fetchJson<HebcalZmanim>(
    `https://www.hebcal.com/zmanim?cfg=json&${HEBCAL_GEO}&date=${day}`,
  );
  if (!data?.times) return null;
  const t = data.times;
  return {
    date: data.date ?? day,
    alotHaShachar: t.alotHaShachar,
    misheyakir: t.misheyakir,
    sunrise: t.sunrise,
    sofZmanShma: t.sofZmanShma ?? t.sofZmanShmaMGA,
    sofZmanTfilla: t.sofZmanTfilla ?? t.sofZmanTfillaMGA,
    chatzot: t.chatzot,
    minchaGedola: t.minchaGedola,
    minchaKetana: t.minchaKetana,
    plagHaMincha: t.plagHaMincha,
    sunset: t.sunset,
    tzeit: t.tzeit42min ?? t.tzeit,
  };
}

export async function getWeekZmanim(): Promise<ZmanimTimes[]> {
  const start = charlestonNow();
  const days = await Promise.all(
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return getZmanim(ymdInCharleston(d));
    }),
  );
  return days.filter((d): d is ZmanimTimes => Boolean(d));
}

export async function getShabbatInfo(): Promise<ShabbatInfo> {
  const data = await fetchJson<{ items?: HebcalItem[] }>(
    `https://www.hebcal.com/shabbat?cfg=json&${HEBCAL_GEO}&M=on&m=50&b=18`,
  );
  const info: ShabbatInfo = {};
  for (const item of data?.items ?? []) {
    if (item.category === "parashat") info.parsha = item.title?.replace(/^Parashat\s+/i, "");
    if (item.category === "candles" && item.date) {
      info.candleLightingIso = item.date;
      info.candleLighting = formatTime(item.date);
    }
    if (item.category === "havdalah" && item.date) {
      info.havdalahIso = item.date;
      info.havdalah = formatTime(item.date);
    }
  }
  return info;
}

export async function getUpcomingCalendar(): Promise<CalendarItem[]> {
  const data = await fetchJson<{ items?: HebcalItem[] }>(
    `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&ss=on&mf=on&c=on&geo=pos&latitude=${site.coordinates.latitude}&longitude=${site.coordinates.longitude}&tzid=${encodeURIComponent(site.timezone)}&M=on&s=on&start=${ymdInCharleston()}&end=${endDate(14)}`,
  );
  return (data?.items ?? [])
    .filter((item) => item.title && item.date && item.category !== "candles")
    .slice(0, 18)
    .map((item) => ({
      title: item.title ?? "",
      category: item.category ?? "",
      date: item.date ?? "",
      hebrew: item.hebrew,
      memo: item.memo,
    }));
}

function endDate(days: number): string {
  const d = charlestonNow();
  d.setDate(d.getDate() + days);
  return ymdInCharleston(d);
}

/**
 * Typical BSBI schedule, matching the posted times on the current site:
 * Sun 8:00 Shacharit, Mon–Fri 7:00 Shacharit, Shabbat 9:00 Shacharit.
 * Weekday Mincha/Maariv tracks sunset in winter and plag in summer.
 */
export function buildDayBoard(zmanim: ZmanimTimes, shabbat?: ShabbatInfo): DayBoard {
  const date = new Date(`${zmanim.date}T12:00:00`);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    weekday: "long",
  }).format(date);
  const isShabbat = weekday === "Saturday";
  const isFriday = weekday === "Friday";
  const isSunday = weekday === "Sunday";
  const mincha = weekdayMincha(zmanim, isFriday);

  const services: Service[] = [];

  if (isShabbat) {
    services.push({
      id: "shacharit",
      name: "Shacharit",
      plain: "Morning prayers",
      time: "9:00 AM",
      note: "Downtown sanctuary and the Minyan House",
      location: "both",
    });
    if (zmanim.sofZmanShma) {
      services.push({
        id: "shema",
        name: "Latest Shema",
        plain: "Latest time for Shema",
        time: formatTime(zmanim.sofZmanShma),
        iso: zmanim.sofZmanShma,
        location: "both",
      });
    }
    if (zmanim.sunset) {
      const minchaShabbat = roundToFiveMinutes(minusMinutes(zmanim.sunset, 45));
      services.push({
        id: "mincha",
        name: "Mincha",
        plain: "Afternoon prayers",
        time: formatClock(minchaShabbat),
        iso: minchaShabbat.toISOString(),
        location: "both",
      });
    }
    if (shabbat?.havdalah) {
      services.push({
        id: "havdalah",
        name: "Maariv / Havdalah",
        plain: "Evening prayers · Shabbat ends",
        time: shabbat.havdalah,
        iso: shabbat.havdalahIso,
        location: "both",
      });
    }
  } else {
    services.push({
      id: "shacharit",
      name: "Shacharit",
      plain: "Morning prayers",
      time: isSunday ? "8:00 AM" : "7:00 AM",
      note: isSunday ? "Sunday morning" : "Weekday",
      location: "downtown",
    });
    if (mincha) {
      services.push({
        id: "mincha",
        name: isFriday ? "Mincha / Kabbalat Shabbat" : "Mincha / Maariv",
        plain: isFriday ? "Friday night service" : "Afternoon and evening prayers",
        time: mincha.time,
        iso: mincha.iso,
        note: isFriday
          ? "Friday night downtown and at the Minyan House"
          : "Downtown",
        location: isFriday ? "both" : "downtown",
      });
    }
    if (isFriday && shabbat?.candleLighting) {
      services.push({
        id: "candles",
        name: "Candle lighting",
        plain: "Light Shabbat candles by",
        time: shabbat.candleLighting,
        iso: shabbat.candleLightingIso,
        note: "18 minutes before sunset",
        location: "both",
      });
    }
  }

  return {
    date: zmanim.date,
    weekday,
    label: isShabbat ? "Shabbat" : weekday,
    isShabbat,
    isFriday,
    isSunday,
    services,
  };
}

function weekdayMincha(zmanim: ZmanimTimes, isFriday: boolean): { time: string; iso: string } | null {
  if (!zmanim.sunset) return null;
  const sunset = new Date(zmanim.sunset);
  const plagMinutes = zmanim.plagHaMincha ? minutesInCharleston(zmanim.plagHaMincha) : 0;
  const summer = plagMinutes >= 18 * 60;
  const target =
    summer && zmanim.plagHaMincha && !isFriday
      ? minusMinutes(zmanim.plagHaMincha, 15)
      : minusMinutes(zmanim.sunset, 15);
  const rounded = roundToFiveMinutes(target);
  if (rounded.getTime() > sunset.getTime() - 5 * 60 * 1000) {
    const earlier = roundToFiveMinutes(minusMinutes(zmanim.sunset, 15));
    return { time: formatClock(earlier), iso: earlier.toISOString() };
  }
  return { time: formatClock(rounded), iso: rounded.toISOString() };
}

function minutesInCharleston(iso: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function formatClock(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function nextService(board: DayBoard, now = charlestonNow()): Service | null {
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
      return candidate.getTime() + 20 * 60 * 1000 > now.getTime();
    }
    return new Date(s.iso).getTime() + 20 * 60 * 1000 > Date.now();
  });
  return upcoming[0] ?? null;
}

export const zmanimRows: { key: keyof ZmanimTimes; label: string; hint?: string }[] = [
  { key: "alotHaShachar", label: "Alot HaShachar" },
  { key: "misheyakir", label: "Misheyakir" },
  { key: "sunrise", label: "Sunrise" },
  { key: "sofZmanShma", label: "Sof Zman Shema" },
  { key: "sofZmanTfilla", label: "Sof Zman Tefillah" },
  { key: "chatzot", label: "Chatzot" },
  { key: "minchaGedola", label: "Mincha Gedolah" },
  { key: "minchaKetana", label: "Mincha Ketanah" },
  { key: "plagHaMincha", label: "Plag HaMincha" },
  { key: "sunset", label: "Sunset" },
  { key: "tzeit", label: "Tzeit" },
];
