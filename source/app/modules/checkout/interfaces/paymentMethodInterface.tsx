import type { PaymentMethodType } from "@app/modules/main/entities/entities";

type Props = {
  method: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
};

const METHODS: { value: PaymentMethodType; label: string; description: string }[] = [
  {
    value: "mercadopago",
    label: "Mercado Pago",
    description: "Tarjetas de crédito/débito y otros medios. Pago online seguro."
  },
  {
    value: "bank_transfer",
    label: "Transferencia bancaria",
    description: "Te enviamos los datos y subís el comprobante. Confirmamos al recibirlo."
  },
  {
    value: "cash",
    label: "Efectivo",
    description: "Coordinamos la entrega y el pago en efectivo."
  }
];

export default function PaymentMethodInterface({ method, onSelect }: Props) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-1 text-sm font-medium text-ink">Método de pago</legend>
      {METHODS.map((option) => (
        <label
          key={option.value}
          className={`flex cursor-pointer gap-3 rounded-card border p-4 transition-[color,background-color,border-color,box-shadow] hover:shadow-card ${
            method === option.value
              ? "border-clay bg-sand/40 shadow-card"
              : "border-sand hover:border-clay"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={option.value}
            checked={method === option.value}
            onChange={() => onSelect(option.value)}
            className="mt-1"
          />
          <span className="flex flex-col">
            <span className="font-medium text-ink">{option.label}</span>
            <span className="text-sm text-ink-soft">{option.description}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
