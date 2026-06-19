import { describe, it, expect } from "vitest";
import { availableShapes, filterAndSort } from "@app/modules/catalog/helpers/filterProducts";
import type { ProductType } from "@app/modules/main/entities/entities";

function p(id: string, name: string, priceArs: number, shape: string): ProductType {
  return {
    id: id,
    slug: id,
    name: name,
    description: `desc ${name}`,
    category: "bachas",
    shape: shape,
    priceArs: priceArs,
    images: [],
    customizationOptions: [],
    stock: 1,
    isActive: true,
    isFeatured: false
  };
}

const products: ProductType[] = [
  p("a", "Luna", 50000, "redonda"),
  p("b", "Valle", 30000, "ovalada"),
  p("c", "Sol", 70000, "redonda")
];

describe("filterAndSort", () => {
  it("ordena por precio ascendente", () => {
    const r = filterAndSort(products, { search: "", shape: null }, "priceAsc");
    expect(r.map((x) => x.id)).toEqual(["b", "a", "c"]);
  });

  it("ordena por precio descendente", () => {
    const r = filterAndSort(products, { search: "", shape: null }, "priceDesc");
    expect(r.map((x) => x.id)).toEqual(["c", "a", "b"]);
  });

  it("filtra por forma", () => {
    const r = filterAndSort(products, { search: "", shape: "redonda" }, "newest");
    expect(r.map((x) => x.id)).toEqual(["a", "c"]);
  });

  it("filtra por búsqueda de texto", () => {
    const r = filterAndSort(products, { search: "valle", shape: null }, "newest");
    expect(r.map((x) => x.id)).toEqual(["b"]);
  });

  it("availableShapes devuelve formas únicas ordenadas", () => {
    expect(availableShapes(products)).toEqual(["ovalada", "redonda"]);
  });
});
