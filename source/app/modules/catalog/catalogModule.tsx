import { useEffect } from "react";
import { useCatalogProvider } from "@app/modules/catalog/states/catalogProvider";
import { useCatalogActions } from "@app/modules/catalog/hooks/useCatalogActions";
import { filterAndSort } from "@app/modules/catalog/helpers/filterProducts";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import CatalogToolbarInterface from "@app/modules/catalog/interfaces/catalogToolbarInterface";
import ProductGridInterface from "@app/modules/catalog/interfaces/productGridInterface";

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
      {loading ? <LoadingInterface /> : <ProductGridInterface products={products} />}
    </section>
  );
}
