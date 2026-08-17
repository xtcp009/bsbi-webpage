import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EruvBanner } from "@/components/eruv-banner";
import { NextMinyan } from "@/components/next-minyan";
import { ActionLink } from "@/components/page-hero";
import FadeContent from "@/components/react-bits/fade-content";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
import { ScaledImage } from "@/components/scaled-image";
import { copy, events } from "@/content/copy";
import { site } from "@/lib/site";
import { buildDayBoard, getShabbatInfo, getZmanim } from "@/lib/zmanim";

export const revalidate = 3600;

export default async function HomePage() {
  const [zmanim, shabbat] = await Promise.all([getZmanim(), getShabbatInfo()]);
  const board = zmanim ? buildDayBoard(zmanim, shabbat) : null;

  return (
    <>
      <section className="overflow-hidden border-b border-line bg-[#e7d7b8]">
        <ScaledImage
          src="/images/hero-sketch.jpg"
          alt="Architectural drawing of Brith Sholom Beth Israel Synagogue"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_48%]"
          frameClassName="w-full aspect-[2.2/1] sm:aspect-[2.6/1] lg:aspect-[3/1]"
        />
        <div className="ornament" />
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
            Brith Sholom Beth Israel
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-snug text-charleston sm:text-3xl">
            BSBI Synagogue
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {copy.homeTagline}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {copy.doorsOpen} {copy.dailyServices}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-[1.15fr_0.85fr]">
        {board ? (
          <NextMinyan board={board} />
        ) : (
          <div className="border border-line bg-cream p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Services</h2>
            <p className="mt-2 text-sm text-muted">{copy.dailyServices}</p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <EruvBanner compact />
          {shabbat.parsha || shabbat.candleLighting ? (
            <div className="border border-line bg-cream px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">This Shabbat</p>
              {shabbat.parsha ? <p className="mt-2 font-[family-name:var(--font-display)] text-xl">Parshat {shabbat.parsha}</p> : null}
              <p className="mt-1 text-sm text-muted">
                {shabbat.candleLighting ? `Candle Lighting ${shabbat.candleLighting}` : null}
                {shabbat.candleLighting && shabbat.havdalah ? " · " : null}
                {shabbat.havdalah ? `Havdalah ${shabbat.havdalah}` : null}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="ornament mb-8" />
        <ScrollReveal
          containerClassName="max-w-3xl"
          textClassName="font-[family-name:var(--font-display)] text-xl leading-snug text-charleston sm:text-2xl"
        >
          {copy.welcomeClose}
        </ScrollReveal>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{copy.historyLead}</p>
      </section>

      <FadeContent className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Upcoming Programs & Events</p>
        <ul className="mt-4 divide-y divide-[var(--line)] border border-line bg-cream">
          {events.map((event) => (
            <li key={event.title}>
              <Link href={event.href} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <span>
                  <span className="block font-[family-name:var(--font-display)] text-lg text-charleston">{event.title}</span>
                  <span className="text-sm text-muted">{event.detail}</span>
                </span>
                <span className="text-sm text-teal">{event.when}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/calendar" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">
          Calendar <ArrowRight className="size-4" />
        </Link>
      </FadeContent>

      <FadeContent className="border-y border-line bg-charleston text-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{copy.remembranceFund}</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl">{copy.remembranceTitle}</h2>
            <p className="mt-3 text-sm text-cream/85">{copy.remembranceTag}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">{copy.remembranceNote}</p>
            <div className="mt-5">
              <ActionLink href="/remembrance">Honor Their Memory. Preserve Their Story.</ActionLink>
            </div>
          </div>
          <ScaledImage
            src="/images/habs-gate.jpg"
            alt="Historic iron gate of BSBI, Library of Congress"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center sepia"
            frameClassName="aspect-[4/3] w-full max-w-full border border-white/10"
          />
        </div>
      </FadeContent>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <FadeContent>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Downtown</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl">{site.locations.downtown.fullAddress}</h2>
          <p className="mt-3 text-sm leading-relaxed">{copy.downtownLocation}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ActionLink href={site.locations.downtown.googleMaps}>Directions</ActionLink>
            <ActionLink href="/locations" variant="ghost">
              Locations
            </ActionLink>
            <ActionLink href="/gallery" variant="ghost">
              Photo Gallery
            </ActionLink>
          </div>
        </FadeContent>
        <FadeContent delay={0.12}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">South Windermere</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl">8 Lord Ashley Drive</h2>
          <p className="mt-3 text-sm leading-relaxed">{copy.minyanHouse}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.chefLinda}</p>
          <div className="mt-4">
            <ActionLink href={site.locations.minyanHouse.googleMaps} variant="ghost">
              Directions to the Minyan House
            </ActionLink>
          </div>
        </FadeContent>
      </section>
    </>
  );
}
