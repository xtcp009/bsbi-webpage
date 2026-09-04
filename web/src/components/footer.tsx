import Image from "next/image";
import Link from "next/link";
import { FooterSearch } from "@/components/footer-search";
import { SocialLinks } from "@/components/social-links";
import { getSiteContent } from "@/lib/cms";
import { site } from "@/lib/site";

const extraPages = [
  { href: "/times", label: "Services" },
  { href: "/calendar", label: "Calendar" },
  { href: "/visit", label: "Visit" },
  { href: "/eruv", label: "Eruv" },
  { href: "/mikvah", label: "Mikvah" },
  { href: "/kosher", label: "Kosher" },
  { href: "/membership", label: "Membership" },
  { href: "/donate", label: "Donate" },
] as const;

export async function Footer() {
  const year = new Date().getFullYear();
  const downtown = site.locations.downtown;
  const content = await getSiteContent();

  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div className="wrap grid gap-10 py-10 md:grid-cols-2 md:items-start md:gap-16 md:py-12">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center" aria-label={`${site.name} home`}>
              <Image
                src="/images/logo-ink.png"
                alt="BSBI Synagogue"
                width={280}
                height={123}
                className="h-7 w-auto max-w-[7.5rem] object-contain object-left lg:h-8 lg:max-w-[8.5rem]"
              />
            </Link>
            <p className="display mt-5 text-2xl text-charleston">{site.legalName}</p>
            <p className="mt-2 text-sm text-muted">
              Established {site.founded} · Charleston, South Carolina
            </p>
            <address className="mt-5 not-italic text-base leading-relaxed text-ink">
              <a className="underline-offset-4 hover:text-gold hover:underline" href={downtown.googleMaps}>
                {downtown.fullAddress}
              </a>
              <br />
              <a className="underline-offset-4 hover:text-gold hover:underline" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
              <br />
              <a className="break-all underline-offset-4 hover:text-gold hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </address>
            <div className="mt-6">
              <SocialLinks compact />
            </div>
          </div>

          <div className="min-w-0">
            <p className="display text-xl text-charleston">Search</p>
            <FooterSearch content={content} />
            <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2 text-base sm:grid-cols-4">
              {extraPages.map((item) => (
                <li key={item.href}>
                  <Link className="text-ink/80 underline-offset-4 hover:text-charleston hover:underline" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="wrap py-4 text-sm text-muted">
            <p>
              © {year} {site.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
