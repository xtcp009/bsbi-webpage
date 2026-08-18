"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Menu, Phone, X } from "lucide-react";
import { GateOrnament } from "@/components/decorative/gate-ornament";
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
    <header className="site-header relative z-50 overflow-x-clip text-ink">
      <div className="header-gold-rule relative z-20" />
      <GateOrnament variant="nav" />

      <div className="chrome-copy relative z-10 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-2.5 sm:gap-3 lg:py-3">
        <Link
          href="/"
          className="relative z-20 justify-self-start pl-3 sm:pl-4"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-ink.png"
            alt="BSBI Synagogue"
            width={280}
            height={123}
            className="h-4 w-auto max-w-[4rem] object-contain object-left lg:h-5 lg:max-w-[4.75rem]"
            priority
          />
        </Link>

        <nav
          className="hidden min-w-0 items-center justify-center gap-[clamp(1.25rem,2.6vw,2.75rem)] px-2 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link font-display py-1 text-[0.9rem] tracking-[0.05em] ${
                  active ? "is-active text-ink" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-20 mr-3 flex shrink-0 items-center gap-2 justify-self-end sm:mr-4">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-10 items-center gap-2 border border-line bg-beige px-2.5 py-1.5 text-sm text-ink sm:min-h-11 sm:px-3"
          >
            <Phone className="pointer-events-none size-4" aria-hidden />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a
            href={site.memberLoginUrl}
            className="inline-flex min-h-10 items-center gap-2 border border-line bg-beige px-2.5 py-1.5 text-sm text-ink sm:min-h-11 sm:px-3"
          >
            <LogIn className="pointer-events-none size-4" aria-hidden />
            <span className="hidden sm:inline">Member login</span>
            <span className="sm:hidden">Login</span>
          </a>
          <button
            type="button"
            className="inline-flex size-10 shrink-0 touch-manipulation items-center justify-center border border-line bg-beige lg:hidden"
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
        className={`relative z-10 border-t border-line/70 bg-beige lg:hidden ${open ? "block" : "hidden"}`}
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
          <a
            href={site.memberLoginUrl}
            onClick={() => setOpen(false)}
            className="min-h-12 px-1 py-3 text-lg text-ink"
          >
            Member login
          </a>
        </div>
      </nav>
    </header>
  );
}
