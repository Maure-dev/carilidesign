import type { AdminContextType } from "@app/modules/admin/entities/entities";
import { createContext } from "react";

export const AdminContext = createContext<AdminContextType | null>(null);
