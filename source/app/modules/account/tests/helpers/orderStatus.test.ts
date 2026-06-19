import { describe, it, expect } from "vitest";
import { buildTimeline, getStatusLabel } from "@app/modules/account/helpers/orderStatus";

describe("orderStatus", () => {
  it("traduce los estados a español", () => {
    expect(getStatusLabel("pending_payment")).toBe("Pendiente de pago");
    expect(getStatusLabel("delivered")).toBe("Entregado");
  });

  it("arma el timeline marcando pasos completados y el actual", () => {
    const timeline = buildTimeline("in_production");
    const current = timeline.find((s) => s.current);
    expect(current?.status).toBe("in_production");
    expect(timeline.filter((s) => s.done).length).toBe(3); // pending_payment, paid, in_production
    expect(timeline[timeline.length - 1].done).toBe(false); // delivered aún no
  });

  it("para cancelado devuelve un único paso", () => {
    const timeline = buildTimeline("cancelled");
    expect(timeline).toHaveLength(1);
    expect(timeline[0].status).toBe("cancelled");
  });
});
