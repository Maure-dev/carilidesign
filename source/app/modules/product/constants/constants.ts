import type { ProductDataType } from "@app/modules/product/entities/entities";

export const INITIAL_STATE = {
  PRODUCT_PAGE: {
    loading: true,
    product: null,
    galleryIndex: 0,
    selection: {},
    quantity: 1,
    error: null
  } satisfies ProductDataType
};
