import type { Metadata } from "next";
import { ActionLink, PageHero } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
import { ScaledImage } from "@/components/scaled-image";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Remembrance Wall",
  description: `${copy.remembranceTitle}. ${copy.remembranceTag} ${copy.remembranceNote}`,
  alternates: { canonical: `${site.url}/remembrance` },
};

export default function RemembrancePage() {
  return (
    <>
      <PageHero kicker={copy.remembranceFund} title={copy.remembranceTitle} lede={copy.remembranceTag} />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6">
        <div className="grid grid-cols-3 gap-px border border-line bg-line">
          <ScaledImage
            src="/images/habs-gate.jpg"
            alt="Historic iron gate of Brith Sholom Beth Israel"
            fill
            sizes="33vw"
            className="object-cover object-center sepia"
            frameClassName="aspect-[3/4] w-full"
          />
          <ScaledImage
            src="/images/habs-2.jpg"
            alt="Historic photograph of BSBI"
            fill
            sizes="33vw"
            className="object-cover object-center sepia"
            frameClassName="aspect-[3/4] w-full"
          />
          <ScaledImage
            src="/images/habs-3.jpg"
            alt="Historic photograph of BSBI"
            fill
            sizes="33vw"
            className="object-cover object-center sepia"
            frameClassName="aspect-[3/4] w-full"
          />
        </div>
        <p className="text-sm tracking-wide text-muted">{copy.remembranceWhen}</p>
        <ScrollReveal
          containerClassName=""
          textClassName="font-[family-name:var(--font-display)] text-xl leading-snug text-charleston"
        >
          {copy.remembranceNote}
        </ScrollReveal>
        <FadeContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/donate">{copy.remembranceFund}</ActionLink>
          </div>
        </FadeContent>
      </div>
    </>
  );
}
