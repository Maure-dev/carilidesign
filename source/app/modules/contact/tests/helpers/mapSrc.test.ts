import { getMapSrc } from "@app/modules/contact/helpers/mapSrc";
import { describe, expect, it } from "vitest";

describe("getMapSrc", () => {
  it("devuelve null si está vacío", () => {
    expect(getMapSrc("")).toBeNull();
    expect(getMapSrc(undefined)).toBeNull();
  });

  it("acepta una URL https directa", () => {
    expect(getMapSrc("https://www.google.com/maps/embed?pb=123")).toBe(
      "https://www.google.com/maps/embed?pb=123"
    );
  });

  it("extrae el src de un <iframe> pegado", () => {
    const iframe = '<iframe src="https://www.google.com/maps/embed?pb=abc" width="600"></iframe>';
    expect(getMapSrc(iframe)).toBe("https://www.google.com/maps/embed?pb=abc");
  });

  it("rechaza URLs que no son https", () => {
    expect(getMapSrc("http://inseguro.com/map")).toBeNull();
    expect(getMapSrc("javascript:alert(1)")).toBeNull();
  });
});
