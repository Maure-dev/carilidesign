import type { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import HomeProvider, { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { INITIAL_STATE } from "@app/modules/home/constants/constants";

function wrapper({ children }: { children: ReactNode }) {
  return <HomeProvider>{children}</HomeProvider>;
}

describe("HomeProvider", () => {
  it("should provide the initial state", () => {
    const { result } = renderHook(() => useHomeProvider(), { wrapper });

    expect(result.current?.getHomeState).toEqual(INITIAL_STATE.HOME_PAGE);
  });

  it("should update the state via the setter", () => {
    const { result } = renderHook(() => useHomeProvider(), { wrapper });
    const prevState = result.current?.getHomeState;

    act(() => {
      result.current?.setHomeState((s) => ({ ...s, loading: false }));
    });

    expect(result.current?.getHomeState.loading).toBe(false);
    expect(result.current?.getHomeState).not.toBe(prevState);
  });

  it("should preserve unmodified fields when updating", () => {
    const { result } = renderHook(() => useHomeProvider(), { wrapper });

    act(() => {
      result.current?.setHomeState((s) => ({ ...s, loading: false }));
    });

    expect(result.current?.getHomeState.data).toEqual(INITIAL_STATE.HOME_PAGE.data);
    expect(result.current?.getHomeState.filters).toEqual(INITIAL_STATE.HOME_PAGE.filters);
  });
});
