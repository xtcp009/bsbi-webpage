import Image from "next/image";
import Link from "next/link";
import { GateOrnament } from "@/components/decorative/gate-ornament";
import { SocialLinks } from "@/components/social-links";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative overflow-x-clip text-ink">
      <GateOrnament variant="footer" />

      <div className="chrome-copy relative z-10 wrap grid min-w-0 gap-10 pb-10 pt-14 md:grid-cols-3 md:gap-12 md:pb-12 md:pt-16">
        <div className="min-w-0">
          <Link href="/" className="inline-flex items-center" aria-label={`${site.name} home`}>
            <Image
              src="/images/logo-ink.png"
              alt="BSBI Synagogue"
              width={280}
              height={123}
              className="h-5 w-auto max-w-[5.25rem] object-contain object-left lg:h-6 lg:max-w-[6rem]"
            />
          </Link>
          <Link href="/" className="mt-4 block display text-xl text-ink sm:text-2xl">
            {site.legalName}
          </Link>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">{site.tagline}</p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-base text-muted">Find us</p>
          <address className="mt-3 not-italic text-base leading-relaxed text-ink">
            <a className="text-ink underline-offset-2 hover:underline" href={site.locations.downtown.googleMaps}>
              {site.locations.downtown.fullAddress}
            </a>
            <br />
            <a className="text-ink underline-offset-2 hover:underline" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <br />
            <a className="text-ink underline-offset-2 hover:underline break-all" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>
          <p className="mt-4 text-base text-muted">
            Friday night and Saturday also at the Minyan House,{" "}
            <a className="text-ink underline-offset-2 hover:underline" href={site.locations.minyanHouse.googleMaps}>
              {site.locations.minyanHouse.address}
            </a>
            .
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-base text-muted">On this site</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-base">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link className="text-ink/80 hover:text-gold" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="chrome-copy relative z-10 px-[var(--page-pad)] py-5 text-center text-sm text-muted">
        © {year} {site.legalName}. All rights reserved.{" "}
        <Link className="text-ink hover:text-gold" href="/privacy">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
