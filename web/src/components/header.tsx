"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { HapticHit, HapticSwitch } from "@/components/haptic-hit";
import Magnet from "@/components/react-bits/magnet";
import SplitText from "@/components/react-bits/split-text";
import { nav, site } from "@/lib/site";

function isExternal(item: (typeof nav)[number]) {
  return "external" in item && item.external;
}

function ShulcloudMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- keep the mark at 14px, not the PNG's intrinsic size
    <img
      src="/images/shulcloud.png"
      alt=""
      width={14}
      height={14}
      className="shulcloud-mark"
      aria-hidden
    />
  );
}

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

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    close();
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  return (
    <header className={`site-header${pathname === "/" ? " site-header-on-hero" : ""}`}>
      <div className="chrome-copy relative z-10 flex items-center justify-between gap-3 lg:gap-6">
        <HapticHit className="relative z-[60] shrink-0">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo-ink.png"
              alt="BSBI Synagogue"
              width={280}
              height={123}
              className="site-logo"
              priority
            />
          </Link>
        </HapticHit>

        <div className="relative z-[60] ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <nav className="hidden min-w-0 md:block" aria-label="Primary">
            <ul className="flex items-center justify-end gap-x-2.5 md:gap-x-4 lg:gap-x-6">
              {nav
                .filter((item) => item.href !== site.memberLoginUrl)
                .map((item) => {
                const active = pathname === item.href;
                const className = `nav-link${active ? " is-active" : ""}`;
                return (
                  <li key={item.href} className="shrink-0">
                    <Link href={item.href} className={className} aria-current={active ? "page" : undefined}>
                      <span className="lg:hidden">{item.short}</span>
                      <span className="hidden lg:inline">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={site.memberLoginUrl}
              className="header-give"
              title="ShulCloud member login"
            >
              <ShulcloudMark />
              Login
            </a>
            <Magnet>
              <a href={site.donateUrl} className="header-give">
                Donate
              </a>
            </Magnet>
          </div>
          <HapticHit kind="medium" className="inline-flex md:hidden" onActivate={() => setOpen((value) => !value)}>
            <button
              type="button"
              className="header-menu inline-flex"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="pointer-events-none size-5" aria-hidden /> : <Menu className="pointer-events-none size-5" aria-hidden />}
            </button>
          </HapticHit>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 cursor-pointer bg-[rgba(36,35,31,0.28)]"
              role="button"
              tabIndex={-1}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <HapticSwitch onActivate={() => setOpen(false)} />
            </motion.div>
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
                delay={90}
                duration={0.95}
                animateOnMount
                className="display relative z-10 text-2xl text-ink"
                textAlign="left"
              />
              <p id={titleId} className="sr-only">
                Site menu
              </p>
              <ul className="relative z-10 mt-6 flex flex-col gap-1">
                {nav
                  .filter((item) => item.href !== site.memberLoginUrl)
                  .map((item) => {
                  const className = `nav-drawer-link${pathname === item.href ? " is-active" : ""}`;
                  return (
                    <li key={item.href}>
                      <HapticHit className="block w-full">
                        {isExternal(item) ? (
                          <a href={item.href} onClick={() => setOpen(false)} className={className}>
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href} onClick={() => setOpen(false)} className={className}>
                            {item.label}
                          </Link>
                        )}
                      </HapticHit>
                    </li>
                  );
                })}
                <li>
                  <HapticHit className="block w-full">
                    <a href={site.donateUrl} onClick={() => setOpen(false)} className="nav-drawer-link">
                      Donate
                    </a>
                  </HapticHit>
                </li>
              </ul>
              <div className="relative z-10 mt-8 flex flex-col gap-3">
                <HapticHit className="inline-flex">
                  <a href={site.phoneHref} className="header-chip">
                    <Phone className="size-4" aria-hidden />
                    Call {site.phoneDisplay}
                  </a>
                </HapticHit>
                <HapticHit className="inline-flex">
                  <a
                    href={site.memberLoginUrl}
                    onClick={() => setOpen(false)}
                    className="header-chip"
                    title="ShulCloud member login"
                  >
                    <ShulcloudMark />
                    Login
                  </a>
                </HapticHit>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
