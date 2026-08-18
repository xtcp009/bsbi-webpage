import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-charleston text-cream">
      <div className="wrap grid min-w-0 gap-10 py-12 md:grid-cols-3 md:gap-12 md:py-16">
        <div className="min-w-0">
          <Link href="/" className="display text-2xl text-cream hover:text-cream">
            {site.legalName}
          </Link>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-cream/70">{site.tagline}</p>
          <div className="mt-6">
            <SocialLinks onDark />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-base text-cream/70">Find us</p>
          <address className="mt-3 not-italic text-base leading-relaxed text-cream/90">
            <a className="text-link" href={site.locations.downtown.googleMaps}>
              {site.locations.downtown.fullAddress}
            </a>
            <br />
            <a className="text-link" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <br />
            <a className="text-link break-all" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>
          <p className="mt-4 text-base text-cream/70">
            Friday night and Saturday also at the Minyan House,{" "}
            <a className="text-link" href={site.locations.minyanHouse.googleMaps}>
              {site.locations.minyanHouse.address}
            </a>
            .
          </p>
        </div>
        <div className="min-w-0">
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
        © {year} {site.legalName}. Building photographs via Wikimedia Commons and the Library of Congress Historic
        American Buildings Survey.
      </div>
    </footer>
  );
}
