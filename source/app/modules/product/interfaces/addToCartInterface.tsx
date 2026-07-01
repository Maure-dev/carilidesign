import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import IconButtonInterface from "@app/modules/main/interfaces/iconButtonInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import { Minus, Plus, ShoppingCart } from "lucide-react";

type Props = {
  quantity: number;
  stock: number;
  onQuantity: (quantity: number) => void;
  onAdd: () => void;
};

export default function AddToCartInterface({ quantity, stock, onQuantity, onAdd }: Props) {
  const outOfStock = stock <= 0;
  const atMax = quantity >= stock;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-buttons border border-sand">
          <IconButtonInterface
            label="Restar cantidad"
            size="sm"
            disabled={outOfStock || quantity <= 1}
            onClick={() => onQuantity(quantity - 1)}
          >
            <IconInterface icon={Minus} size="sm" />
          </IconButtonInterface>
          <span className="min-w-8 text-center text-sm">{quantity}</span>
          <IconButtonInterface
            label="Sumar cantidad"
            size="sm"
            disabled={outOfStock || atMax}
            onClick={() => onQuantity(Math.min(stock, quantity + 1))}
          >
            <IconInterface icon={Plus} size="sm" />
          </IconButtonInterface>
        </div>
        <ButtonInterface onClick={onAdd} block disabled={outOfStock}>
          <IconInterface icon={ShoppingCart} size="sm" />
          {outOfStock ? "Sin stock" : "Agregar al carrito"}
        </ButtonInterface>
      </div>
      {!outOfStock && atMax && (
        <span className="text-xs text-ink-soft">Máximo disponible: {stock}</span>
      )}
    </div>
  );
}
