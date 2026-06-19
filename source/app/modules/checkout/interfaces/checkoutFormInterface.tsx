import type { ShippingFormType } from "@app/modules/checkout/entities/entities";

type Props = {
  form: ShippingFormType;
  errors: Partial<Record<keyof ShippingFormType, string>>;
  onChange: (field: keyof ShippingFormType, value: string) => void;
};

const FIELDS: { name: keyof ShippingFormType; label: string; full?: boolean }[] = [
  { name: "fullName", label: "Nombre completo", full: true },
  { name: "email", label: "Email" },
  { name: "phone", label: "Teléfono" },
  { name: "street", label: "Dirección", full: true },
  { name: "city", label: "Localidad" },
  { name: "province", label: "Provincia" },
  { name: "postalCode", label: "Código postal" }
];

export default function CheckoutFormInterface({ form, errors, onChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map((field) => (
        <label
          key={field.name}
          className={`flex flex-col gap-1 ${field.full ? "sm:col-span-2" : ""}`}
        >
          <span className="text-sm text-ink">{field.label}</span>
          <input
            type="text"
            value={form[field.name]}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-clay"
          />
          {errors[field.name] && <span className="text-xs text-error">{errors[field.name]}</span>}
        </label>
      ))}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-sm text-ink">Notas (opcional)</span>
        <textarea
          value={form.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={3}
          className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-clay"
        />
      </label>
    </div>
  );
}
