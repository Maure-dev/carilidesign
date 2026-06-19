import type { AdminDataType, ProductDraftType } from "@app/modules/admin/entities/entities";

export const EMPTY_DRAFT: ProductDraftType = {
  name: "",
  slug: "",
  description: "",
  category: "bachas",
  shape: "redonda",
  priceArs: 0,
  stock: 0,
  isActive: false,
  isFeatured: false,
  images: []
};

export const INITIAL_STATE = {
  ADMIN_PAGE: {
    tab: "products",
    loading: false,
    products: [],
    draft: null,
    saving: false,
    orders: [],
    content: { heroTitle: "", heroSubtitle: "", aboutText: "" },
    messages: []
  } satisfies AdminDataType
};
