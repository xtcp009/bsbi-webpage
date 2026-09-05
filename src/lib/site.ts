export const site = {
  name: "BSBI Synagogue",
  legalName: "Brith Sholom Beth Israel Congregation",
  shortName: "BSBI",
  tagline: "A historic Orthodox synagogue in Charleston, South Carolina, serving the Jewish community since 1854.",
  description:
    "A historic Orthodox synagogue in Charleston, South Carolina, serving the Jewish community since 1854. Our doors are open to the entire Jewish community.",
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
  donateUrl: process.env.NEXT_PUBLIC_DONATE_URL || "https://www.bsbisynagogue.org/login.php?url=https://www.bsbisynagogue.org/",
  membershipApplicationUrl:
    "https://images.shulcloud.com/1505/uploads/Files/Membership-and-Dues/BSBImembershipapplication.png",
  /**
   * Production DNS still points www to ShulCloud. The Vercel app is a parallel frontend
   * and must keep reading live public data from this origin — never assume a cutover.
   */
  shulcloudOrigin: "https://bsbisynagogue.shulcloud.com",
  shulcloudPublicUrl: "https://www.bsbisynagogue.org",
  memberLoginUrl: "https://www.bsbisynagogue.org/login.php?url=https://www.bsbisynagogue.org/",
  facebook: "https://www.facebook.com/BSBISynagogue/",
  socials: {
    facebook: "https://www.facebook.com/BSBISynagogue/",
    facebookPhotos: "https://www.facebook.com/BSBISynagogue/photos",
    instagram: "https://www.instagram.com/bsbichs/",
    x: "https://x.com/bsbisynagogue",
  },
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
  { href: "/times", label: "Services", short: "Services" },
  { href: "/visit", label: "Visit Charleston", short: "Visit" },
  { href: "/gallery", label: "Photo Gallery", short: "Gallery" },
  { href: "/about", label: "About", short: "About" },
  { href: "/contact", label: "Contact", short: "Contact" },
  { href: site.memberLoginUrl, label: "Login", short: "Login", external: true },
] as const;

export const headerLeft = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/times", label: "Services" },
] as const;

export const headerRight = [
  { href: "/visit", label: "Visit" },
  { href: "/calendar", label: "Events" },
  { href: "/donate", label: "Giving" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerGroups = [
  {
    heading: "About",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/locations", label: "Locations" },
      { href: "/gallery", label: "Photo gallery" },
      { href: "/remembrance", label: "Remembrance" },
    ],
  },
  {
    heading: "Prayer",
    links: [
      { href: "/times", label: "Minyan times" },
      { href: "/calendar", label: "Calendar" },
      { href: "/eruv", label: "Eruv" },
      { href: "/mikvah", label: "Mikvah" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { href: "/visit", label: "Visit Charleston" },
      { href: "/kosher", label: "Kosher" },
      { href: "/hotels", label: "Hotels" },
      { href: "/community", label: "Community" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { href: "/membership", label: "Membership" },
      { href: "/donate", label: "Donate" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export const sitePages = [
  { href: "/", label: "Home", keywords: "bsbi synagogue charleston" },
  { href: "/times", label: "Services", keywords: "minyan times zmanim shabbat candle lighting" },
  { href: "/calendar", label: "Calendar", keywords: "events programs" },
  { href: "/visit", label: "Visit Charleston", keywords: "guest hospitality shabbat" },
  { href: "/locations", label: "Locations", keywords: "rutledge minyan house address directions" },
  { href: "/gallery", label: "Photo Gallery", keywords: "photos pictures" },
  { href: "/about", label: "About", keywords: "history story staff rabbi" },
  { href: "/contact", label: "Contact", keywords: "phone email office" },
  { href: "/eruv", label: "Eruv", keywords: "eruv map downtown windermere" },
  { href: "/mikvah", label: "Mikvah", keywords: "appointment" },
  { href: "/kosher", label: "Kosher", keywords: "food meals catering" },
  { href: "/hotels", label: "Hotels", keywords: "lodging stay" },
  { href: "/community", label: "Community", keywords: "classes sisterhood brotherhood" },
  { href: "/membership", label: "Membership", keywords: "join dues" },
  { href: "/remembrance", label: "Remembrance", keywords: "holocaust plaque memorial" },
  { href: "/donate", label: "Donate", keywords: "giving donation" },
] as const;
