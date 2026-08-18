import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "@/components/page-hero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta("Page not found", "This page is not on the BSBI website.", "/");

export default function NotFound() {
  return (
    <div className="wrap-narrow flex min-h-[70vh] flex-col justify-center py-16">
      <p className="kicker">404</p>
      <h1 className="display mt-3 text-3xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-muted">
        The address may have moved. Services, directions, and the office number are one tap away.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <ActionLink href="/times">Services</ActionLink>
        <ActionLink href="/" variant="ghost">
          Home
        </ActionLink>
        <ActionLink href={site.phoneHref} variant="ghost">
          Call {site.phoneDisplay}
        </ActionLink>
      </div>
      <p className="mt-8 text-sm text-muted">
        Looking for the calendar or payment page? Try{" "}
        <Link href="/calendar" className="text-link">
          Calendar
        </Link>{" "}
        or{" "}
        <Link href="/donate" className="text-link">
          Donate
        </Link>
        .
      </p>
    </div>
  );
}
