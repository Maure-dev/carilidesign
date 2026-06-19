import type { CheckoutContextType } from "@app/modules/checkout/entities/entities";
import { createContext } from "react";

export const CheckoutContext = createContext<CheckoutContextType | null>(null);
