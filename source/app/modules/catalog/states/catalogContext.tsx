import type { CatalogContextType } from "@app/modules/catalog/entities/entities";
import { createContext } from "react";

export const CatalogContext = createContext<CatalogContextType | null>(null);
