import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charleston text-cream">
      <div className="wrap grid gap-10 py-12 md:grid-cols-3 md:gap-12 md:py-16">
        <div>
          <p className="display text-2xl">{site.legalName}</p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-cream/70">{site.tagline}</p>
          <nav aria-label="Social" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-base">
            <a className="text-link text-cream/85" href={site.socials.facebook}>
              Facebook
            </a>
            <a className="text-link text-cream/85" href={site.socials.instagram}>
              Instagram
            </a>
            <a className="text-link text-cream/85" href={site.socials.x}>
              X
            </a>
          </nav>
        </div>
        <div>
          <p className="text-base text-cream/70">Find us</p>
          <address className="mt-3 not-italic text-base leading-relaxed text-cream/90">
            {site.locations.downtown.fullAddress}
            <br />
            <a className="text-link" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <br />
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>
          <p className="mt-4 text-base text-cream/70">
            Friday night and Saturday also at the Minyan House, {site.locations.minyanHouse.address}.
          </p>
        </div>
        <div>
          <p className="text-base text-cream/70">On this site</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-base">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link className="text-cream/80 hover:text-cream" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-[var(--page-pad)] py-5 text-center text-sm text-cream/55">
        © {new Date().getFullYear()} {site.legalName}. Building photographs via Wikimedia Commons and the Library of
        Congress Historic American Buildings Survey.
      </div>
    </footer>
  );
}
