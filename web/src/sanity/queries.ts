import { defineQuery } from "next-sanity";

export const SITE_CONTENT_QUERY = defineQuery(`
  {
    "homepage": *[_id == "homepage"][0]{
      tagline,
      welcome,
      dailyServices,
      doorsOpen,
      milestones[]{_key, year, body}
    },
    "about": *[_id == "aboutPage"][0]{
      rabbiWelcome,
      rabbiBody,
      historyLead,
      facilities,
      history1956,
      rabbiToday,
      rabbiClose
    },
    "visit": *[_id == "visitPage"][0]{
      visitLead,
      visitBody,
      visitorCenter,
      visitCharm,
      visitAmenities,
      visitHospitality,
      shabbosHouse,
      shabbosHouseDetails,
      shabbosHouseReserve
    },
    "community": *[_id == "communityPage"][0]{
      heroTitle,
      heroLede,
      flyersLede,
      classesLede,
      sisterhood,
      brotherhood,
      chevraKadisha,
      chevraContact,
      addlestone,
      preschool,
      rentalsSanctuary,
      rentalsHall
    },
    "mikvah": *[_id == "mikvahPage"][0]{
      mikvahLead,
      mikvahDishes,
      mikvahQuestions
    },
    "eruv": *[_id == "eruvPage"][0]{
      eruvRabbi,
      eruvDowntown,
      eruvWest,
      eruvPerimeter
    },
    "remembrance": *[_id == "remembrancePage"][0]{
      remembranceWall,
      remembranceTag,
      remembranceTitle,
      remembranceFund,
      remembranceBody,
      remembranceLegacy,
      remembranceNote,
      remembranceContact,
      remembranceWhen
    },
    "locations": *[_id == "locationsPage"][0]{
      downtownLocation,
      minyanHouse,
      cemeteryLead,
      cemeteryMaryville,
      cemeteryBethIsrael,
      cemeteryBrithSholom,
      cemeteryNote
    },
    "membership": *[_id == "membershipPage"][0]{
      membershipLead,
      membershipBody,
      membershipApplicationNote
    },
    "donate": *[_id == "donatePage"][0]{
      donateMember,
      donatePortalNote,
      donateFunds
    },
    "kosher": *[_id == "kosherPage"][0]{
      chefLinda,
      chefLindaContact,
      kosherPlaces[]{_key, name, where, body}
    },
    "hotels": *[_id == "hotelsPage"][0]{
      hotels[]{_key, name, addr, dist, phone, note, eruv}
    }
  }
`);

export const ANNOUNCEMENTS_QUERY = defineQuery(`
  *[_type == "announcement" && published != false
    && (!defined(startsAt) || startsAt <= now())
    && (!defined(endsAt) || endsAt >= now())
  ] | order(startsAt desc, _updatedAt desc)[0...6]{
    _id,
    title,
    body,
    href
  }
`);

export const PHOTOS_QUERY = defineQuery(`
  *[_type == "photo" && defined(image.asset)] | order(order asc, title asc){
    _id,
    category,
    caption,
    "alt": coalesce(image.alt, title, caption, "Synagogue photograph"),
    "src": image.asset->url
  }
`);

export const STAFF_QUERY = defineQuery(`
  *[_type == "staffBio"] | order(order asc, name asc){
    _id,
    name,
    title,
    email,
    phone
  }
`);

export const FLYERS_QUERY = defineQuery(`
  *[_type == "flyer" && status != "hidden"
    && defined(image.asset)
    && (!defined(endsAt) || endsAt >= now())
  ] | order(_createdAt desc){
    _id,
    title,
    "alt": coalesce(title, "Event flyer"),
    "image": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height
  }
`);

export const WEEKLY_CLASSES_QUERY = defineQuery(`
  *[_type == "weeklyClass"] | order(order asc, title asc){
    _id,
    title,
    "teacher": coalesce(teacher, ""),
    when,
    "where": coalesce(where, ""),
    "body": coalesce(body, ""),
    "alt": coalesce(image.alt, title, "Class flyer"),
    "image": image.asset->url
  }
`);

export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(startDate asc, title asc){
    _id,
    title,
    "detail": coalesce(detail, ""),
    when,
    "href": coalesce(href, "/calendar"),
    startDate
  }
`);
