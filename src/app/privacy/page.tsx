import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How BSBI handles visitor information.",
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Privacy"
        title="What we collect, and what we don't"
        lede="This public site is built for visitors looking for a minyan. We do not need an account to show service times."
      />
      <div className="wrap-narrow section flex flex-col gap-4 text-base leading-relaxed">
        <p>
          This site uses no advertising cookies. Server logs may include IP addresses for security and abuse prevention.
        </p>
        <p>We do not sell visitor information.</p>
        <p>
          Member billing still uses the congregation&apos;s existing payment portal. That portal has its own terms.
        </p>
        <p>
          Questions: {site.phoneDisplay} or {site.email}.
        </p>
      </div>
    </>
  );
}
