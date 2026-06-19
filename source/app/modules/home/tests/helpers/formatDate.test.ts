import { describe, it, expect } from "vitest";
import { formatDate } from "@app/modules/home/helpers/formatDate";

describe("formatDate", () => {
  it("should format an ISO date to dd/mm/yyyy", () => {
    const result = formatDate("2026-06-18T10:30:00.000Z");
    expect(result).toBe("18/06/2026");
  });

  it("should return an empty string for an empty input", () => {
    const result = formatDate("");
    expect(result).toBe("");
  });

  it("should return an empty string for an invalid date", () => {
    const result = formatDate("not-a-date");
    expect(result).toBe("");
  });
});
