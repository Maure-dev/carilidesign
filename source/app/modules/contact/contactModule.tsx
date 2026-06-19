import { useEffect } from "react";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useContactProvider } from "@app/modules/contact/states/contactProvider";
import { useContactActions } from "@app/modules/contact/hooks/useContactActions";
import ContactFormInterface from "@app/modules/contact/interfaces/contactFormInterface";
import ContactInfoInterface from "@app/modules/contact/interfaces/contactInfoInterface";

export default function ContactModule() {
  const { getContactState } = useContactProvider();
  const { handleLoadInfo, handleChangeField, handleSubmit } = useContactActions();
  const state = getContactState;

  useDocumentHead({
    title: "Contacto",
    description: "Escribinos para encargar tu bacha o resolver cualquier duda."
  });

  useEffect(() => {
    handleLoadInfo();
  }, []);

  return (
    <section className="mx-auto grid max-w-4xl gap-10 px-4 py-12 md:grid-cols-[1fr_16rem]">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-4xl text-ink">Contacto</h1>
        <p className="text-ink-soft">
          Contanos qué pieza buscás o hacé tu consulta. Te respondemos a la brevedad.
        </p>
        <ContactFormInterface state={state} onChange={handleChangeField} onSubmit={handleSubmit} />
      </div>
      <aside>
        <ContactInfoInterface info={state.info} />
      </aside>
    </section>
  );
}
