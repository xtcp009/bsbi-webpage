import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import { getSiteContent } from "@/lib/cms";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.donate.title, pages.donate.description, pages.donate.path);

export const revalidate = 30;

export default async function DonatePage() {
  const { copy, donateFunds } = await getSiteContent();
  return (
    <>
      <PageHero title="Donate" lede={copy.donateMember} />
      <div className="wrap-narrow section flex flex-col gap-10">
        {site.donateUrl ? (
          <>
            <p className="border border-line bg-cream px-4 py-3 text-base text-charleston" role="status">
              {copy.donatePortalNote}
            </p>
            <ActionLink href={site.donateUrl}>Give online</ActionLink>
          </>
        ) : (
          <>
            <p className="border border-line px-4 py-3 text-base text-charleston" role="status">
              Online giving is not linked on this preview yet. Call the office to give, or use the current synagogue
              website.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <ActionLink href={site.phoneHref}>Call {site.phoneDisplay}</ActionLink>
              <ActionLink href={site.shulcloudPublicUrl} variant="ghost">
                Current website
              </ActionLink>
            </div>
          </>
        )}
        <section className="border-t border-line pt-8">
          <h2 className="display text-2xl">Funds</h2>
          <ul className="mt-4 flex flex-col gap-2 text-base leading-relaxed">
            {donateFunds.map((fund) => (
              <li key={fund}>{fund}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
