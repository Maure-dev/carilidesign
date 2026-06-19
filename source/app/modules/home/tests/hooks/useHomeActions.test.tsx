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
  it("lee del store global y marca loading=false (store vacío en test)", () => {
    const { result } = renderHook(() => ({ actions: useHomeActions(), state: useHomeProvider() }), {
      wrapper
    });

    act(() => {
      result.current.actions.handleLoadHome();
    });

    expect(result.current.state?.getHomeState.loading).toBe(false);
    expect(result.current.state?.getHomeState.featured).toEqual([]);
    expect(result.current.state?.getHomeState.content).toBeNull();
  });
});
