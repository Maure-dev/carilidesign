import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainProvider from "@app/modules/main/states/mainProvider";

type ProvidersOptions = {
  initialEntries?: string[];
};

export function ProvidersWrapper({
  children,
  initialEntries = ["/"]
}: ProvidersOptions & { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <MainProvider>{children}</MainProvider>
    </MemoryRouter>
  );
}

// Render de RTL envuelto en MemoryRouter + MainProvider.
export function renderWithProviders(
  ui: ReactElement,
  options: ProvidersOptions & Omit<RenderOptions, "wrapper"> = {}
): RenderResult {
  const { initialEntries, ...rest } = options;
  return render(ui, {
    wrapper: ({ children }) => (
      <ProvidersWrapper initialEntries={initialEntries}>{children}</ProvidersWrapper>
    ),
    ...rest
  });
}

export * from "@testing-library/react";
