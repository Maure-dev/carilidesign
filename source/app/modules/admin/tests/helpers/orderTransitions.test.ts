import { describe, it, expect } from "vitest";
import { canTransition, nextStatuses } from "@app/modules/admin/helpers/orderTransitions";

describe("orderTransitions", () => {
  it("permite transiciones válidas", () => {
    expect(canTransition("paid", "in_production")).toBe(true);
    expect(canTransition("in_production", "shipped")).toBe(true);
    expect(canTransition("shipped", "delivered")).toBe(true);
  });

  it("rechaza transiciones inválidas", () => {
    expect(canTransition("delivered", "shipped")).toBe(false);
    expect(canTransition("pending_payment", "paid")).toBe(false);
    expect(canTransition("cancelled", "paid")).toBe(false);
  });

  it("nextStatuses devuelve las opciones disponibles", () => {
    expect(nextStatuses("paid")).toEqual(["in_production", "cancelled"]);
    expect(nextStatuses("delivered")).toEqual([]);
  });
});
