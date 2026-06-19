import type { Dispatch, SetStateAction } from "react";
import type {
  CartItemType,
  OrderStatusType,
  PaymentMethodType,
  PaymentStatusType
} from "@app/modules/main/entities/entities";

export type OrderType = {
  id: string;
  orderNumber?: string;
  userId: string | null;
  items: CartItemType[];
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatusType;
  orderStatus: OrderStatusType;
  createdAt?: unknown;
  paidAt?: unknown;
};

export type AccountDataType = {
  loading: boolean;
  orders: OrderType[];
  selected: OrderType | null;
};

export type AccountContextType = {
  getAccountState: AccountDataType;
  setAccountState: Dispatch<SetStateAction<AccountDataType>>;
};
