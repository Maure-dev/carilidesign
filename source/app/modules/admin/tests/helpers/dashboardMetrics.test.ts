import { describe, it, expect } from "vitest";
import type { ProductType } from "@app/modules/main/entities/entities";
import type { AdminMessageType, AdminOrderType } from "@app/modules/admin/entities/entities";
import { computeDashboardMetrics } from "@app/modules/admin/helpers/dashboardMetrics";

function product(overrides: Partial<ProductType> = {}): ProductType {
  return {
    id: "p",
    slug: "p",
    name: "Bacha",
    description: "",
    category: "bachas",
    priceArs: 1000,
    images: [],
    customizationOptions: [],
    stock: 10,
    isActive: true,
    isFeatured: false,
    ...overrides
  };
}

function order(overrides: Partial<AdminOrderType> = {}): AdminOrderType {
  return {
    id: "o",
    userId: "u",
    total: 5000,
    paymentMethod: "mercadopago",
    paymentStatus: "pending",
    orderStatus: "pending_payment",
    ...overrides
  };
}

function message(read: boolean): AdminMessageType {
  return { id: "m", name: "n", email: "e", message: "hola", read };
}

describe("computeDashboardMetrics", () => {
  it("cuenta productos, stock bajo, pedidos, ingresos y mensajes sin leer", () => {
    const products = [product({ stock: 2 }), product({ stock: 10 }), product({ stock: 0 })];
    const orders = [
      order({ paymentStatus: "paid", orderStatus: "paid", total: 5000 }),
      order({ paymentStatus: "paid", orderStatus: "paid", total: 3000 }),
      order({ paymentStatus: "in_review", orderStatus: "pending_payment" }),
      order({ paymentStatus: "pending", orderStatus: "pending_payment" })
    ];
    const messages = [message(false), message(true), message(false)];

    const m = computeDashboardMetrics(products, orders, messages);

    expect(m.totalProducts).toBe(3);
    expect(m.lowStock).toBe(2);
    expect(m.paidOrders).toBe(2);
    expect(m.revenue).toBe(8000);
    expect(m.pendingOrders).toBe(2);
    expect(m.unreadMessages).toBe(2);
  });

  it("devuelve ceros con datos vacíos", () => {
    const m = computeDashboardMetrics([], [], []);
    expect(m).toEqual({
      totalProducts: 0,
      lowStock: 0,
      pendingOrders: 0,
      paidOrders: 0,
      revenue: 0,
      unreadMessages: 0
    });
  });
});
