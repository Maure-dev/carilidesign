import type { ProductContextType } from "@app/modules/product/entities/entities";
import { createContext } from "react";

export const ProductContext = createContext<ProductContextType | null>(null);
