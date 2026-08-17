import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "className"> & {
  className?: string;
  frameClassName?: string;
};

export function ScaledImage({ className = "", frameClassName = "", alt, fill, ...props }: Props) {
  return (
    <div className={`relative overflow-hidden ${frameClassName}`}>
      <Image
        alt={alt}
        fill={fill}
        className={fill ? `object-cover ${className}` : `size-full object-cover ${className}`}
        {...props}
      />
    </div>
  );
}
