import type {
  ImageType,
  OrderStatusType,
  PaymentMethodType,
  PaymentStatusType,
  ProductType
} from "@app/modules/main/entities/entities";
import type { Dispatch, SetStateAction } from "react";

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
  createdAt?: string;
};

// Tipo de editor según la sección de contenido.
export type AdminContentKindType =
  | "home"
  | "page"
  | "faq"
  | "contact"
  | "payment"
  | "shipping"
  | "brand"
  | "social"
  | "seo";

export type AdminUserType = {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin: boolean;
};

export type AdminContentSectionType = {
  slug: string;
  label: string;
  kind: AdminContentKindType;
};

export type AdminValuePropType = { title: string; text: string };
export type AdminFaqItemType = { question: string; answer: string };
export type AdminShippingOptionType = { id: string; name: string; priceArs: number };

// Documento de contenido editable (superset de todas las secciones de siteContent/{slug}).
// Cada formulario edita el subconjunto de campos que le corresponde.
export type AdminContentDocType = {
  // home
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  processTitle?: string;
  processText?: string;
  processImageUrl?: string;
  valueProps?: AdminValuePropType[];
  // páginas (about / materials / install / care)
  title?: string;
  intro?: string;
  body?: string[];
  imageUrl?: string;
  // faq
  faq?: AdminFaqItemType[];
  // contacto
  email?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  address?: string;
  mapEmbedUrl?: string;
  // pago (transferencia / efectivo)
  bankName?: string;
  accountName?: string;
  cbu?: string;
  alias?: string;
  cashNote?: string;
  // envío (correos con sus precios)
  options?: AdminShippingOptionType[];
  // marca / general
  tagline?: string;
  // redes sociales
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  // seo / metadatos
  seoTitle?: string;
  seoDescription?: string;
  seoImageUrl?: string;
};

export type AdminMessageType = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
};

export type AdminDataType = {
  loading: boolean;
  products: ProductType[];
  draft: ProductDraftType | null;
  saving: boolean;
  uploadingImage: boolean;
  orders: AdminOrderType[];
  contentSlug: string;
  contentDoc: AdminContentDocType;
  messages: AdminMessageType[];
  users: AdminUserType[];
};

export type AdminContextType = {
  getAdminState: AdminDataType;
  setAdminState: Dispatch<SetStateAction<AdminDataType>>;
};
