import type { AdminMessageType, AdminOrderType } from "@app/modules/admin/entities/entities";
import type { ProductType } from "@app/modules/main/entities/entities";

export type DashboardMetricsType = {
  totalProducts: number;
  lowStock: number;
  pendingOrders: number;
  paidOrders: number;
  revenue: number;
  unreadMessages: number;
};

const LOW_STOCK_THRESHOLD = 3;

// Función pura: calcula los KPIs del panel a partir de productos, pedidos y mensajes.
export function computeDashboardMetrics(
  products: ProductType[],
  orders: AdminOrderType[],
  messages: AdminMessageType[]
): DashboardMetricsType {
  const paid = orders.filter((o) => o.paymentStatus === "paid");
  return {
    totalProducts: products.length,
    lowStock: products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD).length,
    pendingOrders: orders.filter(
      (o) => o.orderStatus === "pending_payment" || o.paymentStatus === "in_review"
    ).length,
    paidOrders: paid.length,
    revenue: paid.reduce((sum, o) => sum + (o.total ?? 0), 0),
    unreadMessages: messages.filter((m) => !m.read).length
  };
}
