"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      if (open || y < 24) {
        setHidden(false);
        return;
      }
      if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-gold/40 bg-charleston/95 text-cream backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="BSBI Synagogue"
            width={280}
            height={123}
            className="h-9 w-auto max-w-[7.5rem] object-contain sm:h-11 sm:max-w-[10rem]"
            priority
          />
          <span className="hidden min-[480px]:block text-[11px] leading-tight text-cream/75 sm:text-xs">
            Charleston, SC
            <span className="block font-medium text-gold">Orthodox · Est. 1854</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm tracking-wide transition ${
                  active ? "text-gold underline decoration-gold/70 underline-offset-8" : "text-cream/85 hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-gold px-3 py-2 text-sm font-semibold text-charleston"
          >
            <Phone className="size-4" aria-hidden />
            <span className="hidden sm:inline">Call</span>
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 px-4 py-3 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-base text-cream hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/donate" onClick={() => setOpen(false)} className="px-3 py-3 text-base text-gold">
              Donate
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
