import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GateRail } from "@/components/gate-rail";
import { SocialLinks } from "@/components/social-links";
import { StarOfDavid } from "@/components/star-of-david";
import { footerGroups, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative overflow-hidden text-[#e8dcc6]">
      <div className="relative z-10 wrap grid min-w-0 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8 lg:py-16">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex flex-col items-start gap-2 text-gold">
            <StarOfDavid className="size-9" />
            <span className="chrome-label text-sm uppercase tracking-[0.22em]">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#e8dcc6]/75">
            A community rooted in tradition, committed to tomorrow.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.heading} className="min-w-0">
            <p className="chrome-label text-xs uppercase tracking-[0.2em] text-gold">{group.heading}</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link className="text-[#e8dcc6]/80 hover:text-[#e8dcc6]" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="min-w-0">
          <p className="chrome-label text-xs uppercase tracking-[0.2em] text-gold">Stay connected</p>
          <p className="mt-4 text-sm leading-relaxed text-[#e8dcc6]/75">
            Call the office or follow the congregation.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-between gap-2 border border-[#e8dcc6]/25 px-3 text-sm text-[#e8dcc6]"
          >
            {site.email}
            <ArrowRight className="size-4 shrink-0 text-gold" aria-hidden />
          </a>
          <div className="mt-5">
            <SocialLinks onDark />
          </div>
        </div>
      </div>

      <div className="relative z-10 px-[var(--page-pad)] pb-3 pt-2 text-center text-xs tracking-wide text-[#e8dcc6]/70">
        © {year} {site.legalName}. All rights reserved.{" "}
        <Link className="hover:text-[#e8dcc6]" href="/privacy">
          Privacy Policy
        </Link>
      </div>

      <GateRail variant="footer" />
    </footer>
  );
}
