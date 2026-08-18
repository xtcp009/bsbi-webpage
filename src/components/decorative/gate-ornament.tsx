import Image from "next/image";

type Variant = "nav" | "footer";

const SRC: Record<Variant, string> = {
  nav: "/ornaments/gate-nav.png",
  footer: "/ornaments/gate-footer.png",
};

const NAV_COPIES = [
  { key: "left", className: "gate-tile-flip" },
  { key: "center", className: "" },
  { key: "right", className: "gate-tile-flip" },
] as const;

export function GateOrnament({ variant }: { variant: Variant }) {
  if (variant === "nav") {
    return (
      <div className="gate-ornament gate-ornament-nav" aria-hidden="true">
        <div className="gate-fill" />
        <div className="gate-span">
          {NAV_COPIES.map((copy) => (
            <div key={copy.key} className={`gate-tile ${copy.className}`.trim()}>
              <Image
                src={SRC.nav}
                alt=""
                fill
                sizes="40vw"
                className="gate-ornament-img"
                priority
              />
            </div>
          ))}
        </div>
        <div className="gate-blend" />
      </div>
    );
  }

  return (
    <div className="gate-ornament gate-ornament-footer" aria-hidden="true">
      <Image
        src={SRC.footer}
        alt=""
        fill
        sizes="100vw"
        className="gate-ornament-img"
      />
      <div className="gate-blend" />
    </div>
  );
}
