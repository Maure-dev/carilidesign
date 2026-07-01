import { INITIAL_STATE } from "@app/modules/catalog/constants/constants";
import type { CatalogDataType } from "@app/modules/catalog/entities/entities";
import type { ChildrenType } from "@app/modules/main/entities/entities";
import { useContext, useState } from "react";
import { CatalogContext } from "./catalogContext";

export default function CatalogProvider({ children }: ChildrenType) {
  const [getCatalogState, setCatalogState] = useState<CatalogDataType>(
    INITIAL_STATE.CATALOG_PAGE as CatalogDataType
  );

  return (
    <CatalogContext.Provider
      value={{ getCatalogState: getCatalogState, setCatalogState: setCatalogState }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export const useCatalogProvider = () => {
  return useContext(CatalogContext);
};
