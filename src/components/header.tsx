"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ignoreHideUntil = useRef(0);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setHidden(false);
        return;
      }
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      lastY.current = y;

      if (open || Date.now() < ignoreHideUntil.current || y < 48) {
        setHidden(false);
        return;
      }
      if (delta > 24) setHidden(true);
      else if (delta < -16) setHidden(false);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function toggleMenu(event: React.SyntheticEvent) {
    event.stopPropagation();
    ignoreHideUntil.current = Date.now() + 600;
    setHidden(false);
    setOpen((value) => !value);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-charleston text-cream transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden && !open ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-4 py-3 lg:py-3.5">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="BSBI Synagogue"
            width={280}
            height={123}
            className="h-10 w-auto max-w-[8.5rem] object-contain sm:h-12 sm:max-w-[11.5rem]"
            priority
          />
          <span className="hidden min-[520px]:block text-sm leading-tight text-cream/75 lg:hidden 2xl:block">
            Charleston, SC
            <span className="block text-cream">Est. 1854</span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-2.5 py-2 text-[0.95rem] xl:px-3.5 ${
                  active ? "text-cream underline decoration-gold/80 underline-offset-8" : "text-cream/80 hover:text-cream"
                }`}
              >
                <span className="2xl:hidden">{item.short}</span>
                <span className="hidden 2xl:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="relative z-50 flex shrink-0 items-center gap-3">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 border border-cream/35 px-3 py-2 text-sm text-cream sm:min-h-12 sm:px-3.5"
          >
            <Phone className="pointer-events-none size-4" aria-hidden />
            <span className="hidden lg:inline">{site.phoneDisplay}</span>
            <span className="lg:hidden">Call</span>
          </a>
          <button
            type="button"
            className="relative z-50 inline-flex size-11 shrink-0 touch-manipulation items-center justify-center border border-cream/25 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onPointerDown={() => {
              ignoreHideUntil.current = Date.now() + 600;
            }}
            onClick={toggleMenu}
          >
            {open ? <X className="pointer-events-none size-5" aria-hidden /> : <Menu className="pointer-events-none size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`border-t border-white/10 bg-charleston lg:hidden ${open ? "block" : "hidden"}`}
        aria-label="Mobile"
      >
        <div className="wrap flex flex-col gap-1 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="min-h-12 px-1 py-3 text-lg text-cream"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/donate" onClick={() => setOpen(false)} className="min-h-12 px-1 py-3 text-lg text-cream">
            Donate
          </Link>
        </div>
      </nav>
    </header>
  );
}
