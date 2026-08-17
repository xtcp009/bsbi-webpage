import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import { copy, kosherPlaces } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kosher",
  description: copy.chefLinda,
  alternates: { canonical: `${site.url}/kosher` },
};

export default function KosherPage() {
  return (
    <>
      <PageHero kicker="Kosher" title="Kosher in Charleston" lede={copy.chefLinda} />
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-8 sm:px-6">
        <p className="text-sm text-muted">{copy.chefLindaContact}</p>
        {kosherPlaces.map((place, index) => (
          <FadeContent key={place.name} delay={index * 0.05}>
            <article className="panel p-5">
              <h2 className="font-[family-name:var(--font-display)] text-xl">{place.name}</h2>
              <p className="mt-1 text-sm font-medium text-teal">{place.where}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{place.body}</p>
            </article>
          </FadeContent>
        ))}
        <ActionLink href="/visit">Visit Charleston</ActionLink>
      </div>
    </>
  );
}
