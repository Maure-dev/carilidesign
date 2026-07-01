import type { ContactFormType, ContactInfoType } from "@app/modules/contact/entities/entities";
import { validateContactForm } from "@app/modules/contact/helpers/validateContactForm";
import { saveContactMessage, sendContactEmail } from "@app/modules/contact/services/services";
import { useContactProvider } from "@app/modules/contact/states/contactProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useSiteContent } from "@app/modules/main/hooks/useSiteContent";

export const useContactActions = () => {
  const { getContactState, setContactState } = useContactProvider();
  const { onNotification } = useNotification();
  const { getSection } = useSiteContent();

  // La info de contacto ya vino en el bootstrap: se lee del store global.
  const handleLoadInfo = (): void => {
    const info = getSection<ContactInfoType>("contact");
    setContactState((s) => ({ ...s, info: info }));
  };

  const handleChangeField = (field: keyof ContactFormType, value: string): void => {
    setContactState((s) => ({
      ...s,
      form: { ...s.form, [field]: value },
      errors: { ...s.errors, [field]: undefined }
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    const { form } = getContactState;
    const errors = validateContactForm(form);
    if (Object.keys(errors).length > 0) {
      setContactState((s) => ({ ...s, errors: errors }));
      return;
    }
    setContactState((s) => ({ ...s, sending: true }));
    try {
      await saveContactMessage(form);
      // El email es best-effort: si falla, el mensaje ya quedó guardado.
      await sendContactEmail(form).catch(() => undefined);
      setContactState((s) => ({
        ...s,
        sending: false,
        sent: true,
        form: { name: "", email: "", message: "" }
      }));
      onNotification(true, "¡Gracias! Tu mensaje fue enviado.");
    } catch {
      onNotification(false, "No se pudo enviar el mensaje. Probá de nuevo.");
      setContactState((s) => ({ ...s, sending: false }));
    }
  };

  return { handleLoadInfo, handleChangeField, handleSubmit };
};
