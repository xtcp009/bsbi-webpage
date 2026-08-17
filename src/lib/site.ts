export const site = {
  name: "BSBI Synagogue",
  legalName: "Brith Sholom Beth Israel Congregation",
  shortName: "BSBI",
  tagline:
    "We are Charleston's largest orthodox synagogue and the oldest in continuous-use Orthodox Ashkenazi congregation in the country.",
  description:
    "We are Charleston's largest orthodox synagogue and the oldest in continuous-use Orthodox Ashkenazi congregation in the country. Our doors are open to the entire Jewish community.",
  url: "https://www.bsbisynagogue.org",
  locale: "en_US",
  timezone: "America/New_York",
  founded: 1854,
  phone: "843-577-6599",
  phoneHref: "tel:+18435776599",
  phoneDisplay: "(843) 577-6599",
  email: "Mary@BSBISynagogue.org",
  rabbiEmail: "rabbi@bsbisynagogue.org",
  directorEmail: "Mary@BSBISynagogue.org",
  presidentEmail: "president@bsbisynagogue.org",
  donateUrl: process.env.NEXT_PUBLIC_DONATE_URL || "",
  facebook: "https://www.facebook.com/bsbisynagogue",
  coordinates: {
    latitude: 32.7883,
    longitude: -79.9428,
  },
  locations: {
    downtown: {
      name: "Downtown Synagogue",
      role: "Services every morning and evening, Mikvah, kosher kitchens, and the Solomon Social Hall",
      address: "182 Rutledge Avenue",
      city: "Charleston",
      state: "SC",
      zip: "29403",
      fullAddress: "182 Rutledge Avenue, Charleston, SC 29403",
      mapsQuery: "182+Rutledge+Avenue,+Charleston,+SC+29403",
      appleMaps: "https://maps.apple.com/?q=182+Rutledge+Avenue+Charleston+SC+29403",
      googleMaps:
        "https://www.google.com/maps/dir/?api=1&destination=182+Rutledge+Avenue,+Charleston,+SC+29403",
      embed:
        "https://maps.google.com/maps?q=182%20Rutledge%20Avenue%2C%20Charleston%2C%20SC%2029403&z=16&output=embed",
    },
    minyanHouse: {
      name: "Minyan House",
      role: "Shabbat and Festival services in the South Windermere neighborhood",
      address: "8 Lord Ashley Drive",
      city: "Charleston",
      state: "SC",
      zip: "29407",
      fullAddress: "8 Lord Ashley Drive, Charleston, SC 29407",
      mapsQuery: "8+Lord+Ashley+Drive,+Charleston,+SC+29407",
      appleMaps: "https://maps.apple.com/?q=8+Lord+Ashley+Drive+Charleston+SC+29407",
      googleMaps:
        "https://www.google.com/maps/dir/?api=1&destination=8+Lord+Ashley+Drive,+Charleston,+SC+29407",
      embed:
        "https://maps.google.com/maps?q=8%20Lord%20Ashley%20Drive%2C%20Charleston%2C%20SC%2029407&z=16&output=embed",
    },
  },
  staff: {
    rabbi: {
      name: "Rabbi Yosef Bart",
      title: "Rabbi",
      email: "rabbi@bsbisynagogue.org",
    },
    rebbetzin: {
      name: "Rebbetzin Rivka Bart",
      title: "Rebbetzin · Mikvah appointments",
      phone: "804-767-0117",
      phoneHref: "tel:+18047670117",
      email: "rivkaabart@gmail.com",
    },
    director: {
      name: "Mary Campbell",
      title: "Executive Director",
      phone: "(843) 577-6599 ext. 2",
      phoneHref: "tel:+18435776599",
      email: "Mary@BSBISynagogue.org",
    },
  },
  hebrewWelcome: "מה טבו אהליך יעקב משכנתיך ישראל",
  hebrewWelcomeTranslit: "Mah tovu ohalecha Yaakov, mishkenotecha Yisrael",
  hebrewWelcomeEnglish:
    "How goodly are your tents, O Jacob, your dwelling places, O Israel.",
} as const;

export const nav = [
  { href: "/times", label: "Services" },
  { href: "/visit", label: "Visit Charleston" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  { href: "/times", label: "Services" },
  { href: "/calendar", label: "Calendar" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/remembrance", label: "Remembrance Wall" },
  { href: "/eruv", label: "Eruv" },
  { href: "/mikvah", label: "Mikvah" },
  { href: "/hotels", label: "Hotels" },
  { href: "/locations", label: "Locations" },
  { href: "/kosher", label: "Kosher" },
  { href: "/community", label: "Sisterhood" },
  { href: "/donate", label: "Donate" },
  { href: "/privacy", label: "Privacy" },
] as const;
