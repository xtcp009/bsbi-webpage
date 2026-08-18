import { site } from "@/lib/site";

const items = [
  {
    href: site.socials.facebook,
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
        <path
          fill="currentColor"
          d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3.2l.8-4H13V9c0-.6.4-1 1-1Z"
        />
      </svg>
    ),
  },
  {
    href: site.socials.instagram,
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: site.socials.x,
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
        <path
          fill="currentColor"
          d="M14.7 10.4 22 2h-2.2l-6.3 7.2L8.3 2H2l7.7 11.1L2 22h2.2l6.8-7.7L15.7 22H22l-7.3-11.6Zm-2.4 2.7-.8-1.1L5.1 3.5h2.7l5.1 7.3.8 1.1 6.5 9.3h-2.7l-5.2-7.4Z"
        />
      </svg>
    ),
  },
] as const;

export function SocialLinks({ onDark = false }: { onDark?: boolean }) {
  return (
    <nav aria-label="Social" className="flex flex-wrap items-center gap-3">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex size-11 items-center justify-center rounded-full border ${
            onDark
              ? "border-[#e8dcc6]/35 text-[#e8dcc6] hover:border-gold hover:text-gold"
              : "border-line text-charleston hover:border-charleston"
          }`}
          aria-label={item.label}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
}
