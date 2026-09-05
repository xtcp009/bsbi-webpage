import type { NamedTime } from "@/lib/shulcloud";
import type { NextMinyanInfo } from "@/lib/minyan";

export function ServiceTimeList({
  items,
  size = "schedule",
  next,
}: {
  items: NamedTime[];
  size?: "hero" | "schedule";
  next?: Pick<NextMinyanInfo, "name" | "time"> | null;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={size === "hero" ? "mt-4 max-w-lg" : "mt-3 flex flex-col gap-2 text-base"}>
      {items.map((item) => {
        const isNext = Boolean(next && item.name === next.name && item.time === next.time);
        return (
          <li
            key={`${item.name}-${item.time}`}
            className={
              size === "hero"
                ? "flex items-baseline justify-between gap-4 border-t border-line py-3"
                : "flex items-baseline justify-between gap-3"
            }
          >
            <span>
              <span className={isNext ? "font-medium text-charleston" : undefined}>{item.name}</span>
              {item.note ? <span className="mt-0.5 block text-sm text-muted">{item.note}</span> : null}
            </span>
            <span
              className={
                size === "hero"
                  ? "shrink-0 display text-2xl tabular-nums text-charleston"
                  : "shrink-0 font-medium tabular-nums"
              }
            >
              {item.time}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
