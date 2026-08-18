import Link from "next/link";
import type { LiveEruv } from "@/lib/shulcloud";
import { isEruvFresh } from "@/lib/shulcloud";
import { copy } from "@/content/copy";

function statusLabel(state: "up" | "down" | "unknown") {
  if (state === "up") return "up";
  if (state === "down") return "down";
  return "please call to check";
}

function formatChecked(iso?: string) {
  if (!iso) return null;
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function EruvBanner({
  compact = false,
  live = null,
}: {
  compact?: boolean;
  live?: LiveEruv | null;
}) {
  const checked = formatChecked(live?.lastChecked);
  const fresh = isEruvFresh(live ?? null);

  return (
    <section>
      <p className="kicker">Eruv status</p>
      {!live ? (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-charleston">
          Current eruv status could not be read from ShulCloud. Please confirm before Shabbat.
        </p>
      ) : fresh && live ? (
        <>
          <p className="mt-3 text-lg text-charleston">
            Downtown {statusLabel(live.downtown)}
            <span aria-hidden> · </span>
            South Windermere {statusLabel(live.southWindermere)}
          </p>
          {checked ? <p className="mt-2 text-sm text-muted">Checked {checked} on ShulCloud.</p> : null}
        </>
      ) : (
        <>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-charleston">
            Eruv status has not been recently verified. Please confirm before Shabbat.
          </p>
          {checked ? <p className="mt-2 text-sm text-muted">Last recorded check on ShulCloud: {checked}.</p> : null}
        </>
      )}
      {compact ? (
        <Link href="/eruv" className="text-link mt-4 inline-block">
          Eruv maps
        </Link>
      ) : (
        <p className="mt-4 max-w-xl text-base text-muted">{copy.eruvRabbi}</p>
      )}
    </section>
  );
}
