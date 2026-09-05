import Link from "next/link";
import { HapticHit, HapticSummary } from "@/components/haptic-hit";
import FadeContent from "@/components/react-bits/fade-content";

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
    meaning: "A boundary that permits carrying on Shabbat when it is up. Confirm status before Shabbat.",
  },
  {
    term: "Mikvah",
    meaning: "Ritual bath at the downtown synagogue. Reservations 24 hours in advance with Rebbetzin Rivka Bart.",
  },
];

const groups = [
  { href: "/community#womens-group", label: "Sisterhood", hint: "Milk and meat kitchens, events" },
  { href: "/community#mens-group", label: "Brotherhood", hint: "Camaraderie and service since 2017" },
  { href: "/community#classes", label: "Weekly Classes", hint: "Talmud, Parsha, and Lunch and Learn" },
  { href: "/membership", label: "Membership", hint: "Join the congregation" },
  { href: "/community#burial-society", label: "Chevra Kadisha", hint: "Burial preparations for any Jew in Charleston" },
];

function Panel() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="display text-xl text-charleston">Words you might see</h2>
        <dl className="mt-4 flex flex-col gap-4">
          {words.map((item) => (
            <div key={item.term}>
              <dt className="text-base font-semibold text-charleston">{item.term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2 className="display text-xl text-charleston">Committees</h2>
        <ul className="mt-3 flex flex-col">
          {groups.map((item) => (
            <li key={item.href} className="border-t border-line">
              <HapticHit className="block">
                <Link href={item.href} className="block py-3">
                  <span className="block text-base text-charleston">{item.label}</span>
                  <span className="block text-sm text-muted">{item.hint}</span>
                </Link>
              </HapticHit>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function MoreInfo() {
  return (
    <aside className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
      <div className="lg:hidden">
        <details>
          <HapticSummary className="cursor-pointer py-1 text-base font-semibold text-charleston">
            More information
            <span className="ml-2 text-sm font-medium text-muted">(Sisterhood, Eruv, classes)</span>
          </HapticSummary>
          <div className="pt-5">
            <Panel />
          </div>
        </details>
      </div>
      <div className="hidden lg:block">
        <p className="mb-5 text-base font-semibold text-charleston">More information</p>
        <Panel />
      </div>
    </aside>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap section grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
      <FadeContent className="min-w-0" y={18}>
        {children}
      </FadeContent>
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <MoreInfo />
      </div>
    </div>
  );
}
