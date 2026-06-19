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

export type CheckoutDataType = {
  form: ShippingFormType;
  method: PaymentMethodType;
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
  paymentMethod: PaymentMethodType;
  subtotal: number;
  total: number;
};

export type CreatePreferenceResponseType = {
  initPoint: string;
  preferenceId: string;
};
