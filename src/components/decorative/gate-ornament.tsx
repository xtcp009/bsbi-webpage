import Image from "next/image";

type Variant = "nav" | "footer";

const SRC: Record<Variant, string> = {
  nav: "/ornaments/gate-nav.png",
  footer: "/ornaments/gate-footer.png",
};

export function GateOrnament({ variant }: { variant: Variant }) {
  return (
    <div className={`gate-ornament gate-ornament-${variant}`} aria-hidden="true">
      <Image
        src={SRC[variant]}
        alt=""
        fill
        sizes="100vw"
        className="gate-ornament-img"
        priority={variant === "nav"}
      />
    </div>
  );
}
