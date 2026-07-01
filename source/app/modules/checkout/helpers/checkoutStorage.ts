import { CHECKOUT_STORAGE_KEY } from "@app/modules/checkout/constants/constants";
import type { CheckoutDataType } from "@app/modules/checkout/entities/entities";

// Sólo se persiste lo que el usuario cargó (datos de envío + método + envío elegido).
export type PersistedCheckoutType = Pick<CheckoutDataType, "form" | "method" | "shippingMethodId">;

export function loadCheckout(): PersistedCheckoutType | null {
  try {
    const raw = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }
    return parsed as PersistedCheckoutType;
  } catch {
    return null;
  }
}

export function saveCheckout(data: PersistedCheckoutType): void {
  try {
    window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* noop: localStorage no disponible */
  }
}
