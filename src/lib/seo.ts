import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMeta(title: string, description: string, path: string): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
  };
}

export const pages = {
  home: {
    title: `${site.name} · Charleston, SC`,
    description: site.description,
    path: "/",
  },
  times: {
    title: "Services",
    description:
      "Today’s service times, Shabbat candle lighting, Havdalah, and zmanim at Brith Sholom Beth Israel in Charleston.",
    path: "/times",
  },
  calendar: {
    title: "Calendar",
    description: "Upcoming services and programs at BSBI Synagogue, as listed on the live ShulCloud calendar.",
    path: "/calendar",
  },
  visit: {
    title: "Visit Charleston",
    description:
      "Plan a visit to BSBI in historic Charleston — Shabbat services, kosher meals, hotels, and hospitality.",
    path: "/visit",
  },
  hotels: {
    title: "Hotels",
    description: "Hotels near Brith Sholom Beth Israel, with walking distance and downtown eruv notes.",
    path: "/hotels",
  },
  gallery: {
    title: "Photo Gallery",
    description:
      "Photographs of Brith Sholom Beth Israel Synagogue in Charleston and Historic American Buildings Survey records.",
    path: "/gallery",
  },
  about: {
    title: "About",
    description:
      "History of Brith Sholom Beth Israel, a historic Orthodox synagogue in Charleston, South Carolina, since 1854.",
    path: "/about",
  },
  contact: {
    title: "Contact",
    description: `Call or email the BSBI synagogue office. ${site.phoneDisplay} · ${site.email}.`,
    path: "/contact",
  },
  eruv: {
    title: "Eruv",
    description: "Downtown and South Windermere eruv maps and status for the Charleston Jewish community.",
    path: "/eruv",
  },
  mikvah: {
    title: "Mikvah",
    description: "Make a mikvah appointment at BSBI in downtown Charleston. Please reserve 24 hours in advance.",
    path: "/mikvah",
  },
  kosher: {
    title: "Kosher",
    description: "Kosher meals to go and kosher options for visitors and the Charleston Jewish community.",
    path: "/kosher",
  },
  community: {
    title: "Community",
    description: "Sisterhood, Brotherhood, weekly classes, and Chevra Kadisha at Brith Sholom Beth Israel.",
    path: "/community",
  },
  membership: {
    title: "Membership",
    description: "Join Brith Sholom Beth Israel, Charleston’s historic Orthodox synagogue. Download the application.",
    path: "/membership",
  },
  donate: {
    title: "Donate",
    description: "Make a donation or dues payment to Brith Sholom Beth Israel Synagogue in Charleston.",
    path: "/donate",
  },
  locations: {
    title: "Locations",
    description:
      "Downtown synagogue at 182 Rutledge Avenue and Shabbat services at the Minyan House, 8 Lord Ashley Drive.",
    path: "/locations",
  },
  remembrance: {
    title: "Remembrance Wall",
    description:
      "Dedicate a plaque on the Baker-Bebergal-Karesh Holocaust Remembrance Wall, including the Joe Engel exhibit.",
    path: "/remembrance",
  },
  privacy: {
    title: "Privacy",
    description: "How Brith Sholom Beth Israel handles visitor information on this website.",
    path: "/privacy",
  },
} as const;
