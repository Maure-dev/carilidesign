import type { MainDataType } from "@app/modules/main/entities/entities";

// Clave de persistencia del carrito en localStorage.
export const CART_STORAGE_KEY = "carili_cart_v1";

export const INITIAL_STATE = {
  MAIN_PAGE: {
    notification: { open: false, status: true, message: "" },
    session: { status: "loading", user: null },
    cart: { items: [], hydrated: false },
    site: { status: "loading", content: {}, products: [] }
  } satisfies MainDataType
};
