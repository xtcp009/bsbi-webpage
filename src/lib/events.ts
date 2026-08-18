import type { SiteEvent } from "@/content/copy";
import { ymdInCharleston } from "@/lib/format";

export function upcomingEvents(list: readonly SiteEvent[], now = new Date()): SiteEvent[] {
  const today = ymdInCharleston(now);
  return list.filter((event) => {
    if (event.recurring) return true;
    if (!event.startDate) return false;
    return event.startDate >= today;
  });
}

export function eventDateParts(event: Pick<SiteEvent, "when" | "startDate" | "recurring">) {
  if (event.startDate) {
    const date = new Date(`${event.startDate}T12:00:00`);
    return {
      month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: String(date.getDate()),
    };
  }

  const when = event.when.toLowerCase();
  if (when.includes("monday")) return { month: "MON", day: "" };
  if (when.includes("tuesday")) return { month: "TUE", day: "" };
  if (when.includes("wednesday")) return { month: "WED", day: "" };
  if (when.includes("thursday")) return { month: "THU", day: "" };
  if (when.includes("friday")) return { month: "FRI", day: "" };
  if (when.includes("saturday") || when.includes("shabbat")) return { month: "SAT", day: "" };
  if (when.includes("sunday")) return { month: "SUN", day: "" };
  return { month: "", day: "" };
}
