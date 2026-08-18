import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import { copy, kosherPlaces } from "@/content/copy";
import { pageMeta, pages } from "@/lib/seo";

export const metadata: Metadata = pageMeta(pages.kosher.title, pages.kosher.description, pages.kosher.path);

export default function KosherPage() {
  return (
    <>
      <PageHero title="Kosher in Charleston" lede={copy.chefLinda} />
      <div className="wrap-narrow section">
        <p className="text-base text-muted">
          For more information, call{" "}
          <a className="text-link" href="tel:+18438189227">
            (843) 818-9227
          </a>{" "}
          · Chef Linda Lieberman
        </p>
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
