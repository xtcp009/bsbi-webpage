import { OrnamentLayers } from "@/components/decorative/ornament-layers";

export function ParshaOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`parsha-ornament ${className}`.trim()} aria-hidden="true">
      <OrnamentLayers
        src="/ornaments/parsha.png"
        sizes="(max-width: 768px) 100vw, 55vw"
        imgClass="parsha-ornament-img"
      />
    </div>
  );
}
