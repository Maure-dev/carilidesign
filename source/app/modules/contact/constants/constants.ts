import type { ContactDataType, ContactInfoType } from "@app/modules/contact/entities/entities";
import { SITE_DEFAULTS } from "@app/modules/main/helpers/siteContent";

// Fuente única del contenido del sitio: vive en main (código), editable desde Admin.
export const DEFAULT_CONTACT_INFO = SITE_DEFAULTS.contact as unknown as ContactInfoType;

export const INITIAL_STATE = {
  CONTACT_PAGE: {
    form: { name: "", email: "", message: "" },
    errors: {},
    sending: false,
    sent: false,
    info: DEFAULT_CONTACT_INFO
  } satisfies ContactDataType
};
