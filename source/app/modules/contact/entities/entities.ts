import type { Dispatch, SetStateAction } from "react";

export type ContactFormType = {
  name: string;
  email: string;
  message: string;
};

export type ContactInfoType = {
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  mapEmbedUrl: string;
};

export type ContactDataType = {
  form: ContactFormType;
  errors: Partial<Record<keyof ContactFormType, string>>;
  sending: boolean;
  sent: boolean;
  info: ContactInfoType;
};

export type ContactContextType = {
  getContactState: ContactDataType;
  setContactState: Dispatch<SetStateAction<ContactDataType>>;
};
