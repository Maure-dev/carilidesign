import type { Dispatch, SetStateAction } from "react";
import type {
  ImageType,
  OrderStatusType,
  PaymentMethodType,
  PaymentStatusType,
  ProductType
} from "@app/modules/main/entities/entities";

export type AdminTabType = "products" | "orders" | "content" | "messages";

export type ProductDraftType = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  shape: string;
  priceArs: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  images: ImageType[];
};

export type AdminOrderType = {
  id: string;
  orderNumber?: string;
  userId: string | null;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatusType;
  orderStatus: OrderStatusType;
};

export type AdminContentType = {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
};

export type AdminMessageType = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
};

export type AdminDataType = {
  tab: AdminTabType;
  loading: boolean;
  products: ProductType[];
  draft: ProductDraftType | null;
  saving: boolean;
  orders: AdminOrderType[];
  content: AdminContentType;
  messages: AdminMessageType[];
};

export type AdminContextType = {
  getAdminState: AdminDataType;
  setAdminState: Dispatch<SetStateAction<AdminDataType>>;
};
