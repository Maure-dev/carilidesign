import type { CheckoutDataType, ShippingOptionType } from "@app/modules/checkout/entities/entities";
import { SITE_DEFAULTS } from "@app/modules/main/helpers/siteContent";

// Clave para persistir el progreso del checkout (datos de envío + método) entre navegaciones.
export const CHECKOUT_STORAGE_KEY = "carili_checkout_v1";

// Opciones de envío por defecto (viven en código, editables desde Admin → main/siteContent).
export const DEFAULT_SHIPPING_OPTIONS = (SITE_DEFAULTS.shipping.options ??
  []) as ShippingOptionType[];

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
    shippingOptions: DEFAULT_SHIPPING_OPTIONS,
    shippingMethodId: null,
    submitting: false,
    errors: {}
  } satisfies CheckoutDataType
};
