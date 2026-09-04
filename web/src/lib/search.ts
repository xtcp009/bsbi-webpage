import {
  copy as fallbackCopy,
  donateFunds as fallbackFunds,
  hotels as fallbackHotels,
  kosherPlaces as fallbackKosher,
  weeklyClasses,
} from "@/content/copy";
import { gallery } from "@/content/gallery";
import type { SiteContent } from "@/lib/cms";
import { pages } from "@/lib/seo";
import { site, sitePages } from "@/lib/site";

export type SearchHit = {
  href: string;
  title: string;
  snippet: string;
};

type SearchDoc = {
  href: string;
  title: string;
  text: string;
};

function blob(...parts: Array<string | readonly string[] | number | undefined | null>): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? [...part] : part == null ? [] : [String(part)]))
    .join(" ");
}

function searchDocs(content?: SiteContent): SearchDoc[] {
  const copy = content?.copy ?? fallbackCopy;
  const kosherPlaces = content?.kosherPlaces ?? fallbackKosher;
  const donateFunds = content?.donateFunds ?? fallbackFunds;
  const hotelNames = (content?.hotels ?? fallbackHotels).map(
    (hotel) => `${hotel.name} ${hotel.addr} ${hotel.dist} ${hotel.note ?? ""}`,
  );

  return [
  {
    href: "/",
    title: "Home",
    text: blob(
      copy.homeTagline,
      copy.welcomeClose,
      copy.doorsOpen,
      copy.historyLead,
      copy.dailyServices,
      copy.downtownLocation,
      copy.minyanHouse,
      copy.remembranceWall,
      copy.remembranceTitle,
      site.legalName,
      site.tagline,
    ),
  },
  {
    href: "/times",
    title: pages.times.title,
    text: blob(copy.dailyServices, pages.times.description, "minyan shacharis mincha maariv zmanim candle lighting havdalah services"),
  },
  {
    href: "/calendar",
    title: pages.calendar.title,
    text: blob(pages.calendar.description, "upcoming programs events shulcloud"),
  },
  {
    href: "/visit",
    title: pages.visit.title,
    text: blob(
      copy.visitLead,
      copy.visitBody,
      copy.visitHospitality,
      copy.visitorCenter,
      copy.visitCharm,
      copy.visitAmenities,
      copy.shabbosHouse,
      copy.shabbosHouseDetails,
      copy.shabbosHouseReserve,
      copy.chefLinda,
      pages.visit.description,
    ),
  },
  {
    href: "/locations",
    title: pages.locations.title,
    text: blob(
      copy.downtownLocation,
      copy.minyanHouse,
      copy.cemeteryLead,
      copy.cemeteryMaryville,
      copy.cemeteryBethIsrael,
      copy.cemeteryBrithSholom,
      copy.cemeteryNote,
      site.locations.downtown.fullAddress,
      site.locations.minyanHouse.fullAddress,
      pages.locations.description,
    ),
  },
  {
    href: "/gallery",
    title: pages.gallery.title,
    text: blob(
      pages.gallery.description,
      gallery.communityNote,
      gallery.today.map((photo) => `${photo.alt} ${photo.caption}`),
      gallery.historic.map((photo) => `${photo.alt} ${photo.caption}`),
    ),
  },
  {
    href: "/about",
    title: pages.about.title,
    text: blob(
      copy.rabbiWelcome,
      copy.rabbiBody,
      copy.historyLead,
      copy.facilities,
      copy.history1956,
      copy.rabbiToday,
      copy.rabbiClose,
      site.staff.rabbi.name,
      pages.about.description,
    ),
  },
  {
    href: "/contact",
    title: pages.contact.title,
    text: blob(
      pages.contact.description,
      site.phoneDisplay,
      site.email,
      site.staff.rabbi.name,
      site.staff.rabbi.title,
      site.staff.director.name,
      site.staff.director.title,
      site.staff.rebbetzin.name,
      "president synagogue office",
    ),
  },
  {
    href: "/eruv",
    title: pages.eruv.title,
    text: blob(copy.eruvRabbi, copy.eruvDowntown, copy.eruvWest, copy.eruvPerimeter, pages.eruv.description),
  },
  {
    href: "/mikvah",
    title: pages.mikvah.title,
    text: blob(
      copy.mikvahLead,
      copy.mikvahDishes,
      copy.mikvahQuestions,
      site.staff.rebbetzin.name,
      pages.mikvah.description,
    ),
  },
  {
    href: "/kosher",
    title: pages.kosher.title,
    text: blob(
      copy.chefLinda,
      copy.chefLindaContact,
      kosherPlaces.map((place) => `${place.name} ${place.body} ${place.where}`),
      pages.kosher.description,
    ),
  },
  {
    href: "/hotels",
    title: pages.hotels.title,
    text: blob(copy.visitBody, pages.hotels.description, hotelNames, "lodging stay inn walking distance eruv"),
  },
  {
    href: "/community",
    title: pages.community.title,
    text: blob(
      copy.sisterhood,
      copy.brotherhood,
      copy.chevraKadisha,
      copy.chevraContact,
      copy.addlestone,
      copy.preschool,
      copy.rentalsSanctuary,
      copy.rentalsHall,
      weeklyClasses.map((item) => `${item.title} ${item.teacher} ${item.when} ${item.where} ${item.body}`),
      pages.community.description,
    ),
  },
  {
    href: "/membership",
    title: pages.membership.title,
    text: blob(copy.membershipLead, copy.membershipBody, pages.membership.description, "join dues application"),
  },
  {
    href: "/remembrance",
    title: pages.remembrance.title,
    text: blob(
      copy.remembranceTitle,
      copy.remembranceWall,
      copy.remembranceTag,
      copy.remembranceWhen,
      copy.remembranceNote,
      copy.remembranceFund,
      copy.remembranceBody,
      copy.remembranceLegacy,
      copy.remembranceContact,
      pages.remembrance.description,
    ),
  },
  {
    href: "/donate",
    title: pages.donate.title,
    text: blob(copy.donateMember, donateFunds, pages.donate.description, "giving donation dues"),
  },
  ];
}

function pageKeywords(href: string): string {
  return sitePages.find((page) => page.href === href)?.keywords ?? "";
}

function occurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let from = 0;
  while (from < haystack.length) {
    const at = haystack.indexOf(needle, from);
    if (at === -1) break;
    count += 1;
    from = at + needle.length;
  }
  return count;
}

function snippetAround(text: string, needle: string): string {
  const lower = text.toLowerCase();
  const at = lower.indexOf(needle);
  if (at === -1) {
    return text.slice(0, 140).trim();
  }
  const start = Math.max(0, at - 42);
  const end = Math.min(text.length, at + needle.length + 72);
  const slice = text.slice(start, end).replace(/\s+/g, " ").trim();
  return `${start > 0 ? "…" : ""}${slice}${end < text.length ? "…" : ""}`;
}

function scoreDoc(doc: SearchDoc, needle: string): number {
  const title = doc.title.toLowerCase();
  const href = doc.href.toLowerCase();
  const keywords = pageKeywords(doc.href).toLowerCase();
  const text = `${doc.title} ${keywords} ${doc.text}`.toLowerCase();
  let score = 0;

  if (title === needle || href === `/${needle}`) score += 120;
  if (title.includes(needle)) score += 70;
  if (href.includes(needle)) score += 50;
  if (keywords.includes(needle)) score += 40;
  score += Math.min(occurrences(text, needle) * 8, 48);

  if (doc.href === "/" && score < 110) score -= 20;
  return score;
}

export function searchHref(href: string, query: string): string {
  const term = query.trim();
  if (!term) return href;
  const url = new URL(href, "https://www.bsbisynagogue.org");
  url.searchParams.set("q", term);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function searchSite(query: string, content?: SiteContent): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];

  return searchDocs(content)
    .map((doc) => ({ doc, score: scoreDoc(doc, needle) }))
    .filter((item) => item.score > 0 && `${item.doc.title} ${pageKeywords(item.doc.href)} ${item.doc.text}`.toLowerCase().includes(needle))
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .slice(0, 6)
    .map(({ doc }) => ({
      href: searchHref(doc.href, query),
      title: doc.title,
      snippet: snippetAround(`${doc.title}. ${doc.text}`, needle),
    }));
}
