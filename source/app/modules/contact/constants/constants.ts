import type { ContactDataType, ContactInfoType } from "@app/modules/contact/entities/entities";

export const DEFAULT_CONTACT_INFO: ContactInfoType = {
  email: "hola@carilidesign.com",
  phone: "+54 9 11 0000-0000",
  whatsapp: "5491100000000",
  instagram: "carilidesign",
  address: "Buenos Aires, Argentina",
  mapEmbedUrl: ""
};

export const INITIAL_STATE = {
  CONTACT_PAGE: {
    form: { name: "", email: "", message: "" },
    errors: {},
    sending: false,
    sent: false,
    info: DEFAULT_CONTACT_INFO
  } satisfies ContactDataType
};
