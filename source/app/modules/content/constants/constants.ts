import type { ContentDataType } from "@app/modules/content/entities/entities";

// Mapeo ruta -> slug del documento de contenido (el contenido vive en main/siteContent).
export const ROUTE_TO_SLUG: Record<string, string> = {
  "/nosotros": "about",
  "/materiales-y-proceso": "materials",
  "/como-instalar": "install",
  "/como-lavar": "care",
  "/preguntas-frecuentes": "faq"
};

export const INITIAL_STATE = {
  CONTENT_PAGE: {
    loading: true,
    page: null,
    error: null
  } satisfies ContentDataType
};
