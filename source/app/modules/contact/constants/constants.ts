import type { ContactDataType } from "@app/modules/contact/entities/entities";

export const INITIAL_STATE = {
  CONTACT_PAGE: {
    form: { name: "", email: "", message: "" },
    errors: {},
    sending: false,
    sent: false,
    info: null
  } satisfies ContactDataType
};
