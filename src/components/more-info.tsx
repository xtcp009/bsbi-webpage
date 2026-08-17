import Link from "next/link";

const words = [
  {
    term: "Shacharit, Mincha, Maariv",
    meaning: "Morning, afternoon, and evening services.",
  },
  {
    term: "Minyan",
    meaning: "A public prayer service. Weekdays downtown; Shabbat and Yom Tov downtown and at the Minyan House.",
  },
  {
    term: "Eruv",
    meaning: "A boundary that permits carrying on Shabbat when it is UP. Confirm status before Shabbat.",
  },
  {
    term: "Mikvah",
    meaning: "Ritual bath at the downtown synagogue. Reservations 24 hours in advance with Rebbetzin Rivka Bart.",
  },
];

const groups = [
  { href: "/community#womens-group", label: "Sisterhood", hint: "Milk and meat kitchens, events" },
  { href: "/community#mens-group", label: "Brotherhood", hint: "Camaraderie and service since 2017" },
  { href: "/community#classes", label: "Weekly Classes", hint: "Parsha class and Lunch and Learn" },
  { href: "/community#burial-society", label: "Chevra Kadisha", hint: "Burial preparations for any Jew in Charleston" },
];

function Panel() {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Words you might see</h2>
        <dl className="mt-3 flex flex-col gap-3">
          {words.map((item) => (
            <div key={item.term}>
              <dt className="text-sm font-semibold text-charleston">{item.term}</dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-muted">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Committees</h2>
        <ul className="mt-3 flex flex-col gap-1">
          {groups.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block px-2 py-2 hover:bg-parchment">
                <span className="block text-sm font-medium text-teal">{item.label}</span>
                <span className="block text-xs text-muted">{item.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function MoreInfo() {
  return (
    <aside className="panel">
      <div className="lg:hidden">
        <details>
          <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-charleston">
            More information
            <span className="ml-2 text-xs font-medium text-muted">(Sisterhood, Eruv, classes)</span>
          </summary>
          <div className="border-t border-line px-5 py-4">
            <Panel />
          </div>
        </details>
      </div>
      <div className="hidden px-5 py-4 lg:block">
        <p className="mb-4 text-sm font-semibold text-charleston">More information</p>
        <Panel />
      </div>
    </aside>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17.5rem]">
      <div className="min-w-0">{children}</div>
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <MoreInfo />
      </div>
    </div>
  );
}
