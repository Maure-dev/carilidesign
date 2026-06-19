import { useEffect } from "react";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useContactProvider } from "@app/modules/contact/states/contactProvider";
import { useContactActions } from "@app/modules/contact/hooks/useContactActions";
import { getMapSrc } from "@app/modules/contact/helpers/mapSrc";
import ContactFormInterface from "@app/modules/contact/interfaces/contactFormInterface";
import ContactInfoInterface from "@app/modules/contact/interfaces/contactInfoInterface";

export default function ContactModule() {
  const { getContactState } = useContactProvider();
  const { handleLoadInfo, handleChangeField, handleSubmit } = useContactActions();
  const state = getContactState;
  const mapSrc = state.info ? getMapSrc(state.info.mapEmbedUrl) : null;

  useDocumentHead({
    title: "Contacto",
    description: "Escribinos para encargar tu bacha o resolver cualquier duda."
  });

  useEffect(() => {
    handleLoadInfo();
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid gap-10 md:grid-cols-[1fr_18rem]">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl text-ink">Contacto</h1>
          <p className="text-ink-soft">
            Contanos qué pieza buscás o hacé tu consulta. Te respondemos a la brevedad.
          </p>
          <ContactFormInterface
            state={state}
            onChange={handleChangeField}
            onSubmit={handleSubmit}
          />
        </div>
        <aside className="flex flex-col gap-4">
          {state.info && <ContactInfoInterface info={state.info} />}
          {/* Mapa: debajo de la información de contacto */}
          {mapSrc && (
            <iframe
              title="Mapa de ubicación"
              src={mapSrc}
              className="aspect-[4/3] w-full rounded-card border border-sand"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </aside>
      </div>
    </section>
  );
}
