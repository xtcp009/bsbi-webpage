"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { LogIn, Menu, Phone, X } from "lucide-react";
import { GateOrnament } from "@/components/decorative/gate-ornament";
import SplitText from "@/components/react-bits/split-text";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const menuId = "site-nav";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header relative z-50 text-ink">
      <div className="header-gold-rule" />
      <GateOrnament variant="nav" />

      <div className="chrome-copy relative z-10 flex items-center justify-between">
        <Link
          href="/"
          className="relative z-[60] pl-3 sm:pl-4"
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

        <button
          type="button"
          className="relative z-[60] mr-3 inline-flex size-10 shrink-0 touch-manipulation items-center justify-center border border-line bg-beige shadow-[0_0_16px_rgba(232,213,181,0.9)] sm:mr-4"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="pointer-events-none size-5" aria-hidden /> : <Menu className="pointer-events-none size-5" aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-[rgba(36,35,31,0.28)]"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id={menuId}
              className="site-sidebar"
              aria-labelledby={titleId}
              aria-modal="true"
              role="dialog"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <SplitText
                text="Menu"
                tag="p"
                delay={40}
                duration={0.45}
                animateOnMount
                className="display relative z-10 text-2xl text-ink"
                textAlign="left"
              />
              <p id={titleId} className="sr-only">
                Site menu
              </p>
              <ul className="relative z-10 mt-6 flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block min-h-12 py-3 text-lg ${pathname === item.href ? "text-ink" : "text-ink/80"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/donate" onClick={() => setOpen(false)} className="block min-h-12 py-3 text-lg text-ink/80">
                    Donate
                  </Link>
                </li>
              </ul>
              <div className="relative z-10 mt-8 flex flex-col gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 border border-line bg-beige px-3 text-sm text-ink"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {site.phoneDisplay}
                </a>
                <a
                  href={site.memberLoginUrl}
                  className="inline-flex min-h-11 items-center gap-2 border border-line bg-beige px-3 text-sm text-ink"
                >
                  <LogIn className="size-4" aria-hidden />
                  Member login
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
