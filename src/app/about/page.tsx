import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { PageHero } from "@/components/page-hero";
import ScrollFloat from "@/components/react-bits/scroll-float";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
import { ScaledImage } from "@/components/scaled-image";
import { getSiteContent, getStaffBios } from "@/lib/cms";
import { pageMeta, pages } from "@/lib/seo";

export const metadata: Metadata = pageMeta(pages.about.title, pages.about.description, pages.about.path);

export const revalidate = 30;

export default async function AboutPage() {
  const [{ copy }, staff] = await Promise.all([getSiteContent(), getStaffBios()]);

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
            <ScrollReveal tag="p" containerClassName="display text-2xl leading-snug text-charleston">
              {copy.rabbiClose}
            </ScrollReveal>
            <p className="text-sm text-muted">— Yosef Bart, Rabbi</p>
          </article>
          <div id="staff" className="border-t border-line pt-8">
            <ScrollFloat className="display text-2xl">Staff</ScrollFloat>
            <ul className="mt-6 flex flex-col gap-6 text-base">
              {staff.map((person) => (
                <li key={person._id}>
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-muted">{person.title}</p>
                  {person.phone && person.phoneHref ? (
                    <>
                      <a className="text-link" href={person.phoneHref}>
                        {person.phone}
                      </a>
                      {person.email ? <span aria-hidden> · </span> : null}
                    </>
                  ) : null}
                  {person.email ? (
                    <a className="text-link break-all" href={`mailto:${person.email}`}>
                      {person.email}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageShell>
    </>
  );
}
