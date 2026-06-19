import type {
  AdminContentSectionType,
  AdminDataType,
  ProductDraftType
} from "@app/modules/admin/entities/entities";

export const EMPTY_DRAFT: ProductDraftType = {
  name: "",
  slug: "",
  description: "",
  category: "bachas",
  shape: "redonda",
  priceArs: 0,
  stock: 0,
  isActive: false,
  isFeatured: false,
  images: []
};

// Secciones del sitio editables desde el panel. El slug es el doc en siteContent/{slug}
// que cada módulo del front ya lee (con fallback a sus valores por defecto).
export const CONTENT_SECTIONS: AdminContentSectionType[] = [
  { slug: "home", label: "Inicio", kind: "home" },
  { slug: "about", label: "Nosotros", kind: "page" },
  { slug: "materials", label: "Materiales y proceso", kind: "page" },
  { slug: "install", label: "¿Cómo la instalo?", kind: "page" },
  { slug: "care", label: "¿Cómo la lavo?", kind: "page" },
  { slug: "faq", label: "Preguntas frecuentes", kind: "faq" },
  { slug: "contact", label: "Contacto", kind: "contact" },
  { slug: "payment", label: "Datos de pago", kind: "payment" },
  { slug: "shipping", label: "Envío y costos", kind: "shipping" }
];

export const INITIAL_STATE = {
  ADMIN_PAGE: {
    tab: "products",
    loading: false,
    products: [],
    draft: null,
    saving: false,
    orders: [],
    contentSlug: "home",
    contentDoc: {},
    messages: []
  } satisfies AdminDataType
};
