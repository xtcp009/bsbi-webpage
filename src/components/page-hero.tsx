import Link from "next/link";
import { HapticHit } from "@/components/haptic-hit";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
import SplitText from "@/components/react-bits/split-text";

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
        <SplitText
          text={title}
          tag="h1"
          delay={70}
          duration={1.1}
          animateOnMount
          className={`display max-w-3xl text-3xl text-charleston sm:text-4xl ${kicker ? "mt-3" : ""}`}
        />
        <ScrollReveal
          tag="p"
          containerClassName="lede mt-5 max-w-3xl text-muted"
          baseRotation={1}
          blurStrength={3}
        >
          {lede}
        </ScrollReveal>
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

  const kind = variant === "primary" ? "medium" : "light";

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <HapticHit kind={kind} className="inline-flex">
        <Link href={href} className={styles}>
          {children}
        </Link>
      </HapticHit>
    );
  }

  const web = /^https?:/i.test(href);
  return (
    <HapticHit kind={kind} className="inline-flex">
      <a
        href={href}
        className={styles}
        {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </HapticHit>
  );
}
