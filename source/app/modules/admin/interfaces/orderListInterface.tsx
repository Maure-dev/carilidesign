import type { AdminOrderType } from "@app/modules/admin/entities/entities";
import { nextStatuses } from "@app/modules/admin/helpers/orderTransitions";
import type { OrderStatusType } from "@app/modules/main/entities/entities";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";

type Props = {
  orders: AdminOrderType[];
  onTransition: (orderId: string, to: OrderStatusType) => void;
  onConfirmPayment: (orderId: string, approved: boolean) => void;
};

const STATUS_LABEL: Record<OrderStatusType, string> = {
  pending_payment: "Pendiente de pago",
  paid: "Pagado",
  in_production: "En producción",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado"
};

const METHOD_LABEL: Record<string, string> = {
  mercadopago: "Mercado Pago",
  bank_transfer: "Transferencia",
  cash: "Efectivo"
};

export default function OrderListInterface({ orders, onTransition, onConfirmPayment }: Props) {
  if (orders.length === 0) {
    return <EmptyBoxInterface message="Todavía no hay pedidos." />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => {
        const transitions = nextStatuses(order.orderStatus);
        const canConfirmManual =
          order.paymentMethod !== "mercadopago" && order.paymentStatus !== "paid";

        return (
          <li
            key={order.id}
            className="flex flex-col gap-3 rounded-card border border-sand bg-surface p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-ink">
                {order.orderNumber ?? order.id.slice(0, 8)} · {METHOD_LABEL[order.paymentMethod]}
              </span>
              <PriceInterface amount={order.total} className="font-display text-clay-deep" />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
              <span>Estado: {STATUS_LABEL[order.orderStatus]}</span>
              {transitions.length > 0 && (
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      onTransition(order.id, e.target.value as OrderStatusType);
                    }
                  }}
                  className="rounded-buttons border border-sand bg-canvas px-2 py-1"
                >
                  <option value="">Cambiar a…</option>
                  {transitions.map((to) => (
                    <option key={to} value={to}>
                      {STATUS_LABEL[to]}
                    </option>
                  ))}
                </select>
              )}
              {canConfirmManual && (
                <span className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onConfirmPayment(order.id, true)}
                    className="rounded-buttons border border-success px-3 py-1 text-success"
                  >
                    Confirmar pago
                  </button>
                  <button
                    type="button"
                    onClick={() => onConfirmPayment(order.id, false)}
                    className="rounded-buttons border border-error px-3 py-1 text-error"
                  >
                    Rechazar
                  </button>
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
