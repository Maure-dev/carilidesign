import type { ContactDataType, ContactFormType } from "@app/modules/contact/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

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
      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Nombre</span>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm outline-none focus:border-clay"
        />
        {errors.name && <span className="text-xs text-error">{errors.name}</span>}
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm outline-none focus:border-clay"
        />
        {errors.email && <span className="text-xs text-error">{errors.email}</span>}
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Mensaje</span>
        <textarea
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          rows={5}
          className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm outline-none focus:border-clay"
        />
        {errors.message && <span className="text-xs text-error">{errors.message}</span>}
      </label>
      <ButtonInterface type="submit" disabled={sending}>
        {sending ? "Enviando..." : "Enviar mensaje"}
      </ButtonInterface>
    </form>
  );
}
