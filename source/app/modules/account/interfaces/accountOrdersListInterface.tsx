import { Link } from "react-router";
import type { OrderType } from "@app/modules/account/entities/entities";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";
import BadgeInterface from "@app/modules/main/interfaces/badgeInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import { getStatusLabel } from "@app/modules/account/helpers/orderStatus";

type Props = {
  orders: OrderType[];
};

export default function AccountOrdersListInterface({ orders }: Props) {
  if (orders.length === 0) {
    return <EmptyBoxInterface message="Todavía no tenés pedidos." />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => (
        <li key={order.id}>
          <Link
            to={`/mis-pedidos/${order.id}`}
            className="flex items-center justify-between gap-3 rounded-card border border-sand bg-surface p-4 hover:border-clay"
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-ink">
                Pedido {order.orderNumber ?? order.id.slice(0, 8)}
              </span>
              <BadgeInterface tone="sand">{getStatusLabel(order.orderStatus)}</BadgeInterface>
            </div>
            <PriceInterface amount={order.total} className="font-display text-clay-deep" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
