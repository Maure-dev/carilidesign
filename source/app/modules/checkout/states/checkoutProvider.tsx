import { INITIAL_STATE } from "@app/modules/checkout/constants/constants";
import type { CheckoutDataType } from "@app/modules/checkout/entities/entities";
import { loadCheckout, saveCheckout } from "@app/modules/checkout/helpers/checkoutStorage";
import type { ChildrenType } from "@app/modules/main/entities/entities";
import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "./checkoutContext";

export default function CheckoutProvider({ children }: ChildrenType) {
  // Hidratación sincrónica desde localStorage: no se pierden los datos de envío/método
  // al navegar el stepper (volver al carrito y avanzar de nuevo).
  const [getCheckoutState, setCheckoutState] = useState<CheckoutDataType>(() => {
    const base = INITIAL_STATE.CHECKOUT_PAGE as CheckoutDataType;
    const saved = loadCheckout();
    if (!saved) {
      return base;
    }
    return {
      ...base,
      form: { ...base.form, ...saved.form },
      method: saved.method ?? base.method,
      shippingMethodId: saved.shippingMethodId ?? base.shippingMethodId
    };
  });

  // Persistir los datos cargados en cada cambio.
  useEffect(() => {
    saveCheckout({
      form: getCheckoutState.form,
      method: getCheckoutState.method,
      shippingMethodId: getCheckoutState.shippingMethodId
    });
  }, [getCheckoutState.form, getCheckoutState.method, getCheckoutState.shippingMethodId]);

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
