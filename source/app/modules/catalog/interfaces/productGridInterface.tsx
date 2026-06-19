import type { ProductType } from "@app/modules/main/entities/entities";
import ProductCardInterface from "@app/modules/main/interfaces/productCardInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";

type Props = {
  products: ProductType[];
};

export default function ProductGridInterface({ products }: Props) {
  if (products.length === 0) {
    return <EmptyBoxInterface message="No encontramos bachas con esos filtros." />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCardInterface key={product.id} product={product} />
      ))}
    </div>
  );
}
