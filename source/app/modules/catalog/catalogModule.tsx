import { filterAndSort } from "@app/modules/catalog/helpers/filterProducts";
import { useCatalogActions } from "@app/modules/catalog/hooks/useCatalogActions";
import CatalogToolbarInterface from "@app/modules/catalog/interfaces/catalogToolbarInterface";
import ProductGridInterface from "@app/modules/catalog/interfaces/productGridInterface";
import { useCatalogProvider } from "@app/modules/catalog/states/catalogProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { ProductCardSkeletonInterface } from "@app/modules/main/interfaces/skeletonInterface";
import { useEffect } from "react";

export default function CatalogModule() {
  const { handleLoadProducts } = useCatalogActions();
  const { getCatalogState } = useCatalogProvider();
  const { all, filters, sort, loading } = getCatalogState;

  useDocumentHead({
    title: "Catálogo",
    description: "Bachas de baño artesanales de cerámica. Personalizá tu pieza."
  });

  useEffect(() => {
    handleLoadProducts();
  }, []);

  const products = filterAndSort(all, filters, sort);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-4xl text-ink">Catálogo</h1>
        <p className="text-ink-soft">Cada bacha es una pieza única, hecha y esmaltada a mano.</p>
      </header>
      <CatalogToolbarInterface />
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ProductCardSkeletonInterface key={i} />
          ))}
        </div>
      ) : (
        <ProductGridInterface products={products} />
      )}
    </section>
  );
}
