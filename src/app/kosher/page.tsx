import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
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
      <PageHero title="Kosher in Charleston" lede={copy.chefLinda} />
      <div className="wrap-narrow section">
        <p className="text-base text-muted">{copy.chefLindaContact}</p>
        <div className="mt-8">
          {kosherPlaces.map((place) => (
            <article key={place.name} className="border-t border-line py-6">
              <h2 className="display text-xl">{place.name}</h2>
              <p className="mt-1 text-base text-muted">{place.where}</p>
              <p className="mt-2 text-base leading-relaxed text-muted">{place.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8">
          <ActionLink href="/visit" variant="ghost">
            Visit Charleston
          </ActionLink>
        </p>
      </div>
    </>
  );
}
