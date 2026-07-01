import { validateContactForm } from "@app/modules/contact/helpers/validateContactForm";
import { describe, expect, it } from "vitest";

describe("validateContactForm", () => {
  it("acepta un formulario válido", () => {
    const errors = validateContactForm({
      name: "Juan",
      email: "juan@test.com",
      message: "Hola, quiero consultar por una bacha personalizada."
    });
    expect(errors).toEqual({});
  });

  it("marca email inválido y mensaje corto", () => {
    const errors = validateContactForm({ name: "Juan", email: "x", message: "corto" });
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });
});
