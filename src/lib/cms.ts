import { cache } from "react";
import {
  copy as fallbackCopy,
  donateFunds as fallbackFunds,
  events as fallbackEvents,
  historyMilestones as fallbackMilestones,
  hotels as fallbackHotels,
  kosherPlaces as fallbackKosher,
  weeklyClasses as fallbackClasses,
  type HistoryMilestone,
  type Hotel,
  type KosherPlace,
  type SiteCopy,
  type SiteEvent,
} from "@/content/copy";
import { gallery as fallbackGallery } from "@/content/gallery";
import { site } from "@/lib/site";
import { sanityFetch } from "@/sanity/live";
import {
  ANNOUNCEMENTS_QUERY,
  EVENTS_QUERY,
  FLYERS_QUERY,
  PHOTOS_QUERY,
  SITE_CONTENT_QUERY,
  STAFF_QUERY,
  WEEKLY_CLASSES_QUERY,
} from "@/sanity/queries";
import type {
  CmsAnnouncement,
  CmsEvent,
  CmsFlyer,
  CmsHotel,
  CmsKosherPlace,
  CmsMilestone,
  CmsPhoto,
  CmsSiteContent,
  CmsStaffBio,
  CmsWeeklyClass,
} from "@/sanity/types";

export type SiteContent = {
  copy: SiteCopy;
  kosherPlaces: KosherPlace[];
  donateFunds: string[];
  hotels: Hotel[];
  milestones: HistoryMilestone[];
};

async function fetchCms<T>(query: string, fallback: T): Promise<T> {
  try {
    const { data } = await sanityFetch({ query });
    return (data as T) ?? fallback;
  } catch {
    return fallback;
  }
}

function pickText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function pickList(value: unknown, fallback: readonly string[]): string[] {
  if (!Array.isArray(value)) return [...fallback];
  const items = value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
  return items.length > 0 ? items : [...fallback];
}

function pickFrom(
  record: Record<string, unknown> | null | undefined,
  key: string,
  fallback: string,
): string {
  return pickText(record?.[key], fallback);
}

function mapKosherPlaces(value: CmsKosherPlace[] | undefined): KosherPlace[] {
  const places = (value ?? [])
    .filter((place) => place.name?.trim())
    .map((place) => ({
      name: place.name!.trim(),
      where: place.where?.trim() ?? "",
      body: place.body?.trim() ?? "",
    }));
  return places.length > 0 ? places : [...fallbackKosher];
}

function mapHotels(value: CmsHotel[] | undefined): Hotel[] {
  const hotels = (value ?? [])
    .filter((hotel) => hotel.name?.trim() && hotel.addr?.trim())
    .map((hotel) => ({
      name: hotel.name!.trim(),
      addr: hotel.addr!.trim(),
      dist: hotel.dist?.trim() ?? "",
      phone: hotel.phone?.trim() ?? "",
      note: hotel.note?.trim() || undefined,
      eruv: hotel.eruv === "outside" || hotel.eruv === false ? false : true,
    }));
  return hotels.length > 0 ? hotels : fallbackHotels.map((hotel) => ({ ...hotel }));
}

function mapMilestones(value: CmsMilestone[] | undefined): HistoryMilestone[] {
  const milestones = (value ?? [])
    .filter((item) => item.year?.trim() && item.body?.trim())
    .map((item) => ({
      year: item.year!.trim(),
      body: item.body!.trim(),
    }));
  return milestones.length > 0 ? milestones : fallbackMilestones.map((item) => ({ ...item }));
}

function staffPhoneHref(phone?: string) {
  if (!phone) {
    return undefined;
  }
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits.startsWith("+") ? digits : `+1${digits}`}` : undefined;
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const data = await fetchCms<CmsSiteContent>(SITE_CONTENT_QUERY, {});
  const homepage = data.homepage ?? {};
  const about = data.about ?? {};
  const visit = data.visit ?? {};
  const community = data.community ?? {};
  const mikvah = data.mikvah ?? {};
  const eruv = data.eruv ?? {};
  const remembrance = data.remembrance ?? {};
  const locations = data.locations ?? {};
  const membership = data.membership ?? {};
  const donate = data.donate ?? {};
  const kosher = data.kosher ?? {};

  return {
    copy: {
      homeTagline: pickText(homepage.tagline, fallbackCopy.homeTagline),
      welcomeClose: pickText(homepage.welcome, fallbackCopy.welcomeClose),
      dailyServices: pickText(homepage.dailyServices, fallbackCopy.dailyServices),
      doorsOpen: pickText(homepage.doorsOpen, fallbackCopy.doorsOpen),
      rabbiWelcome: pickFrom(about, "rabbiWelcome", fallbackCopy.rabbiWelcome),
      rabbiBody: pickFrom(about, "rabbiBody", fallbackCopy.rabbiBody),
      historyLead: pickFrom(about, "historyLead", fallbackCopy.historyLead),
      facilities: pickFrom(about, "facilities", fallbackCopy.facilities),
      history1956: pickFrom(about, "history1956", fallbackCopy.history1956),
      rabbiToday: pickFrom(about, "rabbiToday", fallbackCopy.rabbiToday),
      rabbiClose: pickFrom(about, "rabbiClose", fallbackCopy.rabbiClose),
      visitLead: pickText(visit.visitLead, fallbackCopy.visitLead),
      visitBody: pickText(visit.visitBody, fallbackCopy.visitBody),
      visitorCenter: pickText(visit.visitorCenter, fallbackCopy.visitorCenter),
      visitCharm: pickText(visit.visitCharm, fallbackCopy.visitCharm),
      visitAmenities: pickList(visit.visitAmenities, fallbackCopy.visitAmenities),
      visitHospitality: pickText(visit.visitHospitality, fallbackCopy.visitHospitality),
      shabbosHouse: pickText(visit.shabbosHouse, fallbackCopy.shabbosHouse),
      shabbosHouseDetails: pickText(visit.shabbosHouseDetails, fallbackCopy.shabbosHouseDetails),
      shabbosHouseReserve: pickText(visit.shabbosHouseReserve, fallbackCopy.shabbosHouseReserve),
      communityHeroTitle: pickFrom(community, "heroTitle", fallbackCopy.communityHeroTitle),
      communityHeroLede: pickFrom(community, "heroLede", fallbackCopy.communityHeroLede),
      communityFlyersLede: pickFrom(community, "flyersLede", fallbackCopy.communityFlyersLede),
      communityClassesLede: pickFrom(community, "classesLede", fallbackCopy.communityClassesLede),
      sisterhood: pickFrom(community, "sisterhood", fallbackCopy.sisterhood),
      brotherhood: pickFrom(community, "brotherhood", fallbackCopy.brotherhood),
      chevraKadisha: pickFrom(community, "chevraKadisha", fallbackCopy.chevraKadisha),
      chevraContact: pickFrom(community, "chevraContact", fallbackCopy.chevraContact),
      addlestone: pickFrom(community, "addlestone", fallbackCopy.addlestone),
      preschool: pickFrom(community, "preschool", fallbackCopy.preschool),
      rentalsSanctuary: pickFrom(community, "rentalsSanctuary", fallbackCopy.rentalsSanctuary),
      rentalsHall: pickFrom(community, "rentalsHall", fallbackCopy.rentalsHall),
      mikvahLead: pickFrom(mikvah, "mikvahLead", fallbackCopy.mikvahLead),
      mikvahDishes: pickFrom(mikvah, "mikvahDishes", fallbackCopy.mikvahDishes),
      mikvahQuestions: pickFrom(mikvah, "mikvahQuestions", fallbackCopy.mikvahQuestions),
      eruvRabbi: pickFrom(eruv, "eruvRabbi", fallbackCopy.eruvRabbi),
      eruvDowntown: pickFrom(eruv, "eruvDowntown", fallbackCopy.eruvDowntown),
      eruvWest: pickFrom(eruv, "eruvWest", fallbackCopy.eruvWest),
      eruvPerimeter: pickFrom(eruv, "eruvPerimeter", fallbackCopy.eruvPerimeter),
      remembranceWall: pickFrom(remembrance, "remembranceWall", fallbackCopy.remembranceWall),
      remembranceTag: pickFrom(remembrance, "remembranceTag", fallbackCopy.remembranceTag),
      remembranceTitle: pickFrom(remembrance, "remembranceTitle", fallbackCopy.remembranceTitle),
      remembranceFund: pickFrom(remembrance, "remembranceFund", fallbackCopy.remembranceFund),
      remembranceBody: pickFrom(remembrance, "remembranceBody", fallbackCopy.remembranceBody),
      remembranceLegacy: pickFrom(remembrance, "remembranceLegacy", fallbackCopy.remembranceLegacy),
      remembranceNote: pickFrom(remembrance, "remembranceNote", fallbackCopy.remembranceNote),
      remembranceContact: pickFrom(remembrance, "remembranceContact", fallbackCopy.remembranceContact),
      remembranceWhen: pickFrom(remembrance, "remembranceWhen", fallbackCopy.remembranceWhen),
      downtownLocation: pickFrom(locations, "downtownLocation", fallbackCopy.downtownLocation),
      minyanHouse: pickFrom(locations, "minyanHouse", fallbackCopy.minyanHouse),
      cemeteryLead: pickFrom(locations, "cemeteryLead", fallbackCopy.cemeteryLead),
      cemeteryMaryville: pickFrom(locations, "cemeteryMaryville", fallbackCopy.cemeteryMaryville),
      cemeteryBethIsrael: pickFrom(locations, "cemeteryBethIsrael", fallbackCopy.cemeteryBethIsrael),
      cemeteryBrithSholom: pickFrom(locations, "cemeteryBrithSholom", fallbackCopy.cemeteryBrithSholom),
      cemeteryNote: pickFrom(locations, "cemeteryNote", fallbackCopy.cemeteryNote),
      membershipLead: pickFrom(membership, "membershipLead", fallbackCopy.membershipLead),
      membershipBody: pickFrom(membership, "membershipBody", fallbackCopy.membershipBody),
      membershipApplicationNote: pickFrom(
        membership,
        "membershipApplicationNote",
        fallbackCopy.membershipApplicationNote,
      ),
      donateMember: pickText(donate.donateMember, fallbackCopy.donateMember),
      donatePortalNote: pickText(donate.donatePortalNote, fallbackCopy.donatePortalNote),
      chefLinda: pickText(kosher.chefLinda, fallbackCopy.chefLinda),
      chefLindaContact: pickText(kosher.chefLindaContact, fallbackCopy.chefLindaContact),
      parshaClass: fallbackCopy.parshaClass,
      lunchAndLearn: fallbackCopy.lunchAndLearn,
      talmudClass: fallbackCopy.talmudClass,
    },
    kosherPlaces: mapKosherPlaces(kosher.kosherPlaces),
    donateFunds: pickList(donate.donateFunds, fallbackFunds),
    hotels: mapHotels(data.hotels?.hotels),
    milestones: mapMilestones(homepage.milestones),
  };
});

export const getAnnouncements = cache(async (): Promise<CmsAnnouncement[]> => {
  const items = await fetchCms<CmsAnnouncement[]>(ANNOUNCEMENTS_QUERY, []);
  return items.filter((item) => item.title);
});

export const getGalleryPhotos = cache(async () => {
  const photos = await fetchCms<(CmsPhoto & { category?: string })[]>(PHOTOS_QUERY, []);
  const today = photos.filter((photo) => photo.category !== "historic" && photo.src);
  const historic = photos.filter((photo) => photo.category === "historic" && photo.src);
  return {
    today: today.length > 0 ? today : [...fallbackGallery.today],
    historic: historic.length > 0 ? historic : [...fallbackGallery.historic],
    communityNote: fallbackGallery.communityNote,
  };
});

export const getStaffBios = cache(async (): Promise<CmsStaffBio[]> => {
  const people = await fetchCms<CmsStaffBio[]>(STAFF_QUERY, []);
  if (people.length > 0) {
    return people.map((person) => ({
      ...person,
      phoneHref: person.phoneHref ?? staffPhoneHref(person.phone),
    }));
  }
  return [
    { _id: "rabbi", ...site.staff.rabbi },
    { _id: "director", ...site.staff.director },
    { _id: "rebbetzin", ...site.staff.rebbetzin },
  ];
});

export const getFlyers = cache(async (): Promise<CmsFlyer[]> => {
  const items = await fetchCms<CmsFlyer[]>(FLYERS_QUERY, []);
  return items.filter((item) => item.title && item.image);
});

export const getWeeklyClasses = cache(async (): Promise<CmsWeeklyClass[]> => {
  const classes = await fetchCms<CmsWeeklyClass[]>(WEEKLY_CLASSES_QUERY, []);
  const ready = classes.filter((item) => item.title && item.image);
  if (ready.length > 0) {
    return ready;
  }
  return fallbackClasses.map((item, index) => ({
    _id: `class-${index}`,
    ...item,
  }));
});

export const getCmsEvents = cache(async (): Promise<SiteEvent[]> => {
  const extras = await fetchCms<CmsEvent[]>(EVENTS_QUERY, []);
  if (extras.length === 0) {
    return fallbackEvents;
  }
  return extras.map((item) => ({
    title: item.title,
    detail: item.detail,
    when: item.when,
    href: item.href,
    startDate: item.startDate,
  }));
});
