import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

type Props = {
  quantity: number;
  onQuantity: (quantity: number) => void;
  onAdd: () => void;
};

export default function AddToCartInterface({ quantity, onQuantity, onAdd }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-buttons border border-sand">
        <button
          type="button"
          onClick={() => onQuantity(quantity - 1)}
          aria-label="Restar cantidad"
          className="px-3 py-2 text-ink-soft hover:text-ink"
        >
          −
        </button>
        <span className="min-w-8 text-center text-sm">{quantity}</span>
        <button
          type="button"
          onClick={() => onQuantity(quantity + 1)}
          aria-label="Sumar cantidad"
          className="px-3 py-2 text-ink-soft hover:text-ink"
        >
          +
        </button>
      </div>
      <ButtonInterface onClick={onAdd} block>
        Agregar al carrito
      </ButtonInterface>
    </div>
  );
}
