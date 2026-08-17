import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
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
      <PageHero kicker="About Us" title="History" lede={copy.rabbiWelcome} />
      <PageShell>
        <div className="flex flex-col gap-8">
          <ScaledImage
            src="/images/hero-sketch.jpg"
            alt="Architectural drawing of BSBI"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center"
            frameClassName="aspect-[3/1] w-full border border-line"
          />
          <article className="flex flex-col gap-5 text-sm leading-relaxed sm:text-base">
            <p>{copy.rabbiBody}</p>
            <p>{copy.historyLead}</p>
            <p>{copy.facilities}</p>
            <p>{copy.history1956}</p>
            <p>{copy.rabbiToday}</p>
            <ScrollReveal
              containerClassName="max-w-2xl"
              textClassName="font-[family-name:var(--font-display)] text-xl leading-snug text-charleston"
            >
              {copy.rabbiClose}
            </ScrollReveal>
            <p className="text-sm text-muted">— Yosef Bart, Rabbi</p>
          </article>
          <FadeContent>
            <div id="staff" className="panel p-5">
              <h2 className="font-[family-name:var(--font-display)] text-2xl">Staff</h2>
              <ul className="mt-4 flex flex-col gap-4 text-sm">
                <li>
                  <p className="font-semibold">{site.staff.rabbi.name}</p>
                  <p className="text-muted">{site.staff.rabbi.title}</p>
                  <a className="text-teal underline underline-offset-4" href={`mailto:${site.staff.rabbi.email}`}>
                    {site.staff.rabbi.email}
                  </a>
                </li>
                <li>
                  <p className="font-semibold">{site.staff.director.name}</p>
                  <p className="text-muted">{site.staff.director.title}</p>
                  <a className="text-teal underline underline-offset-4" href={`mailto:${site.staff.director.email}`}>
                    {site.staff.director.email}
                  </a>
                </li>
                <li>
                  <p className="font-semibold">{site.staff.rebbetzin.name}</p>
                  <p className="text-muted">{site.staff.rebbetzin.title}</p>
                </li>
              </ul>
            </div>
          </FadeContent>
        </div>
      </PageShell>
    </>
  );
}
