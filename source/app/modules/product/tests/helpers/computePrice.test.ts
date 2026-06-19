import { describe, it, expect } from "vitest";
import { computePrice } from "@app/modules/product/helpers/computePrice";
import type { ProductType } from "@app/modules/main/entities/entities";

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
      choices: [
        { id: "s", label: "Chica", priceDelta: 0 },
        { id: "m", label: "Mediana", priceDelta: 8000 }
      ]
    },
    {
      id: "glaze",
      kind: "glaze",
      control: "swatch",
      label: "Esmalte",
      required: true,
      choices: [{ id: "terracota", label: "Terracota", priceDelta: 4000 }]
    },
    {
      id: "engraving",
      kind: "engraving",
      control: "text",
      label: "Grabado",
      required: false,
      maxLength: 10,
      choices: [{ id: "engraving", label: "Grabado", priceDelta: 5000 }]
    }
  ]
};

describe("computePrice", () => {
  it("devuelve el precio base sin opciones", () => {
    expect(computePrice(product, {})).toBe(10000);
  });

  it("suma los deltas de las opciones elegidas", () => {
    expect(computePrice(product, { size: "m", glaze: "terracota" })).toBe(22000);
  });

  it("suma el grabado sólo si hay texto", () => {
    expect(computePrice(product, { engraving: "" })).toBe(10000);
    expect(computePrice(product, { engraving: "Hola" })).toBe(15000);
  });
});
