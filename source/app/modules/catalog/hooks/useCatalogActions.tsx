import type { CatalogSortType } from "@app/modules/catalog/entities/entities";
import { useCatalogProvider } from "@app/modules/catalog/states/catalogProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { getActiveProducts } from "@app/modules/catalog/services/services";

export const useCatalogActions = () => {
  const { setCatalogState } = useCatalogProvider();
  const { onNotification } = useNotification();

  const handleLoadProducts = async (): Promise<void> => {
    setCatalogState((s) => ({ ...s, loading: true }));
    try {
      const all = await getActiveProducts();
      setCatalogState((s) => ({ ...s, all: all, loading: false }));
    } catch {
      onNotification(false, "No se pudieron cargar los productos.");
      setCatalogState((s) => ({ ...s, loading: false, error: "load_error" }));
    }
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
