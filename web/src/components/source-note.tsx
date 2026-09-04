import { site } from "@/lib/site";

export function SourceNote({
  fetchedAt,
  sourceUrl,
  ok,
  next = "/",
}: {
  fetchedAt?: string;
  sourceUrl?: string;
  ok?: boolean;
  next?: string;
}) {
  const when = fetchedAt
    ? new Date(fetchedAt).toLocaleString("en-US", {
        timeZone: site.timezone,
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <p className="mt-6 max-w-xl text-sm text-muted">
      {ok
        ? `Live from ShulCloud${when ? ` · read ${when}` : ""}.`
        : "Could not load the live ShulCloud schedule."}{" "}
      Compare with the{" "}
      <a className="text-link" href={sourceUrl || site.shulcloudPublicUrl}>
        current synagogue website
      </a>
      .{" "}
      <a className="text-link" href={`/api/shulcloud/refresh?next=${encodeURIComponent(next)}`}>
        Refresh schedule
      </a>
    </p>
  );
}
