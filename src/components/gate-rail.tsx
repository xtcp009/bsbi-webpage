/** Silhouette traced from public/images/bsbigate.jpeg (Sabel Iron Works double-pass gate). */
export function GateRail({
  variant = "nav",
  className = "",
}: {
  variant?: "nav" | "divider" | "active";
  className?: string;
}) {
  const src =
    variant === "active"
      ? "/ornaments/bsbi-gate-active.svg"
      : variant === "divider"
        ? "/ornaments/bsbi-gate-divider.svg"
        : "/ornaments/bsbi-gate-nav.svg";

  return (
    <div
      className={`gate-rail gate-rail-${variant} ${className}`.trim()}
      aria-hidden
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    />
  );
}
