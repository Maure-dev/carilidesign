import type { CheckoutDataType } from "@app/modules/checkout/entities/entities";

// Clave para persistir el progreso del checkout (datos de envío + método) entre navegaciones.
export const CHECKOUT_STORAGE_KEY = "carili_checkout_v1";

export const INITIAL_STATE = {
  CHECKOUT_PAGE: {
    step: "shipping",
    form: {
      fullName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      notes: ""
    },
    method: "mercadopago",
    shippingOptions: [],
    shippingMethodId: null,
    submitting: false,
    errors: {}
  } satisfies CheckoutDataType
};
