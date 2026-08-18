import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.contact.title, pages.contact.description, pages.contact.path);

export default function ContactPage() {
  return (
    <>
      <PageHero title="Synagogue Office" lede="Call, email, or visit. The office number is the fastest way to reach us." />
      <div className="wrap-narrow section flex flex-col gap-12">
        <div>
          <p className="kicker">Synagogue office</p>
          <a href={site.phoneHref} className="display mt-3 block text-4xl tabular-nums text-charleston">
            {site.phoneDisplay}
          </a>
          <p className="mt-4 text-base">
            <a className="text-link break-all" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-3 text-base">
            <a className="text-link" href={site.locations.downtown.googleMaps}>
              {site.locations.downtown.fullAddress}
            </a>
          </p>
        </div>
        <section className="border-t border-line pt-10">
          <h2 className="display text-2xl">Staff</h2>
          <ul className="mt-6 flex flex-col gap-5 text-base">
            <li>
              {site.staff.rabbi.name}, {site.staff.rabbi.title}
              <br />
              <a className="text-link break-all" href={`mailto:${site.staff.rabbi.email}`}>
                {site.staff.rabbi.email}
              </a>
            </li>
            <li>
              {site.staff.director.name}, {site.staff.director.title}
              <br />
              <a className="text-link break-all" href={`mailto:${site.staff.director.email}`}>
                {site.staff.director.email}
              </a>
            </li>
            <li>
              {site.staff.rebbetzin.name} — Mikvah appointments
              <br />
              <a className="text-link" href={site.staff.rebbetzin.phoneHref}>
                {site.staff.rebbetzin.phone}
              </a>
              <span aria-hidden> · </span>
              <a className="text-link break-all" href={`mailto:${site.staff.rebbetzin.email}`}>
                {site.staff.rebbetzin.email}
              </a>
            </li>
            <li>
              President:{" "}
              <a className="text-link break-all" href={`mailto:${site.presidentEmail}`}>
                {site.presidentEmail}
              </a>
            </li>
          </ul>
          <p className="mt-8">
            <ActionLink href={site.locations.downtown.googleMaps} variant="ghost">
              Open in Maps
            </ActionLink>
          </p>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </section>
      </div>
    </>
  );
}
