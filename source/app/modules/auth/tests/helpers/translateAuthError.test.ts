import { describe, it, expect } from "vitest";
import { translateAuthError } from "@app/modules/auth/helpers/translateAuthError";

describe("translateAuthError", () => {
  it("traduce códigos conocidos de Firebase", () => {
    expect(translateAuthError({ code: "auth/invalid-credential" })).toMatch(/incorrect/i);
    expect(translateAuthError({ code: "auth/email-already-in-use" })).toMatch(/ya existe/i);
  });

  it("traduce el caso sin configuración", () => {
    expect(translateAuthError(new Error("auth-unavailable"))).toMatch(/no está disponible/i);
  });

  it("devuelve un mensaje genérico para errores desconocidos", () => {
    expect(translateAuthError({ code: "auth/unknown-xyz" })).toMatch(/Ocurrió un error/i);
  });
});
