import { Link } from "react-router";
import type { ProductType } from "@app/modules/main/entities/entities";
import LazyImageInterface from "./lazyImageInterface";
import PriceInterface from "./priceInterface";

type Props = {
  product: ProductType;
};

// Card de producto compartida (catálogo, destacados de la home, relacionados).
export default function ProductCardInterface({ product }: Props) {
  const image = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-sand bg-surface shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div className="aspect-[4/5] overflow-hidden bg-sand">
        {image && (
          <LazyImageInterface
            src={image.url}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-ink">{product.name}</h3>
        </div>
        <p className="line-clamp-2 text-sm text-ink-soft">
          {product.shortDescription ?? product.description}
        </p>
        <PriceInterface
          amount={product.priceArs}
          className="mt-1 font-display text-lg text-clay-deep"
        />
      </div>
    </Link>
  );
}
