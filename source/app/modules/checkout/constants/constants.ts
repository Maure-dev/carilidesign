import type { CheckoutDataType } from "@app/modules/checkout/entities/entities";

// Datos de pago por defecto (los edita el admin en siteContent/payment).
export const DEFAULT_PAYMENT_INFO = {
  bankName: "Banco (a configurar)",
  accountName: "Carili Design",
  cbu: "0000000000000000000000",
  alias: "carili.design",
  cashNote: "Coordinamos la entrega y el pago en efectivo por WhatsApp tras tu pedido."
};

export const INITIAL_STATE = {
  CHECKOUT_PAGE: {
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
    submitting: false,
    errors: {}
  } satisfies CheckoutDataType
};
