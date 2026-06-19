import type { CatalogDataType } from "@app/modules/catalog/entities/entities";

export const INITIAL_STATE = {
  CATALOG_PAGE: {
    loading: true,
    all: [],
    filters: { search: "", shape: null },
    sort: "newest",
    error: null
  } satisfies CatalogDataType
};
