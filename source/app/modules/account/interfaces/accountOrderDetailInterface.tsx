import { Link } from "react-router";
import type { OrderType } from "@app/modules/account/entities/entities";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";
import { buildTimeline } from "@app/modules/account/helpers/orderStatus";

type Props = {
  order: OrderType;
};

export default function AccountOrderDetailInterface({ order }: Props) {
  const timeline = buildTimeline(order.orderStatus);
  const canRetry = order.paymentStatus === "rejected" || order.paymentStatus === "pending";

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">
          Pedido {order.orderNumber ?? order.id.slice(0, 8)}
        </h1>
        <PriceInterface amount={order.total} className="font-display text-xl text-clay-deep" />
      </header>

      <section className="rounded-card border border-sand bg-surface p-5">
        <h2 className="mb-4 font-display text-lg text-ink">Seguimiento</h2>
        <ol className="flex flex-col gap-3">
          {timeline.map((step) => (
            <li key={step.status} className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${step.done ? "bg-clay" : "bg-sand"}`} />
              <span className={step.current ? "font-medium text-ink" : "text-ink-soft"}>
                {step.label}
              </span>
            </li>
          ))}
        </ol>
        {canRetry && (
          <Link
            to="/carrito"
            className="mt-4 inline-block rounded-buttons border border-clay px-4 py-2 text-sm font-medium text-clay-deep hover:bg-sand"
          >
            Reintentar pago
          </Link>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-display text-lg text-ink">Productos</h2>
        <ul className="flex flex-col gap-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 text-sm text-ink-soft">
              <span>
                {item.quantity}× {item.name}
              </span>
              <PriceInterface amount={item.unitPrice * item.quantity} />
            </li>
          ))}
        </ul>
      </section>

      <Link to="/mi-cuenta" className="text-sm text-clay-deep hover:text-clay">
        ← Volver a mis pedidos
      </Link>
    </div>
  );
}
