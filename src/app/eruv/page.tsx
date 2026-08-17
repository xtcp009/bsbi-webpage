import type { Metadata } from "next";
import { EruvBanner } from "@/components/eruv-banner";
import { PageShell } from "@/components/more-info";
import { ActionLink, PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
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
        <div className="flex flex-col gap-6">
          <EruvBanner />
          <FadeContent>
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl">Downtown Eruv</h2>
              <p className="mt-3 text-sm leading-relaxed">{copy.eruvDowntown}</p>
            </section>
          </FadeContent>
          <FadeContent delay={0.08}>
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl">South Windermere Eruv</h2>
              <p className="mt-3 text-sm leading-relaxed">{copy.eruvWest}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{copy.eruvPerimeter}</p>
            </section>
          </FadeContent>
          <ActionLink href="/locations">Locations</ActionLink>
        </div>
      </PageShell>
    </>
  );
}
