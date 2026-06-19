import type { CartItemType } from "@app/modules/main/entities/entities";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";

type Props = {
  items: CartItemType[];
  shippingCost: number | null;
  total: number;
};

export default function CheckoutSummaryInterface({ items, shippingCost, total }: Props) {
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col gap-3 rounded-card border border-sand bg-surface p-5">
      <h2 className="font-display text-lg text-ink">
        Tu pedido <span className="text-sm font-normal text-ink-soft">({count})</span>
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 text-sm">
            {item.image && (
              <img
                src={item.image}
                alt=""
                className="h-12 w-10 shrink-0 rounded-buttons object-cover"
              />
            )}
            <div className="flex flex-1 flex-col">
              <span className="text-ink">
                {item.quantity}× {item.name}
              </span>
              {item.options &&
                Object.entries(item.options).map(([key, value]) => (
                  <span key={key} className="text-xs text-ink-soft">
                    {key}: {value}
                  </span>
                ))}
            </div>
            <PriceInterface amount={item.unitPrice * item.quantity} className="text-ink-soft" />
          </li>
        ))}
      </ul>
      <dl className="flex flex-col gap-1 border-t border-sand pt-3 text-sm text-ink-soft">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>
            <PriceInterface amount={subtotal} />
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Envío</dt>
          <dd>
            {shippingCost === null ? (
              "Elegí un envío"
            ) : shippingCost === 0 ? (
              "Gratis"
            ) : (
              <PriceInterface amount={shippingCost} />
            )}
          </dd>
        </div>
        <div className="mt-1 flex justify-between border-t border-sand pt-2 text-ink">
          <dt className="font-medium">Total</dt>
          <dd>
            <PriceInterface amount={total} className="font-display text-lg" />
          </dd>
        </div>
      </dl>
    </div>
  );
}
