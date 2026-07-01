import type { ProductType } from "@app/modules/main/entities/entities";
import type { Dispatch, SetStateAction } from "react";

export type CatalogSortType = "newest" | "priceAsc" | "priceDesc" | "name";

export type CatalogFiltersType = {
  search: string;
  shape: string | null;
};

export type CatalogDataType = {
  loading: boolean;
  all: ProductType[];
  filters: CatalogFiltersType;
  sort: CatalogSortType;
  error: string | null;
};

export type CatalogContextType = {
  getCatalogState: CatalogDataType;
  setCatalogState: Dispatch<SetStateAction<CatalogDataType>>;
};
