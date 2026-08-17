import Link from "next/link";

export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="border-b border-line bg-charleston text-cream">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9">
        {kicker ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{kicker}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl">
          {title}
        </h1>
        <div className="ornament my-3 max-w-xs" />
        <p className="max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">{lede}</p>
      </div>
    </section>
  );
}

export function ActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const styles = {
    primary: "bg-gold text-charleston",
    secondary: "bg-teal text-cream",
    ghost: "border border-line bg-parchment text-ink",
  }[variant];
  const className = `inline-flex min-h-10 items-center justify-center rounded-md px-4 text-center text-sm font-medium tracking-wide ${styles}`;
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
