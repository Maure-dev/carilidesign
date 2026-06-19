import type { Dispatch, ReactNode, SetStateAction } from "react";

// Tipo compartido por todos los providers de la app.
export type ChildrenType = { children: ReactNode };

// ── Tipos de dominio compartidos (union types, sin enum) ──

// Estado de fulfillment del pedido (negocio).
export type OrderStatusType =
  | "pending_payment"
  | "paid"
  | "in_production"
  | "shipped"
  | "delivered"
  | "cancelled";

// Estado del pago (espeja MP o la confirmación manual del admin).
export type PaymentStatusType = "pending" | "in_review" | "paid" | "rejected" | "refunded";

// Método de pago elegido por el cliente.
export type PaymentMethodType = "mercadopago" | "cash" | "bank_transfer";

// Estados que puede devolver Mercado Pago.
export type MpStatusType =
  | "approved"
  | "pending"
  | "in_process"
  | "rejected"
  | "refunded"
  | "cancelled"
  | "charged_back";

export type UserRoleType = "user" | "admin";

// Monto en pesos argentinos (entero). Única convención monetaria del proyecto.
export type MoneyType = { amount: number; currency: "ARS" };

export type ImageType = {
  url: string;
  alt: string;
  order?: number;
  isPrimary?: boolean;
};

// Custom claims del token de Firebase Auth.
export type AdminClaimsType = { admin?: boolean };

// ── Producto (dominio compartido: catálogo, detalle, home, carrito, admin) ──

export type CustomizationOptionKindType = "size" | "glaze" | "shape" | "engraving";
export type CustomizationControlType = "select" | "swatch" | "text";

export type CustomizationChoiceType = {
  id: string;
  label: string;
  priceDelta: number; // ARS entero, se suma al precio base
  swatchColor?: string; // color para el control 'swatch'
};

export type CustomizationOptionType = {
  id: string;
  kind: CustomizationOptionKindType;
  control: CustomizationControlType;
  label: string;
  required: boolean;
  choices: CustomizationChoiceType[];
  maxLength?: number; // para grabado (control 'text')
};

export type ProductDimensionsType = {
  widthCm: number;
  depthCm: number;
  heightCm: number;
};

export type ProductType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: string;
  shape?: string;
  baseColor?: string;
  priceArs: number; // ARS entero
  images: ImageType[];
  customizationOptions: CustomizationOptionType[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  dimensions?: ProductDimensionsType;
  material?: string;
  createdAt?: string;
  updatedAt?: string;
};

// ── Sesión global ──

export type AuthStatusType = "loading" | "authenticated" | "guest";

export type CurrentUserType = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
};

export type SessionType = {
  status: AuthStatusType;
  user: CurrentUserType | null;
};

// ── Carrito global ──

// Snapshot de la personalización elegida (informativo; el monto real se recalcula en server).
export type CartItemOptionsType = Record<string, string>;

export type CartItemType = {
  id: string; // clave de línea (productId + opciones)
  productId: string;
  slug?: string;
  name: string;
  image?: string;
  unitPrice: number; // ARS entero, snapshot informativo
  quantity: number;
  options?: CartItemOptionsType;
};

export type CartType = {
  items: CartItemType[];
  hydrated: boolean;
};

// ── Notificación global (toast) ──

export type NotificationType = {
  open: boolean;
  status: boolean;
  message: string;
};

// ── Estado y contexto del módulo main ──

export type MainDataType = {
  notification: NotificationType;
  session: SessionType;
  cart: CartType;
};

export type MainContextType = {
  getMainState: MainDataType;
  setMainState: Dispatch<SetStateAction<MainDataType>>;
};
