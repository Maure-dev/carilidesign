import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios");

beforeEach(() => {
  vi.clearAllMocks();
});

import { getTasks } from "@app/modules/home/services/services";

describe("home services", () => {
  describe("getTasks", () => {
    it("should call GET with the correct URL", async () => {
      const mockResponse = {
        data: { data: [{ id: 1, title: "Tarea", done: false, createdAt: "2026-06-18" }] }
      };
      vi.mocked(axios.get).mockResolvedValueOnce(
        mockResponse as Awaited<ReturnType<typeof getTasks>>
      );

      const result = await getTasks();

      expect(axios.get).toHaveBeenCalledWith("/api/tasks");
      expect(result).toEqual(mockResponse);
    });
  });
});
