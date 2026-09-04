import { OrnamentLayers } from "@/components/decorative/ornament-layers";

export function EventsOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`events-ornament ${className}`.trim()} aria-hidden="true">
      <OrnamentLayers src="/ornaments/events.png" sizes="100vw" imgClass="events-ornament-img" />
    </div>
  );
}
