import Image from "next/image";

type Variant = "nav" | "footer";

export function GateOrnament({ variant }: { variant: Variant }) {
  if (variant === "nav") {
    return (
      <div className="gate-ornament gate-ornament-nav" aria-hidden="true">
        <div className="gate-span" />
        <div className="gate-blend" />
      </div>
    );
  }

  return (
    <div className="gate-ornament gate-ornament-footer" aria-hidden="true">
      <Image
        src="/ornaments/gate-footer.png"
        alt=""
        fill
        sizes="100vw"
        className="gate-ornament-img"
      />
      <div className="gate-blend" />
    </div>
  );
}
