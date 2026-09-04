import { OrnamentLayers } from "@/components/decorative/ornament-layers";

export function RemembranceOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`remembrance-ornament ${className}`.trim()} aria-hidden="true">
      <OrnamentLayers
        src="/ornaments/remembrance.jpg"
        sizes="100vw"
        imgClass="remembrance-ornament-img"
      />
    </div>
  );
}
