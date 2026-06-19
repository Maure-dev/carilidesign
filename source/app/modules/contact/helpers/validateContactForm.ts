import type { ContactFormType } from "@app/modules/contact/entities/entities";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función pura: valida el formulario de contacto.
export function validateContactForm(
  form: ContactFormType
): Partial<Record<keyof ContactFormType, string>> {
  const errors: Partial<Record<keyof ContactFormType, string>> = {};

  if (form.name.trim().length < 2) {
    errors.name = "Ingresá tu nombre";
  }
  if (!EMAIL_RE.test(form.email)) {
    errors.email = "Email inválido";
  }
  const message = form.message.trim();
  if (message.length < 10) {
    errors.message = "El mensaje es muy corto (mínimo 10 caracteres)";
  } else if (message.length > 2000) {
    errors.message = "El mensaje es muy largo (máximo 2000 caracteres)";
  }

  return errors;
}
