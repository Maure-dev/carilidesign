import type { CartItemType, CurrentUserType } from "@app/modules/main/entities/entities";

// Factories de datos de dominio para tests. Se amplían por fase (product, order, etc.).

export function buildCartItem(overrides: Partial<CartItemType> = {}): CartItemType {
  return {
    id: "prod-1",
    productId: "prod-1",
    name: "Bacha de prueba",
    unitPrice: 25000,
    quantity: 1,
    ...overrides
  };
}

export function buildCurrentUser(overrides: Partial<CurrentUserType> = {}): CurrentUserType {
  return {
    uid: "uid-1",
    email: "test@carili.test",
    displayName: "Cliente de prueba",
    photoURL: null,
    isAdmin: false,
    ...overrides
  };
}
