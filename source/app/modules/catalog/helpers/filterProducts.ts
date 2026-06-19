import type { ProductType } from "@app/modules/main/entities/entities";
import type { CatalogFiltersType, CatalogSortType } from "@app/modules/catalog/entities/entities";

// Función pura: filtra por búsqueda/forma y ordena según el criterio elegido.
export function filterAndSort(
  products: ProductType[],
  filters: CatalogFiltersType,
  sort: CatalogSortType
): ProductType[] {
  const search = filters.search.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (filters.shape && p.shape !== filters.shape) {
      return false;
    }
    if (search && !`${p.name} ${p.description}`.toLowerCase().includes(search)) {
      return false;
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sort === "priceAsc") {
      return a.priceArs - b.priceArs;
    }
    if (sort === "priceDesc") {
      return b.priceArs - a.priceArs;
    }
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
}

// Lista de formas disponibles (para los chips de filtro).
export function availableShapes(products: ProductType[]): string[] {
  const set = new Set<string>();
  for (const p of products) {
    if (p.shape) {
      set.add(p.shape);
    }
  }
  return Array.from(set).sort();
}
