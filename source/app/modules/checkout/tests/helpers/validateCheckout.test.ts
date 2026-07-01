import type { ShippingFormType } from "@app/modules/checkout/entities/entities";
import { validateCheckout } from "@app/modules/checkout/helpers/validateCheckout";
import { describe, expect, it } from "vitest";

const valid: ShippingFormType = {
  fullName: "Ana Pérez",
  email: "ana@test.com",
  phone: "1122334455",
  street: "Calle 123",
  city: "CABA",
  province: "Buenos Aires",
  postalCode: "1000",
  notes: ""
};

describe("validateCheckout", () => {
  it("no devuelve errores con datos válidos", () => {
    expect(validateCheckout(valid)).toEqual({});
  });

  it("marca email inválido", () => {
    const errors = validateCheckout({ ...valid, email: "no-es-email" });
    expect(errors.email).toBeDefined();
  });

  it("marca campos requeridos vacíos", () => {
    const errors = validateCheckout({ ...valid, fullName: "", city: "" });
    expect(errors.fullName).toBeDefined();
    expect(errors.city).toBeDefined();
  });
});
