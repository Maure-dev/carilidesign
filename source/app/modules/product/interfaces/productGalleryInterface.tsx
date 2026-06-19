import type { ImageType } from "@app/modules/main/entities/entities";
import LazyImageInterface from "@app/modules/main/interfaces/lazyImageInterface";

type Props = {
  images: ImageType[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function ProductGalleryInterface({ images, activeIndex, onSelect }: Props) {
  if (images.length === 0) {
    return <div className="aspect-[4/5] w-full rounded-card bg-sand" />;
  }
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-card bg-sand">
        <LazyImageInterface
          src={active.url}
          alt={active.alt}
          className="aspect-[4/5] h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Ver imagen ${index + 1}`}
              className={`h-20 w-16 shrink-0 overflow-hidden rounded-buttons border ${
                index === activeIndex ? "border-clay" : "border-sand"
              }`}
            >
              <LazyImageInterface
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
