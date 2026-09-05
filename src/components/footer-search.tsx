"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { HapticHit } from "@/components/haptic-hit";
import type { SiteContent } from "@/lib/cms";
import { searchSite } from "@/lib/search";

export function FooterSearch({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const term = query.trim();
  const matches = useMemo(() => searchSite(term, content), [term, content]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const typed = String(new FormData(event.currentTarget).get("q") ?? query).trim();
    if (typed.length < 2) return;
    const best = searchSite(typed, content)[0];
    if (!best) return;
    event.preventDefault();
    router.push(best.href);
  }

  return (
    <div className="mt-4">
      <form className="footer-search-form" action="/search" method="get" onSubmit={onSubmit} role="search">
        <label className="sr-only" htmlFor="footer-search">
          Search the site
        </label>
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="footer-search"
            type="search"
            name="q"
            required
            minLength={2}
            onInput={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search the site"
            autoComplete="off"
            enterKeyHint="search"
            className="footer-search-input w-full py-2.5 pr-3 pl-10 text-base outline-none"
            suppressHydrationWarning
          />
        </div>
        <HapticHit kind="medium" className="inline-flex shrink-0">
          <button type="submit" className="footer-search-go">
            Go
          </button>
        </HapticHit>
      </form>

      {term.length >= 2 ? (
        <div className="mt-4" aria-live="polite">
          <p className="text-sm text-muted">
            {matches.length > 0 ? (
              <>
                {matches.length === 1 ? "1 page mentions" : `${matches.length} pages mention`} “{term}”
              </>
            ) : (
              <>Nothing on this site mentions “{term}”</>
            )}
          </p>
          {matches.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-3">
              {matches.map((hit) => (
                <li key={hit.href}>
                  <Link className="block text-ink underline-offset-4 hover:text-gold hover:underline" href={hit.href}>
                    <span className="font-medium">{hit.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{hit.snippet}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
