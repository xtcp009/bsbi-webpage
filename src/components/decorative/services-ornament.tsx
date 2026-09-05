import { OrnamentLayers } from "@/components/decorative/ornament-layers";

export function ServicesOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`services-ornament ${className}`.trim()} aria-hidden="true">
      <OrnamentLayers
        src="/ornaments/sanctuary.png"
        sizes="(max-width: 768px) 100vw, 58vw"
        imgClass="services-ornament-img object-contain"
      />
    </div>
  );
}
