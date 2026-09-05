import { ScaledImage } from "@/components/scaled-image";
import type { CmsFlyer } from "@/sanity/types";

const LETTER_WIDTH = 1275;
const LETTER_HEIGHT = 1650;

export function FlyerList({ flyers }: { flyers: CmsFlyer[] }) {
  if (flyers.length === 0) {
    return null;
  }

  const many = flyers.length > 1;

  return (
    <ul className={many ? "mt-8 grid gap-10 md:grid-cols-2" : "mt-8 max-w-xl"}>
      {flyers.map((item) => {
        const width = item.width && item.width > 0 ? Math.round(item.width) : LETTER_WIDTH;
        const height = item.height && item.height > 0 ? Math.round(item.height) : LETTER_HEIGHT;
        return (
          <li key={item._id} className="min-w-0">
            <figure>
              <a
                href={item.image}
                target="_blank"
                rel="noreferrer"
                className="block w-full"
                aria-label={`Open full-size flyer: ${item.title}`}
              >
                <ScaledImage
                  src={item.image}
                  alt={item.alt}
                  width={width}
                  height={height}
                  quality={90}
                  sizes={many ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 36rem"}
                  frameClassName="w-full bg-cream"
                />
              </a>
              <figcaption className="mt-4 font-display text-xl font-bold tracking-tight text-charleston md:text-2xl">
                {item.title}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
