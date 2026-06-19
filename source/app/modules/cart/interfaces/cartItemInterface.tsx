import type { CartItemType } from "@app/modules/main/entities/entities";
import LazyImageInterface from "@app/modules/main/interfaces/lazyImageInterface";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";

type Props = {
  item: CartItemType;
  onQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItemInterface({ item, onQuantity, onRemove }: Props) {
  return (
    <div className="flex gap-4 border-b border-sand py-4">
      {item.image && (
        <LazyImageInterface
          src={item.image}
          alt={item.name}
          className="h-24 w-20 rounded-buttons object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-ink">{item.name}</h3>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-sm text-ink-soft hover:text-error"
          >
            Quitar
          </button>
        </div>
        {item.options &&
          Object.entries(item.options).map(([key, value]) => (
            <span key={key} className="text-xs text-ink-soft">
              {key}: {value}
            </span>
          ))}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-buttons border border-sand">
            <button
              type="button"
              onClick={() => onQuantity(item.id, item.quantity - 1)}
              aria-label="Restar cantidad"
              className="px-2 py-1 text-ink-soft hover:text-ink"
            >
              −
            </button>
            <span className="min-w-8 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onQuantity(item.id, item.quantity + 1)}
              aria-label="Sumar cantidad"
              className="px-2 py-1 text-ink-soft hover:text-ink"
            >
              +
            </button>
          </div>
          <PriceInterface
            amount={item.unitPrice * item.quantity}
            className="font-display text-clay-deep"
          />
        </div>
      </div>
    </div>
  );
}
