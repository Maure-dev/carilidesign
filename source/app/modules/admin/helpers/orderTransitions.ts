import type { OrderStatusType } from "@app/modules/main/entities/entities";

// Espejo cliente de la máquina de estados (el server vuelve a validar).
export const ALLOWED_TRANSITIONS: Record<OrderStatusType, OrderStatusType[]> = {
  pending_payment: ["cancelled"],
  paid: ["in_production", "cancelled"],
  in_production: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: []
};

export function canTransition(from: OrderStatusType, to: OrderStatusType): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function nextStatuses(from: OrderStatusType): OrderStatusType[] {
  return ALLOWED_TRANSITIONS[from];
}
