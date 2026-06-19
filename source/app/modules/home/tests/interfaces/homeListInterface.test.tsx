import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@app/modules/main/tests/renderWithProviders";
import HomeProvider from "@app/modules/home/states/homeProvider";
import HomeListInterface from "@app/modules/home/interfaces/homeListInterface";

describe("HomeListInterface", () => {
  it("should render the loading indicator while loading", () => {
    renderWithProviders(
      <HomeProvider>
        <HomeListInterface />
      </HomeProvider>
    );

    expect(screen.getByRole("status", { name: /cargando/i })).toBeInTheDocument();
  });
});
