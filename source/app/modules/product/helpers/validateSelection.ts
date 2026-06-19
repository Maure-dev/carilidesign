import type { ProductType } from "@app/modules/main/entities/entities";
import type { ProductSelectionType, ValidationType } from "@app/modules/product/entities/entities";

// Función pura: valida opciones requeridas y el largo máximo del grabado.
export function validateSelection(
  product: ProductType,
  selection: ProductSelectionType
): ValidationType {
  const errors: Record<string, string> = {};

  for (const option of product.customizationOptions) {
    const value = selection[option.id];

    if (option.required) {
      if (option.control === "text") {
        if (!value?.trim()) {
          errors[option.id] = "Requerido";
        }
      } else if (!value) {
        errors[option.id] = "Elegí una opción";
      }
    }

    if (option.control === "text" && option.maxLength && value && value.length > option.maxLength) {
      errors[option.id] = `Máximo ${option.maxLength} caracteres`;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors: errors };
}

// Snapshot legible de la selección para el carrito (label de opción -> label elegido).
export function buildSelectionSnapshot(
  product: ProductType,
  selection: ProductSelectionType
): Record<string, string> {
  const snapshot: Record<string, string> = {};

  for (const option of product.customizationOptions) {
    const value = selection[option.id];
    if (!value) {
      continue;
    }
    if (option.control === "text") {
      if (value.trim()) {
        snapshot[option.label] = value.trim();
      }
    } else {
      const choice = option.choices.find((c) => c.id === value);
      if (choice) {
        snapshot[option.label] = choice.label;
      }
    }
  }

  return snapshot;
}
