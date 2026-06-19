import type { ProductType } from "@app/modules/main/entities/entities";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";
import BadgeInterface from "@app/modules/main/interfaces/badgeInterface";

type Props = {
  product: ProductType;
  price: number;
};

export default function ProductInfoInterface({ product, price }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <BadgeInterface tone="sand">Hecho a mano · Pieza única</BadgeInterface>
      <h1 className="font-display text-4xl text-ink">{product.name}</h1>
      <PriceInterface amount={price} className="font-display text-2xl text-clay-deep" />
      <p className="text-ink-soft">{product.description}</p>
      {(product.material || product.dimensions) && (
        <ul className="mt-1 flex flex-col gap-1 text-sm text-ink-soft">
          {product.material && <li>Material: {product.material}</li>}
          {product.dimensions && (
            <li>
              Medidas aprox.: {product.dimensions.widthCm}×{product.dimensions.depthCm}×
              {product.dimensions.heightCm} cm
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
