import type { ShippingFormType } from "@app/modules/checkout/entities/entities";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función pura: valida los datos de envío. Devuelve un mapa de errores por campo.
export function validateCheckout(
  form: ShippingFormType
): Partial<Record<keyof ShippingFormType, string>> {
  const errors: Partial<Record<keyof ShippingFormType, string>> = {};

  if (form.fullName.trim().length < 2) {
    errors.fullName = "Ingresá tu nombre completo";
  }
  if (!EMAIL_RE.test(form.email)) {
    errors.email = "Email inválido";
  }
  if (form.phone.trim().length < 6) {
    errors.phone = "Ingresá un teléfono de contacto";
  }
  if (form.street.trim().length < 3) {
    errors.street = "Ingresá la dirección";
  }
  if (form.city.trim().length < 2) {
    errors.city = "Ingresá la localidad";
  }
  if (form.province.trim().length < 2) {
    errors.province = "Ingresá la provincia";
  }
  if (form.postalCode.trim().length < 3) {
    errors.postalCode = "Ingresá el código postal";
  }

  return errors;
}
