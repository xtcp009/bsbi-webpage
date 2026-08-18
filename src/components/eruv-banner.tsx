import Link from "next/link";
import { eruv, isEruvStale } from "@/content/eruv";

function statusLabel(state: "up" | "down" | "unknown") {
  if (state === "up") return "up";
  if (state === "down") return "down";
  return "please call to check";
}

export function EruvBanner({ compact = false }: { compact?: boolean }) {
  const stale = isEruvStale();
  const checked = new Date(`${eruv.lastChecked}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section>
      <p className="kicker">Eruv status</p>
      {stale ? (
        <>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-charleston">
            Eruv status has not been recently verified. Please confirm before Shabbat.
          </p>
          <p className="mt-2 text-sm text-muted">Last recorded check: {checked}.</p>
        </>
      ) : (
        <>
          <p className="mt-3 text-lg text-charleston">
            Downtown {statusLabel(eruv.downtown)}
            <span aria-hidden> · </span>
            South Windermere {statusLabel(eruv.southWindermere)}
          </p>
          <p className="mt-2 text-sm text-muted">Checked {checked}.</p>
        </>
      )}
      {compact ? (
        <Link href="/eruv" className="text-link mt-4 inline-block">
          Eruv maps
        </Link>
      ) : (
        <p className="mt-4 max-w-xl text-base text-muted">{eruv.note}</p>
      )}
    </section>
  );
}
