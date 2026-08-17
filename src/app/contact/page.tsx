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
        kicker="Contact"
        title="Synagogue Office"
        lede={`${site.locations.downtown.fullAddress} · ${site.phoneDisplay}`}
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
        <a href={site.phoneHref} className="bg-teal px-5 py-6 text-cream">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Synagogue office</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{site.phoneDisplay}</p>
          <p className="mt-2 text-sm text-cream/80">Please call the shul.</p>
        </a>
        <div className="panel p-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl">Staff</h2>
          <ul className="mt-3 flex flex-col gap-3 text-sm">
            <li>
              {site.staff.rabbi.name}, {site.staff.rabbi.title}
              <br />
              <a className="text-teal underline underline-offset-4" href={`mailto:${site.staff.rabbi.email}`}>
                {site.staff.rabbi.email}
              </a>
            </li>
            <li>
              {site.staff.director.name}, {site.staff.director.title}
              <br />
              <a className="text-teal underline underline-offset-4" href={`mailto:${site.staff.director.email}`}>
                {site.staff.director.email}
              </a>
            </li>
            <li>
              {site.staff.rebbetzin.name} — Mikvah appointments
              <br />
              <a className="text-teal underline underline-offset-4" href={site.staff.rebbetzin.phoneHref}>
                {site.staff.rebbetzin.phone}
              </a>
            </li>
            <li>
              President:{" "}
              <a className="text-teal underline underline-offset-4" href={`mailto:${site.presidentEmail}`}>
                {site.presidentEmail}
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <ActionLink href={site.locations.downtown.googleMaps} variant="ghost">
              Open in Maps
            </ActionLink>
          </div>
        </div>
      </div>
    </>
  );
}
