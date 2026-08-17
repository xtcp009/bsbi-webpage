import Link from "next/link";
import { ActionLink } from "@/components/page-hero";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-2xl sm:text-3xl">Page not found</h1>
      <p className="mt-4 text-muted">
        The address may have moved. Services, directions, and the office number are one tap away.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <ActionLink href="/times">Services</ActionLink>
        <ActionLink href="/" variant="ghost">
          Home
        </ActionLink>
        <ActionLink href={site.phoneHref} variant="secondary">
          Call {site.phoneDisplay}
        </ActionLink>
      </div>
      <p className="mt-8 text-sm text-muted">
        Looking for the calendar or payment page? Try{" "}
        <Link href="/calendar" className="underline underline-offset-4">
          Calendar
        </Link>{" "}
        or{" "}
        <Link href="/donate" className="underline underline-offset-4">
          Donate
        </Link>
        .
      </p>
    </div>
  );
}
