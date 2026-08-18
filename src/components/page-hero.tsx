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
    <section className="border-b border-line">
      <div className="wrap py-12 sm:py-16 lg:py-20">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h1 className={`display max-w-3xl text-3xl text-charleston sm:text-4xl ${kicker ? "mt-3" : ""}`}>{title}</h1>
        <p className="lede mt-5 text-muted">{lede}</p>
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
    primary: "button-primary",
    secondary: "button-secondary",
    ghost: "text-link inline-flex min-h-12 items-center py-2",
  }[variant];

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={styles}>
      {children}
    </a>
  );
}
