import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainProvider from "@app/modules/main/states/mainProvider";
import HomeProvider, { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { useHomeActions } from "@app/modules/home/hooks/useHomeActions";

vi.mock("@app/modules/home/services/services", () => ({
  getTasks: vi.fn()
}));

import { getTasks } from "@app/modules/home/services/services";

beforeEach(() => {
  vi.clearAllMocks();
});

function wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <MainProvider>
        <HomeProvider>{children}</HomeProvider>
      </MainProvider>
    </MemoryRouter>
  );
}

describe("useHomeActions", () => {
  it("should expose the expected handlers", () => {
    const { result } = renderHook(() => useHomeActions(), { wrapper });

    expect(result.current.handleLoadTasks).toBeDefined();
  });

  it("should call the service when loading tasks", async () => {
    vi.mocked(getTasks).mockResolvedValueOnce({
      data: { data: [{ id: 1, title: "Tarea", done: false, createdAt: "2026-06-18" }] }
    } as Awaited<ReturnType<typeof getTasks>>);

    const { result } = renderHook(() => useHomeActions(), { wrapper });

    await act(async () => {
      await result.current.handleLoadTasks();
    });

    expect(getTasks).toHaveBeenCalledTimes(1);
  });

  it("should keep data as an array when the response is malformed", async () => {
    vi.mocked(getTasks).mockResolvedValueOnce({
      data: "<!doctype html>"
    } as Awaited<ReturnType<typeof getTasks>>);

    const { result } = renderHook(
      () => ({ actions: useHomeActions(), state: useHomeProvider() }),
      { wrapper }
    );

    await act(async () => {
      await result.current.actions.handleLoadTasks();
    });

    expect(result.current.state?.getHomeState.data).toEqual([]);
    expect(result.current.state?.getHomeState.loading).toBe(false);
  });

  it("should handle errors gracefully", async () => {
    vi.mocked(getTasks).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useHomeActions(), { wrapper });

    await act(async () => {
      await result.current.handleLoadTasks();
    });

    // El hook captura el error internamente y no propaga.
    expect(getTasks).toHaveBeenCalledTimes(1);
  });
});
