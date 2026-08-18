"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { GateRail } from "@/components/gate-rail";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-chrome relative z-50 overflow-hidden border-b border-line bg-parchment text-ink">
      <GateRail variant="header" />
      <div className="relative z-10 wrap flex min-h-[clamp(4.75rem,11vw,7.5rem)] items-center gap-3 py-4 lg:gap-5 lg:py-5">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-ink.png"
            alt="BSBI Synagogue"
            width={280}
            height={123}
            className="h-3.5 w-auto max-w-[3.75rem] object-contain object-left lg:h-4 lg:max-w-[4.25rem]"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-2.5 py-1.5 text-base xl:px-3.5 xl:text-lg ${
                  active ? "is-active text-ink" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-50 ml-auto flex shrink-0 items-center gap-2">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-10 items-center gap-2 border border-line px-2.5 py-1.5 text-sm text-ink sm:min-h-11 sm:px-3"
          >
            <Phone className="pointer-events-none size-4" aria-hidden />
            <span className="hidden lg:inline">{site.phoneDisplay}</span>
            <span className="lg:hidden">Call</span>
          </a>
          <button
            type="button"
            className="relative z-50 inline-flex size-10 shrink-0 touch-manipulation items-center justify-center border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="pointer-events-none size-5" aria-hidden /> : <Menu className="pointer-events-none size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`relative z-10 border-t border-line/70 lg:hidden ${open ? "block" : "hidden"}`}
        aria-label="Mobile"
      >
        <div className="wrap flex flex-col gap-1 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="min-h-12 px-1 py-3 text-lg text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/donate" onClick={() => setOpen(false)} className="min-h-12 px-1 py-3 text-lg text-ink">
            Donate
          </Link>
        </div>
      </nav>
    </header>
  );
}
