import Link from "next/link";
import { eruv } from "@/content/eruv";

function status(state: "up" | "down" | "unknown") {
  if (state === "up") return { label: "UP", className: "bg-emerald-700/15 text-emerald-900" };
  if (state === "down") return { label: "DOWN", className: "bg-red-700/15 text-red-900" };
  return { label: "Call to check", className: "bg-amber-700/15 text-amber-900" };
}

export function EruvBanner({ compact = false }: { compact?: boolean }) {
  const downtown = status(eruv.downtown);
  const west = status(eruv.southWindermere);
  const checked = new Date(`${eruv.lastChecked}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="panel px-4 py-3 sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-wide text-charleston">ERUV STATUS</p>
        <p className="text-xs text-muted">last updated {checked}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className={`px-3 py-1 text-sm font-medium ${downtown.className}`}>Downtown Eruv: {downtown.label}</span>
        <span className={`px-3 py-1 text-sm font-medium ${west.className}`}>
          South Windermere Eruv: {west.label}
        </span>
      </div>
      {compact ? (
        <Link href="/eruv" className="mt-3 inline-block text-sm font-medium text-teal underline underline-offset-4">
          Eruv maps
        </Link>
      ) : (
        <p className="mt-3 text-sm text-muted">{eruv.note}</p>
      )}
    </div>
  );
}
