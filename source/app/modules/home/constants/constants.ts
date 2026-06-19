import type { HomeContentType, HomeDataType } from "@app/modules/home/entities/entities";
import { SITE_DEFAULTS } from "@app/modules/main/helpers/siteContent";

// Fuente única del contenido del sitio: vive en main (código), editable desde Admin.
export const DEFAULT_HOME_CONTENT = SITE_DEFAULTS.home as unknown as HomeContentType;

export const INITIAL_STATE = {
  HOME_PAGE: {
    loading: true,
    featured: [],
    content: DEFAULT_HOME_CONTENT,
    error: null
  } satisfies HomeDataType
};
