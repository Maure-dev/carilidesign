import type { CartItemType } from "@app/modules/main/entities/entities";
import { CART_STORAGE_KEY } from "@app/modules/main/constants/constants";

// Funciones puras de (de)serialización del carrito a localStorage. Toleran JSON inválido.
export function loadCartItems(): CartItemType[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as CartItemType[];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItemType[]): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* noop: localStorage no disponible (modo privado, etc.) */
  }
}
