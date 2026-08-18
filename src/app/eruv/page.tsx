import type { Metadata } from "next";
import { EruvBanner } from "@/components/eruv-banner";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import { SourceNote } from "@/components/source-note";
import { copy } from "@/content/copy";
import { getShulcloudSnapshot } from "@/lib/shulcloud";
import { pageMeta, pages } from "@/lib/seo";

export const metadata: Metadata = pageMeta(pages.eruv.title, pages.eruv.description, pages.eruv.path);

export const revalidate = 120;

export default async function EruvPage() {
  const live = await getShulcloudSnapshot();

  return (
    <>
      <PageHero title="Eruv" lede={copy.eruvRabbi} />
      <PageShell>
        <div className="flex flex-col gap-10">
          <EruvBanner live={live.eruv} />
          <SourceNote ok={live.ok} fetchedAt={live.fetchedAt} sourceUrl={live.sourceUrl} next="/eruv" />
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
