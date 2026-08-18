import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { pageMeta, pages } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(pages.privacy.title, pages.privacy.description, pages.privacy.path);

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
          Questions:{" "}
          <a className="text-link" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>{" "}
          or{" "}
          <a className="text-link break-all" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    </>
  );
}
