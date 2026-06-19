import type { ReactNode } from "react";
import { renderHook as rtlRenderHook, type RenderHookOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainProvider from "@app/modules/main/states/mainProvider";

type ProvidersOptions = {
  initialEntries?: string[];
};

// renderHook envuelto en MemoryRouter + MainProvider.
export function renderHookWithProviders<TResult, TProps>(
  callback: (props: TProps) => TResult,
  options: ProvidersOptions & Omit<RenderHookOptions<TProps>, "wrapper"> = {}
) {
  const { initialEntries = ["/"], ...rest } = options;
  return rtlRenderHook(callback, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <MainProvider>{children}</MainProvider>
      </MemoryRouter>
    ),
    ...rest
  });
}
