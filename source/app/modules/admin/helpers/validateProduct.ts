import type { ProductDraftType } from "@app/modules/admin/entities/entities";

// Función pura: valida el formulario de producto. Devuelve errores por campo.
export function validateProduct(
  draft: ProductDraftType
): Partial<Record<keyof ProductDraftType, string>> {
  const errors: Partial<Record<keyof ProductDraftType, string>> = {};

  if (draft.name.trim().length < 2) {
    errors.name = "Ingresá un nombre";
  }
  if (draft.slug.trim().length < 2) {
    errors.slug = "Ingresá un slug (URL)";
  }
  if (!Number.isFinite(draft.priceArs) || draft.priceArs <= 0) {
    errors.priceArs = "Precio inválido";
  }
  if (!Number.isInteger(draft.stock) || draft.stock < 0) {
    errors.stock = "Stock inválido";
  }
  if (draft.isActive && draft.images.length === 0) {
    errors.images = "Agregá al menos una imagen para publicar";
  }

  return errors;
}
