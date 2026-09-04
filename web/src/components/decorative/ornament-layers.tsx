import Image from "next/image";

export function OrnamentLayers({
  src,
  sizes,
  imgClass,
}: {
  src: string;
  sizes: string;
  imgClass: string;
}) {
  return (
    <Image src={src} alt="" fill sizes={sizes} quality={75} className={imgClass} />
  );
}
