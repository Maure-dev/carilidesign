import type { ContactDataType, ContactFormType } from "@app/modules/contact/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import FieldInterface from "@app/modules/main/interfaces/fieldInterface";
import { InputInterface, TextareaInterface } from "@app/modules/main/interfaces/inputInterface";

type Props = {
  state: ContactDataType;
  onChange: (field: keyof ContactFormType, value: string) => void;
  onSubmit: () => void;
};

export default function ContactFormInterface({ state, onChange, onSubmit }: Props) {
  const { form, errors, sending } = state;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <FieldInterface label="Nombre" error={errors.name} required>
        <InputInterface value={form.name} onChange={(e) => onChange("name", e.target.value)} />
      </FieldInterface>
      <FieldInterface label="Email" error={errors.email} required>
        <InputInterface
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </FieldInterface>
      <FieldInterface label="Mensaje" error={errors.message} required>
        <TextareaInterface
          rows={5}
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
        />
      </FieldInterface>
      <ButtonInterface type="submit" loading={sending}>
        {sending ? "Enviando..." : "Enviar mensaje"}
      </ButtonInterface>
    </form>
  );
}
