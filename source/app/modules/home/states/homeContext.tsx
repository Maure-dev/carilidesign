import type { HomeContextType } from "@app/modules/home/entities/entities";
import { createContext } from "react";

export const HomeContext = createContext<HomeContextType | null>(null);
