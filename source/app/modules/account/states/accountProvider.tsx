import type { ChildrenType } from "@app/modules/main/entities/entities";
import type { AccountDataType } from "@app/modules/account/entities/entities";
import { useContext, useState } from "react";
import { INITIAL_STATE } from "@app/modules/account/constants/constants";
import { AccountContext } from "./accountContext";

export default function AccountProvider({ children }: ChildrenType) {
  const [getAccountState, setAccountState] = useState<AccountDataType>(
    INITIAL_STATE.ACCOUNT_PAGE as AccountDataType
  );

  return (
    <AccountContext.Provider
      value={{ getAccountState: getAccountState, setAccountState: setAccountState }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export const useAccountProvider = () => {
  return useContext(AccountContext);
};
