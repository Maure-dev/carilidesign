import { describe, it, expect } from "vitest";
import { getFeaturedProducts, getHomeContent } from "@app/modules/home/services/services";
import { DEFAULT_HOME_CONTENT } from "@app/modules/home/constants/constants";

describe("home services (fallback seed)", () => {
  it("getFeaturedProducts devuelve productos destacados del seed", async () => {
    const products = await getFeaturedProducts(3);
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.isFeatured && p.isActive)).toBe(true);
  });

  it("getHomeContent devuelve el contenido por defecto sin Firebase", async () => {
    const content = await getHomeContent();
    expect(content).toEqual(DEFAULT_HOME_CONTENT);
  });
});
