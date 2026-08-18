import type { Metadata } from "next";
import { EruvBanner } from "@/components/eruv-banner";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eruv",
  description: copy.eruvDowntown,
  alternates: { canonical: `${site.url}/eruv` },
};

export default function EruvPage() {
  return (
    <>
      <PageHero title="Eruv" lede={copy.eruvRabbi} />
      <PageShell>
        <div className="flex flex-col gap-10">
          <EruvBanner />
          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">Downtown Eruv</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.eruvDowntown}</p>
          </section>
          <section className="border-t border-line pt-10">
            <h2 className="display text-2xl">South Windermere Eruv</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.eruvWest}</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{copy.eruvPerimeter}</p>
          </section>
          <ActionLink href="/locations" variant="ghost">
            Locations
          </ActionLink>
        </div>
      </PageShell>
    </>
  );
}
