import type { ShippingFormType } from "@app/modules/checkout/entities/entities";
import FieldInterface from "@app/modules/main/interfaces/fieldInterface";
import { InputInterface, TextareaInterface } from "@app/modules/main/interfaces/inputInterface";

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
        <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
          <FieldInterface label={field.label} error={errors[field.name]}>
            <InputInterface
              value={form[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          </FieldInterface>
        </div>
      ))}
      <div className="sm:col-span-2">
        <FieldInterface label="Notas (opcional)">
          <TextareaInterface
            rows={3}
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </FieldInterface>
      </div>
    </div>
  );
}
