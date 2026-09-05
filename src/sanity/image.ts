import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = client ? imageUrlBuilder(client) : null;
type ImageSource = Parameters<NonNullable<typeof builder>["image"]>[0];

export function urlFor(source: ImageSource) {
  if (!builder) {
    return null;
  }
  return builder.image(source);
}

export function cmsImageSrc(source: ImageSource | string | null | undefined, width = 1600) {
  if (!source) {
    return "";
  }
  if (typeof source === "string") {
    return source;
  }
  return urlFor(source)?.width(width).auto("format").url() ?? "";
}
