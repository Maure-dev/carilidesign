import type { AccountContextType } from "@app/modules/account/entities/entities";
import { createContext } from "react";

export const AccountContext = createContext<AccountContextType | null>(null);
