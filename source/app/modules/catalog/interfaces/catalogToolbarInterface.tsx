import type { CatalogSortType } from "@app/modules/catalog/entities/entities";
import { availableShapes } from "@app/modules/catalog/helpers/filterProducts";
import { useCatalogActions } from "@app/modules/catalog/hooks/useCatalogActions";
import { useCatalogProvider } from "@app/modules/catalog/states/catalogProvider";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import { Search } from "lucide-react";

function chipClass(active: boolean): string {
  return `rounded-full border px-3 py-1 text-sm capitalize transition-colors ${
    active
      ? "border-clay bg-clay text-white"
      : "border-sand bg-surface text-ink-soft hover:border-clay"
  }`;
}

export default function CatalogToolbarInterface() {
  const { getCatalogState } = useCatalogProvider();
  const { handleSearch, handleSetShape, handleSetSort } = useCatalogActions();
  const { all, filters, sort } = getCatalogState;
  const shapes = availableShapes(all);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-soft">
            <IconInterface icon={Search} size="sm" />
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar bachas..."
            aria-label="Buscar bachas"
            className="w-full rounded-buttons border border-sand bg-surface py-2 pl-10 pr-4 outline-none transition-colors focus:border-clay"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => handleSetSort(e.target.value as CatalogSortType)}
          aria-label="Ordenar"
          className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="newest">Más nuevas</option>
          <option value="priceAsc">Precio: menor a mayor</option>
          <option value="priceDesc">Precio: mayor a menor</option>
          <option value="name">Nombre (A-Z)</option>
        </select>
      </div>
      {shapes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleSetShape(null)}
            className={chipClass(!filters.shape)}
          >
            Todas
          </button>
          {shapes.map((shape) => (
            <button
              key={shape}
              type="button"
              onClick={() => handleSetShape(shape)}
              className={chipClass(filters.shape === shape)}
            >
              {shape}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
