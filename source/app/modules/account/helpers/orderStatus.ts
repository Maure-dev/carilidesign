import type { OrderStatusType } from "@app/modules/main/entities/entities";

export const ORDER_STATUS_LABEL: Record<OrderStatusType, string> = {
  pending_payment: "Pendiente de pago",
  paid: "Pagado",
  in_production: "En producción",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado"
};

// Flujo canónico para el timeline (cancelled queda fuera del flujo lineal).
const FLOW: OrderStatusType[] = [
  "pending_payment",
  "paid",
  "in_production",
  "shipped",
  "delivered"
];

export type TimelineStepType = {
  status: OrderStatusType;
  label: string;
  done: boolean;
  current: boolean;
};

export function getStatusLabel(status: OrderStatusType): string {
  return ORDER_STATUS_LABEL[status];
}

export function buildTimeline(current: OrderStatusType): TimelineStepType[] {
  if (current === "cancelled") {
    return [
      { status: "cancelled", label: ORDER_STATUS_LABEL.cancelled, done: true, current: true }
    ];
  }
  const currentIndex = FLOW.indexOf(current);
  return FLOW.map((status, index) => ({
    status: status,
    label: ORDER_STATUS_LABEL[status],
    done: index <= currentIndex,
    current: index === currentIndex
  }));
}
