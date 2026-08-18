import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import { ScaledImage } from "@/components/scaled-image";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description: copy.membershipLead,
  alternates: { canonical: `${site.url}/membership` },
};

export default function MembershipPage() {
  return (
    <>
      <PageHero title="Join BSBI" lede={copy.membershipLead} />
      <div className="wrap-narrow section flex flex-col gap-6">
        <p className="text-base leading-relaxed">{copy.membershipBody}</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ActionLink href={site.membershipApplicationUrl}>Membership Application</ActionLink>
          <ActionLink href={site.phoneHref} variant="ghost">
            Call {site.phoneDisplay}
          </ActionLink>
        </div>
        <a href={site.membershipApplicationUrl} className="mt-4 block" aria-label="Open the BSBI membership application">
          <ScaledImage
            src={site.membershipApplicationUrl}
            alt="BSBI membership application form"
            fill
            sizes="(max-width: 768px) 100vw, 42rem"
            className="object-contain object-top bg-cream"
            frameClassName="aspect-[8.5/11] w-full border border-line bg-cream"
          />
        </a>
        <p className="text-sm text-muted">
          Print the application and return it to the synagogue office at {site.locations.downtown.fullAddress}, or call
          us with questions.
        </p>
      </div>
    </>
  );
}
