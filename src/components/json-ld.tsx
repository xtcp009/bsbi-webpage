import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    name: site.legalName,
    alternateName: ["BSBI", "BSBI Synagogue", "Brith Sholom Beth Israel"],
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/exterior-facade.jpg`,
    description: site.description,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.locations.downtown.address,
      addressLocality: site.locations.downtown.city,
      addressRegion: site.locations.downtown.state,
      postalCode: site.locations.downtown.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.latitude,
      longitude: site.coordinates.longitude,
    },
    hasMap: site.locations.downtown.googleMaps,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      description: "Daily morning and evening services. See prayer times on the website.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
