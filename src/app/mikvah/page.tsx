import type { Metadata } from "next";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mikvah",
  description: copy.mikvahLead,
  alternates: { canonical: `${site.url}/mikvah` },
};

export default function MikvahPage() {
  return (
    <>
      <PageHero title="Mikvah" lede={copy.mikvahLead} />
      <PageShell>
        <div className="flex flex-col gap-6">
          <section className="panel panel-gold p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Appointments</h2>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <ActionLink href={site.staff.rebbetzin.phoneHref}>804.767.0117</ActionLink>
              <ActionLink href={`mailto:${site.staff.rebbetzin.email}`} variant="ghost">
                {site.staff.rebbetzin.email}
              </ActionLink>
            </div>
          </section>
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">Dish Mikvah</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{copy.mikvahDishes}</p>
          </section>
          <section>
            <p className="text-sm leading-relaxed text-muted">{copy.mikvahQuestions}</p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
