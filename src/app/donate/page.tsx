import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import { copy, donateFunds } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online Payments",
  description: copy.donateMember,
  alternates: { canonical: `${site.url}/donate` },
};

export default function DonatePage() {
  return (
    <>
      <PageHero title="Online Payments" lede={copy.donateMember} />
      <div className="wrap-narrow section flex flex-col gap-10">
        {site.donateUrl ? (
          <ActionLink href={site.donateUrl}>Give online</ActionLink>
        ) : (
          <ActionLink href={site.phoneHref}>Call {site.phoneDisplay}</ActionLink>
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
