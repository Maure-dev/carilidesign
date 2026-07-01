import type { ProductType } from "@app/modules/main/entities/entities";
import {
  buildSelectionSnapshot,
  validateSelection
} from "@app/modules/product/helpers/validateSelection";
import { describe, expect, it } from "vitest";

const product: ProductType = {
  id: "p1",
  slug: "p1",
  name: "Bacha",
  description: "desc",
  category: "bachas",
  priceArs: 10000,
  images: [],
  stock: 3,
  isActive: true,
  isFeatured: false,
  customizationOptions: [
    {
      id: "size",
      kind: "size",
      control: "select",
      label: "Medida",
      required: true,
      choices: [{ id: "m", label: "Mediana", priceDelta: 8000 }]
    },
    {
      id: "engraving",
      kind: "engraving",
      control: "text",
      label: "Grabado",
      required: false,
      maxLength: 5,
      choices: [{ id: "engraving", label: "Grabado", priceDelta: 5000 }]
    }
  ]
};

describe("validateSelection", () => {
  it("marca error en opción requerida sin elegir", () => {
    const { valid, errors } = validateSelection(product, {});
    expect(valid).toBe(false);
    expect(errors.size).toBeDefined();
  });

  it("es válida cuando se eligen las requeridas", () => {
    const { valid } = validateSelection(product, { size: "m" });
    expect(valid).toBe(true);
  });

  it("marca error si el grabado supera el máximo", () => {
    const { valid, errors } = validateSelection(product, { size: "m", engraving: "demasiado" });
    expect(valid).toBe(false);
    expect(errors.engraving).toBeDefined();
  });
});

describe("buildSelectionSnapshot", () => {
  it("arma un snapshot legible (label de opción -> elegido)", () => {
    const snap = buildSelectionSnapshot(product, { size: "m", engraving: "AB" });
    expect(snap).toEqual({ Medida: "Mediana", Grabado: "AB" });
  });
});
