import type { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainProvider from "@app/modules/main/states/mainProvider";
import HomeProvider, { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { useHomeActions } from "@app/modules/home/hooks/useHomeActions";

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
  it("carga destacados y contenido", async () => {
    const { result } = renderHook(() => ({ actions: useHomeActions(), state: useHomeProvider() }), {
      wrapper
    });

    await act(async () => {
      await result.current.actions.handleLoadHome();
    });

    expect(result.current.state?.getHomeState.loading).toBe(false);
    expect(result.current.state?.getHomeState.featured.length).toBeGreaterThan(0);
  });
});
