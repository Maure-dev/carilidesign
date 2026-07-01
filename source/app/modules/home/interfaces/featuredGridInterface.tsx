import { Link } from "react-router";
import type { ProductType } from "@app/modules/main/entities/entities";
import ProductCardInterface from "@app/modules/main/interfaces/productCardInterface";
import { ProductCardSkeletonInterface } from "@app/modules/main/interfaces/skeletonInterface";

type Props = {
  products: ProductType[];
  loading: boolean;
};

export default function FeaturedGridInterface({ products, loading }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl text-ink">Piezas destacadas</h2>
        <Link to="/catalogo" className="text-sm font-medium text-clay-deep hover:text-clay">
          Ver toda la colección →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [0, 1, 2].map((i) => <ProductCardSkeletonInterface key={i} />)
          : products.map((product) => <ProductCardInterface key={product.id} product={product} />)}
      </div>
    </section>
  );
}
