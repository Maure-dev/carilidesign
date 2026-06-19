import type { ContentContextType } from "@app/modules/content/entities/entities";
import { createContext } from "react";

export const ContentContext = createContext<ContentContextType | null>(null);
