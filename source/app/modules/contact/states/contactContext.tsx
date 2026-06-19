import type { ContactContextType } from "@app/modules/contact/entities/entities";
import { createContext } from "react";

export const ContactContext = createContext<ContactContextType | null>(null);
