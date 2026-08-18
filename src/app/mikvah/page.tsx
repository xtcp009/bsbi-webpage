import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import { copy } from "@/content/copy";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.mikvah.title, pages.mikvah.description, pages.mikvah.path);

export default function MikvahPage() {
  return (
    <>
      <PageHero title="Mikvah" lede={copy.mikvahLead} />
      <PageShell>
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="display text-xl">Appointments</h2>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ActionLink href={site.staff.rebbetzin.phoneHref}>804.767.0117</ActionLink>
              <ActionLink href={`mailto:${site.staff.rebbetzin.email}`} variant="ghost">
                {site.staff.rebbetzin.email}
              </ActionLink>
            </div>
          </section>
          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">Dish Mikvah</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{copy.mikvahDishes}</p>
          </section>
          <section>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{copy.mikvahQuestions}</p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
