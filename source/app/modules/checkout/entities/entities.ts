import type { Dispatch, SetStateAction } from "react";
import type { CartItemType, PaymentMethodType } from "@app/modules/main/entities/entities";

export type ShippingFormType = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
};

export type CheckoutStepType = "shipping" | "payment";

export type ShippingOptionType = {
  id: string;
  name: string;
  priceArs: number;
};

export type CheckoutDataType = {
  step: CheckoutStepType;
  form: ShippingFormType;
  method: PaymentMethodType;
  shippingOptions: ShippingOptionType[];
  shippingMethodId: string | null;
  submitting: boolean;
  errors: Partial<Record<keyof ShippingFormType, string>>;
};

export type CheckoutContextType = {
  getCheckoutState: CheckoutDataType;
  setCheckoutState: Dispatch<SetStateAction<CheckoutDataType>>;
};

// Borrador del pedido que se envía a createOrder.
export type OrderDraftType = {
  userId: string | null;
  items: CartItemType[];
  shipping: ShippingFormType;
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: PaymentMethodType;
  subtotal: number;
  total: number;
};

export type CreatePreferenceResponseType = {
  initPoint: string;
  preferenceId: string;
};
