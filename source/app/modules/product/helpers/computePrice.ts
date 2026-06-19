import type { ProductType } from "@app/modules/main/entities/entities";
import type { ProductSelectionType } from "@app/modules/product/entities/entities";

// Función pura: precio = base + suma de priceDelta de las opciones seleccionadas.
// Para el grabado (control 'text'), el delta aplica sólo si hay texto.
export function computePrice(product: ProductType, selection: ProductSelectionType): number {
  let total = product.priceArs;

  for (const option of product.customizationOptions) {
    const value = selection[option.id];
    if (!value) {
      continue;
    }
    if (option.control === "text") {
      const choice = option.choices[0];
      if (choice && value.trim()) {
        total += choice.priceDelta;
      }
    } else {
      const choice = option.choices.find((c) => c.id === value);
      if (choice) {
        total += choice.priceDelta;
      }
    }
  }

  return total;
}
