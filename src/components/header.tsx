"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { GateRail } from "@/components/gate-rail";
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
      className={`sticky top-0 z-50 border-b border-line bg-parchment text-ink transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden && !open ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
      }`}
    >
      <div className="wrap flex items-center gap-3 py-1.5 lg:gap-5 lg:py-1.5">
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
            className="h-5 w-auto max-w-[5.25rem] object-contain object-left lg:h-6 lg:max-w-[6rem]"
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
            onPointerDown={() => {
              ignoreHideUntil.current = Date.now() + 600;
            }}
            onClick={toggleMenu}
          >
            {open ? <X className="pointer-events-none size-5" aria-hidden /> : <Menu className="pointer-events-none size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <GateRail />

      <nav
        id="mobile-nav"
        className={`border-t border-line bg-parchment lg:hidden ${open ? "block" : "hidden"}`}
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
        <GateRail variant="divider" />
      </nav>
    </header>
  );
}
