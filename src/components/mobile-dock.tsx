import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

const items = [
  { href: "/times", label: "Services", icon: Clock },
  { href: site.locations.downtown.googleMaps, label: "Directions", icon: MapPin, external: true },
  { href: site.phoneHref, label: "Call", icon: Phone, external: true },
];

export function MobileDock() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const className = "flex min-h-16 flex-col items-center justify-center gap-1 px-2 text-sm text-charleston";
          const inner = (
            <>
              <Icon className="size-5" aria-hidden />
              {item.label}
            </>
          );
          return (
            <li key={item.label}>
              {item.external ? (
                <a href={item.href} className={className}>
                  {inner}
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
