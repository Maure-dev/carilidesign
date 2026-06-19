import type { CatalogSortType } from "@app/modules/catalog/entities/entities";
import { useCatalogProvider } from "@app/modules/catalog/states/catalogProvider";
import { useCatalog } from "@app/modules/main/hooks/useCatalog";

export const useCatalogActions = () => {
  const { setCatalogState } = useCatalogProvider();
  const { products } = useCatalog();

  // Los productos ya vinieron en el bootstrap: se leen del store global.
  const handleLoadProducts = (): void => {
    setCatalogState((s) => ({ ...s, all: products, loading: false }));
  };

  const handleSearch = (search: string): void => {
    setCatalogState((s) => ({ ...s, filters: { ...s.filters, search: search } }));
  };

  const handleSetShape = (shape: string | null): void => {
    setCatalogState((s) => ({ ...s, filters: { ...s.filters, shape: shape } }));
  };

  const handleSetSort = (sort: CatalogSortType): void => {
    setCatalogState((s) => ({ ...s, sort: sort }));
  };

  return { handleLoadProducts, handleSearch, handleSetShape, handleSetSort };
};
