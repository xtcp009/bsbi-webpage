import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { PageHero } from "@/components/page-hero";
import { ScaledImage } from "@/components/scaled-image";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: copy.historyLead,
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="History" lede={copy.rabbiWelcome} />
      <PageShell>
        <div className="flex flex-col gap-10">
          <figure>
            <ScaledImage
              src="/images/exterior-facade.jpg"
              alt="Brith Sholom Beth Israel Synagogue on Rutledge Avenue"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="historic-image object-cover object-center"
              frameClassName="aspect-[16/9] w-full"
            />
            <figcaption className="museum-caption">182 Rutledge Avenue, Charleston</figcaption>
          </figure>
          <article className="flex flex-col gap-5 text-base leading-relaxed">
            <p>{copy.rabbiBody}</p>
            <p>{copy.historyLead}</p>
            <p>{copy.facilities}</p>
            <p>{copy.history1956}</p>
            <p>{copy.rabbiToday}</p>
            <p className="display text-2xl leading-snug text-charleston">{copy.rabbiClose}</p>
            <p className="text-sm text-muted">— Yosef Bart, Rabbi</p>
          </article>
          <div id="staff" className="border-t border-line pt-8">
            <h2 className="display text-2xl">Staff</h2>
            <ul className="mt-6 flex flex-col gap-6 text-base">
              <li>
                <p className="font-semibold">{site.staff.rabbi.name}</p>
                <p className="text-muted">{site.staff.rabbi.title}</p>
                <a className="text-link" href={`mailto:${site.staff.rabbi.email}`}>
                  {site.staff.rabbi.email}
                </a>
              </li>
              <li>
                <p className="font-semibold">{site.staff.director.name}</p>
                <p className="text-muted">{site.staff.director.title}</p>
                <a className="text-link" href={`mailto:${site.staff.director.email}`}>
                  {site.staff.director.email}
                </a>
              </li>
              <li>
                <p className="font-semibold">{site.staff.rebbetzin.name}</p>
                <p className="text-muted">{site.staff.rebbetzin.title}</p>
              </li>
            </ul>
          </div>
        </div>
      </PageShell>
    </>
  );
}
