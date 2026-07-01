import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemType } from "@app/modules/main/entities/entities";
import LazyImageInterface from "@app/modules/main/interfaces/lazyImageInterface";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";
import IconButtonInterface from "@app/modules/main/interfaces/iconButtonInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";

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
          <IconButtonInterface
            label="Quitar producto"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="hover:text-error"
          >
            <IconInterface icon={Trash2} size="sm" />
          </IconButtonInterface>
        </div>
        {item.options &&
          Object.entries(item.options).map(([key, value]) => (
            <span key={key} className="text-xs text-ink-soft">
              {key}: {value}
            </span>
          ))}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-buttons border border-sand">
            <IconButtonInterface
              label="Restar cantidad"
              size="sm"
              onClick={() => onQuantity(item.id, item.quantity - 1)}
            >
              <IconInterface icon={Minus} size="sm" />
            </IconButtonInterface>
            <span className="min-w-8 text-center text-sm">{item.quantity}</span>
            <IconButtonInterface
              label="Sumar cantidad"
              size="sm"
              onClick={() => onQuantity(item.id, item.quantity + 1)}
            >
              <IconInterface icon={Plus} size="sm" />
            </IconButtonInterface>
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
