import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charleston text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl">BSBI</p>
          <p className="mt-2 text-sm text-cream/70">{site.legalName}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
            {site.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Find us</p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-cream/80">
            {site.locations.downtown.fullAddress}
            <br />
            <a className="underline decoration-gold/40 underline-offset-4" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </address>
          <p className="mt-4 text-sm text-cream/70">
            Friday night and Saturday also at the Minyan House, {site.locations.minyanHouse.address}.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">On this site</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link className="text-cream/80 hover:text-gold" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-cream/55">
        © {new Date().getFullYear()} {site.legalName}. Building photos via Wikimedia Commons and the Library of Congress HABS.
      </div>
    </footer>
  );
}
