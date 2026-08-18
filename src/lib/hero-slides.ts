import type { HeroSlide } from "@/lib/shulcloud";
import { gallery } from "@/content/gallery";

const LOCAL_HERO_SLIDES: HeroSlide[] = [
  ...gallery.today.map((photo) => ({ src: photo.src, alt: photo.alt })),
  {
    src: "/images/habs-2.jpg",
    alt: "Historic American Buildings Survey photograph of BSBI",
  },
  {
    src: "/images/habs-3.jpg",
    alt: "Historic American Buildings Survey photograph of BSBI",
  },
  {
    src: "/images/remembrance-wall.jpg",
    alt: "Holocaust Remembrance Wall at Brith Sholom Beth Israel",
  },
  {
    src: "/images/class-talmud.jpg",
    alt: "Talmud class at Brith Sholom Beth Israel",
  },
  {
    src: "/images/class-parsha.jpg",
    alt: "Parsha class at Brith Sholom Beth Israel",
  },
  {
    src: "/images/class-lunch-and-learn.jpg",
    alt: "Lunch and learn at Brith Sholom Beth Israel",
  },
];

export function allHeroSlides(liveSlides: HeroSlide[] = []): HeroSlide[] {
  const seen = new Set<string>();
  const slides: HeroSlide[] = [];

  for (const slide of [...LOCAL_HERO_SLIDES, ...liveSlides]) {
    if (seen.has(slide.src)) continue;
    seen.add(slide.src);
    slides.push(slide);
  }

  return slides;
}
