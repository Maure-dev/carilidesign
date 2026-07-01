import type { ShippingOptionType } from "@app/modules/checkout/entities/entities";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";

type Props = {
  options: ShippingOptionType[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function ShippingOptionsInterface({ options, selectedId, onSelect }: Props) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-1 text-sm font-medium text-ink">Envío</legend>
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex cursor-pointer items-center justify-between gap-3 rounded-card border p-4 transition-[color,background-color,border-color,box-shadow] hover:shadow-card ${
            selectedId === option.id
              ? "border-clay bg-sand/40 shadow-card"
              : "border-sand hover:border-clay"
          }`}
        >
          <span className="flex items-center gap-3">
            <input
              type="radio"
              name="shipping"
              value={option.id}
              checked={selectedId === option.id}
              onChange={() => onSelect(option.id)}
            />
            <span className="text-ink">{option.name}</span>
          </span>
          <span className="text-sm text-ink-soft">
            {option.priceArs === 0 ? "Gratis" : <PriceInterface amount={option.priceArs} />}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
