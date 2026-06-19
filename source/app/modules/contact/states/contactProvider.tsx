import type { ChildrenType } from "@app/modules/main/entities/entities";
import type { ContactDataType } from "@app/modules/contact/entities/entities";
import { useContext, useState } from "react";
import { INITIAL_STATE } from "@app/modules/contact/constants/constants";
import { ContactContext } from "./contactContext";

export default function ContactProvider({ children }: ChildrenType) {
  const [getContactState, setContactState] = useState<ContactDataType>(
    INITIAL_STATE.CONTACT_PAGE as ContactDataType
  );

  return (
    <ContactContext.Provider
      value={{ getContactState: getContactState, setContactState: setContactState }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export const useContactProvider = () => {
  return useContext(ContactContext);
};
