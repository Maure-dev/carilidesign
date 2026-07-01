import { Minus, Plus, ShoppingCart } from "lucide-react";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import IconButtonInterface from "@app/modules/main/interfaces/iconButtonInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";

type Props = {
  quantity: number;
  onQuantity: (quantity: number) => void;
  onAdd: () => void;
};

export default function AddToCartInterface({ quantity, onQuantity, onAdd }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-buttons border border-sand">
        <IconButtonInterface
          label="Restar cantidad"
          size="sm"
          onClick={() => onQuantity(quantity - 1)}
        >
          <IconInterface icon={Minus} size="sm" />
        </IconButtonInterface>
        <span className="min-w-8 text-center text-sm">{quantity}</span>
        <IconButtonInterface
          label="Sumar cantidad"
          size="sm"
          onClick={() => onQuantity(quantity + 1)}
        >
          <IconInterface icon={Plus} size="sm" />
        </IconButtonInterface>
      </div>
      <ButtonInterface onClick={onAdd} block>
        <IconInterface icon={ShoppingCart} size="sm" />
        Agregar al carrito
      </ButtonInterface>
    </div>
  );
}
