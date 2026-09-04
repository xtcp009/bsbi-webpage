import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "className"> & {
  className?: string;
  frameClassName?: string;
};

export function ScaledImage({ className = "", frameClassName = "", alt, fill, sizes, ...props }: Props) {
  return (
    <div className={`relative min-w-0 ${fill ? "overflow-hidden" : ""} ${frameClassName}`}>
      <Image
        alt={alt}
        fill={fill}
        sizes={sizes ?? (fill ? "100vw" : undefined)}
        className={fill ? className : `h-auto w-full max-w-full object-contain ${className}`}
        {...props}
      />
    </div>
  );
}
