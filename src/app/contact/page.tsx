import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call Brith Sholom Beth Israel. Synagogue office ${site.phoneDisplay}.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Synagogue Office"
        lede={`${site.locations.downtown.fullAddress} · ${site.phoneDisplay}`}
      />
      <div className="wrap-narrow section flex flex-col gap-12">
        <a href={site.phoneHref} className="block">
          <p className="kicker">Synagogue office</p>
          <p className="display mt-3 text-4xl tabular-nums text-charleston">{site.phoneDisplay}</p>
          <p className="mt-3 text-base text-muted">Please call the shul.</p>
        </a>
        <section className="border-t border-line pt-10">
          <h2 className="display text-2xl">Staff</h2>
          <ul className="mt-6 flex flex-col gap-5 text-base">
            <li>
              {site.staff.rabbi.name}, {site.staff.rabbi.title}
              <br />
              <a className="text-link" href={`mailto:${site.staff.rabbi.email}`}>
                {site.staff.rabbi.email}
              </a>
            </li>
            <li>
              {site.staff.director.name}, {site.staff.director.title}
              <br />
              <a className="text-link" href={`mailto:${site.staff.director.email}`}>
                {site.staff.director.email}
              </a>
            </li>
            <li>
              {site.staff.rebbetzin.name} — Mikvah appointments
              <br />
              <a className="text-link" href={site.staff.rebbetzin.phoneHref}>
                {site.staff.rebbetzin.phone}
              </a>
            </li>
            <li>
              President:{" "}
              <a className="text-link" href={`mailto:${site.presidentEmail}`}>
                {site.presidentEmail}
              </a>
            </li>
          </ul>
          <p className="mt-8">
            <ActionLink href={site.locations.downtown.googleMaps} variant="ghost">
              Open in Maps
            </ActionLink>
          </p>
          <nav aria-label="Social" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-base">
            <a className="text-link" href={site.socials.facebook}>
              Facebook
            </a>
            <a className="text-link" href={site.socials.instagram}>
              Instagram
            </a>
            <a className="text-link" href={site.socials.x}>
              X
            </a>
          </nav>
        </section>
      </div>
    </>
  );
}
