import type { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import HomeProvider, { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { INITIAL_STATE } from "@app/modules/home/constants/constants";

function wrapper({ children }: { children: ReactNode }) {
  return <HomeProvider>{children}</HomeProvider>;
}

describe("HomeProvider", () => {
  it("provee el estado inicial (sin contenido hardcodeado)", () => {
    const { result } = renderHook(() => useHomeProvider(), { wrapper });
    expect(result.current?.getHomeState.featured).toEqual([]);
    expect(result.current?.getHomeState.content).toBeNull();
    expect(result.current?.getHomeState).toEqual(INITIAL_STATE.HOME_PAGE);
  });
});
