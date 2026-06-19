import type { CartItemType } from "@app/modules/main/entities/entities";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";

type Props = {
  items: CartItemType[];
  total: number;
};

export default function CheckoutSummaryInterface({ items, total }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-sand bg-surface p-5">
      <h2 className="font-display text-lg text-ink">Tu pedido</h2>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between gap-2 text-sm text-ink-soft">
            <span>
              {item.quantity}× {item.name}
            </span>
            <PriceInterface amount={item.unitPrice * item.quantity} />
          </li>
        ))}
      </ul>
      <div className="flex justify-between border-t border-sand pt-3 text-ink">
        <span className="font-medium">Total</span>
        <PriceInterface amount={total} className="font-display text-lg" />
      </div>
    </div>
  );
}
