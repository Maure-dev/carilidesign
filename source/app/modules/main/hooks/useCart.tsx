import type { CartItemOptionsType } from "@app/modules/main/entities/entities";
import { useMainProvider } from "@app/modules/main/states/mainProvider";

type AddItemInput = {
  productId: string;
  slug?: string;
  name: string;
  image?: string;
  unitPrice: number;
  options?: CartItemOptionsType;
};

// Clave de línea determinística: mismo producto + mismas opciones => misma línea.
function buildLineId(productId: string, options?: CartItemOptionsType): string {
  if (!options) {
    return productId;
  }
  const ordered = Object.keys(options)
    .sort()
    .map((key) => `${key}:${options[key]}`)
    .join("|");
  return ordered ? `${productId}#${ordered}` : productId;
}

// Hook compartido del carrito. El estado vive en MainData (un único useState del módulo main).
export const useCart = () => {
  const { getMainState, setMainState } = useMainProvider();
  const { items } = getMainState.cart;

  const addItem = (input: AddItemInput, quantity = 1): void => {
    const id = buildLineId(input.productId, input.options);
    setMainState((s) => {
      const existing = s.cart.items.find((it) => it.id === id);
      const nextItems = existing
        ? s.cart.items.map((it) =>
            it.id === id ? { ...it, quantity: it.quantity + quantity } : it
          )
        : [...s.cart.items, { ...input, id: id, quantity: quantity }];
      return { ...s, cart: { ...s.cart, items: nextItems } };
    });
  };

  const updateQuantity = (id: string, quantity: number): void => {
    setMainState((s) => ({
      ...s,
      cart: {
        ...s.cart,
        items:
          quantity <= 0
            ? s.cart.items.filter((it) => it.id !== id)
            : s.cart.items.map((it) => (it.id === id ? { ...it, quantity: quantity } : it))
      }
    }));
  };

  const removeItem = (id: string): void => {
    setMainState((s) => ({
      ...s,
      cart: { ...s.cart, items: s.cart.items.filter((it) => it.id !== id) }
    }));
  };

  const clearCart = (): void => {
    setMainState((s) => ({ ...s, cart: { ...s.cart, items: [] } }));
  };

  const getCount = (): number => items.reduce((acc, it) => acc + it.quantity, 0);
  const getTotal = (): number => items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  return { items, addItem, updateQuantity, removeItem, clearCart, getCount, getTotal };
};
