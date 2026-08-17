import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How BSBI handles contact form submissions and visitor information.",
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Privacy"
        title="What we collect, and what we don't"
        lede="This public site is built for visitors looking for a minyan. We do not need an account to show prayer times."
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-8 text-sm leading-relaxed sm:px-6">
        <p>
          The contact form asks only for a name, email, optional phone, a topic, and a message. Submissions are sanitized (HTML and script-like content stripped), length-limited, and rate-limited. A hidden honeypot field discards obvious bots.
        </p>
        <p>
          If a delivery webhook is configured, the sanitized message is forwarded to the synagogue office. We do not sell this information. Do not send credit-card numbers or medical details through the form.
        </p>
        <p>
          This site uses no advertising cookies. Server logs may include IP addresses for security and abuse prevention.
        </p>
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
