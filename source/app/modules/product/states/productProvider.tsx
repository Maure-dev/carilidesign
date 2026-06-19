import type { ChildrenType } from "@app/modules/main/entities/entities";
import type { ProductDataType } from "@app/modules/product/entities/entities";
import { useContext, useState } from "react";
import { INITIAL_STATE } from "@app/modules/product/constants/constants";
import { ProductContext } from "./productContext";

export default function ProductProvider({ children }: ChildrenType) {
  const [getProductState, setProductState] = useState<ProductDataType>(
    INITIAL_STATE.PRODUCT_PAGE as ProductDataType
  );

  return (
    <ProductContext.Provider
      value={{ getProductState: getProductState, setProductState: setProductState }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProductProvider = () => {
  return useContext(ProductContext);
};
