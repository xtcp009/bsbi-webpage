export type CmsAnnouncement = {
  _id: string;
  title: string;
  body?: string;
  href?: string;
};

export type CmsPhoto = {
  _id: string;
  src: string;
  alt: string;
  caption: string;
};

export type CmsStaffBio = {
  _id: string;
  name: string;
  title: string;
  email?: string;
  phone?: string;
  phoneHref?: string;
};

export type CmsFlyer = {
  _id: string;
  title: string;
  image: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CmsWeeklyClass = {
  _id: string;
  title: string;
  teacher: string;
  when: string;
  where: string;
  image: string;
  alt: string;
  body: string;
};

export type CmsEvent = {
  _id: string;
  title: string;
  detail: string;
  when: string;
  href: string;
  startDate?: string;
};

export type CmsHomepage = {
  tagline?: string;
  welcome?: string;
};

export type CmsKosherPlace = {
  _key?: string;
  name?: string;
  where?: string;
  body?: string;
};

export type CmsHotel = {
  _key?: string;
  name?: string;
  addr?: string;
  dist?: string;
  phone?: string;
  note?: string;
  eruv?: string | boolean;
};

export type CmsMilestone = {
  _key?: string;
  year?: string;
  body?: string;
};

export type CmsSiteContent = {
  homepage?: {
    tagline?: string;
    welcome?: string;
    dailyServices?: string;
    doorsOpen?: string;
    milestones?: CmsMilestone[];
  } | null;
  about?: Record<string, string | undefined> | null;
  visit?: {
    visitLead?: string;
    visitBody?: string;
    visitorCenter?: string;
    visitCharm?: string;
    visitAmenities?: string[];
    visitHospitality?: string;
    shabbosHouse?: string;
    shabbosHouseDetails?: string;
    shabbosHouseReserve?: string;
  } | null;
  community?: Record<string, string | undefined> | null;
  mikvah?: Record<string, string | undefined> | null;
  eruv?: Record<string, string | undefined> | null;
  remembrance?: Record<string, string | undefined> | null;
  locations?: Record<string, string | undefined> | null;
  membership?: Record<string, string | undefined> | null;
  donate?: {
    donateMember?: string;
    donatePortalNote?: string;
    donateFunds?: string[];
  } | null;
  kosher?: {
    chefLinda?: string;
    chefLindaContact?: string;
    kosherPlaces?: CmsKosherPlace[];
  } | null;
  hotels?: {
    hotels?: CmsHotel[];
  } | null;
};
