import type { ProductType } from "@app/modules/main/entities/entities";
import type { Dispatch, SetStateAction } from "react";

// Selección de personalización: optionId -> choiceId (select/swatch) o texto (engraving).
export type ProductSelectionType = Record<string, string>;

export type ValidationType = {
  valid: boolean;
  errors: Record<string, string>;
};

export type ProductDataType = {
  loading: boolean;
  product: ProductType | null;
  galleryIndex: number;
  selection: ProductSelectionType;
  quantity: number;
  error: string | null;
};

export type ProductContextType = {
  getProductState: ProductDataType;
  setProductState: Dispatch<SetStateAction<ProductDataType>>;
};
