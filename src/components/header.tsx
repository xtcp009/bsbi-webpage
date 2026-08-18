"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Menu, Phone, X } from "lucide-react";
import { GateRail } from "@/components/gate-rail";
import { StarOfDavid } from "@/components/star-of-david";
import { headerLeft, headerRight, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mobileLinks = [...headerLeft, ...headerRight].filter((item, index, list) =>
    list.findIndex((entry) => entry.href === item.href) === index,
  );

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
    <header className="site-header relative z-50 overflow-hidden border-b border-line bg-parchment text-ink">
      <div className="relative z-10 wrap flex items-center gap-3 pt-4 pb-1 lg:pt-6 lg:pb-0">
        <Link
          href="/"
          className="flex shrink-0 items-center lg:hidden"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-ink.png"
            alt="BSBI Synagogue"
            width={280}
            height={123}
            className="h-3.5 w-auto max-w-[3.75rem] object-contain object-left"
            priority
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 grid-cols-[1fr_auto_1fr] items-end gap-3 lg:grid lg:flex-1"
          aria-label="Primary"
        >
          <div className="flex flex-wrap items-center justify-end gap-x-1">
            {headerLeft.map((item) => (
              <HeaderLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
            ))}
          </div>
          <Link href="/" className="header-star relative z-10 -mb-5 inline-flex text-gold xl:-mb-7" aria-label={`${site.name} home`}>
            <StarOfDavid className="size-10 xl:size-12" />
          </Link>
          <div className="flex flex-wrap items-center justify-start gap-x-1">
            {headerRight.map((item) => (
              <HeaderLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
            ))}
          </div>
        </nav>

        <div className="relative z-50 ml-auto flex shrink-0 items-center gap-2">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-10 items-center gap-2 border border-line px-2.5 py-1.5 text-sm text-ink sm:min-h-11 sm:px-3"
          >
            <Phone className="pointer-events-none size-4" aria-hidden />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a
            href={site.memberLoginUrl}
            className="inline-flex min-h-10 items-center gap-2 border border-line px-2.5 py-1.5 text-sm text-ink sm:min-h-11 sm:px-3"
          >
            <LogIn className="pointer-events-none size-4" aria-hidden />
            <span className="hidden sm:inline">Member login</span>
            <span className="sm:hidden">Login</span>
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
          {mobileLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="min-h-12 px-1 py-3 text-lg text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.memberLoginUrl}
            onClick={() => setOpen(false)}
            className="min-h-12 px-1 py-3 text-lg text-ink"
          >
            Member login
          </a>
        </div>
      </nav>

      <GateRail variant="header" />
    </header>
  );
}

function HeaderLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`nav-link chrome-label px-2.5 py-2 text-[0.72rem] uppercase tracking-[0.22em] xl:px-3.5 xl:text-xs ${
        active ? "is-active text-ink" : "text-ink/75"
      }`}
    >
      {label}
    </Link>
  );
}
