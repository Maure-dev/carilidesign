import type { ChildrenType } from "@app/modules/main/entities/entities";
import type { CheckoutDataType } from "@app/modules/checkout/entities/entities";
import { useContext, useState } from "react";
import { INITIAL_STATE } from "@app/modules/checkout/constants/constants";
import { CheckoutContext } from "./checkoutContext";

export default function CheckoutProvider({ children }: ChildrenType) {
  const [getCheckoutState, setCheckoutState] = useState<CheckoutDataType>(
    INITIAL_STATE.CHECKOUT_PAGE as CheckoutDataType
  );

  return (
    <CheckoutContext.Provider
      value={{ getCheckoutState: getCheckoutState, setCheckoutState: setCheckoutState }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckoutProvider = () => {
  return useContext(CheckoutContext);
};
