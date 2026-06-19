import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string; // obligatorio para accesibilidad
};

// Imagen con lazy-loading. width/height (cuando se pasan) evitan layout shift (CLS).
export default function LazyImageInterface({ alt, className = "", ...rest }: Props) {
  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`max-w-full ${className}`}
      {...rest}
    />
  );
}
