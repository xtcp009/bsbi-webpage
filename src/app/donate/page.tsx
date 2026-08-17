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
      <PageHero kicker="Donate" title="Online Payments" lede={copy.donateMember} />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
        {site.donateUrl ? (
          <ActionLink href={site.donateUrl}>Give online</ActionLink>
        ) : (
          <ActionLink href={site.phoneHref}>Call {site.phoneDisplay}</ActionLink>
        )}
        <section className="panel panel-gold p-5">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Funds</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed">
            {donateFunds.map((fund) => (
              <li key={fund}>{fund}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
