import { charlestonNow, ymdInCharleston } from "@/lib/format";
import { site } from "@/lib/site";
import { getShabbatInfo, type DayBoard, type Service } from "@/lib/zmanim";

export const SHULCLOUD_TAG = "shulcloud";
export const SHULCLOUD_REVALIDATE_SECONDS = 30;
export const ERUV_STALE_MS = 7 * 24 * 60 * 60 * 1000;

const SERVICE_PATTERN =
  /shacharit|mincha|maariv|kabbalat|candle lighting|havdalah|latest shema|earliest candle/i;

/** Week view from today through the next four weeks — public ShulCloud calendar feed. */
export const SHULCLOUD_CALENDAR_FEED =
  "/calendar?view=week&date_start=today&has_second_date=Y&date_end=_+days+from+now&date_end_x=28";

export type NamedTime = {
  name: string;
  time: string;
  note?: string;
  href?: string;
  endTime?: string;
};

export type CalendarEntry = NamedTime & {
  date: string;
  weekday: string;
  hebrew?: string;
  location?: string;
  description?: string;
  service: boolean;
};

export type LiveEruv = {
  downtown: "up" | "down" | "unknown";
  southWindermere: "up" | "down" | "unknown";
  lastChecked?: string;
  stale: boolean;
  source: "shulcloud";
};

export type HeroSlide = {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  objectPositionMobile?: string;
};

export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    src: "https://images.shulcloud.com/1505/uploads/Files/Image-Links/BSBI.jpg",
    alt: "Brith Sholom Beth Israel Synagogue on Rutledge Avenue",
  },
  {
    src: "https://images.shulcloud.com/1505/uploads/bsbibrithshalombethisraelsynagoguecharlestonscbystevenhyatt-2.jpg",
    alt: "Brith Sholom Beth Israel Synagogue in Charleston, photographed by Steven Hyatt",
  },
];

export type ShulcloudSnapshot = {
  ok: boolean;
  fetchedAt: string;
  sourceUrl: string;
  calendarUrl: string;
  error?: string;
  slides: HeroSlide[];
  today: NamedTime[];
  fridayNight: NamedTime[];
  shabbatDay: NamedTime[];
  parsha?: string;
  candleLighting?: string;
  havdalah?: string;
  nextHoliday?: { name: string; when: string };
  zmanim: { label: string; time: string }[];
  eruv: LiveEruv | null;
  week: { date: string; label: string; weekday: string; hebrew?: string; items: CalendarEntry[] }[];
  events: CalendarEntry[];
};

const ORIGINS = [
  process.env.SHULCLOUD_ORIGIN,
  site.shulcloudPublicUrl,
  site.shulcloudOrigin,
].filter((origin, index, list): origin is string => Boolean(origin) && list.indexOf(origin) === index);

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

/** ShulCloud returns 406 if the client advertises AVIF or Brotli. */
const HEADER_SETS: Record<string, string>[] = [
  {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "User-Agent": USER_AGENT,
  },
  {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent": USER_AGENT,
  },
];

function noCache() {
  return process.env.NODE_ENV !== "production" || process.env.SHULCLOUD_NO_CACHE === "1";
}

function emptySnapshot(partial: Partial<ShulcloudSnapshot> = {}): ShulcloudSnapshot {
  return {
    ok: false,
    fetchedAt: new Date().toISOString(),
    sourceUrl: ORIGINS[0],
    calendarUrl: `${site.shulcloudPublicUrl}/calendar`,
    slides: [],
    today: [],
    fridayNight: [],
    shabbatDay: [],
    zmanim: [],
    eruv: null,
    week: [],
    events: [],
    ...partial,
  };
}

function looksLikeShulcloud(html: string) {
  return /shulcloud|today'?s calendar|ce_event_name|calendar_day_view|fck_widget_calendar/i.test(html);
}

async function fetchHtml(path: string): Promise<{ html: string; url: string } | null> {
  const cache = noCache()
    ? { cache: "no-store" as const }
    : { next: { revalidate: SHULCLOUD_REVALIDATE_SECONDS, tags: [SHULCLOUD_TAG] } };

  for (const origin of ORIGINS) {
    for (const headers of HEADER_SETS) {
      try {
        const res = await fetch(`${origin}${path}`, {
          ...cache,
          headers,
          redirect: "follow",
        });
        if (!res.ok) continue;
        const html = await res.text();
        if (!html || html.length < 200 || !looksLikeShulcloud(html)) continue;
        return { html, url: res.url || `${origin}${path}` };
      } catch {
        continue;
      }
    }
  }
  return null;
}

function decode(html: string) {
  return html
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function text(html: string) {
  return decode(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function prettyTime(raw: string) {
  const match = raw.trim().match(/^(\d{1,2}:\d{2})\s*(am|pm)$/i);
  if (!match) return raw.trim();
  return `${match[1]} ${match[2].toUpperCase()}`;
}

function extractWidgetTimes(html: string): NamedTime[] {
  const items: NamedTime[] = [];
  const re =
    /<bdi>([\s\S]*?)<\/bdi>\s*<div class="right_calendar_widget_time">:\s*([^<]+)<\/div>/gi;
  for (const match of html.matchAll(re)) {
    const name = text(match[1]);
    const time = prettyTime(match[2]);
    if (name && time) items.push({ name, time });
  }
  return items;
}

function sliceHeading(html: string, start: string, end?: string) {
  const startRe = new RegExp(`<h2[^>]*>\\s*${start}[\\s\\S]*?<\\/h2>`, "i");
  const startMatch = startRe.exec(html);
  if (!startMatch || startMatch.index === undefined) return "";
  const from = startMatch.index;
  if (!end) return html.slice(from);
  const rest = html.slice(from + startMatch[0].length);
  const endRe = new RegExp(`<h[24][^>]*>\\s*${end}`, "i");
  const endMatch = endRe.exec(rest);
  return html.slice(from, from + startMatch[0].length + (endMatch?.index ?? rest.length));
}

function parseEruv(html: string): LiveEruv | null {
  const source = decode(html);
  const updated = source.match(/last updated\s+(\d{1,2}\/\d{1,2}\/\d{4})/i)?.[1];
  const downtownMatch = source.match(/Downtown\s+Eruv:\s*[\s\S]{0,160}?\b(UP|DOWN)\b/i);
  const westMatch = source.match(/South\s*Windermere\s*Eruv:\s*[\s\S]{0,160}?\b(UP|DOWN)\b/i);
  if (!downtownMatch && !westMatch && !updated) return null;

  let lastChecked: string | undefined;
  if (updated) {
    const [month, day, year] = updated.split("/");
    lastChecked = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const stale = lastChecked
    ? Date.now() - new Date(`${lastChecked}T12:00:00`).getTime() > ERUV_STALE_MS
    : true;

  const toState = (value?: string): LiveEruv["downtown"] => {
    if (!value) return "unknown";
    return value.toLowerCase() === "up" ? "up" : "down";
  };

  return {
    downtown: toState(downtownMatch?.[1]),
    southWindermere: toState(westMatch?.[1]),
    lastChecked,
    stale: stale || !lastChecked,
    source: "shulcloud",
  };
}

function parseZmanim(html: string) {
  const start = html.search(/<div class="fck_widget_zmanim"/i);
  const block = start >= 0 ? html.slice(start, start + 8000) : "";
  const rows: { label: string; time: string }[] = [];
  const re = /<tr>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>/gi;
  for (const match of block.matchAll(re)) {
    const label = text(match[1]);
    const time = prettyTime(text(match[2]));
    if (!label || !/^\d{1,2}:\d{2}/.test(time)) continue;
    rows.push({ label, time });
  }
  return rows;
}

function parseFeaturedEvents(html: string): { href: string; title: string }[] {
  const found: { href: string; title: string }[] = [];
  const re = /href="((?:https?:\/\/[^"]+)?\/event\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(re)) {
    const href = match[1].startsWith("http") ? match[1] : `${site.shulcloudPublicUrl}${match[1]}`;
    const title = text(match[2]);
    if (!title || found.some((item) => item.href === href)) continue;
    found.push({ href, title });
  }
  return found;
}

function parseDateHeading(raw: string) {
  const cleaned = text(raw);
  const match = cleaned.match(
    /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Shabbat),?\s+([A-Za-z]+ \d{1,2}, \d{4})/,
  );
  if (!match) return null;
  const weekday = match[1] === "Shabbat" ? "Saturday" : match[1];
  const parsed = new Date(`${match[2]} 12:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  const hebrew = cleaned.split("•")[1]?.trim();
  return {
    weekday,
    date: ymdInCharleston(parsed),
    label: `${match[1]}, ${match[2]}`,
    hebrew: hebrew || undefined,
  };
}

function altForHeroSlide(src: string, index: number) {
  if (/stevenhyatt/i.test(src)) {
    return "Brith Sholom Beth Israel Synagogue in Charleston, photographed by Steven Hyatt";
  }
  if (/Image-Links\/BSBI|\/BSBI\.jpg/i.test(src)) {
    return "Brith Sholom Beth Israel Synagogue on Rutledge Avenue";
  }
  return `Congregation photograph ${index + 1}`;
}

export function parseHeroSlides(html: string): HeroSlide[] {
  const slides: HeroSlide[] = [];
  const re = /<li[^>]*class="[^"]*sy-slide[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/gi;
  for (const match of html.matchAll(re)) {
    const src = decode(match[1].trim());
    if (!src || slides.some((slide) => slide.src === src)) continue;
    if (!/^https:\/\/images\.shulcloud\.com\/1505\//i.test(src)) continue;
    slides.push({ src, alt: altForHeroSlide(src, slides.length) });
  }
  return slides;
}

function hrefFrom(html: string) {
  const match = html.match(/href="((?:https?:\/\/[^"]+)?\/event\/[^"]+)"/i);
  if (!match) return undefined;
  return match[1].startsWith("http") ? match[1] : `${site.shulcloudPublicUrl}${match[1]}`;
}

function parseWeek(html: string): ShulcloudSnapshot["week"] {
  const days: ShulcloudSnapshot["week"] = [];
  const blocks = html.split(/<div class="calendar_day_view[^"]*"[^>]*>/i).slice(1);
  for (const block of blocks) {
    const heading = block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1];
    if (!heading) continue;
    const meta = parseDateHeading(heading);
    if (!meta) continue;
    const items: CalendarEntry[] = [];
    for (const row of block.matchAll(/<tr>([\s\S]*?)<\/tr>/gi)) {
      const times = [...row[1].matchAll(/<span class="ce_time">([^<]+)<\/span>/gi)].map((item) =>
        prettyTime(item[1]),
      );
      const nameHtml = row[1].match(/<div class="ce_event_name">([\s\S]*?)<\/div>/i)?.[1] ?? "";
      const name = text(nameHtml);
      if (!name || times.length === 0) continue;
      const location = text(row[1].match(/<div class="ce_event_location">([\s\S]*?)<\/div>/i)?.[1] ?? "");
      const description = text(row[1].match(/<div class="ce_event_desc">([\s\S]*?)<\/div>/i)?.[1] ?? "");
      items.push({
        name,
        time: times[0],
        endTime: times[1],
        href: hrefFrom(nameHtml),
        date: meta.date,
        weekday: meta.weekday,
        hebrew: meta.hebrew,
        location: location || undefined,
        description: description || undefined,
        service: SERVICE_PATTERN.test(name),
        note: description || location || undefined,
      });
    }
    days.push({
      date: meta.date,
      label: meta.label,
      weekday: meta.weekday,
      hebrew: meta.hebrew,
      items,
    });
  }
  return days;
}

function cellAfterClass(html: string, className: string) {
  const re = new RegExp(`${className}[\\s\\S]*?<td[^>]*>([\\s\\S]*?)<\\/td>`, "i");
  return text(html.match(re)?.[1] ?? "") || undefined;
}

export function parseShulcloudPages(homeHtml: string, calendarHtml: string): Omit<
  ShulcloudSnapshot,
  "ok" | "fetchedAt" | "sourceUrl" | "calendarUrl" | "error"
> {
  const week = parseWeek(calendarHtml || homeHtml);
  const todayYmd = ymdInCharleston();
  const todayFromWeek = week.find((day) => day.date === todayYmd)?.items.filter((item) => item.service) ?? [];
  const today = todayFromWeek.length
    ? todayFromWeek.map(({ name, time, note }) => ({ name, time, note }))
    : extractWidgetTimes(sliceHeading(homeHtml, "Today'?s Calendar", "Friday Night"));

  const events = week
    .flatMap((day) => day.items)
    .filter((item) => !item.service && item.date >= todayYmd)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  for (const featured of parseFeaturedEvents(homeHtml)) {
    const existing = events.find((item) => item.href === featured.href || item.name === featured.title);
    if (existing) {
      existing.href = existing.href ?? featured.href;
    }
  }

  const parshaMatch = (homeHtml || calendarHtml).match(/Parshat\s+([^<]+)/i);
  const holidayName = text(homeHtml.match(/<h4[^>]*>(Erev [^<]+|Rosh [^<]+|Yom [^<]+|Sukkot|Pesach|Shavuot)[^<]*<\/h4>/i)?.[1] ?? "");
  const holidayWhen = cellAfterClass(homeHtml, "right_calendar_next_holiday");

  return {
    slides: parseHeroSlides(homeHtml),
    today,
    fridayNight: extractWidgetTimes(sliceHeading(homeHtml, "Friday Night", "Shabbat Day")),
    shabbatDay: extractWidgetTimes(sliceHeading(homeHtml, "Shabbat Day")),
    parsha: parshaMatch ? text(parshaMatch[0]) : undefined,
    candleLighting: cellAfterClass(homeHtml, "right_calendar_candlelighting"),
    havdalah: cellAfterClass(homeHtml, "right_calendar_havdalah"),
    nextHoliday: holidayName && holidayWhen ? { name: holidayName, when: holidayWhen } : undefined,
    zmanim: parseZmanim(homeHtml),
    eruv: parseEruv(homeHtml),
    week,
    events,
  };
}

function namedTimesFromDay(
  week: ShulcloudSnapshot["week"],
  weekday: string,
  nameTest: RegExp,
): NamedTime[] {
  const day = week.find((item) => item.weekday === weekday);
  if (!day) return [];
  return day.items
    .filter((item) => nameTest.test(item.name))
    .map(({ name, time, note }) => ({ name, time, note }));
}

function weekItemLabel(week: ShulcloudSnapshot["week"], weekday: string, nameTest: RegExp) {
  const day = week.find((item) => item.weekday === weekday);
  const item = day?.items.find((entry) => nameTest.test(entry.name));
  if (!day || !item) return undefined;
  const date = new Date(`${day.date}T12:00:00`);
  const when = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
  return `${when}, ${item.time.toLowerCase()}`;
}

async function fillScheduleGaps(
  parsed: ReturnType<typeof parseShulcloudPages>,
): Promise<ReturnType<typeof parseShulcloudPages>> {
  const fridayNight =
    parsed.fridayNight.length > 0
      ? parsed.fridayNight
      : namedTimesFromDay(parsed.week, "Friday", /candle|mincha|kabbalat|maariv/i);
  const shabbatDay =
    parsed.shabbatDay.length > 0
      ? parsed.shabbatDay
      : namedTimesFromDay(parsed.week, "Saturday", /shacharit|shema|mincha|maariv|havdalah/i);

  let { parsha, candleLighting, havdalah } = parsed;
  candleLighting = candleLighting ?? weekItemLabel(parsed.week, "Friday", /^candle lighting$/i);
  havdalah = havdalah ?? weekItemLabel(parsed.week, "Saturday", /havdalah/i);

  if (!parsha || !candleLighting || !havdalah) {
    const shabbat = await getShabbatInfo();
    parsha = parsha ?? (shabbat.parsha ? `Parshat ${shabbat.parsha}` : undefined);
    candleLighting = candleLighting ?? shabbat.candleLighting;
    havdalah = havdalah ?? shabbat.havdalah;
  }

  return { ...parsed, fridayNight, shabbatDay, parsha, candleLighting, havdalah };
}

export function isEruvFresh(eruv: LiveEruv | null) {
  return Boolean(eruv && !eruv.stale && eruv.lastChecked);
}

export function snapshotToBoard(snapshot: ShulcloudSnapshot): DayBoard | null {
  if (!snapshot.ok || snapshot.today.length === 0) return null;
  const now = charlestonNow();
  const date = snapshot.week.find((day) => day.date === ymdInCharleston(now))?.date ?? ymdInCharleston(now);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    weekday: "long",
  }).format(now);
  const isShabbat = weekday === "Saturday";
  const isFriday = weekday === "Friday";
  const isSunday = weekday === "Sunday";

  const services: Service[] = snapshot.today
    .filter((item) => !/shema|candle lighting|earliest candle/i.test(item.name))
    .map((item, index) => ({
    id: `${item.name.toLowerCase().replace(/[^a-z]+/g, "-")}-${index}`,
    name: item.name,
    plain: item.note ?? item.name,
    time: item.time,
    note: item.note,
    location: /minyan house|lord ashley|both/i.test(`${item.name} ${item.note ?? ""}`)
      ? "minyanHouse"
      : isFriday || isShabbat
        ? "both"
        : "downtown",
  }));

  return {
    date,
    weekday,
    label: isShabbat ? "Shabbat" : weekday,
    isShabbat,
    isFriday,
    isSunday,
    services,
  };
}

export async function getShulcloudSnapshot(): Promise<ShulcloudSnapshot> {
  const fetchedAt = new Date().toISOString();
  const [home, calendar] = await Promise.all([
    fetchHtml("/"),
    fetchHtml(SHULCLOUD_CALENDAR_FEED),
  ]);
  const calendarPage = calendar ?? (await fetchHtml("/calendar"));

  if (!home && !calendarPage) {
    return emptySnapshot({
      fetchedAt,
      error: "ShulCloud did not return the public schedule.",
    });
  }

  const parsed = await fillScheduleGaps(parseShulcloudPages(home?.html ?? "", calendarPage?.html ?? ""));

  return {
    ...parsed,
    ok: true,
    fetchedAt,
    sourceUrl: home?.url ?? calendarPage?.url ?? ORIGINS[0],
    calendarUrl: `${site.shulcloudPublicUrl}/calendar`,
  };
}
